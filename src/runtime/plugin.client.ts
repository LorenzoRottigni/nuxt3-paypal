import type { PayPalNamespace } from '@paypal/paypal-js'
import { usePaypal } from './composables/usePaypal.js'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin<{
  paypal: PayPalNamespace
}>(async (_nuxtApp) => {
  try {
    const paypal = await usePaypal()
    if (!paypal) {
      console.error('[paypal]: An error occurred while trying to load the Paypal client... skipping $paypal injection.')
      return {}
    }
    console.info('[paypal]: Paypal client injected!')
    return { provide: { paypal } }
  }
  catch (e) {
    console.error('[paypal]:', e)
    return {}
  }
})
