import API_URL from './api'

export async function getAllCategories() {
    const response = await fetch(
        `${API_URL}/categories`
    )
    return await response.json()
}

/*export async function getCategoryById(id) {
    const response = await fetch(
        `${API_URL}/categories/${id}`
    )
    return await response.json()
}*/
export async function getCategoryById(id) {
    const response = await fetch(`${API_URL}/categories/${id}`)
    if (!response.ok) {
        throw new Error('Categoría no encontrada')
    }
    return await response.json()
}
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