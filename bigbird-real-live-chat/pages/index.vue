<template>
  <div class="container" v-if="envData == 'development'">
    <h1 class="title">bigbird-live-chat</h1>
    <p class="main-sub-title">페이지 리스트</p>
    <ul class="main-nav">
      <li><nuxt-link to="/operator">운영 실시간 채팅</nuxt-link></li>
      <li><nuxt-link to="/operator/admin">운영 어드민 채팅</nuxt-link></li>
      <li><nuxt-link to="/operator/list">운영 시청자 목록</nuxt-link></li>
      <li><nuxt-link to="/client">광고주 실시간 채팅</nuxt-link></li>
      <li><nuxt-link to="/client/admin">광고주 어드민 채팅</nuxt-link></li>
      <li><nuxt-link to="/client/list">광고주 시청자 목록</nuxt-link></li>
      <li><nuxt-link to="/market">마켓 실시간 채팅</nuxt-link></li>
      <li><nuxt-link to="/market/admin">마켓 어드민 채팅</nuxt-link></li>
      <li>
        <nuxt-link to="/influencer/pc">인플루언서 PC 실시간 채팅</nuxt-link>
      </li>
      <li>
        <nuxt-link to="/influencer/pc/admin"
          >인플루언서 PC 어드민 채팅</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/influencer/mobile"
          >인플루언서 Mobile 실시간 채팅</nuxt-link
        >
      </li>
      <li>
        <nuxt-link to="/influencer/mobile/admin"
          >인플루언서 Mobile 어드민 채팅</nuxt-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      envData: null,
    };
  },
  mounted() {
    this.envData = process.env.envData.VUE_APP_MODE;
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 24px;
  > h1.title {
    font-size: 32px;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 20px;
  }
  > p.main-sub-title {
    font-size: 20px;
    color: #000;
    margin-bottom: 10px;
  }
  > ul.main-nav {
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    padding: 10px;
    box-sizing: border-box;
  }
}
</style>
