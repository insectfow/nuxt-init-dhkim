<template>
  <nav class="nav">
      <slot></slot>
  </nav>
</template>

<script>
export default {
    data(){
        return {
            path: ''
        }
    },
    created(){
        if(this.path != this.$route.path){
            this.path = this.$route.path;
        }
    }
}
</script>

<style>

</style>