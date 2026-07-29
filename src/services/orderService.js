import {
  addDoc,
  updateDoc,
  doc,
  collection
} from 'firebase/firestore'

import db from '../firebase/firestore'

export async function createOrder(order) {

  const docRef = await addDoc(
    collection(db, 'orders'),
    order
  )

  return docRef.id

}

export async function updateOrder(orderId, data) {

  await updateDoc(
    doc(db, 'orders', orderId),
    data
  )

}

//getOrder(orderId)      // la usaremos más adelante