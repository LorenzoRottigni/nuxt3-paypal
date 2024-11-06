<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import type {
  OnApproveActions,
  OnApproveData,
  CreateOrderActions,
  CreateOrderData,
  PayPalButtonsComponentOptions,
  OnCancelledActions,
  OnInitActions,
  OnShippingChangeData,
  OnShippingChangeActions,
  PayPalScriptOptions,
  PayPalNamespace,
  CreateOrderRequestBody,
  OrderResponseBody,
} from '@paypal/paypal-js'
import { usePaypal } from '../composables/usePaypal'
import { useNuxtApp, useRuntimeConfig } from '#app'

const props = defineProps<{
  button?: PayPalButtonsComponentOptions
  client?: PayPalScriptOptions
  order: CreateOrderRequestBody
}>()

const emits = defineEmits<{
  (e: 'onCreate', data: CreateOrderData, actions: CreateOrderActions, result: string): void
  (e: 'onApprove', metadata: OnApproveData, actions: OnApproveActions, data?: OrderResponseBody): void
  (e: 'onCancel', metadata: Record<string, unknown>, actions: OnCancelledActions): void
  (e: 'onError', err: Record<string, unknown>): void
  (e: 'onInit', metadata: Record<string, unknown>, actions: OnInitActions): void
  (e: 'onShippingChange', metadata: OnShippingChangeData, actions: OnShippingChangeActions): void
}>()

const { $paypal } = useNuxtApp()

const paypalEl = ref<HTMLDivElement | null>(null)
const paypalClient = ref<PayPalNamespace | null>($paypal)
const paypalButton = computed<PayPalButtonsComponentOptions>(() => props.button || useRuntimeConfig().public.paypal.buttons?.[0])

async function createOrder(data: CreateOrderData, actions: CreateOrderActions) {
  const result = await actions.order.create(props.order)
  emits('onCreate', data, actions, result)
  return result
}

async function onApprove(metadata: OnApproveData, actions: OnApproveActions) {
  const data: OrderResponseBody | undefined = await actions.order?.capture()
  emits('onApprove', metadata, actions, data)
}

async function init() {
  if (props.client) {
    const paypal = await usePaypal(props.client)
    if (!paypal) return
    paypalClient.value = paypal
  }
  if (!paypalClient.value?.Buttons) return
  const blueprint = paypalClient.value.Buttons({
    ...paypalButton.value,
    onCancel: (metadata: Record<string, unknown>, actions: OnCancelledActions) => emits('onCancel', metadata, actions),
    onError: (err: Record<string, unknown>) => emits('onError', err),
    onInit: (metadata: Record<string, unknown>, actions: OnInitActions) => emits('onInit', metadata, actions),
    onShippingChange: async (metadata: OnShippingChangeData, actions: OnShippingChangeActions) => emits('onShippingChange', metadata, actions),
    createOrder,
    onApprove,
  })
  if (!blueprint?.isEligible() || !paypalEl.value) {
    console.warn(`[paypal]: The paypal button ${paypalButton.value.fundingSource} is not eligible to be rendered`)
    return
  }
  await blueprint.render(paypalEl.value)
}

onMounted(() => {
  init()
})
</script>

<template>
  <div
    ref="paypalEl"
    class="paypal-client"
  />
</template>

<style scoped>
</style>
