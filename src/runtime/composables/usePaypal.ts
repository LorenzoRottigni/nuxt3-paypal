import { loadScript, type PayPalNamespace, type PayPalScriptOptions } from '@paypal/paypal-js'
import { useRuntimeConfig } from 'nuxt/app'

export const usePaypal = async (clientOptions?: PayPalScriptOptions): Promise<PayPalNamespace | null> => {
  const { client } = useRuntimeConfig().public.paypal
  if (!(clientOptions || client)?.clientId) {
    console.error('[paypal]: Paypal Client ID not provided... skipping $paypal injection.')
    return null
  }
  return await loadScript((clientOptions || client))
}
