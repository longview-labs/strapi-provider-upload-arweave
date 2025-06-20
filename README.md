<div align="center" style="max-width: 10rem; margin: 0 auto">
  <img style="width: 150px; height: auto;" src="https://arweave.net/eKEfT22izWGLYDGnRrkfEuizBa0A2esPF8HVKU0sq5Y" alt="Logo - Strapi Provider Upload - Arweave" />
</div>
<div align="center">
  <h1>
    <span style="display: block">Strapi Provider Upload</span>
    <span style="display: block; font-size: 1.75rem">Arweave</span>
  </h1>
  <p>Arweave Provider for Strapi Upload</p>
  <a href="https://www.npmjs.org/package/@longviewlabs/strapi-provider-upload-arweave">
    <img alt="NPM version" src="https://img.shields.io/npm/v/@longviewlabs/strapi-provider-upload-arweave.svg">
  </a>
  <a href="https://www.npmjs.org/package/@longviewlabs/strapi-provider-upload-arweave">
    <img src="https://img.shields.io/npm/dm/@longviewlabs/strapi-provider-upload-arweave.svg" alt="Monthly download on NPM" />
  </a>
</div>

## 📋 Table of Contents

- [📋 Table of Contents](#-table-of-contents)
- [📦 Installation](#-installation)
- [❓ What is Arweave?](#-what-is-arweave)
- [💳 Get your first Arweave Wallet](#-get-your-first-arweave-wallet)
- [💾 Downloading the wallet keyfile](#-downloading-the-wallet-keyfile)
- [🔒 Setting up Strapi Configuration](#-setting-up-strapi-configuration)
- [🔒 Setting up `strapi::security` middlewares to avoid CSP blocked URLs](#-setting-up-strapisecurity-middlewares-to-avoid-csp-blocked-urls)
- [📝 Provider configuration options](#-provider-configuration-options)
  - [`arweaveWallet`](#arweavewallet)
  - [`gateway`](#gateway)
  - [`getContentType`](#getcontenttype)
- [❓ FAQ](#-faq)
  - [How to pay for uploads](#how-to-pay-for-uploads)
- [🔗 Links](#-links)
- [💬 Community support](#-community-support)
- [📄 License](#-license)

## 📦 Installation

With `npm`:
```
npm install @longviewlabs/strapi-provider-upload-arweave --save
```

## ❓ What is Arweave?

[Arweave](https://arweave.org) is a decentralized network designed for long-term data storage. 

Users pay upfront for uploads based on a calculated storage cost, and Arweave provides guarantees of data replication and storage for a minimum of 200 years. Uploads are immutable and can't be removed. 

Data stored on Arweave can be accessed just like any other data using a modern web browser. Take a look at this JSON file stored on Arweave [here](https://today_arweave.ar.io).

These properties make Arweave an ideal storage option for storing Strapi media files.

## 💳 Get your first Arweave Wallet

Data uploads on Arweave cost AR tokens ($AR). You can get an approximation of your data storage costs using this fee calculator [here](https://ar-fees.arweave.dev/).

To subsidize and handle data uploads to Arweave, you will need an Arweave wallet. To get started, install [Wander](https://wander.app) — you can download either the browser extension or mobile application, and follow the steps to set up a new wallet.

## 💾 Downloading the wallet keyfile

Once you've set up a wallet, you will need to download a keyfile. 

While Wander acts as a GUI to perform data uploads, the keyfile can be used in a more API-like fashion to help facilitate data uploads from within programs such as Strapi.

To download your keyfile:
1. Open Wander.
2. Click the "Menu" button in the bottom-left corner (on the browser extension).
3. Click "Manage Accounts".
4. Select your account.
5. Click "Export Keyfile" and enter your password.
6. Click "Export".

A modal should appear to download your keyfile, which ends in `.json`. This should be stored securely.

Here's the content of a JWK file, which describes an RSA-PSS key-pair. Note that the values are abbreviated:

```json
{
  "d": "cgeeu66FlfX9wVgZr5AXKlw4MxTlxSuSwMtTR7mqcnoE...",
  "dp": "DezP9yvB13s9edjhYz6Dl...",
  "dq": "SzAT5DbV7eYOZbBkkh20D...",
  "e": "AQAB",
  "ext": true,
  "kty": "RSA",
  "n": "o4FU6y61V1cBLChYgF9O37S4ftUy4newYWLApz4CXlK8...",
  "p": "5ht9nFGnpfW76CPW9IEFlw...",
  "q": "tedJwzjrsrvk7o1-KELQxw...",
  "qi": "zhL9fXSPljaVZ0WYhFGPU..."
}
```

> [!WARNING]
> Anyone with your keyfile can control all of the assets within an Arweave wallet — make sure to keep it secure and private (i.e., do not commit it to GitHub repos or expose it publicly, etc.).

## 🔒 Setting up Strapi Configuration

Once you have downloaded your Arweave wallet keyfile, copy its content and set it as the `ARWEAVE_WALLET` environment variable in your Strapi application. After that, edit the `./config/plugins.js` file to configure the upload provider.

```js
module.exports = ({ env }) => ({
  // ...
  upload: {
    config: {
      provider: 'arweave',
      providerOptions: {
        arweaveWallet: env.json('ARWEAVE_WALLET'), // Content of the Arweave wallet JWK
        gateway: env('ARWEAVE_GATEWAY', 'https://arweave.net'), // Optional: Arweave Gateway URL, default is 'https://arweave.net'
      },
    },
  },
  // ...
});
```

## 🔒 Setting up `strapi::security` middlewares to avoid CSP blocked URLs

Edit `./config/middlewares.js`:
- In the fields `img-src` and `media-src`, add the Arweave Gateway URL.

```js
module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'arweave.net', '*.arweave.net'],
          'media-src': ["'self'", 'data:', 'blob:', 'arweave.net', '*.arweave.net'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::favicon',
  'strapi::public',
];
```

## 📝 Provider configuration options

The following options are available to configure the Arweave upload provider in Strapi:

### `arweaveWallet`

The content of an Arweave wallet JWK (JSON Web Key) file. This is used to sign transactions and upload files to Arweave.

### `gateway`

The URL of the Arweave gateway to use for accessing files.
This is optional, and if not provided, the default gateway `https://arweave.net` will be used.
- Default value: `https://arweave.net`
- Optional

### `getContentType`

A function that is executed to get the content type for a file when it is uploaded. 

When no function is provided, the following content type is used:

```ts
file.mime
```

- Default value: `undefined`
- Optional

Example:

```ts
  getContentType: (file: File) => file.mime;
```

## ❓ FAQ

### How to pay for uploads

Uploads to Arweave through this Strapi provider are facilitated by ArDrive's [Turbo](https://docs.ardrive.io/docs/turbo/what-is-turbo.html) upload service. ArDrive Turbo bundles data uploads together and submits them to Arweave.

ArDrive Turbo uses Turbo Credits to pay for uploads. You can top up your account by logging in to [Turbo Topup](https://turbo-topup.com/) with your Wander wallet, or use the CLI tool. There are more detailed instructions [here](https://docs.ardrive.io/docs/turbo/turbo-sdk/#top-up).

> [!TIP]
> All uploads under 100KB are subsidised, meaning they are free. However, you will need to top up your account to pay for larger uploads.

## 🔗 Links

- [Strapi website](http://strapi.io/)
- [Strapi community on Slack](http://slack.strapi.io)
- [Strapi news on Twitter](https://twitter.com/strapijs)

## 💬 Community support

## 📄 License

See the [MIT License](LICENSE) file for licensing information.
