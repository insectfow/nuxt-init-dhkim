export default {
    head: {
        titleTemplate: '%s - Nuxt.js',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Meta description' }
        ]
    },

    ssr: true, // 서버 측 렌더링 비활성화

    mode: '',  // default => 'universal' 서버 측 렌더링 + 클라이언트 측 탐색, 'spa' 클라이언트 측 탐색 만 해당

    // srcDir: '/', // rootDir 

    target: 'static', // server , static

    pageTransition: {
        name: 'page',
        mode: 'out-in'
    },

    components: true,

    css: ['~/assets/scss/common.scss'],

    // dev: process.env.NODE_ENV !== 'production',

    // 상태 바
    loading: {
        color: 'blue', // 기본 컬러
        failedColor: 'red', // 실패 컬러
        throttle: 100, // 보이기 전 대기시간
        height: '5px', // 상태 바 크기
        duration: 1000, // 동작 시간
        continuous: true, // 상태 바보다 로드가 오래 걸리는 경우 상태바 유지
        css: true, // 기본 css 안쓰고 커스텀 할 경우
        rtl: false // 상태 바 진행 방향 오른쪽에서 왼쪽으로 가기
    },

    modules: ['@nuxtjs/style-resources'],

    styleResources: {
        scss: [
            '~/assets/scss/common.scss'
        ]
    },

    build: {
      extend(config, ctx) {

      }
    }
  }