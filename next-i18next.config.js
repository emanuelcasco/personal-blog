// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  i18n: {
    defaultLocale: 'en-US',
    locales: ['en-US', 'es-ES'],
    localePath: path.resolve('./i18n/locales'),
  },
}
