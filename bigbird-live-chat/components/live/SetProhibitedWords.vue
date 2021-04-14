<template>
  <div class="side-content">
    <h4 class="side-content-title">금지어 설정</h4>
    <div class="side-content-box">
      <div class="set-prohibited-words-box">
        <div class="set-prohibited-words-list">
          <h5>금지어 활성화</h5>
          <div class="swich-wrap">
            <a href="#">
              <span></span>
            </a>
          </div>
        </div>
        <div class="set-prohibited-words-list">
          <h5>금지어 추가하기</h5>
          <div class="add-wrap">
            <input type="text" />
            <button>+</button>
          </div>
        </div>
        <div class="set-prohibited-words-list flex">
          <h5>금지어 목록</h5>
          <ul class="pick-list">
            <li>
              <span>애플워치</span>
              <a href="#"></a>
            </li>
            <li>
              <span>애플워치</span>
              <a href="#"></a>
            </li>
            <li>
              <span>애플워치</span>
              <a href="#"></a>
            </li>
            <li>
              <span>애플워치</span>
              <a href="#"></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "setProhibitedWords"
};
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
.set-prohibited-words-box {
  padding: 20px;
  box-sizing: border-box;
  > .set-prohibited-words-list {
    width: 100%;
    height: 30px;
    margin-bottom: 18px;
    display: flex;
    justify-content: left;
    align-items: center;
    > h5 {
      font-size: 14px;
      width: 110px;
      color: #707070;
      height: 30px;
      line-height: 30px;
    }
    > .swich-wrap {
      > a {
        position: relative;
        display: block;
        width: 33px;
        height: 20px;
        background: #2699fb;
        border-radius: 50px;
        > span {
          position: absolute;
          top: 50%;
          left: 1px;
          transform: translateY(-50%);
          display: inline-block;
          width: 18px;
          height: 18px;
          border-radius: 50px;
          background: #fff;
        }
      }
      > a.on {
        span {
          left: 14px;
        }
      }
    }
    > .add-wrap {
      width: 200px;
      height: 30px;
      border: 1px solid #ccc;
      border-radius: 5px;
      background: #fff;
      overflow: hidden;
      > input {
        display: inline-block;
        width: calc(100% - 30px);
        height: 26px;
        padding: 2px 10px;
        height: 32px;
        box-sizing: border-box;
        border: none;
      }
      > button {
        width: 30px;
        height: 30px;
        color: #fff;
        font-size: 14px;
        background: #2699fb;
        border: none;
      }
    }
    > .pick-list {
      width: calc(100% - 110px);
      display: flex;
      flex-wrap: wrap;
      > li {
        padding: 6px 10px;
        box-sizing: border-box;
        border-radius: 50px;
        border: 1px solid #cccccc;
        margin: 5px;
        > span {
          font-size: 12px;
          color: #000;
        }
      }
    }
  }
  > .set-prohibited-words-list.flex {
    align-items: flex-start;
    > h5 {
      width: 105px;
    }
    > .pick-list {
      width: calc(100% - 105px);
      display: flex;
      justify-content: left;
      flex-wrap: wrap;
      > li {
        padding: 6px 10px;
        box-sizing: border-box;
        border-radius: 50px;
        border: 1px solid #cccccc;
        margin: 5px;
        > span {
          font-size: 12px;
          color: #000;
        }
        > a {
          display: inline-block;
          width: 10px;
          height: 10px;
          margin-left: 5px;
          background: url(../../assets/img/delete_grayxhdpi.png) no-repeat
            center;
          background-size: cover;
        }
      }
    }
  }
}
</style>