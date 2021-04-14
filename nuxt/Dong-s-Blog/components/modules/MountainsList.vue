<template>
  <div>
    <p v-if="$fetchState.pending">Fetching mountains...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <ul v-else>
      <li><h3>Nuxt Mountains</h3></li>
      <li v-for="(mountain, index) in mountains" :key="index">
        {{ mountain.title }}
      </li>
      <li>
          <button @click="$fetch">Refresh</button>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        mountains: []
      }
    },
    watch: {
      '$route.query': '$fetch'
    },
    fetchDelay: 1000, // fetch 딜레이
    async fetch() {
      this.mountains = await fetch(
        'https://api.nuxtjs.dev/mountains'
      ).then(res => res.json())
    }
  }
</script>