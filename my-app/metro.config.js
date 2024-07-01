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
