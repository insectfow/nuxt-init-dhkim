<template>
  <div class="live-chat-box">
    <ul class="chat-list scroll2" ref="listScroll">
      <li
        v-for="(list, idx) in chatList"
        :key="idx"
        :class="list.userID === myId ? 'my-chat' : ''"
      >
        <ul :class="list.type">
          <li class="user-name" :style="{ fontSize: realChatFont + 'px' }">
            <span>{{
              typeID(
                list.type,
                list.brandName,
                list.nickName,
                list.marketNickName
              ) +
              "(" +
              list.userID +
              ")"
            }}</span>
          </li>
          <!-- 내가 보냈을 때 -->
          <li class="user-chat" v-if="list.userID === myId">
            <span
              class="chat-time"
              :style="{ fontSize: realChatFont + 'px' }"
              >{{ $moment(list.chatTime).format("HH:mm") }}</span
            >
            <span
              class="chat-comment"
              :style="{ fontSize: realChatFont + 'px' }"
              >{{ list.comment }}</span
            >
          </li>
          <!-- 남이 보냈을 때 -->
          <li class="user-chat" v-else>
            <span
              class="chat-comment"
              :style="{ fontSize: realChatFont + 'px' }"
              >{{ list.comment }}</span
            >
            <span
              class="chat-time"
              :style="{ fontSize: realChatFont + 'px' }"
              >{{ $moment(list.chatTime).format("HH:mm") }}</span
            >
          </li>
        </ul>
      </li>
    </ul>
    <ul class="chat-input-box clearfix">
      <li>
        <input
          type="text"
          placeholder="대화를 나눠보세요"
          v-model="isComment"
          @keyup.enter="submit"
        />
      </li>
      <li>
        <button
          @click.prevent="submit"
          :disabled="isComment == '' ? true : false"
          :class="isComment == '' ? 'disabled' : ''"
        >
          전송
        </button>
      </li>
    </ul>
    <ul class="font-size-list clearfix">
      <li>
        <a href="#" @click.prevent="fontSize(-2)">A-</a>
      </li>
      <li>
        <a href="#" @click.prevent="fontSize(2)">A+</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "influencer-pc-realchat",
  data() {
    return {
      chatList: [],
      isComment: "",
      myComment: {},
      payload: null,
      config: null,
      myId: null,
      realChatFont: 14,
      userType: null,
      brandName: null,
      nickName: null,
      marketNickName: null,
      startDate: null,
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
    // this.fb_chat_load_userlist(this.getUserList);
    this.fb_chat_load_message(this.getMarketChat);
    // this.fb_chat_load_message(this.getDealerChat, "dealer");
    // window.parent.postMessage(this.myId, "http://192.168.0.57:8080/");
  },

  updated() {
    this.$refs.listScroll.scrollTop = this.$refs.listScroll.scrollHeight;
  },
  methods: {
    typeID(type, brandName, nickName, marketNickName) {
      if (type === "supervisor") {
        return "빅버드";
      } else if (type === "advertiser") {
        return brandName;
      } else if (type === "influencer") {
        return nickName;
      } else {
        return marketNickName;
      }
    },
    submit() {
      if (this.isComment.length > 0) {
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
        } else {
          this.myComment = {
            userID: this.payload.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.userType,
          };
        }

        this.isComment = "";
        this.$refs.listScroll.scrollTop = this.$refs.listScroll.scrollHeight;
        this.fb_chat_send_message(this.myComment);
      } else {
        alert("입력해주세요");
      }
    },
    getPayload() {
      return this.jwt_decode(this.$route.query.token);
    },
    getUserList(user) {
      console.debug("User :", user);
    },
    // getDealerChat(message) {
    //   // this.chatDealerMessage = message;
    //   // this.chatList = message;
    //   this.chatList.push(message.data);
    //   console.debug("Dealer message :", message);
    // },
    getMarketChat(message) {
      this.chatList.push(message.data);

      // console.debug("Market message :", message);
    },
    fontSize(value) {
      if (this.realChatFont >= 10) {
        this.realChatFont = this.realChatFont + value;
      } else {
        return (this.realChatFont = 10);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
}
.live-chat-box {
  position: relative;
  width: 100%;
  // padding: 20px 0;

  > .chat-list {
    padding: 20px;
    overflow-y: auto;
    overflow-x: hidden;
    height: 539px;

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
      > ul.supervisor {
        > .user-name {
          > span {
            color: #2699fb;
          }
        }
        > .user-chat {
          > .chat-comment {
            background: #2699fb;
            color: #fff;
          }
        }
      }
      > ul.advertiser {
        > .user-name {
          > span {
            color: #54d4af;
          }
        }
        > .user-chat {
          > .chat-comment {
            background: #54d4af;
            color: #fff;
          }
        }
      }
      > ul.influencer {
        > .user-name {
          > span {
            color: #7285ff;
          }
        }
        > .user-chat {
          > .chat-comment {
            background: #7285ff;
            color: #fff;
          }
        }
      }
    }
    > li.my-chat {
      > ul {
        > .user-name {
          display: none;
        }
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
      > ul.supervisor {
        > .user-name {
          > span {
            color: #2699fb;
          }
        }
        > .user-chat {
          > .chat-comment {
            background: #2699fb;
            color: #fff;
          }
        }
      }
      > ul.advertiser {
        > .user-name {
          > span {
            color: #54d4af;
          }
        }
        > .user-chat {
          > .chat-comment {
            background: #54d4af;
            color: #fff;
          }
        }
      }
      > ul.influencer {
        > .user-name {
          > span {
            color: #7285ff;
          }
        }
        > .user-chat {
          > .chat-comment {
            background: #7285ff;
            color: #fff;
          }
        }
      }
    }
    > li:last-child {
      margin-bottom: 0;
    }
  }
  > .chat-input-box {
    // bottom: 10px;
    // right: 20px;
    position: fixed;
    bottom: 0;
    border: 1px solid #bbbbbb;
    border-bottom: none;
    border-right: none;
    box-sizing: border-box;
    width: 100%;
    > li {
      float: left;
      height: 50px;
      width: calc(100% - 110px);
      // margin-right: 10px;
      > input {
        display: inline-block;
        width: 100%;
        height: 100%;
        background: #fff;
        color: #000000;
        font-size: 14px;
        padding: 0 10px;
        box-sizing: border-box;
        font-family: "NotoSansKR-Regular";
      }
      > input::placeholder {
        color: #cccccc;
      }
      > button {
        width: 100%;
        height: 100%;
        background: #2699fb;
        color: #fff;
        border: none;
        border-radius: 0;
        font-size: 14px;
        font-family: "NotoSansKR-Medium";
      }
      > button.disabled {
        background: #d4d4d4;
        cursor: default;
      }
    }
    > li:last-child {
      margin-right: 0;
      width: 110px;
    }
  }
  > .font-size-list {
    position: fixed;
    top: 10px;
    right: 10px;
    > li {
      float: left;
      margin-right: 10px;
      > a {
        display: block;
        width: 20px;
        height: 20px;
        border: 1px solid #cccccc;
        background: #fff;
        color: #cccccc;
        font-size: 12px;
        text-align: center;
      }
    }
    > li:last-child {
      margin-right: 0;
    }
  }
}
</style>