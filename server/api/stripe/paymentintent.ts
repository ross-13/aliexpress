import Stripe from 'stripe'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  // eslint-disable-next-line n/prefer-global/process
  const stripe_sk_key = process.env.STRIPE_SK_KEY

  if (!stripe_sk_key) {
    console.warn('Specify stripe sk key')
    return
  }

  const stripe = new Stripe(stripe_sk_key, {
    apiVersion: '2022-11-15',
    typescript: true,
  })

  return await stripe.paymentIntents.create({
    amount: Number(body.amount),
    currency: 'usd',
    automatic_payment_methods: { enabled: true },
  })
})
