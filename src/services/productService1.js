import { products } from '../data/products'

export async function getAllProducts() {
  return new Promise(resolve => {
    setTimeout(() => { resolve(products) }, 3000)
  })
}

export async function getProductById(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve( products.find( p => p.id === Number(id) ) )
    }, 2000)
  })

}