/* eslint-disable @typescript-eslint/no-var-requires */
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin')
const { i18n } = require('./next-i18next.config')

const withVanillaExtract = createVanillaExtractPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n,
}

const applyPlugginsToNextConfig = (pluggins, nextConfig) =>
  [...pluggins].reduce((output, applyPlugin) => applyPlugin(output), nextConfig)

module.exports = applyPlugginsToNextConfig([withVanillaExtract], nextConfig)
