<template>
  <div class="page">
    <lazy-modules-the-header :title="$route.name" />
    <div class="contents">
      <!-- <lazy-modules-hacker-news-list class="window" /> -->
      <modules-hacker-news-list class="window2" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'news',
  data(){
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
.contents {
  display: flex;
  justify-content: center;
  position: fixed;
  top: 3.2rem;
  width: calc(100% - 40px);
  margin: 20px;
}
.window2 {
  right: 30px;
  max-width: 700px;
  width: 100%;
  height: calc(100vh - 3.2rem - 40px);
  box-shadow:  0 0 4px rgba(0,0,0,0.2);
  background: #fff;
  z-index: 10;
  overflow-x: hidden;
  overflow-y: auto;
}
.window {
  margin-right: 20px;
  /* width: 400px; */
  max-width: 400px;
  width: 100%;
  height: calc(100vh - 3.2rem - 40px);
  box-shadow:  0 0 4px rgba(0,0,0,0.2);
  background: #fff;
  z-index: 10;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-flow: column;
  flex-wrap: wrap;
  overflow-x: hidden;
  overflow-y: auto;
}
.window div {
  width: 100%;
  height: auto;
}


</style>