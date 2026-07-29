/*export async function pay(order) {
    // Simulamos el tiempo de respuesta del banco
    await new Promise(resolve => setTimeout(resolve, 2000))
    return {
        success: true,
        paymentId:
            'pi_' +
            Math.random().toString(36).substring(2,12),
        paymentMethod: 'stripe',
        status: 'paid'
    }
}
*/
export async function pay(order) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    return {
        success: true,
        paymentId: 'pi_' + Math.random().toString(36).substring(2, 12),
        paymentMethod: 'stripe',
        paymentStatus: 'paid',
        orderStatus: 'paid'
    }

}