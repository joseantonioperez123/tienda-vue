import API_URL from './api'

import db from '../firebase/firestore'

import { collection, getDocs, doc, getDoc } from 'firebase/firestore'

export async function getAllCategories() {
  const snapshot = await getDocs( collection(db, 'categories') )
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

export async function getCategoryById(id) {
  const snapshot = await getDoc( doc(db, 'categories', String(id)) )
  if (!snapshot.exists()) {
    throw new Error('Categoría no encontrada')
  }
  return { id: snapshot.id, ...snapshot.data() }
}

/* desde JSON server */
/*export async function getAllCategories() {
    const response = await fetch(
        `${API_URL}/categories`
    )
    return await response.json()
}*/

/*export async function getCategoryById(id) {
    const response = await fetch(
        `${API_URL}/categories/${id}`
    )
    return await response.json()
}*/
/*export async function getCategoryById(id) {
    const response = await fetch(`${API_URL}/categories/${id}`)
    if (!response.ok) {
        throw new Error('Categoría no encontrada')
    }
    return await response.json()
}*/
/*import { categories } from '../data/categories'

export async function getAllCategories() {
  return new Promise(resolve => {
    setTimeout(() => { resolve(categories) }, 1500)
  })
}
*/
/* cuanto tengamos categorías con ID y NOMBRE */
/* ya está en el getter de catalog.js */
/*export function getCategoryName(id) {
  const category = categories.find( c => c.id === id )
  return category ? category.nombre : 'Sin categoría'
}*/