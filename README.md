# AMQPClient + Expo Minimal Example

## Incentive

The `@cloudamqp/amqp-client` library works well with web-based JavaScript Apps due to its WebSocket connection, allowing JS developers to use AMQP in a non-Node environment.

However, using `@cloudamqp/amqp-client` in a React Native (Expo) project requires additional modules to be added, as React Native does not implement certain libraries that web-based technologies rely on. These extra modules ensure that `@cloudamqp/amqp-client` functions as intended.

## How To Run

1. Clone the repository and navigate to the project directory:
    ```
    git clone git@github.com:ShuzhaoFeng/amqp-client-expo-example.git
    cd my-app
    ```

2. Install the project dependencies:
    ```
    npm install
    ```

3. go to `credentials.json` and replace the variables with your credentials.

4. Start the Expo development server:
    ```
    npm start
    ```

5. Open the Expo Go app on your mobile device and scan the QR code displayed in the terminal or in the Expo Dev Tools.

6. The app should now be running on your device.

## I don't want to look at the code, give me the conclusions

React Native projects are missing the `net` and `tls` modules that `@cloudamqp/amqp-client` relies on, but which `react-native-tcp-socket` implements.

Go to your project root and install the library:

```
npm i react-native-tcp-socket
```

Then, override these modules in your `metro.config.js`:

```js
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

config.resolver.extraNodeModules["net"] = require.resolve(
  "react-native-tcp-socket"
);
config.resolver.extraNodeModules["tls"] = require.resolve(
  "react-native-tcp-socket"
);

module.exports = config;
```

In addition, the library requires a textdecoder, which we'll polyfill from the home page:

```js
import TextEncodingPolyfill from "text-encoding";

export default function App() {
  Object.assign(global, {
    TextEncoder: TextEncodingPolyfill.TextEncoder,
    TextDecoder: TextEncodingPolyfill.TextDecoder,
  });

  return // ...
```

Any textdecoder library will work in theory, I chose `text-encoding` simply because it has TypeScript support.
