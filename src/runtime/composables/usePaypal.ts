import { loadScript, type PayPalNamespace, type PayPalScriptOptions } from '@paypal/paypal-js'
import { useRuntimeConfig } from 'nuxt/app'
import type { ModuleOptions } from '../../module'

export const usePaypal = async (_options?: PayPalScriptOptions): Promise<PayPalNamespace | null> => {
  const { options } = useRuntimeConfig().public.paypal as ModuleOptions
  if (!(_options || options)?.clientId) {
    console.error('[paypal]: Paypal Client ID not provided... skipping $paypal injection.')
    return null
  }
  return await loadScript((_options || options))
}
