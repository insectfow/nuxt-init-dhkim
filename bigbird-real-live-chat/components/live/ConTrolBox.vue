<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h3>{{ controlData.id }}의 사용자 정보 입니다.</h3>
          <ul>
            <li>이름: {{ controlData.name }}</li>
            <li>닉네임: {{ controlData.nickName }}</li>
            <li>휴대폰번호 : {{ controlData.phone }}</li>
            <li>벙어리 : {{ controlData.muted }}</li>
            <li>강제퇴장 : {{ controlData.banned }}</li>
          </ul>
          <button>벙어리</button>
          <button>강제퇴장</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["controlData"],
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  display: table;
  transition: opacity 0.3s ease;
  .modal-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    // height: 150px;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    overflow: hidden;
    .modal-container {
      width: 100%;
      font-family: "NotoSansKR-Regular";
      height: 100%;
      overflow: hidden;
      //헤더네브
      position: relative;
      padding: 10px;
      > h3 {
        font-size: 20px;
        color: #000;
      }
      > ul {
        margin: 5px 0;
        > li {
          font-size: 12px;
          color: #000;
        }
      }
    }
  }
}
</style>