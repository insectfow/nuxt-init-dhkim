<template>
  <div class="side-content">
    <h4 class="side-content-title">시청자 관리</h4>
    <div class="side-content-box">
      <div class="viewer-management-box">
        <div class="viewer-management-list">
          <h5>
            채팅 금지
            <span>(58)</span>
          </h5>
          <div class="viewer-search-box">
            <span></span>
            <form autocomplete="off">
              <input autocomplete="off" type="text" placeholder="시청자 검색" />
            </form>
          </div>
          <ul class="viewer-list-scroll">
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
          </ul>
        </div>
        <div class="viewer-management-list">
          <h5>
            입장 제한
            <span>(58)</span>
          </h5>
          <div class="viewer-search-box">
            <span></span>
            <form autocomplete="off">
              <input autocomplete="off" type="text" placeholder="시청자 검색" />
            </form>
          </div>
          <ul class="viewer-list-scroll">
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
            <li>컨셉터스(concepters)</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss" scoped>
input:focus {
  outline: none;
}
.side-content-title {
  background: #fff;
  padding: 40px 20px 20px;
  box-sizing: border-box;
  font-size: 16px;
  color: #000;
  border-bottom: 1px solid #eeeeee;
}
.viewer-management-box {
  > .viewer-management-list {
    > h5 {
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      font-size: 14px;
      color: #000;
    }
    > .viewer-search-box {
      height: 40px;
      width: 100%;
      background: #fff;
      border-bottom: 1px solid #eeeeee;
      box-sizing: border-box;
      padding: 0 20px;
      display: flex;
      justify-content: left;
      align-items: center;
      > form {
        width: calc(100% - 24px);
        height: 100%;
        input {
          display: inline-block;
          width: 100%;
          height: calc(100% - 2px);
          color: #000;
          border: none;
        }
        input::placeholder {
          color: #bbbbbb;
        }
      }

      > span {
        display: inline-block;
        width: 17px;
        height: 17px;
        background: url(../../assets/img/dodbo@2x.png) repeat center;
        background-size: cover;
        margin-right: 7px;
      }
    }
    > .viewer-list-scroll {
      overflow-x: hidden;
      overflow-y: auto;
      height: 251px;
      border-bottom: 1px solid #eeeeee;
      > li {
        padding: 6px 20px;
        box-sizing: border-box;
        font-size: 12px;
        color: #000;
      }
      > li:nth-child(2n-1) {
        background: #f9f9f9;
      }
      > li:nth-child(2n) {
        background: #fff;
      }
    }
  }
  > .viewer-management-list:last-child {
    margin-top: 40px;
    border-top: 1px solid #eeeeee;
  }
}
</style>