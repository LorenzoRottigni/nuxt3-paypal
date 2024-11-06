# nuxt3-paypal

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A simple wrapper of the official @paypal/paypal-js package for Nuxt3.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
<!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt3-paypal?file=playground%2Fapp.vue) -->
<!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->
- 🌐 Effortless integration with PayPal
- 🛠️ Flexible client configuration
- 💸 Customizable PayPal Buttons and Checkout components

## Quick Setup

### Nuxi
Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt3-paypal
```

### Packet Managers

```bash
# npm
npm install nuxt3-paypal

# yarn
yarn add nuxt3-paypal

# pnpm
pnpm add nuxt3-paypal
```

nuxt.config.ts:
```typescript
{
  modules: ['nuxt3-paypal'],
  paypal: {}
}
```

## Getting Started

### Retrieving the Paypal Client

```typescript
# using nuxt.config.ts
const paypal = await usePaypal()
# using inline config
const paypal = await usePaypal(options)

# using nuxt3-paypal injected nuxt plugin (pre-instantiated)
const { $paypal } = useNuxtApp()
```

### Displaying Paypal Elements

Inline setup with reactive runtime configuration:
```
<template>
<PaypalCheckout
  :client="clientConfig"
  :order="orderConfig"
  :buttons="buttonConfig[]"
/>
<PaypalButton
  :client="clientConfig"
  :button="buttonConfig"
  :order="orderConfig"
