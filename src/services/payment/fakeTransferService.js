/*export async function pay(order) {
    return {
        success:true,
        paymentId:
            'tr_' +
            Date.now(),
        paymentMethod:'transfer',
        status:'waiting_transfer'
    }
}*/

export async function pay(order) {
    return {
        success: true,
        paymentId: 'tr_' + Date.now(),
        paymentMethod: 'transferencia',
        paymentStatus: 'pending',
        orderStatus: 'waiting_transfer'
    }
}