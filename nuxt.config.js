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

  components: true,

  plugins: [
    {src: '~/plugins/axios.js'},
    {src: '~/plugins/day.js'},
    {src: '~/plugins/validator.js'},
    {src: '~/plugins/image.js', mode: 'client'},
    {src: '~/plugins/editor.js', mode: 'client'}
  ],

  router: {
    middleware: 'authentic'
  },

  buildModules: [
    '@nuxtjs/vuetify'
  ],

  modules: [
    'cookie-universal-nuxt',
    '@nuxtjs/axios',
  ],

  axios: {
    baseURL: `${Config.baseUrl}/api`,
  },

  vuetify: {
    //customVariables: ['~/assets/variables.scss'],
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
  },

  serverMiddleware: [
    { path: '/api', handler: path.resolve('./api/index.js') },
  ]
}
