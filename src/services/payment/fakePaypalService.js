/*export async function pay(order) {
    await new Promise(resolve => setTimeout(resolve,1500))
    return {
        success:true,
        paymentId:
            'pp_' +
            Math.random().toString(36).substring(2,12),
        paymentMethod:'paypal',
        status:'paid'
    }
}*/

export async function pay(order) {
    await new Promise(resolve => setTimeout(resolve, 1500))
    return {
        success: true,
        paymentId: 'pp_' + Math.random().toString(36).substring(2, 12),
        paymentMethod: 'paypal',
        paymentStatus: 'paid',
        orderStatus: 'paid'
    }
}