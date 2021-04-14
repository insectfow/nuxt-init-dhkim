<template>
    <ul class="nav-list-wrap">
      <li><a href="#" @click.prevent="fetchPath('news')">news</a></li>
      <li><a href="#" @click.prevent="fetchPath('ask')">ask</a></li>
    </ul>
</template>

<script>
export default {
    methods: {
        fetchPath(path){
            this.$store.dispatch('fetchPath', path)
        }
    }
}
</script>

<style>
.nav-list-wrap {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.nav-list-wrap > li {
    margin-right: 10px;
}
.nav-list-wrap > li:last-child {
    margin-right: 0;
}
</style>