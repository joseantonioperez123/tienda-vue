/*import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
*/


import { createApp } from 'vue'

/*import { createPinia } from 'pinia'*/

import { pinia } from './stores'

import App from './App.vue'
import router from './router'

//import VueGtag from 'vue-gtag'
import { createGtag } from 'vue-gtag'

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

/*app.use(router)

app.mount('#app')*/

app.use(router)

//app.use( VueGtag, { config: { id: 'G-Z9KHNVWC7F' } }, router )
/*app.use(
    createGtag({
        tagId: import.meta.env.VITE_GA_MEASUREMENT_ID,
        vueRouter: router
    })
)*/
//console.log(import.meta.env.VITE_GA_MEASUREMENT_ID)
import analytics from './config/analytics'

app.use(
    createGtag({
        tagId: analytics.measurementId,
        vueRouter: router
    })
)

app.mount('#app')