<script lang="ts" setup>
import type { CreateOrderRequestBody, PayPalButtonsComponentOptions, PayPalScriptOptions } from '@paypal/paypal-js'

const orderConfig: CreateOrderRequestBody = {
  purchase_units: [
    {
      amount: {
        value: '350',
        currency_code: 'EUR',
      },
    },
  ],
  intent: 'CAPTURE',
}

const locale = ref('en_US')
const currency = ref('USD')

const dynamicClientConfig: PayPalScriptOptions = reactive({
  clientId: 'Abg55Ty5D6a9Eihn_ANCzJ6lkpJljfCyody6cFvR6P-YEk_IIqPtFAasOHBTD2vPFXfPMlwtyPEHlRoH',
  currency: currency.value,
  locale: locale.value,
})

const buttons = computed<PayPalButtonsComponentOptions[]>(() => [
  { fundingSource: 'paypal' },
  { fundingSource: 'paypal' },
  { fundingSource: 'paylater' },
])
</script>

<template>
  <div class="nuxt3-paypal-playground">
    <div>
      <h1>Nuxt3 Paypal Checkout</h1>
      <h3>Static config PaypalCheckout component</h3>
      <p>Loads nuxt.config.ts paypal.client & paypal.buttons configs</p>
      <PaypalCheckout
        :order="orderConfig"
      />
    </div>
    <div>
      <h3>Dynamic config PaypalCheckout component</h3>
      <p>Load client, button, order configs as a reactive ref</p>
      <PaypalCheckout
        :order="orderConfig"
        :config="dynamicClientConfig"
        :buttons="buttons"
      />
    </div>
    <div>
      <h3>Static config PaypalButton component</h3>
      <p>Loads nuxt.config.ts paypal.client & paypal.buttons[0] configs</p>
      <PaypalButton
        :order="orderConfig"
      />
    </div>
    <div>
      <h3>Dynamic config PaypalButton component</h3>
      <p>Load client, button, order configs as a reactive ref</p>
      <PaypalButton
        :order="orderConfig"
        :button="buttons[0]"
        :config="dynamicClientConfig"
      />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.nuxt3-paypal-playground {
  padding-top: 5rem;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 2rem;
  background-color: #F5F7DC;
}

.nuxt3-paypal-playground > div {
  border: solid 1px black;
  padding: 2rem;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: #C1BDB3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 1rem;
}

.paypal-client {
  width: 100%;
  max-width: 800px;
  display: flex;
  gap: 2rem;
}
</style>
