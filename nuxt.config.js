import path from 'path';
import Config from './config/app.config';

export default {
  srcDir: 'client/',

  head: {
    meta: [
      { charset: 'utf-8' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/assets/style.scss'
  ],

  loading: {
    color: 'white',
    height: '2px'
  },

  components: true,

  plugins: [
    {src: '~/plugins/axios.js'},
    {src: '~/plugins/hydration.js'},
    {src: '~/plugins/day.js'},
    {src: '~/plugins/validator.js'},
    {src: '~/plugins/image.js'},
    {src: '~/plugins/string.js'},
    {src: '~/plugins/editor.js', mode: 'client'}
  ],

  router: {
    middleware: 'authentic'
  },

  buildModules: [
    '@nuxtjs/vuetify',
    '@nuxtjs/pwa',
  ],

  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    ['@nuxtjs/html-minifier', { log: 'once', logHtml: true }]
  ],

  pwa: {
    meta: {
      theme_color: "#191919",
    },
    manifest: {
      short_name: "Anio",
      name: "Anio",
      display: 'fullscreen',
      background_color: "#ffffff",
      categories: ["laptop", "shop"],
    }
  },

  axios: {
    baseURL: `${Config.baseUrl}/api`,
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    defaultAssets: {
      font: {
        family: 'Quicksand' 
      },
      icons: 'md'
    },
    optionsPath: path.resolve('./config/vuetify.config.js'),
  },

  build: {
    capche: true,
    optimizeCSS: true,
    extractCSS: true
  },

  serverMiddleware: [
    { path: '/api', handler: path.resolve('./api/index.js') },
  ],

  server: {
    port: 80,
    host: '0.0.0.0',
    timing: false
  },

  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        return ['script', 'style', 'font'].includes(type)
      },
    },
  }
}
