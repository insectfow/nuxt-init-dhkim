<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container clearfix">
          <aside class="side-wrap">
            <!-- 로고 -->
            <h3 class="logo">
              <img src="../assets/img/cha_logo.png" alt="live-modal-logo" />
            </h3>
          </aside>
          <!-- 실시간 채팅 -->
          <iframe
            id="real-chat-frame"            
            frameborder="0"
          ></iframe>
          <!-- 어드민 채팅 -->
          <div class="admin-button">
            <a href="#" @click.prevent="showAdmin"
              >어드민 채팅 보기
              <span v-show="chatOn && !isShowAdmin">NEW</span></a
            >
          </div>
          <iframe
            v-show="isShowAdmin"
            id="admin-chat-frame"            
            frameborder="0"
          ></iframe>

          <!-- 닫기버튼 -->
          <div class="close-btn">
            <a href="#" @click.prevent="close">
              <img src="../assets/img/delete_grayxhdpi.png" alt="arrowbtn" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import jwt from "jsonwebtoken";

export default {
  name: "OnAirModal",
  data() {
    return {
      isPage: "sales-status",
      token: null,
      //토큰 테스트 데이터
      payload: {
        campaign: {
          id: "c-000000008",
          name: "test-campaign3",
          brandName: "삼성전자"
        },
        shop: {
          id: "s-000000008_ehdgus441",
          type: 'live',
          nickName: `ehdgus44${Math.floor(1 + Math.random() * 1600)}`,
          item: {
            id: "i-000000008",
            url: {
              image:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/1200px-Test-Logo.svg.png"
            },
            price: {
              retail: "2000",
              group: "1000"
            }
          }
        },
        influencerShop: {
          id: "i-000008",
          title: "갤럭시 워치 X 컨셉터스",
          date: {
            start: "2020.08.17 18:00",
            end: "2020.08.17 18:30"
          }
        },
        user: {
          id: `influencerDhKim`,

          name: `김동현`,

          type: "influencer",

          phone: "010-4123-4566",

          email: "test1234@gmail.com",

          nickname: "dhKim"
        }
      },

      message: false,
      chatty: null,
      loggedIn: null,
      chatOn: false,
      isShowAdmin: false,
      chatUrl:null
    };
  },
  components: {},

  computed: {},
  mounted() {
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//players.brightcove.net/6159613123001/hgRQW3BBJ_default/index.min.js";
    document.body.appendChild(script);
    // 토큰 인코딩
    let secret = "BigBird";
    this.token = jwt.sign(this.payload, secret, { algorithm: "HS256" });
    // console.log(this.token);
    // console.log(this.token2);
    this.chatUrl = "http://192.168.0.57:8089";
    // this.chatUrl = "https://bb-dev-group-commerce-live.web.app";

    let aaa = document.querySelector('#admin-chat-frame');
    let bbb = document.querySelector('#admin-chat-frame').parentNode;
    aaa.remove;
    aaa.setAttribute('src', `${this.chatUrl}/influencer/mobile/admin?token=${this.token}`);
    bbb.append(aaa);

    let ccc = document.querySelector('#real-chat-frame');
    let ddd = document.querySelector('#real-chat-frame').parentNode;
    ccc.remove;
    ccc.setAttribute('src', `${this.chatUrl}/influencer/mobile?token=${this.token}`);
    ddd.append(ccc);


    window.addEventListener(
      "message",
      function(e) {
        if (e.origin === this.chatUrl) {
          // e.data를 사용한 동작 수행
          if (e.data.status === "login") {
            this.message = e.data.value;
            // console.log(e.data, "로 로그인 하셨습니다.", this.message);
          } else if (e.data.status === "logout") {
            // console.log(e.data.value);
            this.$emit("close");
          } else if (e.data.status === "userCount") {
            // console.log(e.data);
            this.chatty = e.data.chatty;
            this.loggedIn = e.data.loggedIn;
          } else if (e.data.status === "chatOn") {
            this.chatOn = true;
          }
        }
      }.bind(this)
    );
  },

  beforeDestroy() {
    window.removeEventListener(
      "message",
      function(e) {
        if (e.origin === this.chatUrl) {
          // e.data를 사용한 동작 수행
          if (e.data.status === "login") {
            this.message = e.data.value;
            console.log(e.data, "로 로그인 하셨습니다.", this.message);
          } else if (e.data.status === "logout") {
            console.log(e.data.value);
            this.$emit("close");
          } else if (e.data.status === "userCount") {
            console.log(e.data);
            this.chatty = e.data.chatty;
            this.loggedIn = e.data.loggedIn;
          } else if (e.data.status === "chatOn") {
            this.chatOn = true;
          }
        }
      }.bind(this)
    );
  },

  methods: {
    viewChange(type) {
      this.isPage = type;
      this.chatOn = false;
    },
    showView(type) {
      if (type === this.isPage) return "on";
    },
    close() {
      // const item = true;
      // document
      //   .getElementById("admin-chat-frame")
      //   .contentWindow.postMessage(item, "http://192.168.0.57:8089");
      // this.$emit("close");
    },
    showAdmin() {
      this.isShowAdmin = !this.isShowAdmin;
      this.chatOn = false;
    }
  }
};
</script>
<style lang="scss" scoped>
#admin-chat-frame {
  float: left;
  width: 645px;
  height: 100%;
  background: #000;
}
#real-chat-frame {
  float: left;
  width: 645px;
  height: 100%;
  background: #000;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.59);
  display: table;
  transition: opacity 0.3s ease;
  .modal-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1800px;
    height: 830px;
    transform: translate(-50%, -50%);
    border-radius: 10px;
    background: #fff;
    overflow: hidden;
    .modal-container {
      width: 100%;
      font-family: "NotoSansKR-Regular";
      height: 100%;
      overflow: hidden;
      //헤더네브
      position: relative;
      > .close-btn {
        position: absolute;
        top: 15px;
        right: 20px;
        > a {
          display: block;
          width: 25px;
          height: 25px;
          > img {
            display: inline-block;
            width: 100%;
          }
        }
      }
      .side-wrap {
        float: left;
        width: 280px;
        height: 100%;
        .logo {
          padding: 100px 80px 101px;
          display: flex;
          justify-content: center;
          align-items: center;
          > img {
            display: inline-block;
            width: 160px;
            height: 39px;
          }
        }
        .nav-wrap {
          width: 100%;
          > li {
            width: 100%;
            > strong {
              font-size: 12px;
              color: #707070;
              padding-left: 40px;
            }
            > .sub-nav-wrap {
              width: 100%;
              margin-top: 20px;
              margin-bottom: 40px;
              > li {
                width: 100%;

                > a {
                  width: 100%;
                  height: 50px;
                  display: flex;
                  align-items: center;
                  padding: 15px 40px;
                  box-sizing: border-box;
                  > .img-box {
                    display: inline-block;
                    width: 30px;
                    height: 20px;
                    margin-right: 10px;
                  }
                  > .nav-title {
                    font-size: 14px;
                    color: #000;
                  }
                }
                > a.on {
                  background: #2699fb;
                  > .nav-title {
                    color: #fff;
                  }
                  > .admin-chat-notice {
                    background: #fff;
                    color: #2699fb;
                  }
                }
                > .admin-chat {
                  position: relative;
                  > .admin-chat-notice {
                    position: absolute;
                    right: 40px;
                    top: 50%;
                    transform: translateY(-50%);
                    border-radius: 30px;
                    padding: 2px 16px;
                    box-sizing: border-box;
                    background: #2699fb;
                    color: #fff;
                    font-size: 12px;
                  }
                }
                > a.sales-status {
                  > .img-box {
                    background: url("../assets/img/sales_g@2x.png") no-repeat
                      center;
                    background-size: cover;
                  }
                }
                > a.sales-status.on {
                  > .img-box {
                    background: url("../assets/img/sales_w@2x.png") no-repeat
                      center;
                    background-size: cover;
                  }
                }
                > a.admin-chat {
                  > .img-box {
                    background: url("../assets/img/admin_chat_g@2x.png")
                      no-repeat center;
                    background-size: cover;
                  }
                }
                > a.admin-chat.on {
                  > .img-box {
                    background: url("../assets/img/admin_chat_w@2x.png")
                      no-repeat center;
                    background-size: cover;
                  }
                }
                > a.viewer-list {
                  > .img-box {
                    background: url("../assets/img/viewer_list_g@2x.png")
                      no-repeat center;
                    background-size: cover;
                  }
                }
                > a.viewer-list.on {
                  > .img-box {
                    background: url("../assets/img/viewer_list_w@2x.png")
                      no-repeat center;
                    background-size: cover;
                  }
                }
                > a.viewer-management {
                  > .img-box {
                    background: url("../assets/img/viewer_management_g@2x.png")
                      no-repeat center;
                    background-size: cover;
                  }
                }
                > a.viewer-management.on {
                  > .img-box {
                    background: url("../assets/img/viewer_management_w@2x.png")
                      no-repeat center;
                    background-size: cover;
                  }
                }
                > a.set-prohibited-words {
                  > .img-box {
                    background: url("../assets/img/set-prohibited-words_g@2x.png")
                      no-repeat center;
                    background-size: cover;
                  }
                }
                > a.set-prohibited-words.on {
                  > .img-box {
                    background: url("../assets/img/set-prohibited-words_w@2x.png")
                      no-repeat center;
                    background-size: cover;
                  }
                }
              }
            }
          }
        }
      }
      .side-content-wrap {
        float: left;
        width: 400px;
        height: 100%;
        border-left: 1px solid #eeeeee;
        border-right: 1px solid #eeeeee;
        box-sizing: border-box;
        > .side-content {
          > .side-content-box {
            width: 100%;
            height: 100%;
          }
        }
      }
      h4 {
        background: #fff;
        padding: 40px 20px 20px;
        box-sizing: border-box;
        font-size: 16px;
        color: #000;
        border-bottom: 1px solid #eeeeee;
      }
      .live-view-wrap {
        float: left;
        width: 475px;
        height: 100%;
        > .live-view {
          width: 100%;
          > .live-info-box {
            width: 100%;
            height: 86px;
            padding: 20px;
            box-sizing: border-box;
            border-bottom: 1px solid #eeeeee;
            > h5 {
              font-family: "Noto Sans CJK KR Medium";
              font-size: 16px;
              color: #000;
              margin-bottom: 4px;
            }
            > p {
              > span {
                font-size: 12px;
                color: #707070;
              }
            }
          }
          > .live-streaming-box {
            width: 100%;
            height: 659px;
            // 아래는 사라질 css
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
          }
        }
      }
      .chat-wrap {
        float: left;
        width: 645px;
        height: 100%;
        border-left: 1px solid #eeeeee;
        box-sizing: border-box;
        .real-chat {
          width: 100%;
          > .real-chat-box {
            width: 100%;
            > .chat-list {
              width: 100%;
              height: 685px;
              border-bottom: 1px solid #eeeeee;
              box-sizing: border-box;
              padding: 20px;
              overflow-x: hidden;
              overflow-y: auto;
              > li {
                width: 100%;
                margin-bottom: 20px;
                > ul {
                  width: 100%;
                  > .user-name {
                    font-family: "Noto Sans CJK KR Medium";
                    font-size: 14px;
                    color: #000;
                  }
                  > .user-chat {
                    display: flex;
                    justify-content: flex-start;
                    align-items: flex-end;
                    width: 100%;
                    margin-top: 6px;
                    > .chat-comment {
                      border-radius: 10px;
                      background: #f9f9f9;
                      padding: 10px;
                      display: inline-block;
                      max-width: calc(100% - 55px);
                      color: #707070;
                    }
                    > .chat-time {
                      display: inline-block;
                      color: #bbbbbb;
                      font-size: 10px;
                      margin-left: 10px;
                    }
                  }
                }
              }
              > li.my-chat {
                > ul {
                  > .user-chat {
                    justify-content: flex-end;
                    margin-top: 0;
                    > .chat-comment {
                      color: #fff;
                      background: #2699fb;
                    }
                    > .chat-time {
                      margin-left: 0;
                      margin-right: 10px;
                    }
                  }
                }
              }
            }
            > .chat-board {
              width: 100%;
              height: 60px;
              display: flex;
              > input {
                width: calc(100% - 100px);
                height: 100%;
                padding: 0 20px;
                font-size: 14px;
                color: #000;
                border: none;
              }
              > button {
                width: 100px;
                height: 100%;
                background: #2699fb;
                color: #fff;
                font-size: 14px;
                font-family: "Noto Sans CJK KR Medium";
                border: none;
              }
            }
          }
        }
      }
      .admin-button {
        position: absolute;
        top: 10px;
        right: 60px;
        > a {
          background: #fff;
          color: #000;
          border-radius: 10px;
          padding: 5px;
          display: block;
          border: 1px solid #000;
          > span {
            color: red;
          }
        }
      }
    }
  }
  .line995 {
    position: relative;
    padding-right: 20px;
  }
  .line995::after {
    content: "";
    position: absolute;
    top: 5px;
    right: 10px;
    width: 1px;
    height: 11px;
    background: #cccccc;
  }
}
@media screen and (max-width: 449px) {
  .modal-mask {
    .modal-wrapper {
      width: 100%;
    }
  }
}
</style>
