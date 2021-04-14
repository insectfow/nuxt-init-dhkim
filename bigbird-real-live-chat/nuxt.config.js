const features = [
  "Object.values",
  "Object.keys",
  "fetch",
  "Object.entries",
  "IntersectionObserver",
  "Array.prototype.forEach",
  "Number.isNaN",
  "Object.is",
  "Math.trunc",
  "Math.sign",
  "Number.isInteger",
  "Array.prototype.findIndex",
  "Array.prototype.find",
  "es2017",
  "es2016",
  "es2015"

].join("%2C");

let pathValue = '';
if (process.env.NODE_ENV === 'development') pathValue = '.env.development';
if (process.env.NODE_ENV === 'stage') pathValue = '.env.stage';
if (process.env.NODE_ENV === 'production') pathValue = '.env.production';

// noinspection NpmUsedModulesInstalled
require('dotenv').config({ path: pathValue });


export default {
  ssr: false,
  target: 'server',
  mode: 'spa',
  head: {
    title: 'bigbird-real-live-chat',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
        src: `https://polyfill.io/v3/polyfill.min.js?features=${features}&flags=gated`,
        body: true,
      },


    ],
  },

  css: ["@/assets/scss/config.scss", "@/assets/scss/common.scss"],

  router: {
    linkActiveClass: "active",
    linkExactActiveClass: "on",
  },

  plugins: ["@/plugins/chatting.js", "@/plugins/firebase.js", '@/plugins/moment.js', '@/plugins/global.js'],

  components: true,

  buildModules: [
    '@nuxtjs/moment'
  ],

  moment: {
    defaultTimezone: 'Asia/Seoul'
  },


  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/axios'
  ],

  axios: {},

  env: {
    envData: process.env
  },

  build: {
    extend(config, ctx) {
      if (ctx.idDev) {
        config.entry.push('eventsource-polyfill')
      }
    }
  },
}
