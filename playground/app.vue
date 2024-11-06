<template>
  <div>
    <PaypalCheckout
      :order="{
        purchase_units: [
          {
            amount: {
              value: '350',
              currency_code: 'EUR',
            },
          },
        ],
      }"
    />
    <PaypalCheckout
      :order="{
        purchase_units: [
          {
            amount: {
              value: '350',
              currency_code: 'EUR',
            },
          },
        ],
      }"
      :config="{}"
      :buttons="[]"
    />
    <PaypalButton
      :order="{
        purchase_units: [
          {
            amount: {
              value: '350',
              currency_code: 'EUR',
            },
          },
        ],
      }"
      :button="{ fundingSource: 'paypal' }"
    />
  </div>
</template>

<script setup>
</script>
