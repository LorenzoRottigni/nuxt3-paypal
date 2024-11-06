import type { PayPalNamespace } from '@paypal/paypal-js'

declare module '#app' {
  interface NuxtApp {
    $paypal: PayPalNamespace
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $paypal: PayPalNamespace
  }
}
