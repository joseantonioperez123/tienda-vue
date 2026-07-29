/*export async function pay(order) {
    switch (order.metodoPago) {
        case 'tarjeta':
            return await stripePay(order)
        case 'paypal':
            return await paypalPay(order)
        case 'transferencia':
            return await transferPay(order)
    }
}*/

import * as stripe from './fakeStripeService'
import * as paypal from './fakePaypalService'
import * as transfer from './fakeTransferService'

export async function pay(order) {
    switch (order.customer.metodoPago) {
        case 'tarjeta':
            return stripe.pay(order)
        case 'paypal':
            return paypal.pay(order)
        case 'transferencia':
            return transfer.pay(order)
    }
}