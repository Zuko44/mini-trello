import { createApp } from 'vue'
import { createPersistedState } from 'pinia-plugin-persistence'
import { createPinia } from 'pinia'

import App from './App.vue'
import './styles/base.css'

const pinia = createPinia()
pinia.use(createPersistedState())

const app = createApp(App)

app.use(pinia).mount('#app')
