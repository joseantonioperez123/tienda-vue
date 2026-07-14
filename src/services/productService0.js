import { products } from '../data/products'

export function getAllProducts() {
  return products
}


/* si consumimos de una API REST 
export async function getAllProducts() {

  const response =
    await fetch(
      'https://api.mitienda.com/productos'
    )

  return await response.json()

}*/

/* simulando una demora */
/*export async function getAllProducts() {

  return new Promise(resolve => {

    setTimeout(() => {
      resolve(products)
    }, 1000)

  })

}*/

export function getProductById(id) {

  return products.find(
    product => product.id === Number(id)
  )

}