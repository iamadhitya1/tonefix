import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import crypto from 'crypto'
import handler from './verify-payment.js'

function mockRes() {
  const res = {}
  res.status = vi.fn(() => res)
  res.json = vi.fn(() => res)
  res.end = vi.fn(() => res)
  return res
}

describe('verify-payment handler', () => {
  const SECRET = 'test_secret_key'

  beforeEach(() => {
    process.env.RAZORPAY_KEY_SECRET = SECRET
  })

  afterEach(() => {
    delete process.env.RAZORPAY_KEY_SECRET
  })

  it('rejects non-POST methods', async () => {
    const res = mockRes()
    await handler({ method: 'GET', body: {} }, res)
    expect(res.status).toHaveBeenCalledWith(405)
  })

  it('rejects a request missing payment details', async () => {
    const res = mockRes()
    await handler({ method: 'POST', body: {} }, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: 'Missing payment details' })
  })

  it('accepts a correctly signed payment', async () => {
    const paymentId = 'pay_123'
    const subId = 'sub_456'
    const signature = crypto
      .createHmac('sha256', SECRET)
      .update(`${paymentId}|${subId}`)
      .digest('hex')

    const res = mockRes()
    await handler({
      method: 'POST',
      body: {
        razorpay_payment_id: paymentId,
        razorpay_subscription_id: subId,
        razorpay_signature: signature,
      },
    }, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ ok: true })
  })

  it('rejects a tampered/incorrect signature', async () => {
    const res = mockRes()
    await handler({
      method: 'POST',
      body: {
        razorpay_payment_id: 'pay_123',
        razorpay_subscription_id: 'sub_456',
        razorpay_signature: 'not_the_real_signature',
      },
    }, res)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ ok: false, error: 'Signature mismatch' })
  })

  it('fails safely when the server secret is not configured', async () => {
    delete process.env.RAZORPAY_KEY_SECRET
    const res = mockRes()
    await handler({
      method: 'POST',
      body: {
        razorpay_payment_id: 'pay_123',
        razorpay_subscription_id: 'sub_456',
        razorpay_signature: 'anything',
      },
    }, res)

    expect(res.status).toHaveBeenCalledWith(500)
  })
})
