/* eslint-disable no-undef */
import { createApp, ref } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './i18n.js'
import App from './App.vue'
import FieldAccordion from '@/components/elements/FieldAccordion.vue'
import DropdownMenu from '@/components/elements/DropdownMenu.vue'
import ModalWindow from '@/components/elements/ModalWindow.vue'
import ColorField from '@/components/forms/ColorField.vue'
import ToggleField from '@/components/forms/ToggleField.vue'
import NumberField from '@/components/forms/NumberField.vue'
import AutocompleteField from '@/components/forms/AutocompleteField.vue'
import SizeAndPositionField from '@/components/forms/SizeAndPositionField.vue'
import WidgetElementField from '@/components/forms/WidgetElementField.vue'
import WidgetFontField from '@/components/forms/WidgetFontField.vue'
import WidgetBoxField from '@/components/forms/WidgetBoxField.vue'
import PremiumLabel from '@/components/elements/PremiumLabel.vue'
import FontLink from '@/components/elements/FontLink.vue'
import PageHeading from '@/components/elements/PageHeading.vue'
import RequestPermissionModal from '@/components/elements/RequestPermissionModal.vue'
import QuickLinksNode from '@/components/widgets/QuickLinksNode.vue'
import { getStorage } from '@/store.js'

import './assets/main.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

// Run quick user check based on storage for a faster load
// Prevents app from loading till quick check is done.
async function init() {
  const app = createApp(App)
  const userInfo = ref({ paid: false })

  let user = await getStorage('extensionpay_user', 'sync')
  if (Object.keys(user).length > 0) {
    userInfo.value = { ...user.extensionpay_user }
  }

  app.provide('user', userInfo)
  app.provide('updateUser', (u) => {
    userInfo.value = { ...u }
  })
  // eslint-disable-next-line vue/multi-word-component-names
  app.component('Fa', FontAwesomeIcon)
  app.use(i18n)
  app.component('FieldAccordion', FieldAccordion)
  app.component('DropdownMenu', DropdownMenu)
  app.component('ModalWindow', ModalWindow)
  app.component('ColorField', ColorField)
  app.component('ToggleField', ToggleField)
  app.component('NumberField', NumberField)
  app.component('AutocompleteField', AutocompleteField)
  app.component('SizeAndPositionField', SizeAndPositionField)
  app.component('WidgetElementField', WidgetElementField)
  app.component('WidgetFontField', WidgetFontField)
  app.component('WidgetBoxField', WidgetBoxField)
  app.component('PremiumLabel', PremiumLabel)
  app.component('FontLink', FontLink)
  app.component('PageHeading', PageHeading)
  app.component('RequestPermissionModal', RequestPermissionModal)
  app.component('QuickLinksNode', QuickLinksNode)
  app.use(createPinia())

  app.mount('#app')
}
init()
