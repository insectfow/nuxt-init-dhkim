export default {
    head: {
        htmlAttrs: {
            lang: 'ko',
        },
        title: "Dong's blog",
        meta: [
            { charset: 'utf-8' },
            {
                property: 'og:url',
                content: 'https://naver.com/'
            },
            {
                property: 'og:title',
                content: 'dong blog'
            },
            {
                name: 'viewport',
                content: 'width=device-width'
            },
            {
                name: 'format-detection',
                content: 'telephone=no'
            },
            {
                name: 'mobile-web-app-capable',
                content: 'yes'
            }
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/icon.png' }],
        script: [{src: 'https://use.fontawesome.com/9b80b23575.js'}
        ]
    },
    // 컴포넌트 자동으로 가져오기
    // components: true // true or false
    router: {
        base: '/'
    },
    server : {
        host: '0.0.0.0',
        port: '8085'
    },
    components: {
        dirs: [
            '~/components'
          ]
    },
    loading: '~/components/modules/LoadingBar.vue',
    generate: {
        dir: 'generate'
    },
    target: 'static', // 정적 생성 사이트 배포
    // ssr: true,

    // manifest: {
    //     name: 'Dong_Blog',
    //     short_name: 'Dong Blog',
    //     start_url: '/?utm_source=homescreen',
    //     display: 'standalone',
    //     background_color: '#000'
    // },
    // workbox: {
    //     offline: false,
    //     runtimeCaching: [
    //       {
    //         urlPattern: "/*",
    //         handler: "networkFirst",
    //         method: "GET"
    //       }
    //     ]
    // },
    // serverMiddleware : [ '~/api/index.js'],
    modules: [
        '@nuxtjs/axios'
    ],
    css: [
        '@/assets/css/reset.css'
    ]
    // io: {

    // }
    // 'nuxt-socket-io',

}
