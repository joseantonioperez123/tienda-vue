const Stripe = require('stripe')

module.exports.createCheckoutSession = async (request) => {

    const stripe = new Stripe(
        process.env.STRIPE_SECRET_KEY
    )

    return {
        ok: true
    }

}