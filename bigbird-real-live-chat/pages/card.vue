<template>
  <div class="card-box">
    <ul>
      <li v-for="(list, idx) in 200" :key="idx">{{ idx + 1 + "안녕" }}</li>
      <li class="fixed">
        <a href="#" @click.prevent="goScroll">위로</a>
      </li>
      <li class="fixed-top">
        <div>
          {{ "scrollTop :" + scrollTop }}
        </div>
        <div>
          {{ "scrollHeight :" + scrollHeight }}
        </div>
        <div>
          {{ "clientWidth :" + clientWidth }}
        </div>
        <div>
          {{ "clientHeight :" + clientHeight }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  layout: "card",
  data() {
    return {
      timer: 0,
      scrollTop: null,
      scrollHeight: null,
      clientWidth: null,
      clientHeight: null,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.scroll);
    this.clientWidth = document.body.clientWidth;
    this.clientHeight = document.body.clientHeight;
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scroll);
  },
  methods: {
    scroll() {
      this.scrollTop = document.querySelector("html").scrollTop;
      this.scrollHeight = document.querySelector("html").scrollHeight;
    },
    windowMove() {
      this.clientWidth = document.body.clientWidth;
      this.clientHeight = document.body.clientHeight;
      // console.log(this.clientWidth, this.clientHeight);
    },
    goScroll() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        document.querySelector("html").scrollTop = 0;
      }, 200);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-box {
  width: 100%;
  height: 100%;
  background: #fff;
  font-size: 20px;
  li {
    color: #000;
  }
  li.fixed {
    position: fixed;
    bottom: 20px;
    right: 20px;
  }
  li.fixed-top {
    position: fixed;
    top: 20px;
    right: 20px;
    > div {
      font-size: 12px;
    }
  }
}
</style>