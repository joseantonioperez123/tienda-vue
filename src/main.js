/*import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
*/


import { createApp } from 'vue'

/*import { createPinia } from 'pinia'*/

import { pinia } from './stores'

import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { useAuthStore } from './stores/auth'

//import firebase from './firebase/firebase'

//console.log('Firebase iniciado:', firebase)

const app = createApp(App)

//app.use(createPinia())

//const auth = useAuthStore()

//const pinia = createPinia()

app.use(pinia)

const auth = useAuthStore(pinia)
await auth.startAuthObserver()

app.use(router)

app.mount('#app')
