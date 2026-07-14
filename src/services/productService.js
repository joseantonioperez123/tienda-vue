import db from '../firebase/firestore'

import { collection, doc, getDocs, getDoc, setDoc, deleteDoc } from 'firebase/firestore'

import { uploadImage, replaceImage, deleteImage } from './storageService'

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
    const snapshot = await getDocs( collection(db, 'products') )
  return snapshot.docs.map(document => ({
    ...document.data(),
    id: document.id
  }))
  //return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getProductById(id) {
  const snapshot = await getDoc( doc(db, 'products', String(id)) )
  if (!snapshot.exists()) {
    throw new Error('Producto no encontrado')
  }
  return { id: snapshot.id, ...snapshot.data() }
}

/*export async function createProduct(product) {
  const id = crypto.randomUUID()
  await setDoc( doc(db, 'products', id), { ...product } )
  return { id, ...product }
}*/

/* para que no añada id: null, ya que id lo aporta firestore */
export async function createProduct(product) {
  const id = crypto.randomUUID()
  if (product.imageFile) {
    product.imagen = await uploadImage(product.imageFile)
  }

  const { id: _, imageFile, ...data } = product  // extrae id y asigna el resto de los campos
  await setDoc( doc(db, 'products', id), data )
  return { id, ...data }
}

export async function updateProduct(product) {
  if (product.imageFile) {
    product.imagen = await replaceImage( product.imagen, product.imageFile )
  }
  const { id,imageFile, ...data } = product
  await setDoc( doc(db, 'products', id), data )
  return { id, ...data }
}

/*export async function updateProduct(product) {
  await setDoc( doc(db, 'products', product.id),
    {
      nombre: product.nombre,
      descripcion: product.descripcion,
      precio: product.precio,
      imagen: product.imagen,
      categoryId: product.categoryId
    }
  )
  return product
}*/

/*export async function deleteProduct(id) {
  await deleteDoc( doc(db, 'products', String(id)) )
}*/

/* pasamos product en lugar de id porque necesitamos la imagen
  para borrarla del bucket de Supabase */

export async function deleteProduct(product) {
  console.log('3. productService', product)
  console.log('Producto recibido para borrar:')
console.log(product)
  if (product.imagen) {
    console.log('Voy a borrar la imagen')
    try {
      await deleteImage(product.imagen)
    } catch (error) {
      console.log('No se pudo eliminar la imagen:',error)
    }
  }
  await deleteDoc( doc(db, 'products', product.id) )
}

/* esto era con servidor JSON 
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
}*/

/*export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    throw new Error('No se pudo eliminar el producto')
  }
  return true
}*/

/*export async function createProduct(product) {

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
}*/

/*export async function updateProduct(product) {
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
}*/

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