<template>
  <div class="home-page">
    <h1 class="home-title">Dong's Blog</h1>
    <div class="home-search-wrap"></div>
    <section class="home-contents">
      <nuxt-link to="/news" class="image-1">
        <span>news</span>
      </nuxt-link>
      <nuxt-link to="/todo" class="image-2">
        <span>todo</span>
      </nuxt-link>
      <nuxt-link to="/todo" class="image-3">
        <span>todo</span>
      </nuxt-link>
      <nuxt-link to="/todo" class="image-4">
        <span>todo</span>
      </nuxt-link>
    </section>
    
  </div>
</template>

<script>
export default {

}
</script>

<style>
.home-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.home-title {
  font-size: 20px;
  display: inline-block;
  height: 100%;
  padding: 10px;
  margin-top: 40px;
  margin-bottom: 20px;
}
.home-search-wrap {
  width: 20rem;
  height: 2rem;
  border-radius: 50px;
  box-shadow: 0 0 10px rgba(0,0,0,.3);
  background: #fff;
  margin-bottom: 50px;
}
.home-contents {
  width: 30rem;
  height: 20rem;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.home-contents > a {
  width: 9rem;
  height: 9rem;
  margin: .5rem;
  position: relative;
  border-radius: 50px;
  box-shadow: 0 0 5px rgba(0,0,0,.2);
}
.home-contents > a:hover {
 box-shadow: 0 0 15px rgba(0,0,0,.5);
}
.home-contents > a > span {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  padding: 5px;
  text-transform: uppercase;
  color: #fff;
}

.image-1 {
  background: url('https://images.unsplash.com/photo-1618246933869-5f8dd8347b2f?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}


.image-2 {
  background: url('https://images.unsplash.com/photo-1618173745276-71981719c0ce?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1Nnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.image-3 {
  background: url('https://images.unsplash.com/photo-1618172193763-c511deb635ca?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3OHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
.image-4 {
  background: url('https://images.unsplash.com/photo-1618262287816-333bc9a6db21?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDV8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

@media screen and (max-width: 640px) {
    
}
</style>