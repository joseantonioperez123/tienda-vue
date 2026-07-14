import { categories } from '../data/categories'

export async function getAllCategories() {
  return new Promise(resolve => {
    setTimeout(() => { resolve(categories) }, 1500)
  })
}

/* cuanto tengamos categorías con ID y NOMBRE */
export function getCategoryName(id) {
  const category = categories.find( c => c.id === id )
  return category ? category.nombre : 'Sin categoría'
}