<template>
  <div class="side-content">
    <h4 class="side-content-title" @click.prevent="test">관리자 채팅</h4>
    <div class="side-content-box">
      <div class="admin-chat-box">
        <ul class="chat-list" ref="listScroll">
          <!-- 채팅 로그 -->
          <li
            v-for="(list, idx) in chatList"
            :key="idx"
            :class="list.userID === myId ? 'my-chat' : ''"
          >
            <ul :class="list.type">
              <li class="user-name">
                <span>{{
                  typeID(list.type, list.brandName, list.nickName) +
                  "(" +
                  list.userID +
                  ")"
                }}</span>
                <!-- list.type -->
              </li>
              <!-- 내가 보냈을 때 -->
              <li class="user-chat" v-if="list.userID === myId">
                <span class="chat-time">{{
                  $moment(list.chatTime).format("HH:mm")
                }}</span>
                <span class="chat-comment">{{ list.comment }}</span>
              </li>
              <!-- 남이 보냈을 때 -->
              <li class="user-chat" v-else>
                <span class="chat-comment">{{ list.comment }}</span>
                <span class="chat-time">{{
                  $moment(list.chatTime).format("HH:mm")
                }}</span>
              </li>
            </ul>
          </li>
        </ul>
        <div class="chat-board">
          <input
            type="text"
            placeholder="대화를 나눠보세요"
            v-model="isComment"
            @keyup.enter="submit"
          />
          <button
            @click.prevent="submit"
            :disabled="isComment == '' ? true : false"
            :class="isComment == '' ? 'disabled' : ''"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "op-cl-adminChat",
  data() {
    return {
      chatList: [],
      isComment: "",
      myComment: {},
      payload: null,
      config: null,
      myId: null,
      logout: null,
      userType: null,
      brandName: null,
      nickName: null,
    };
  },
  computed: {},

  updated() {
    this.$refs.listScroll.scrollTop = this.$refs.listScroll.scrollHeight;
  },
  mounted() {
    this.payload = this.getPayload();
    this.config = this.getConfig();
    this.myId = this.payload.user.id;
    this.userType = this.payload.user.type;
    this.brandName = this.payload.campaign.brandName;
    this.nickName = this.payload.shop.nickName;

    this.fb_chat_init(this.config, this.payload);
    // this.fb_chat_logout();
    this.fb_chat_login();
    // this.fb_chat_load_userlist(this.getUserList);
    // this.fb_chat_load_message(this.getMarketChat);
    this.fb_chat_load_message(this.getDealerChat, "dealer");

    window.addEventListener(
      "message",
      function (e) {
        if (
          e.origin === "http://192.168.0.57:8080" ||
          "http://192.168.0.57:8080" ||
          "https://stage.client.bigbird.co.kr" ||
          "https://client.bigbird.co.kr" ||
          "https://operator.bigbird.co.kr" ||
          "https://stage.operator.bigbird.co.kr"
        ) {
          // e.data를 사용한 동작 수행
          // this.message = e.data;
          // console.log(e.data, "로 로그아웃 하셨습니다.");
          if (e.data) {
            this.fb_chat_logout();
            window.parent.postMessage(
              { status: "logout", value: true },
              "http://192.168.0.57:8080" ||
                "https://stage.client.bigbird.co.kr" ||
                "https://client.bigbird.co.kr" ||
                "https://operator.bigbird.co.kr" ||
                "https://stage.operator.bigbird.co.kr"
            );
          }
        }
        // this.message = document
        //   .getElementById("admin-chat-frame")
        //   .contentWindow.postMessage(e.data, "*");
      }.bind(this)
    );
  },
  beforeDestroy() {
    window.removeEventListener("message", function (e) {
      if (
        e.origin === "http://192.168.0.57:8080" ||
        "https://stage.client.bigbird.co.kr" ||
        "http://client.bigbird.co.kr" ||
        "https://operator.bigbird.co.kr" ||
        "https://stage.operator.bigbird.co.kr"
      ) {
        // e.data를 사용한 동작 수행
        // this.message = e.data;
        // console.log(e.data, "로 로그아웃 하셨습니다.", this.message);
      }
    });
  },

  methods: {
    typeID(type, brandName, nickName) {
      if (type === "supervisor") {
        return "빅버드";
      } else if (type === "advertiser") {
        return brandName;
      } else if (type === "influencer") {
        return nickName;
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
            brandName: this.brandName,
          };
        } else if (this.userType === "influencer") {
          this.myComment = {
            userID: this.payload.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.userType,
            nickName: this.payload.user.nickName,
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
        this.fb_chat_send_message(this.myComment, "dealer");
      } else {
        alert("입력해주세요");
      }
    },
    getPayload() {
      return this.jwt_decode(this.$route.query.token);
    },
    // getUserList(user) {
    //   console.debug("User :", user);
    // },
    getDealerChat(message) {
      // this.chatDealerMessage = message;
      // this.chatList = message;
      this.chatList.push(message.data);
      console.debug("Dealer message :", message);
      window.parent.postMessage({ status: "chatOn" }, "*");
    },
    // getMarketChat(message) {
    //   this.chatMarketMessage = message;
    //   console.debug("Market message :", message);
    // },
    // getNumberOfLoggedInUsers(count) {
    //   this.count_logged_in_user = count;
    //   console.debug("Number of Logged in Users :", count);
    // },
    // getNumberOfChattyUsers(count) {
    //   this.count_chatty_user = count;
    //   console.debug("Number of Chatty Users :", count);
    // },
  },
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
.admin-chat-box {
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
          > span {
            font-family: "Noto Sans CJK KR Medium";
            font-size: 14px;
            color: #000;
          }
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
            font-family: "Noto Sans CJK KR Regular";
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
      font-family: "Noto Sans CJK KR Regular";
      border: none;
      border-radius: 0;
    }
    > button.disabled {
      background: #d4d4d4;
      cursor: default;
    }
  }
}
</style>