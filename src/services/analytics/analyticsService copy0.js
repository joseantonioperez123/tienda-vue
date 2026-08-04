import { event } from 'vue-gtag'

/*export function trackViewProduct(product) {
    event('view_item', {
        currency: 'EUR',
        value: product.precio,
        items: [
            {
                item_id: product.id,
                item_name: product.nombre,
                item_category: product.categoryName,
                price: product.precio
            }
        ]
    })
}

export function trackAddToCart(product, quantity = 1) {
    event('add_to_cart', {
        currency: 'EUR',
        value: product.precio * quantity,
        items: [
            {
                item_id: product.id,
                item_name: product.nombre,
                quantity,
                price: product.precio
            }
        ]
    })
}*/
class AnalyticsService {
    viewProduct(product) {
        event('view_item', {
            currency: 'EUR',
            value: product.precio,
            items: [
                {
                    item_id: product.id,
                    item_name: product.nombre,
                    price: product.precio,
                    item_category: product.categoryId
                }
            ]
        })
    }
    addToCart(product, quantity = 1) {
        event('add_to_cart', {
            currency: 'EUR',
            value: product.precio * quantity,
            items: [
                {
                    item_id: product.id,
                    item_name: product.nombre,
                    quantity,
                    price: product.precio
                }
            ]
        })
    }
    removeFromCart(product, quantity = 1) {
        event('remove_from_cart', {
            currency: 'EUR',
            value: product.precio * quantity,
            items: [
                {
                    item_id: product.id,
                    item_name: product.nombre,
                    quantity,
                    price: product.precio
                }
            ]
        })
    }
}

export default new AnalyticsService()