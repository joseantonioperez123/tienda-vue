const { onCall } = require('firebase-functions/v2/https')

const { createCheckoutSession } = require('./stripe/checkout')

exports.createCheckoutSession = onCall(
    {
        secrets: ['STRIPE_SECRET_KEY']
    },
    createCheckoutSession
)