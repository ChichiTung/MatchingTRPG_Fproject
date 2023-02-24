/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'

// bootstrap
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap'

(async () => {
  const app = createApp(App)
  //  可以在 <template> 使用 window 的屬性~~
  app.config.globalProperties.window = window

  await registerPlugins(app)

  app.mount('#app')
})()
