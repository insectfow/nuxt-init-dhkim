<template>
  <div class="live-user-chat-box">
    <ul
      class="chat-list"
      v-for="(user, idx) in chatList"
      :key="idx"
      :class="user.type"
    >
      <li class="user-id">
        {{
          typeID(
            user.type,
            user.brandName,
            user.nickName,
            user.marketNickName
          ) +
          "(" +
          user.userID +
          ")"
        }}
      </li>
      <li class="user-comment">{{ user.comment }}</li>
    </ul>
    <!-- <div>
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
    </div> -->
  </div>
</template>

<script>
export default {
  name: "influencer-mobile-real-chat",
  data() {
    return {
      chatList: [],
      isComment: "",
      myComment: {},
      payload: null,
      config: null,
      myId: null,
    };
  },
  mounted() {
    this.payload = this.getPayload();
    this.config = this.getConfig();
    this.myId = this.payload.user.id;

    this.fb_chat_init(this.config, this.payload);
    // this.fb_logout();
    this.fb_chat_login();
    // this.fb_chat_load_userlist(this.getUserList);
    this.fb_chat_load_message(this.getMarketChat);
    // this.fb_chat_load_message(this.getDealerChat, "dealer");
    // window.parent.postMessage(this.myId, "http://192.168.0.57:8080/");
  },
  updated() {
    document.querySelector("html").scrollTop = document.querySelector(
      "html"
    ).scrollHeight;
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
      if (this.isComment !== "") {
        const today = this.$moment().format("HH:mm");
        this.myComment = {
          userID: this.payload.user.id,
          chatTime: today,
          comment: this.isComment,
        };
        // this.chatList.push(this.myComment);
        this.chatTime = null;
        this.isComment = null;
        document.querySelector("html").scrollTop = document.querySelector(
          "html"
        ).scrollHeight;
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
    //   this.chatList.push(message.data);

    //   // console.log(map);
    //   console.log(this.chatList);
    //   // console.debug("Dealer message :", message);
    // },
    getMarketChat(message) {
      // console.debug("Market message :", message);

      this.chatList.push(message.data);
    },
  },
};
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
}
.live-user-chat-box {
  width: 100%;
  height: 100%;
  > .chat-list {
    margin-top: 5px;
    padding: 0 10px;
    font-size: 14px;
    font-family: "NotoSansKR-Regular";
    > .user-id {
      color: #cccccc;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
    }
    > .user-comment {
      margin-top: 5px;
      padding: 8px 10px;
      color: #fff;
      border-radius: 10px;
      width: max-content;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.3);
    }
  }
  > .chat-list.supervisor {
    > .user-id {
      color: #2699fb;
    }
    > .user-comment {
      background: #2699fb;
      color: #fff;
    }
  }
  > .chat-list.advertiser {
    > .user-id {
      color: #54d4af;
    }
    > .user-comment {
      background: #54d4af;
      color: #fff;
    }
  }
  > .chat-list.influencer {
    > .user-id {
      color: #7285ff;
    }
    > .user-comment {
      background: #7285ff;
      color: #fff;
    }
  }
}
</style>