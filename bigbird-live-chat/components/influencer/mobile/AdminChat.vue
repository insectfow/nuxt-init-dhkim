<template>
  <section class="modal-content scroll" id="content">
    <ul v-for="(list, idx) in chatList" :key="idx" :class="list.type">
      <li class="user-name" v-if="list.isView">
        <div class="user-name">
          <span>{{
            typeID(list.type, list.brandName, list.nickName) +
            "(" +
            list.userID +
            ")"
          }}</span>
        </div>
      </li>
      <li>
        <div class="chat-box">
          <span class="comment"> {{ list.comment }}</span>
        </div>
        <div class="chat-date">
          <span>{{ $moment(list.chatTime).format("HH:mm") }}</span>
        </div>
      </li>
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
  </section>
</template>

<script>
export default {
  name: "influencer-mobile-admin-chat",
  data() {
    return {
      chatList: [],
      isComment: "",
      myComment: {},     
    };
  },
  computed: {
    loadedPayloads(){
      return this.$store.getters.loadedPayloads;
    },
    loadedConfigs(){
      return this.$store.getters.loadedConfigs;
    },    
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
    getDealerChat(message) {
      this.chatList.push(message.data);
      window.parent.postMessage({ status: "chatOn" }, "*");
      this.chatList = this.chatList.map((v, i) => {
        if (i) {
          this.chatList[i - 1].userID === this.chatList[i].userID
            ? (v.isView = false)
            : (v.isView = true);

        } else {
          v.isView = true;
        }

        return v;
      });

      // console.log(map);
      //   console.log(this.chatList);
      // console.debug("Dealer message :", message);
    },
    // getMarketChat(message) {
    //   this.chatList.push(message.data);
    //   console.debug("Market message :", message);
    // },
  },
};
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
}
.modal-content {
  width: 100%;
  height: 100%;
  > ul {
    width: 100%;
    > li.user-name {
      margin-top: 6px;
      height: auto;
    }
    > li {
      width: 100%;
      display: flex;
      justify-content: left;
      align-items: flex-end;
      margin-bottom: 10px;

      > .chat-box {
        padding: 8px 10px;
        border-radius: 10px;
        background: #2699fb;
        max-width: calc(100% - 58px);
        > .comment {
          color: #fff;
          font-size: 14px;
          font-family: "Noto Sans CJK KR Medium";
        }
      }
      > .user-name {
        display: block;
        font-family: "Noto Sans CJK KR Medium";
        font-size: 14px;
        color: #000;
      }
      > .chat-date {
        margin-left: 10px;
        margin-bottom: 5px;
        > span {
          display: inline-block;
          font-size: 12px;
          color: #bbbbbb;
        }
      }
    }
  }
  > ul.supervisor {
    > li {
      > .user-name {
        > span {
          color: #2699fb;
        }
      }
      > .chat-box {
        background: #2699fb;
        > .comment {
          color: #fff;
        }
      }
    }
  }
  > ul.advertiser {
    > li {
      > .user-name {
        > span {
          color: #54d4af;
        }
      }
      > .chat-box {
        background: #54d4af;
        > .comment {
          color: #fff;
        }
      }
    }
  }
  > ul.influencer {
    > li {
      > .user-name {
        > span {
          color: #7285ff;
        }
      }
      > .chat-box {
        background: #7285ff;
        > .comment {
          color: #fff;
        }
      }
    }
  }
}
</style>