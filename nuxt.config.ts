import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { Configuration } from '@nuxt/types'

dotenv.config()
const basePath = (process.env.BASE_PATH || '/').replace(/\/$/g, '')
const screenName = process.env.SCREEN_NAME || ''
let description = process.env.npm_package_description || ''
if (description !== '' && screenName !== '') {
  description = description.replace('設置者', screenName)
}

const nuxtConfig: Configuration = {
  mode: 'universal',

  srcDir: './src',

  router: {
    base: basePath
  },

  env: {
    basePath,
    screenName,
    tweetText: `@${screenName} の名前を変更してあげました！すごい！`
  },

  serverMiddleware: [
    { path: '/api/', handler: bodyParser.json() },
    { path: '/api/emit_new_name', handler: '~/api/emit_new_name.ts' }
  ],
  /*
   ** Headers of the page
   */
  head: {
    title: `@${screenName} - ${process.env.npm_package_name}`,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: description
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#3B8070' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/twitter.stylus'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['@/plugins/composition-api'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://typescript.nuxtjs.org/ja/guide/
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/google-analytics'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** dotenv module configuration
   ** See https://github.com/nuxt-community/dotenv-module
   */
  dotenv: {
    systemvars: true,
    path: '~/../',
    filename: '.env'
  },
  /*
   ** Google Analytics module configuration
   ** https://github.com/nuxt-community/analytics-module
   */
  googleAnalytics: {
    id: 'UA-12301-2'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.devtool = 'inline-cheap-module-source-map'
      }
    }
  }
}

module.exports = nuxtConfig
