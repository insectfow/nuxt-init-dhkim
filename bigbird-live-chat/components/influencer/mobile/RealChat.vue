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
     
    };
  },
  async mounted() {
    await this.$store.dispatch('setPayload', this.jwt_decode(this.$route.query.token));
    // this.payload = await this.getPayload();
    await this.$store.dispatch('setConfig', this.getConfig());
    console.log('mounted =>',this.loadedPayloads);    

    await this.fb_chat_init(this.loadedConfigs, this.loadedPayloads);
    await this.fb_chat_login();
    await this.fb_chat_load_message(this.getMarketChat, this.loadedConfigs.chat.type.market);

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
        if (this.loadedPayloads.user.type === "advertiser") {
          this.myComment = {
            userID: this.payload.user.id,
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
        // this.chatList.push(this.myComment);
        this.isComment = '';
        document.querySelector("html").scrollTop = document.querySelector(
          "html"
        ).scrollHeight;
        this.fb_chat_send_message(this.myComment, this.loadedConfigs.chat.type.marktet);
      } else {
        alert("입력해주세요");
      }
    },        
    getMarketChat(message) {      
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
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  flex-flow: column;
  // height: 100%;
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
      width: auto;
      display: inline-block;
      box-sizing: border-box;
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