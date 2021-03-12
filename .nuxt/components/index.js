export { default as FooterBox } from '../..\\components\\FooterBox.vue'
export { default as HeaderBox } from '../..\\components\\HeaderBox.vue'
export { default as ModalBox } from '../..\\components\\ModalBox.vue'
export { default as Overlay } from '../..\\components\\Overlay.vue'
export { default as PageBox } from '../..\\components\\PageBox.vue'
export { default as PageContent } from '../..\\components\\PageContent.vue'
export { default as Timer } from '../..\\components\\Timer.vue'

export const LazyFooterBox = import('../..\\components\\FooterBox.vue' /* webpackChunkName: "components/footer-box" */).then(c => c.default || c)
export const LazyHeaderBox = import('../..\\components\\HeaderBox.vue' /* webpackChunkName: "components/header-box" */).then(c => c.default || c)
export const LazyModalBox = import('../..\\components\\ModalBox.vue' /* webpackChunkName: "components/modal-box" */).then(c => c.default || c)
export const LazyOverlay = import('../..\\components\\Overlay.vue' /* webpackChunkName: "components/overlay" */).then(c => c.default || c)
export const LazyPageBox = import('../..\\components\\PageBox.vue' /* webpackChunkName: "components/page-box" */).then(c => c.default || c)
export const LazyPageContent = import('../..\\components\\PageContent.vue' /* webpackChunkName: "components/page-content" */).then(c => c.default || c)
export const LazyTimer = import('../..\\components\\Timer.vue' /* webpackChunkName: "components/timer" */).then(c => c.default || c)
