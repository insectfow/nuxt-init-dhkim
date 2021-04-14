<template>
  <div class="live-detail-content admin">
    <div class="live-chat-box">
      <ul class="live-chat-box-list" ref="listScroll">
        <!-- 채팅 로그 -->
        <li
          v-for="(list, idx) in chatList"
          :key="idx"
          :class="list.userID === myId ? 'my-chat' : ''"
        >
          <div :class="list.type">
            <span
              class="user-name"
              v-if="list.userID !== myId && list.isView"
              >{{
                typeID(list.type, list.brandName, list.nickName) +
                "(" +
                list.userID +
                ")"
              }}</span
            >
            <span class="chat-comment">
              {{ list.comment }}
            </span>
            <!-- v-if="list.isTimeView" -->
            <span class="chat-time">{{
              $moment(list.chatTime).format("HH:mm")
            }}</span>
          </div>
        </li>
      </ul>
      <div class="submit-box">
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
</template>

<script>
export default {
  name: "influencer-pc-admin-chat",
  data() {
    return {
      chatList: [],
      isComment: "",
      myComment: {},
     
    };
  },
  async mounted() {
    await this.$store.dispatch('setPayload', this.jwt_decode(this.$route.query.token));
    // this.payload = await this.getPayload();
    await this.$store.dispatch('setConfig', this.getConfig());
    console.log('mounted =>',this.loadedPayloads);    
    

    await this.fb_chat_init(this.loadedConfigs, this.loadedPayloads);
    await this.fb_chat_login();
    await this.fb_chat_load_message(this.getDealerChat, this.loadedConfigs.chat.type.dealer);
  },
  updated() {
    document.querySelector("html").scrollTop = document.querySelector(
      "html"
    ).scrollHeight;
  },
  computed: {   
    loadedPayloads(){
      return this.$store.getters.loadedPayloads;
    },
    loadedConfigs(){
      return this.$store.getters.loadedConfigs;
    }, 
    myId(){
      return this.loadedPayloads.user.id;
    }
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
        if (this.loadedPayloads.user.type === "advertiser") {
          this.myComment = {
            userID: this.loadedPayloads.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.loadedPayloads.user.type,
            brandName: this.loadedPayloads.campaign.brandName,
          };
        } else if (this.loadedPayloads.user.type === "influencer") {
          this.myComment = {
           userID: this.loadedPayloads.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.loadedPayloads.user.type,
            nickName: this.loadedPayloads.shop.nickName,
          };
        } else {
          this.myComment = {
            userID: this.loadedPayloads.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.loadedPayloads.user.type,
          };
        }
        this.isComment = "";
        document.querySelector("html").scrollTop = document.querySelector(
          "html"
        ).scrollHeight;
        this.fb_chat_send_message(this.myComment, this.loadedConfigs.chat.type.dealer);
      } else {
        alert("입력해주세요");
      }
    },
    getPayload() {
      return this.jwt_decode(this.$route.query.token);
    },
    getUserList(user) {
      // console.debug("User :", user);
    },
    getDealerChat(message) {
      // this.chatDealerMessage = message;
      this.chatList.push(message.data);
      // this.chatList = this.chatList.map()
      window.parent.postMessage({ status: "chatOn" }, "*");
      this.chatList = this.chatList.map((v, i) => {
        if (i) {
          this.chatList[i - 1].userID === this.chatList[i].userID
            ? (v.isView = false)
            : (v.isView = true);

          // if (this.chatList[i - 1].userID === this.chatList[i].userID) {
          //   this.chatList[i - 1].chatTime === this.chatList[i].chatTime
          //     ? (v.isTimeView = true)
          //     : (v.isTimeView = false);
          // } else {
          //   v.isTimeView = false;
          // }
        } else {
          v.isView = true;
        }
        return v;
      });

      // console.log(map);
      // console.log(this.chatList);
      // console.debug("Dealer message :", message);
    },
    // getMarketChat(message) {
    //   this.chatList.push(message.data);
    // console.debug("Market message :", message);
    // },
  },
};
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
}
.live-detail-content {
  border-bottom: 1px solid #cccccc;
  height: calc(100% - 50px);
  > .live-detail-item-list {
    padding: 0 20px;
    > li {
      width: 100%;
      border-bottom: 1px solid #f2f2f2;
      padding-bottom: 10px;
      margin-bottom: 10px;
      > span {
        display: inline-block;
        width: 100%;
      }
      > .live-detail-item-title {
        font-size: 12px;
        color: #000000;
      }
      > .live-detail-item-amount {
        font-size: 12px;
        color: #bbbbbb;
      }
      > .live-detail-item-account {
        margin-top: 10px;
        > span {
          color: #707070;
          margin-right: 3px;
          font-size: 12px;
        }
        > strong {
          color: #000;
          font-family: "Noto Sans CJK KR Bold";
          font-size: 12px;
        }
      }
    }
    > li:first-child {
      border-top: 1px solid #f2f2f2;
      padding-top: 10px;
    }
    > li:last-child {
      border-bottom: none;
      margin-bottom: 10px;
    }
  }
  > .live-chat-box {
    position: relative;
    width: 100%;
    height: 100%;
    > .live-chat-box-list {
      padding: 20px;
      box-sizing: border-box;
      width: 100%;
      margin-bottom: 50px;
      > li {
        margin-bottom: 10px;
        > div {
          > span {
            display: inline-block;
            width: 100%;
          }
          > .user-name {
            font-family: "Noto Sans CJK KR Medium";
            font-size: 14px;
            color: #000;
            margin-bottom: 10px;
          }
          > .chat-comment {
            padding: 8px 10px;
            background: #f9f9f9;
            border-radius: 10px;
            font-size: 12px;
            color: #000;
            width: max-content;
            width: auto;
            box-sizing: border-box;
          }
          > .chat-time {
            font-size: 12px;
            color: #bbb;
          }
        }

        > div.advertiser {
          > .user-name {
            color: #54d4af;
          }
          > .chat-comment {
            padding: 8px 10px;
            background: #54d4af;
            border-radius: 10px;
            font-size: 12px;
            color: #fff;
            width: max-content;
            width: auto;
            box-sizing: border-box;
          }
        }
        > div.advertiser {
          > .user-name {
            color: #54d4af;
          }
          > .chat-comment {
            background: #54d4af;
            color: #fff;
          }
        }
        > div.supervisor {
          > .user-name {
            color: #2699fb;
          }
          > .chat-comment {
            background: #2699fb;
            color: #fff;
          }
        }
        > div.influencer {
          > .user-name {
            color: #7285ff;
          }
          > .chat-comment {
            background: #7285ff;
            color: #fff;
          }
        }
      }

      > li.my-chat {
        text-align: right;
        > div {
          > span.user-name {
            display: none;
          }
          > .chat-comment {
            background: #e9f5ff;
          }
        }
        > div.advertiser {
          > .user-name {
            color: #54d4af;
          }
          > .chat-comment {
            background: #54d4af;
            color: #fff;
          }
        }
        > div.supervisor {
          > .user-name {
            color: #2699fb;
          }
          > .chat-comment {
            background: #2699fb;
            color: #fff;
          }
        }
        > div.influencer {
          > .user-name {
            color: #7285ff;
          }
          > .chat-comment {
            background: #7285ff;
            color: #fff;
          }
        }
      }
    }
    > .submit-box {
      position: fixed;
      bottom: 0;
      width: 100%;
      height: 50px;
      border-top: 1px solid #bbbbbb;
      box-sizing: border-box;
      display: flex;
      > input::placeholder {
        color: #cccccc;
        font-size: 14px;
      }
      > input {
        border: none;
        width: calc(100% - 55px);
        height: 100%;
        display: inline-block;
        color: #000;
        font-size: 14px;
        padding: 0 10px;
        box-sizing: border-box;
        font-family: "NotoSansKR-Regular";
      }
      > button {
        background: #2699fb;
        width: 55px;
        height: 100%;
        display: inline-block;
        font-family: "NotoSansKR-Medium";
        font-size: 14px;
        color: #fff;
        border: none;
      }
      > button.disabled {
        background: #d4d4d4;
        cursor: default;
      }
    }
  }
}
.live-detail-content.admin {
  height: calc(579px - 50px);
  border-bottom: none;
}
</style>