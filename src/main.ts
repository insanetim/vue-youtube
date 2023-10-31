import { createApp, type App as AppType } from 'vue'
import { createMetaManager } from 'vue-meta'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { createPinia } from 'pinia'
import { PiniaLogger } from 'pinia-logger'
// @ts-ignore:next-line
import Paginate from 'vuejs-paginate-next'

import App from './App.vue'
import router from './router'
import messagePlugin from './plugins/message'
import dropdown from './directives/dropdown'
import select from './directives/select'
import tooltip from './directives/tooltip'
import AppLoader from './components/app/AppLoader.vue'

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './assets/index.css'

initializeApp({
  apiKey: 'AIzaSyC2DiliMxVbxN5OsYUwc5d9Pos7A2yH9mw',
  appId: '1:207435020724:web:96e6c441679d83cc6adae1',
  authDomain: 'vue-crm-93feb.firebaseapp.com',
  databaseURL:
    'https://vue-crm-93feb-default-rtdb.europe-west1.firebasedatabase.app/',
  messagingSenderId: '207435020724',
  projectId: 'vue-crm-93feb',
  storageBucket: 'vue-crm-93feb.appspot.com'
})

const pinia = createPinia()
pinia.use(
  PiniaLogger({
    disabled: import.meta.env.MODE === 'production',
    expanded: false
  })
)

let app: AppType
const auth = getAuth()
onAuthStateChanged(auth, async () => {
  if (!app) {
    app = createApp(App)
    app.use(pinia)
    app.use(router)
    app.use(createMetaManager())
    app.use(messagePlugin)
    app.directive('dropdown', dropdown)
    app.directive('select', select)
    app.directive('tooltip', tooltip)
    app.component('AppLoader', AppLoader)
    app.component('AppPagination', Paginate)
    await router.isReady()
    app.mount('#app')
  }
})