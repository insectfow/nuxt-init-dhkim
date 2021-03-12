import Vue from 'vue'

const components = {
  FooterBox: () => import('../..\\components\\FooterBox.vue' /* webpackChunkName: "components/footer-box" */).then(c => c.default || c),
  HeaderBox: () => import('../..\\components\\HeaderBox.vue' /* webpackChunkName: "components/header-box" */).then(c => c.default || c),
  ModalBox: () => import('../..\\components\\ModalBox.vue' /* webpackChunkName: "components/modal-box" */).then(c => c.default || c),
  Overlay: () => import('../..\\components\\Overlay.vue' /* webpackChunkName: "components/overlay" */).then(c => c.default || c),
  PageBox: () => import('../..\\components\\PageBox.vue' /* webpackChunkName: "components/page-box" */).then(c => c.default || c),
  PageContent: () => import('../..\\components\\PageContent.vue' /* webpackChunkName: "components/page-content" */).then(c => c.default || c),
  Timer: () => import('../..\\components\\Timer.vue' /* webpackChunkName: "components/timer" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
