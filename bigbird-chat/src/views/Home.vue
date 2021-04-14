<template>
  <div class="home">
    <div class="home-box">
      <h4>BIGBIRD 채팅</h4>
      <p>환영합니다</p>
    </div>
    <on-air-modal v-if="isOnAir" @close="isOnAir = false"></on-air-modal>
  </div>
</template>

<script>
import OnAirModal from "@/components/OnAirModal.vue";

export default {
  name: "Home",
  components: {
    OnAirModal
  },
  data() {
    return {
      isOnAir: true
    };
  },
  created() {},

  methods: {}
};
</script>
