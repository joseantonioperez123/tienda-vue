import { defineStore } from 'pinia'

/*import {
  register,
  login,
  logout,
  getCurrentUser
} from '../firebase/auth'*/

import {
  register as firebaseRegister,
  login as firebaseLogin,
  logout as firebaseLogout,
  getCurrentUser,
  observeAuth
} from '../firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false
  }),
  actions: {
    async register(email, password) {
      this.loading = true
      try {
        this.user = await firebaseRegister(email, password)
      } finally {
        this.loading = false
      }
    },
    async login(email, password) {
      this.loading = true
      try {
        this.user = await firebaseLogin(email, password)
      } finally {
        this.loading = false
      }
    },
    async logout() {
      await firebaseLogout()
      this.user = null
    },
    loadUser() {
      this.user = getCurrentUser()
    },
    startAuthObserver() {
        return new Promise((resolve) => {
            let initialized = false
            observeAuth(user => {
                this.user = user
                this.authReady = true
                if (!initialized) {
                    initialized = true
                    resolve()
                }
            })
        })
    }
    /*startAuthObserver() {
        return new Promise((resolve) => {
            observeAuth(user => {
                this.user = user
                this.authReady = true
                resolve()
            })
        })
    }*/
/*    startAuthObserver() {
      observeAuth(user => {
        this.user = user
      })
    }*/
  },
/*  getters: {
    isAuthenticated: state => state.user !== null
  }*/
  getters: {
  isAuthenticated: state => !!state.user,

  isAdmin: state =>
    state.user?.email === 'usuario@ejemplo.es'
}
})