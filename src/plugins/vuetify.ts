/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify } from 'vuetify'
// import { md3 } from 'vuetify/blueprints'

const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)"); // 是深色

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
const vuetify =  createVuetify({
  // blueprint: md3,
  theme: {
    defaultTheme: isDarkTheme.matches ? 'dark' : 'light'
  }
})

isDarkTheme.addEventListener('change', (e) => {
  vuetify.theme.global.name.value = e.matches ? 'dark' : 'light'
})

export default vuetify