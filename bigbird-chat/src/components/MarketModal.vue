<template>
  <transition name="modal">
    <div class="modal-mask" :class="this.platform === 'mobile' ? this.checkMobile+'-'+this.browser : ''">
      <div class="modal-wrapper">
        <div class="modal-container clearfix">
          <aside class="side-wrap">
            <!-- 로고 -->
            <h3 class="logo">
              <img src="../assets/img/cha_logo.png" alt="live-modal-logo" />
            </h3>
          </aside>
          <!-- 실시간 채팅 -->
          <div class="info">
            <span>{{platform}} 이고,</span>
            <span>{{checkMobile}} 입니다.</span>
            <span>현재 브라우저는 {{browser}} 입니다.</span>
            <span>{{checkMobile +'-' +browser}}</span>
            <span>{{nav}}</span>
            <span>{{width +':' + height}}</span>
          </div>
          <iframe
            id="real-chat-frame"
            :src="`${this.chatUrl}/market?token=${this.token}`"
            frameborder="0"
          ></iframe>

          <!-- <iframe
            id="real-chat-frame"
            :src="`${this.chatUrl}/market/app?full=1&token=${this.token}`"
            frameborder="0"
          ></iframe> -->

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
            start: "2020.08.17 18:00",
            end: "2020.08.17 18:30"
          }
        },
        user: {
          id: `test${Math.floor(1 + Math.random() * 1600)}`,

          name: `tester${Math.floor(1 + Math.random() * 1600)}`,

          type: "purchaser",

          phone: "010-4123-4566",

          email: "test1234@gmail.com",

          nickname: "ehdgus96"
        }
      },

      message: false,
      chatty: null,
      loggedIn: null,
      chatOn: false,

      platform: null,
      browser: null,
      nav: null,
      width: null,
      height: null,
      chatUrl: null
    };
  },
  components: {},

  computed: {
    checkMobile(){
            const varUA = navigator.userAgent.toLowerCase();
            if ( varUA.indexOf('android') > -1) {
                //안드로이드
                return "android";
            } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
                //IOS
                return "ios";
            } else {
                //아이폰, 안드로이드 외
                return "other";
            }
        },
  },
  mounted() {
    this.width = document.querySelector('html').clientWidth;
    this.height = document.querySelector('html').clientHeight;
    this.checkPlatform();        
    this.checkBroswer();
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "//players.brightcove.net/6159613123001/hgRQW3BBJ_default/index.min.js";
    document.body.appendChild(script);
    // 토큰 인코딩
    let secret = "BigBird";
    this.token = jwt.sign(this.payload, secret, { algorithm: "HS256" });

    this.chatUrl = 'http://192.168.0.57:8089'

   
    // console.log(this.token);
    // console.log(this.token2);

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
    checkPlatform(){
        var filter = "win16|win32|win64|mac";
        if(navigator.platform){

            if(filter.indexOf(navigator.platform.toLowerCase()) < 0){
                
                this.platform = 'mobile';
            
            } else{
            
                this.platform = 'pc';

            }

        }
    },
    checkBroswer(){
      var agent = navigator.userAgent.toLowerCase(),
      name = navigator.appName,
      browser;

      // MS 계열 브라우저를 구분하기 위함.
      if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
          browser = 'ie';
          if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
              agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
              browser += parseInt(agent[1]);
          } else { // IE 11+
              if(agent.indexOf('trident') > -1) { // IE 11 
                  browser += 11;
              } else if(agent.indexOf('edge/') > -1) { // Edge
                  browser = 'edge';
              }
          }
      } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
          if(agent.indexOf('opr') > -1) { // Opera
              browser = 'opera';
          } else if(agent.indexOf('chrome') > -1) { // Chrome                   
              if(agent.indexOf('naver') > -1) { // Naver
                  browser = 'naver';
              } else if (agent.indexOf('samsung') > -1) { // samsung
                    browser = 'samsungbrowser';
              } else if (agent.indexOf('kakao') > -1) { // kakaotalk
                    browser = 'kakao';
              } else if(agent.indexOf('whale') > -1){ // whale                          
                  browser = 'whale';
              }  else {
                    browser = 'chrome';
              }
          } else if (agent.indexOf('crios') > -1) { // ios는 crIos가 크롬이다
              
              if(this.height < 555){ // Chrome 
                  browser = 'oidChrome';
              } else if (555 <= this.height <= 650) {
                  browser = 'newChrome';
              } else {
                  browser = 'chrome';
              }
              
          } else if (agent.indexOf('naver') > -1) { // Naver
              browser = 'naver';
          } else if (agent.indexOf('kakao') > -1) { // kakaotalk
              browser = 'kakao';
          } else if (agent.indexOf('fxios') > -1) { // firefox
              browser = 'firefox';
          } else { // Safari                    
              if(this.height <= 560){                        
                  if(agent.indexOf('whale') > -1){  // whale                          
                      browser = 'oidWhale';
                  } else {
                      browser = 'oidSafari';
                  }
              } else {
                  if(agent.indexOf('whale') > -1){  // whale                         
                      browser = 'whale';
                  } else {
                      browser = 'safari';  // safari
                  }
                  
              }
          }
      } else if(agent.indexOf('firefox') > -1) { // Firefox
          browser = 'firefox';
      } else if (agent.indexOf('kakao') > -1) { // kakao
          browser = 'kakao';
      } 
        
      return this.browser = browser;
    },
    bottomCss(){
      if(this.platform === 'mobile'){
          if(this.checkMobile() === 'ios'){
              return `ios-${this.browser}`;
          } else {
              return this.browser;
          }
      } else {
          return '';
      }
    }    
  }
};
</script>
<style lang="scss" scoped>
#admin-chat-frame {
  height: 100%;
  width: 100%;
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
      .info {
       display: none;
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
      height: 100%;
      border-radius: 0;
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
        display: none;
        
      }
      .side-content-wrap {
        display: none;
      }
      .info {
        width: 100%;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: column;
      }
      
      .live-view-wrap {
        display: none;
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
        width: 100%;
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
      #real-chat-frame {
        float: none;
        width: 100%;
        height: 60%;
        background: #000;
      }
    }
    }
  }
}
.chrome {
    height: calc(100vh - 55px) !important;
}
.ios-chrome {
    height: calc(100vh - 170px) !important;
    height: calc(100vh - 170px) !important;
}
.ios-newChrome {
    height: calc(100vh - 108px) !important;
}
.ios-safari {
    height: calc(100vh - 113px) !important;
}
.ios-naver, .ios-firefox, .ios-kakao,  .ios-oldWhale, .ios-whale, .android-samsungbrowser, .android-kakao {
    height: 100vh !important;
}
.safari {
    height: calc(100vh - 108px) !important;
}
.android-chrome, .android-firefox {
    height: calc(100vh - 55px) !important;
}
.ios-oidChrome, .ios-oidSafari {
    height: calc(100vh - 74px) !important;
}
.android-whale {
    height: calc(100vh - 80px) !important;
}
</style>
