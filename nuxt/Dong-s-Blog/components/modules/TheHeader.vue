<template>
  <header id="header">
      <h3 class="header-title" @click="$router.push('/')">{{ title }}</h3>
      <!-- header nav -->
      <lazy-modules-the-header-nav />
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    props: ['title'],
    methods: {
        
    },
    computed:{
    }
    
}
</script>

<style>
#header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    height: 3.2em;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    z-index: 3;
    box-shadow: 0 0 4px rgba(0,0,0,.2);
    background: rgba(255,255,255,.7);
}

#header .header-title {
    position: absolute;
    left: 50%;
    top: 12px;
    transform: translateX(-50%);
    font-size: 1.4em;
    height: 1.4em;
    color: #000;
    text-transform: uppercase;
}
</style>