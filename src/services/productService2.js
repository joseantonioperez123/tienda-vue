import db from '../firebase/firestore'

import { collection, getDocs } from 'firebase/firestore'

export async function getAllProductsFirestore() {
  const snapshot = await getDocs(
    collection(db, 'products')
  )

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
}

import API_URL from './api'

export async function getAllProducts() {
    const response = await fetch(`${API_URL}/products`)
    if (!response.ok) {
        throw new Error('Error cargando productos')
    }
    return await response.json()
}

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/products/${id}`)
    if (!response.ok) {throw new Error('Producto no encontrado')}
    return await response.json()
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('No se pudo eliminar el producto')
  }
  return true
}

export async function createProduct(product) {

  console.log("PRODUCTO A ENVIAR")
  console.table(product)
  console.log(Object.keys(product))

  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
  if (!response.ok) {
    throw new Error('No se pudo crear el producto')
  }
  return await response.json()
}

export async function updateProduct(product) {
  const response = await fetch(
    `${API_URL}/products/${product.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    }
  )
  if (!response.ok) {
    throw new Error('No se pudo actualizar el producto')
  }
  return await response.json()
}

/*import { products } from '../data/products'

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

}*/