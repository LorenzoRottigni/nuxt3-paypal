import { defineNuxtModule, addPlugin, createResolver, addComponent, addImports } from '@nuxt/kit'
import type { PayPalButtonsComponentOptions, PayPalScriptOptions } from '@paypal/paypal-js'

export interface ModuleOptions {
  client: PayPalScriptOptions
  buttons: PayPalButtonsComponentOptions[]
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt3-paypal',
    configKey: 'paypal',
  },
  defaults: {
    client: {
      clientId: '',
    },
    buttons: [
      { fundingSource: 'paypal' },
      { fundingSource: 'paylater' },
    ],
    button: { fundingSource: 'paypal' },
  },
  setup(options, nuxt) {
    nuxt.options.runtimeConfig.public.paypal = options
    const resolver = createResolver(import.meta.url)

    if (options.client) addPlugin(resolver.resolve('./runtime/plugin.client'))
    else console.info('[paypal]: Skipping global $paypal injection.')

    addComponent({
      name: 'PaypalCheckout',
      filePath: resolver.resolve('runtime/components/PaypalCheckout.vue'),
    })

    addComponent({
      name: 'PaypalButton',
      filePath: resolver.resolve('runtime/components/PaypalButton.vue'),
    })

    addImports({
      name: 'usePaypal',
      as: 'usePaypal',
      from: resolver.resolve('runtime/composables/usePaypal'),
    })

    /* addTypeTemplate({
      filename: 'types/paypal.d.ts',
      getContents: () => `// Generated by paypal
        interface PaypalNitroRules {
          paypal?: ModuleOptions
        }
        declare module 'nitropack' {
          interface NitroRouteRules extends PaypalNitroRules {}
          interface NitroRouteConfig extends PaypalNitroRules {}
        }
        export {}`,
    }) */
  },
})