/>
</template>
```

Pre-configured setup using nuxt.config.ts
```
<template>
<PaypalCheckout :order="orderConfig" />
<PaypalButton :order="orderConfig" />
</template>
```

## Configuration

nuxt3-paypal wraps three main configuration types that can be used in both nuxt.config.ts and as props in components:

### Client configuration (@paypal/paypal-js type `PayPalScriptOptions`)

Configuration for the paypal.loadScript utility, which represents the PayPal client responsible for rendering PayPal elements.

If you don’t need to modify configuration values at runtime (e.g., localization settings), it’s recommended to set up the client within nuxt.config.ts. When client configuration is specified in nuxt.config.ts, nuxt3-paypal loads a client-only plugin, injecting the configured PayPal client instance (nuxtApp.$paypal). Since @paypal/paypal-js interacts directly with the DOM, this plugin is not compatible with SSR.

Alternatively, you can use nuxt3-paypal without pre-defined configuration and pass client settings as props directly to components. This allows you to leverage reactive references to dynamically adjust client configurations at runtime, such as the current locale or currency settings.

```typescript
interface PayPalScriptOptions {
    buyerCountry?: string;
    clientId: string;
    commit?: boolean;
    components?: string[] | string;
    currency?: string;
    debug?: boolean | string;
    disableFunding?: string[] | string;
    enableFunding?: string[] | string;
    integrationDate?: string;
    intent?: string;
    locale?: string;
    merchantId?: string[] | string;
    vault?: boolean | string;
    dataClientToken?: string;
    dataCspNonce?: string;
    dataClientMetadataId?: string;
    dataJsSdkLibrary?: string;
    dataMerchantId?: string[] | string;
    dataNamespace?: string;
    dataPageType?: string;
    dataPartnerAttributionId?: string;
    dataSdkIntegrationSource?: string;
    dataUid?: string;
    dataUserIdToken?: string;
    crossorigin?: "anonymous" | "use-credentials";
    environment?: "production" | "sandbox";
    sdkBaseUrl?: string;
}
```

### Button configuration (@paypal/paypal-js type `PayPalButtonsComponentOptions`)

Configuration for the PayPal button elements, which are rendered through the specified PayPal client.

You can define a default button configuration in nuxt.config.ts, which will apply to the PaypalCheckout component. If using the standalone PaypalButton component, you’ll need to provide a scoped button configuration specific to that component.

```typescript
interface PayPalButtonsComponentOptions {
  /**
   * Called on button click. Often used for [Braintree vault integrations](https://developers.braintreepayments.com/guides/paypal/vault/javascript/v3).
   */
  createBillingAgreement?: PayPalButtonCreateBillingAgreement;
  /**
   * Called on button click to set up a one-time payment. [createOrder docs](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/#createorder).
   */
  createOrder?: PayPalButtonCreateOrder;
  /**
   * Called on button click to set up a recurring payment. [createSubscription docs](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/#createsubscription).
   */
  createSubscription?: PayPalButtonCreateSubscription;
  /**
   * Save payment methods to charge payers after a set amount of time. For example, you can offer a free trial and charge payers after the trial expires. Payers don't need to be present when charged. No checkout required.
   * https://developer.paypal.com/docs/checkout/save-payment-methods/purchase-later/js-sdk/paypal/#link-clientsidecodesample
   */
  createVaultSetupToken?: PayPalButtonCreateVaultSetupToken;
  /**
   * Used for defining a standalone button.
   * Learn more about [configuring the funding source for standalone buttons](https://developer.paypal.com/docs/business/checkout/configure-payments/standalone-buttons/#4-funding-sources).
   */
  fundingSource?: PayPalButtonFundingSource;
  /**
   * Called when finalizing the transaction. Often used to inform the buyer that the transaction is complete. [onApprove docs](https://developer.paypal.com/docs/business/javascript-sdk/javascript-sdk-reference/#onapprove).
   */
  onApprove?: PayPalButtonOnApprove;
  /**
   * Called when the buyer cancels the transaction.
   * Often used to show the buyer a [cancellation page](https://developer.paypal.com/docs/business/checkout/add-capabilities/buyer-experience/#3-show-cancellation-page).
   */
  onCancel?: PayPalButtonOnCancel;
  /**
   * Called when the button is clicked. Often used for [validation](https://developer.paypal.com/docs/checkout/integration-features/validation/).
   */
  onClick?: PayPalButtonOnClick;
  /**
   * Catch all for errors preventing buyer checkout.
   * Often used to show the buyer an [error page](https://developer.paypal.com/docs/checkout/integration-features/handle-errors/).
   */
  onError?: PayPalButtonOnError;
  /**
   * Called when the buttons are initialized. The component is initialized after the iframe has successfully loaded.
   */
  onInit?: PayPalButtonOnInit;
  /**
   * Called when the buyer changes their shipping address on PayPal.
   * @deprecated Use `onShippingAddressChange` or `onShippingOptionsChange` instead.
   */
  onShippingChange?: PayPalButtonOnShippingChange;
  /**
   * Called when the buyer selects a new shipping option on PayPal.
   */
  onShippingOptionsChange?: PayPalButtonOnShippingOptionsChange;
  /**
   * Called when the buyer updates their shipping address on PayPal.
   */
  onShippingAddressChange?: PayPalButtonOnShippingAddressChange;
  /**
   * [Styling options](https://developer.paypal.com/docs/business/checkout/reference/style-guide/#customize-the-payment-buttons) for customizing the button appearance.
   */
  style?: PayPalButtonStyle;
  /**
   * Used for displaying only vaultable buttons.
   */
  displayOnly?: PayPalButtonDisplayOnly;
  /**
   * [Message options](https://developer.paypal.com/sdk/js/reference/#message) for customizing the message appearance and limited content control.
   */
  message?: PayPalButtonMessage;
}
```

### Order configuration (@paypal/paypal-js type `CreateOrderRequestBody`)

Configuration for the Paypal [createOrder REST API](https://developer.paypal.com/docs/api/orders/v2/#orders-create-request-body).
It's the only required prop from all the nuxt3-paypal provided components since requires current order data.

```typescript
interface CreateOrderRequestBody {
  intent: "CAPTURE" | "AUTHORIZE"
  purchaseUnits: Array<{
      /** @description The API caller-provided external ID for the purchase unit. Required for multiple purchase units when you must update the order through `PATCH`. If you omit this value and the order contains only one purchase unit, PayPal sets this value to `default`. */
      reference_id?: string;
      /** @description The total order amount with an optional breakdown that provides details, such as the total item amount, total tax amount, shipping, handling, insurance, and discounts, if any.<br/>If you specify `amount.breakdown`, the amount equals `item_total` plus `tax_total` plus `shipping` plus `handling` plus `insurance` minus `shipping_discount` minus discount.<br/>The amount must be a positive number. The `amount.value` field supports up to 15 digits preceding the decimal. For a list of supported currencies, decimal precision, and maximum charge amount, see the PayPal REST APIs <a href="https://developer.paypal.com/api/rest/reference/currency-codes/">Currency Codes</a>. */
      amount: components["schemas"]["amount_with_breakdown"];
      /** @description The merchant who receives payment for this transaction. */
      payee?: components["schemas"]["payee"];
      payment_instruction?: components["schemas"]["payment_instruction"];
      /** @description The purchase description. The maximum length of the character is dependent on the type of characters used. The character length is specified assuming a US ASCII character. Depending on type of character; (e.g. accented character, Japanese characters) the number of characters that that can be specified as input might not equal the permissible max length. */
      description?: string;
      /** @description The API caller-provided external ID. Used to reconcile client transactions with PayPal transactions. Appears in transaction and settlement reports but is not visible to the payer. */
      custom_id?: string;
      /** @description The API caller-provided external invoice number for this order. Appears in both the payer's transaction history and the emails that the payer receives. */
      invoice_id?: string;
      /** @description The soft descriptor is the dynamic text used to construct the statement descriptor that appears on a payer's card statement.<br><br>If an Order is paid using the "PayPal Wallet", the statement descriptor will appear in following format on the payer's card statement: <code><var>PAYPAL_prefix</var>+(space)+<var>merchant_descriptor</var>+(space)+ <var>soft_descriptor</var></code><blockquote><strong>Note:</strong> The merchant descriptor is the descriptor of the merchant’s payment receiving preferences which can be seen by logging into the merchant account https://www.sandbox.paypal.com/businessprofile/settings/info/edit</blockquote>The <code>PAYPAL</code> prefix uses 8 characters. Only the first 22 characters will be displayed in the statement. <br>For example, if:<ul><li>The PayPal prefix toggle is <code>PAYPAL *</code>.</li><li>The merchant descriptor in the profile is <code>Janes Gift</code>.</li><li>The soft descriptor is <code>800-123-1234</code>.</li></ul>Then, the statement descriptor on the card is <code>PAYPAL * Janes Gift 80</code>. */
      soft_descriptor?: string;
      /** @description An array of items that the customer purchases from the merchant. */
      items?: components["schemas"]["item"][];
      /** @description The name and address of the person to whom to ship the items. */
      shipping?: components["schemas"]["shipping_detail"];
      /** @description Contains Supplementary Data. */
      supplementary_data?: components["schemas"]["supplementary_data"];
  }>
}
```

nuxt3-paypal components accept all these configurations as props (order, client, button).

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>


<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt3-paypal/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt3-paypal

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt3-paypal.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npm.chart.dev/nuxt3-paypal

[license-src]: https://img.shields.io/npm/l/nuxt3-paypal.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt3-paypal

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
