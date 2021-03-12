<template>
  <transition name="overlay">
    <div :class="'overlay ' + (transparent ? 'transparent' : '')" v-if="show" @click.prevent="close">
      <div class="inner" v-bind:style="{ opacity: opacity }"></div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    transparent: {
      type: Boolean,
      default: false
    },
    opacity: {
      type: Number,
      default: 1
    }
  },
  methods: {
      close(){
          this.$emit('close');
      }
  }
}
</script>

<style>
.overlay {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0;
  width: 100%;
  height: 100%;
  z-index: 11;
  transition: opacity .5s;
  opacity: 1;

  
  
}
.inner {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .6);
    
  }
.overlay .transparent .inner {
    background-color: transparent;
}

.overlay-enter,
.overlay-leave-active {
    opacity: 0;
}
</style>