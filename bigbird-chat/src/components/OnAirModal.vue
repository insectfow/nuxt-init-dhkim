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
            <!-- 사이드 네비게이션 -->
            <ul class="nav-wrap">
              <li>
                <strong>management</strong>
                <ul class="sub-nav-wrap">
                  <li>
                    <a
                      href="#"
                      class="sales-status"
                      @click.prevent="viewChange('sales-status')"
                      :class="showView('sales-status')"
                    >
                      <span class="img-box"></span>
                      <span class="nav-title">판매 현황</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="admin-chat"
                      @click.prevent="viewChange('admin-chat')"
                      :class="showView('admin-chat')"
                    >
                      <span class="img-box"></span>
                      <span class="nav-title">관리자 채팅</span>
                      <span
                        v-if="chatOn && isPage !== 'admin-chat'"
                        class="admin-chat-notice"
                        >NEW</span
                      >
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="viewer-list"
                      @click.prevent="viewChange('viewer-list')"
                      :class="showView('viewer-list')"
                    >
                      <span class="img-box"></span>
                      <span class="nav-title">시청자 목록</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      class="viewer-management"
                      @click.prevent="viewChange('viewer-management')"
                      :class="showView('viewer-management')"
                    >
                      <span class="img-box"></span>
                      <span class="nav-title">시청자 관리</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li>
                <strong>setting</strong>
                <ul class="sub-nav-wrap">
                  <li>
                    <a
                      href="#"
                      class="set-prohibited-words"
                      @click.prevent="viewChange('set-prohibited-words')"
                      :class="showView('set-prohibited-words')"
                    >
                      <span class="img-box"></span>
                      <span class="nav-title">금지어 설정</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </aside>
          <!-- 전환 페이지 -->
          <section class="side-content-wrap">
            <!-- 판매 현황 -->
            <sales-status v-show="showView('sales-status')" />
            <!-- 관리자 채팅 -->
            <!-- <admin-chat v-show="showView('admin-chat')" /> -->
            <iframe
              v-show="showView('admin-chat')"
              id="admin-chat-frame"
              
              frameborder="0"
            ></iframe>
            <!-- :src="`${this.chatUrl}/operator/admin?token=${this.token}`" -->

            <!-- 시청자 목록 -->
            <iframe
              v-show="showView('viewer-list')"
              id="real-view-frame"
              
              frameborder="0"
            ></iframe>
            <!-- :src="`${this.chatUrl}/operator/list?token=${this.token}`" -->

            <!-- 시청자 목록 -->           
             <iframe
              v-show="showView('viewer-management')"
              id="real-ban-frame"              
              frameborder="0"
            ></iframe>

            <!-- 금지어 설정 -->
            <set-prohibited-words v-if="showView('set-prohibited-words')" />
          </section>
          <!-- 실시간 방송화면 -->
          <section class="live-view-wrap">
            <div class="live-view">
              <h4>실시간 방송화면</h4>
              <div class="live-info-box">
                <h5>갤럭시 워치 골프 에디션 X 컨셉터스</h5>
                <p>
                  <span class="line995">시청자 {{ loggedIn }}명</span>
                  <span class="line995">채팅 참여 {{ chatty }}명</span>
                  <span>방송시간 2020.08.17 - 16:00~16:30</span>
                </p>
              </div>
              <div class="live-streaming-box">
                <!-- <div
                  style="    width: 100%;
                            height: 100%;"
                >
                  <video-js
                    data-account="6159613123001"
                    data-video-id="6200049406001"
                    data-player="hgRQW3BBJ"
                    data-embed="default"
                    controls=""
                    data-application-id=""
                    class="vjs-fluid"
                  >
                  </video-js>
                </div> -->
              </div>
            </div>
          </section>
          <!-- 실시간 채팅 -->
          <iframe
            id="real-chat-frame"
            frameborder="0"
          ></iframe>
            <!-- :src="`${this.chatUrl}/operator?token=${this.token}`" -->

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
import SalesStatus from "../components/live/SalesStatus";
// import AdminChat from "../components/live/AdminChat.vue";
// import ViewerList from "../components/live/ViewerList.vue";
// import ViewerManagement from "../components/live/ViewerManagement.vue";
import SetProhibitedWords from "../components/live/SetProhibitedWords.vue";
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
          id: "c-000000011",
          name: "test-campaign3",
          brandName: "삼성전자"
        },
        shop: {
          id: "s-000000011_ehdgus441",
          type: 'live',
          nickName: `ehdgus44${Math.floor(1 + Math.random() * 1600)}`,
          item: {
            id: "i-000000011",
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
          id: "i-000011",
          title: "갤럭시 워치 X 컨셉터스",
          date: {
            start: "2020.11.09 12:27",
            end: "2020.11.20 14:30"
          }
        },
        user: {
          id: `test${Math.floor(1 + Math.random() * 1600)}`,

          name: `tester${Math.floor(1 + Math.random() * 1600)}`,

          // type: "supervisor",
          type: "advertiser",

          phone: "010-4123-4566",

          email: "test1234@gmail.com",

          nickname: "ehdgus${Math.floor(1 + Math.random() * 1600)}"
        }
      },

      message: false,
      chatty: null,
      loggedIn: null,
      chatOn: false,
      chatUrl: null
    };
  },
  components: {
    SalesStatus,
    // AdminChat,
    // ViewerList,
    // ViewerManagement,
    SetProhibitedWords
  },

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

    // this.chatUrl = "https://bb-ops-group-live-commerce.web.app";
    // this.chatUrl = "https://bb-dev-group-live-commerce.web.app";
    // this.chatUrl = "https://bb-dev-group-commerce-live.web.app";
    this.chatUrl = "http://192.168.0.57:8089";
    // console.log(this.token);
    // console.log(this.token2);
    let aaa = document.querySelector('#admin-chat-frame');
    let bbb = document.querySelector('#admin-chat-frame').parentNode;
    aaa.remove;
    aaa.setAttribute('src', `${this.chatUrl}/operator/admin?token=${this.token}`);
    bbb.append(aaa);

    let ccc = document.querySelector('#real-view-frame');
    let ddd = document.querySelector('#real-view-frame').parentNode;
    ccc.remove;
    ccc.setAttribute('src', `${this.chatUrl}/operator/list?token=${this.token}`);
    ddd.append(ccc);

    let eee = document.querySelector('#real-chat-frame');
    let fff = document.querySelector('#real-chat-frame').parentNode;
    eee.remove;
    eee.setAttribute('src', `${this.chatUrl}/operator/?token=${this.token}`);
    fff.append(eee);

    window.parent.postMessage(
      { status: "startDate", value: this.payload.influencerShop.date.start },
      "*"
    );

    let ggg = document.querySelector('#real-ban-frame');
    let hhh = document.querySelector('#real-ban-frame').parentNode;
    ggg.remove;
    ggg.setAttribute('src', `${this.chatUrl}/client/ban?token=${this.token}`);
    hhh.append(ggg);

    window.parent.postMessage(
      { status: "startDate", value: this.payload.influencerShop.date.start },
      "*"
    );
    

    window.addEventListener(
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

  beforeDestroy() {
    window.removeEventListener(
      "message",
      function(e) {
        if (e.origin === "https://bigbird-live-commerce.web.app") {
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
    }
  }
};
</script>
<style lang="scss" scoped>
#admin-chat-frame {
  height: 100%;
  width: 100%;
}
#real-view-frame {
  height: 100%;
  width: 100%;
}
#real-ban-frame {
  height: 100%;
  width: 100%;
  
}

#real-chat-frame {
  float: left;
  width: 645px;
  height: 100%;
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
