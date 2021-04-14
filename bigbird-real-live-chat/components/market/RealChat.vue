<template>
  <div class="chatting-wrap vjs-fullscreen" v-if="payload">
    <div class="top-area">
      <div class="chatting-container">
        <ul ref="scroll" class="chatting-box scroll">
          <li v-for="(list, idx) in sort" :key="idx" :class="list.type">
            <div class="color-box">
              <span class="user-name">
                {{
                  typeID(
                    list.type,
                    list.brandName,
                    list.nickName,
                    list.marketNickName
                  )
                }}
              </span>
              <span>{{ list.comment }}</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="popup-wrap">
        <a :href="false" @click.prevent="fullScreen('off')">
          <div class="item-img">
            <img
              :src="payload.shop.item.url.image"
              :alt="payload.influencerShop.title + '상품 이미지'"
            />
          </div>
          <ul class="item-info">
            <li class="item-name overtext">
              {{ payload.influencerShop.title }}
            </li>
            <li class="item-account">
              <strong
                >{{
                  numberConvertComma(payload.shop.item.price.group)
                }}원</strong
              >
              <span
                >{{
                  numberConvertComma(payload.shop.item.price.retail)
                }}원</span
              >
            </li>
          </ul>
        </a>
      </div>
      <div class="function-box">
        <template v-if="isFullScreen === true">
          <input
            id="in_chat"
            type="text"
            autocomplete="off"
            placeholder="대화를 나눠보세요."
            v-model="isComment"
            @keyup.enter="submit"
          />
        </template>
        <template v-else>
          <button class="go-chat-btn" @click.prevent="fullScreen('on')">
            대화를 나눠보세요.
          </button>
        </template>
        <!-- <button class="mute-btn" @click.prevent="fullScreen">mute</button> -->
        <a
          href="#"
          class="full-screen-btn"
          @click.prevent="fullScreen('toggle')"
        >
          <img
            v-if="isFullScreen"
            srcset="
              ../../assets/img/ma_lc@2x.png 2x,
              ../../assets/img/ma_lc@3x.png 3x,
              ../../assets/img/ma_lc@4x.png 4x
            "
            src="../../assets/img/ma_lc.png"
            alt="fullView"
          />
          <img
            v-else
            srcset="
              ../../assets/img/ma_lf@2x.png 2x,
              ../../assets/img/ma_lf@3x.png 3x,
              ../../assets/img/ma_lf@4x.png 4x
            "
            src="../../assets/img/ma_lf.png"
            alt="fullView"
          />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "market-mobile-realchat",
  data() {
    return {
      chatList: [],
      isComment: "",
      myComment: {},
      payload: null,
      config: null,
      myId: null,
      realChatFont: 14,
      userList: [],
      isFullScreen: false,
      userType: null,
      brandName: null,
      nickName: null,
      marketNickName: null,
    };
  },

  mounted() {
    this.payload = this.getPayload();
    this.config = this.getConfig();
    this.myId = this.payload.user.id;
    this.userType = this.payload.user.type;
    this.brandName = this.payload.campaign.brandName;
    this.nickName = this.payload.shop.nickName;
    this.marketNickName = this.payload.user.nickname;
    this.fb_chat_init(this.config, this.payload);
    // this.fb_logout();
    this.fb_chat_login();
    this.fb_chat_load_userlist(this.getUserList);
    this.fb_chat_load_message(this.getMarketChat);
  },

  updated() {
    this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
  },
  computed: {
    sort() {
      this.chatList.sort((a, b) => {
        return this.$moment(a.chatTime) - this.$moment(b.chatTime);
      });
      return this.chatList;
    },
  },

  methods: {
    typeID(type, brandName, nickName, marketNickName) {
      if (type === "supervisor") {
        return "빅버드";
      } else if (type === "advertiser") {
        return "광고주";
      } else if (type === "influencer") {
        return "인플루언서";
      } else if (type === "purchaser") {
        return marketNickName;
      }
    },
    submit() {
      if (this.isComment.length > 0 && this.isComment.length < 40) {
        const today = new Date();
        if (this.userType === "advertiser") {
          this.myComment = {
            userID: this.payload.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.userType,
            brandName: this.payload.campaign.brandName,
          };
        } else if (this.userType === "influencer") {
          this.myComment = {
            userID: this.payload.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.userType,
            nickName: this.payload.shop.nickName,
          };
        } else if (this.userType === "purchaser") {
          this.myComment = {
            userID: this.payload.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.userType,
            marketNickName: this.payload.user.nickname,
          };
        } else if (this.userType === "supervisor") {
          this.myComment = {
            userID: this.payload.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.userType,
          };
        }
        this.isComment = "";
        this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
        this.fb_chat_send_message(this.myComment);
        // document.querySelector("html").scrollTop = document.querySelector(
        //   "html"
        // ).scrollHeight;
      } else if (this.isComment.length > 40 && this.isComment.length > 0) {
        alert("최대 40자까지 입력 가능합니다");
      } else {
        alert("입력해주세요");
      }
    },
    getPayload() {
      return this.jwt_decode(this.$route.query.token);
    },
    getUserList(user) {
      // console.debug("User :", user);
      this.userList.push(user);

      window.parent.postMessage(
        { status: "userCount", value: this.userList.length },
        "*"
      );
    },
    getMarketChat(message) {
      // this.chatList.push(message.data);
      this.chatList.splice(0, 0, message.data);
      console.debug("Market message :", message);
      // console.debug("Market list :", this.chatList);
    },

    fullScreen(type) {
      if (type === "toggle") {
        window.parent.postMessage(
          { status: "fullpage", value: this.isFullScreen },
          "*"
        );
        this.isFullScreen = !this.isFullScreen;
      } else if (type === "on") {
        window.parent.postMessage({ status: "fullpage", value: true }, "*");
        this.isFullScreen = true;
      } else if (type === "off") {
        if (this.isFullScreen === true) {
          window.parent.postMessage({ status: "fullpage", value: false }, "*");
          this.isFullScreen = false;
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
}
.chatting-wrap {
  position: absolute;
  bottom: 0;
  width: 100%;
  // height: 50%;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  > .top-area {
    // background: rgba(0, 0, 0, 0.2);
    height: 100vh;
    // padding-bottom: 80px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-flow: column;
    > .chatting-container {
      display: inline-block;
      bottom: 0;
      border-radius: 0 0 29px 29px;
      width: 100%;
      height: calc(100% - 130px);
      z-index: 60;
      margin-bottom: 10px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      flex-flow: column;
      > .chatting-box {
        width: calc(100% - 60px);
        padding: 0 20px;
        box-sizing: border-box;
        overflow-y: auto;
        > li {
          margin-bottom: 5px;
          > .color-box {
            display: inline-block;
            border-radius: 10px;
            padding: 4px 10px;
            > span {
              display: inline-block;
              color: white;
              text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.3);
              font-size: 14px;
            }
            > .user-name {
              color: #cccccc;
              margin-right: 10px;
            }
          }
        }
        > li:last-child {
          margin-bottom: 0;
        }
        > li.supervisor {
          > .color-box {
            background: rgba(38, 153, 251, 0.8);
            > .user-name {
              color: #fff;
            }
          }
        }
        > li.advertiser {
          > .color-box {
            background: rgba(84, 212, 175, 0.8);
            > .user-name {
              color: #fff;
            }
          }
        }
        > li.influencer {
          > .color-box {
            background: rgba(114, 133, 255, 0.8);
            > .user-name {
              color: #fff;
            }
          }
        }
      }
    }
    > .popup-wrap {
      padding: 0 20px;
      > a {
        display: flex;
        align-items: center;
        width: 211px;
        height: 60px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 5px;
        overflow: hidden;
        > .item-img {
          width: 60px;
          height: 60px;

          > img {
            width: 100%;
          }
        }
        > .item-info {
          padding: 10px 11px;
          width: calc(100% - 60px);
          box-sizing: border-box;
          > .item-name {
            font-size: 14px;
            color: #000;
          }
          > .item-account {
            display: flex;
            justify-content: left;
            align-items: center;
            > strong {
              display: inline-block;
              font-size: 12px;
              color: #1428a0;
              margin-right: 5px;
            }
            > span {
              display: inline-block;
              font-size: 10px;
              color: #777;
              text-decoration: line-through;
              text-decoration-color: #f00;
            }
          }
        }
      }
    }
    > .function-box {
      padding: 0 20px;
      display: flex;
      justify-content: center;
      align-items: center;
      // background: olivedrab;
      border-radius: 0 0 29px 29px;
      width: 100%;
      height: 70px;
      box-sizing: border-box;
      // bottom: 0;
      > input {
        // left: 35%;
        margin-right: 20px;

        width: calc(100% - 40px);
        height: 40px;
        // transform: translateX(-50%);
        // bottom: 5%;
        border: 1px solid #fff;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.1);
        font-size: 14px;
        color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
      }
      > .go-chat-btn {
        text-align: left;
        margin-right: 20px;
        width: calc(100% - 40px);
        height: 40px;
        // transform: translateX(-50%);
        // bottom: 5%;
        border: 1px solid #fff;
        border-radius: 12px;
        background: rgba(0, 0, 0, 0.1);
        font-size: 14px;
        color: #fff;
        padding: 0 20px;
        box-sizing: border-box;
      }
      > input::placeholder {
        color: #e2e1e1;
      }
      > .mute-btn {
        margin-right: 5px;
        width: 40px;
        height: 40px;
      }
      > .full-screen-btn {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>