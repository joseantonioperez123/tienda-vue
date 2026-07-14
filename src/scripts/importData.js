import db from '../firebase/firestore'

import { collection, addDoc } from 'firebase/firestore'

import {
  doc,
  setDoc
} from 'firebase/firestore'

import { getAllProducts } from '../services/productService'

import { getAllCategories } from '../services/categoryService'

export async function importData() {
  console.log('Importando categorías...')
  const categories = await getAllCategories()
  console.log(categories)
for (const category of categories) {
  const { id, ...data } = category
  await setDoc(
    doc(db, 'categories', String(id)),
    data
  )
}


/*  for (const category of categories) {
    const { id, ...data } = category
    await addDoc(
      collection(db, 'categories'),
      data
    )
  }*/
  console.log('Categorías importadas.')

  console.log('Importando productos...')
  const products = await getAllProducts()
for (const product of products) {
  const { id, ...data } = product
  await setDoc(
    doc(db, 'products', String(id)),
    data
  )
}


/*  for (const product of products) {
    const { id, ...data } = product
    await addDoc(
      collection(db, 'products'),
      data
    )
  }*/
  console.log('Productos importados.')

}