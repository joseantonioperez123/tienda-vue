import { event } from 'vue-gtag'
import { useCatalogStore } from '@/stores/catalog'

class AnalyticsService {

    /*buildItem(product, categoryName, quantity = 1) {
        return {
            item_id: product.id,
            item_name: product.nombre,
            item_category: categoryName,
            price: product.precio,
            quantity
        }
    }*/
    buildItem(product, quantity = 1) {
    return {
        item_id: product.id,
        item_name: product.nombre,
        item_category: this.getCategoryName(product),
        price: product.precio,
        quantity
    }
}
    /*viewProduct(product, categoryName = '') {
        event('view_item', {
            currency: 'EUR',
            value: product.precio,
            items: [
                this.buildItem(product, categoryName)
            ]
        })
    }*/
   viewProduct(product) {
    event('view_item', {
        currency: 'EUR',
        value: product.precio,
        items: [
            this.buildItem(product)
        ]
    })
}
       /* addToCart(product, categoryName = '', quantity = 1) {
        event('add_to_cart', {
            currency: 'EUR',
            value: product.precio * quantity,
            items: [
                this.buildItem(product, categoryName, quantity)
            ]
        })
    }*/
    addToCart(product, quantity = 1) {
    event('add_to_cart', {
        currency: 'EUR',
        value: product.precio * quantity,
        items: [
            this.buildItem(product, quantity)
        ]
    })
}
    /*removeFromCart(product, categoryName = '', quantity = 1) {
    event('remove_from_cart', {
        currency: 'EUR',
        value: product.precio * quantity,
        items: [
            this.buildItem(product, categoryName, quantity)
        ]
    })
}*/
removeFromCart(product, quantity = 1) {

    event('remove_from_cart', {
        currency: 'EUR',
        value: product.precio * quantity,
        items: [
            this.buildItem(product, quantity)
        ]
    })

}
/*viewCart(items, getCategoryName) {
    event('view_cart', {
        currency: 'EUR',
        value: items.reduce(
            (t, i) => t + i.product.precio * i.quantity,
            0
        ),
        items: items.map(item =>
            this.buildItem(
                item.product,
                getCategoryName(item.product.categoryId),
                item.quantity
            )
        )
    })
}*/
viewCart(items) {
    event('view_cart', {
        currency: 'EUR',
        value: items.reduce(
            (t, i) => t + i.product.precio * i.quantity,
            0
        ),
        items: items.map(item =>
            this.buildItem(item.product, item.quantity)
        )
    })
}
/*beginCheckout(items, getCategoryName) {
    event('begin_checkout', {
        currency: 'EUR',
        value: items.reduce(
            (t, i) => t + i.product.precio * i.quantity,
            0
        ),
        items: items.map(item =>
            this.buildItem(
                item.product,
                getCategoryName(item.product.categoryId),
                item.quantity
            )
        )
    })
}*/
beginCheckout(items) {
    event('begin_checkout', {
        currency: 'EUR',
        value: items.reduce(
            (t, i) => t + i.product.precio * i.quantity,
            0
        ),
        items: items.map(item =>
            this.buildItem(item.product, item.quantity)
        )
    })
}
purchase(order) {
    event('purchase', {
        transaction_id: order.id,
        currency: 'EUR',
        value: order.total,
        shipping: order.shipping,
        items: order.items.map(item => ({
            item_id: item.productId,
            item_name: item.nombre,
            price: item.precio,
            quantity: item.quantity
        }))
    })
}
getCategoryName(product) {
    const catalog = useCatalogStore()
    return catalog.getCategoryName(product.categoryId)
}
    /*viewProduct(product, categoryName = '') {
        event('view_item', {
            currency: 'EUR',
            value: product.precio,
            items: [
                {
                    item_id: product.id,
                    item_name: product.nombre,
                    item_category: categoryName,
                    price: product.precio
                }
            ]
        })
    }
    addToCart(product, categoryName = '', quantity = 1) {
        event('add_to_cart', {
            currency: 'EUR',
            value: product.precio * quantity,
            items: [
                {
                    item_id: product.id,
                    item_name: product.nombre,
                    item_category: categoryName,
                    quantity,
                    price: product.precio
                }
            ]
        })
    }

    removeFromCart(product, categoryName = '', quantity = 1) {

        event('remove_from_cart', {
            currency: 'EUR',
            value: product.precio * quantity,
            items: [
                {
                    item_id: product.id,
                    item_name: product.nombre,
                    item_category: categoryName,
                    quantity,
                    price: product.precio
                }
            ]
        })

    }*/

}

export default new AnalyticsService()