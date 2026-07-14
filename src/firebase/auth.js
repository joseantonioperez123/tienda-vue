// src/firebase/auth.js

/*import { getAuth } from 'firebase/auth'

import app from './firebase'

const auth = getAuth(app)

export default auth*/


// src/firebase/auth.js

/*import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'*/

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import app from './firebase'

const auth = getAuth(app)

/**
 * Registrar un nuevo usuario
 */
export async function register(email, password) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )

  return credential.user
}

/**
 * Iniciar sesión
 */
export async function login(email, password) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  )

  return credential.user
}

/**
 * Cerrar sesión
 */
export async function logout() {
  await signOut(auth)
}

/**
 * Usuario autenticado
 */
export function getCurrentUser() {
  return auth.currentUser
}

/**
 * Escucha los cambios de autenticación
 */
export function observeAuth(callback) {
  return onAuthStateChanged(auth, callback)
}

export default auth