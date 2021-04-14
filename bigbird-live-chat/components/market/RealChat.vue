<template>
  <div class="chatting-wrap vjs-fullscreen" v-if="loadedPayloads">
    <div class="top-area">
      <div class="chatting-container"  :class="!isToggleChatBox ? 'off' : ''" v-show="!userInfo.banned">
        <ul ref="scroll" class="chatting-box scroll-no" v-show="isToggleChatBox">
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
      <div class="popup-wrap"  v-show="!userInfo.banned">
        <a :href="false" @click.prevent="fullScreen('off')"  >
          <div class="item-img">
            <img
              :src="loadedPayloads.shop.item.url.image"
              :alt="loadedPayloads.influencerShop.title + '상품 이미지'"
            />
          </div>
          <ul class="item-info">
            <li class="item-name overtext">
              {{ loadedPayloads.influencerShop.title }}
            </li>
            <li class="item-account">
              <strong
                >{{
                  numberConvertComma(loadedPayloads.shop.item.price.group)
                }}원</strong
              >
              <span
                >{{
                  numberConvertComma(loadedPayloads.shop.item.price.retail)
                }}원</span
              >
            </li>
          </ul>
        </a>
        <button  @click="toggleChatBox"></button>
      </div>
      <div class="function-box" :class="userInfo.banned ? 'ban' : ''">
        <template v-if="isFullScreen === true">
          <input v-show="!userInfo.banned"
            id="in_chat"
            type="text"
            autocomplete="off"
            placeholder="대화를 나눠보세요."
            :value="isComment"
            @keydown="setIsComment($event)"
            @keyup.enter="submit"            
          />
          <div v-show="!userInfo.banned" class="length-count" :class="isComment.length > 40 ? 'no' : ''">
            <span>{{isComment.length > 0 ? isComment.length : 0 }}/40</span>
          </div>
        </template>
        <template v-else>
          <button  v-show="!userInfo.banned" class="go-chat-btn" @click.prevent="fullScreen('on')">
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
    <notice-modal v-if="isNoticeModal" :text="noticeText" />
  </div>
</template>

<script>
import NoticeModal from '../modal/NoticeModal.vue';
export default {
  components: { NoticeModal },
  name: "market-mobile-realchat",
  data() {
    return {
      chatList: [],
      isComment: "",
      myComment: {},
      realChatFont: 14,
      userList: [],
      isFullScreen: false,
      isToggleChatBox: true,
      isChat: true,
      isNoticeModal: false,
      noticeText: null,
      userInfo: {},
      loggedIn: null
    };
  },

  async mounted() {
    
    await this.$store.dispatch('setPayload', this.jwt_decode(this.$route.query.token));
    // this.payload = await this.getPayload();
    await this.$store.dispatch('setConfig', this.getConfig());
    console.log('mounted =>',this.loadedPayloads);    
    
    await this.fb_chat_init(this.loadedConfigs, this.loadedPayloads);
    await this.fb_chat_login();
    await this.fb_chat_user_count(this.getLoginInAndChatty, 'logged_in');
    await this.fb_chat_load_userinfo(this.getUserInfo);
    await this.fb_chat_load_message(this.getMarketChat, this.loadedConfigs.chat.type.market, 10);

    if(this.getUserInfo.banned){
       this.noticeData('채팅 제한 되었습니다');
    }
    // await this.fb_chat_load_userinfo();
  },
  computed: {
    sort(){
      this.chatList.sort((a, b) => {
        return this.$moment(a.chatTime) - this.$moment(b.chatTime);
      })
      return this.chatList;
    },
    maxLength(){
      return this.isComment.length;
    },
    loadedPayloads(){
      return this.$store.getters.loadedPayloads;
    },
    loadedConfigs(){
      return this.$store.getters.loadedConfigs;
    },
    myId(){
      return this.loadedPayloads.user.id;
    },
    
    
  },

  updated() {
    // this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
  },
  methods: {
    setIsComment(e){
      // console.log(e)
      // this.$set(this.isComment, e.target.value)
      setTimeout(()=> {
        this.isComment = e.target.value
      },10)
    },
    typeID(type, brandName, nickName, marketNickName) {
      if (type === "supervisor") {
        return "빅버드";
      } else if (type === "advertiser") {
        return brandName;
      } else if (type === "influencer") {
        return "인플루언서";
      } else if (type === "purchaser") {
        return marketNickName;
      }
    },
    toggleChatBox(){
      this.isToggleChatBox = !this.isToggleChatBox;
      console.log('this.isToggleChatBox', this.isToggleChatBox);

      if(this.isToggleChatBox === false){
        window.parent.postMessage({ status: "chatBox", value: false }, "*");
      } else {
        window.parent.postMessage({ status: "chatBox", value: true }, "*");
      }
    },
    submit() {
      if(this.userInfo.muted){        
        this.noticeData('벙어리입니다');
      }        
      if (this.isComment.length > 0 && this.isComment.length <= 40) {
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
        } else if (this.loadedPayloads.user.type === "purchaser") {
          this.myComment = {
            userID: this.loadedPayloads.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.loadedPayloads.user.type,
            marketNickName: this.loadedPayloads.user.nickname,
          };
        } else if (this.loadedPayloads.user.type === "supervisor") {
          this.myComment = {
            userID: this.loadedPayloads.user.id,
            chatTime: today.getTime(),
            comment: this.isComment,
            type: this.loadedPayloads.user.type,
          };
        }
        this.isComment = "";
        const time = setInterval(() => {
            this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
            clearInterval(time);
          }, 100);   
        
        this.isToggleChatBox = true;
        this.fb_chat_send_message(this.myComment, this.loadedConfigs.chat.type.marktet);        
      } else if (this.isComment.length > 40 && this.isComment.length > 0) {
        this.noticeData('최대 40자까지 입력 가능합니다');        
      } else {
        this.noticeData('텍스트를 입력해주세요');
      }
    },
    getMarketChat(message) {
      this.chatList.splice(0, 0, message.data);
      const time = setInterval(() => {
        this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
        clearInterval(time);
      }, 100); 
    
      console.debug("Market message :", message);
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
    noticeData(text){
      this.noticeText = null;
      this.noticeText = text;
        this.isNoticeModal = true;
        const time = setInterval(() => {
          this.isNoticeModal = false;
          clearInterval(time);
        }, 1000)
    },
    getUserInfo(user, type){
      // console.log('user :', user, type);
      
      if(user.banned){        
        this.noticeData('채팅 제한 되었습니다');
          const time = setInterval(() => {
          this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight;
          clearInterval(time);
        }, 100);  
      }
           
      return this.userInfo = user;
    },
    getLoginInAndChatty(value, type){
      if(type === 'logged_in'){
        this.loggedIn = value;
      }   
      window.parent.postMessage(
        { status: "userCount", value: this.loggedIn+1 },
        "*"
      );
      
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
    justify-content: flex-end;
    align-items: flex-start;
    flex-flow: column;
    > .chatting-container {
      display: inline-block;
      bottom: 0;
      border-radius: 0 0 29px 29px;
      width: 100%;
      height: calc(100% - 130px);
      z-index: 60;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      flex-flow: column;
      > .chatting-box {
        width: calc(100% - 60px);
        padding: 0 20px;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
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
              word-break: break-all;
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
    > .chatting-container.off {
      height: 0;
    }
    > .popup-wrap {
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      box-sizing: border-box;
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
      > button {
        width: 20px;
        height: 20px;
      }
    }    
    > .function-box.ban {
      justify-content: flex-end;
    }
    > .function-box {
      position: relative;
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
        padding: 0 65px 0 20px;
        box-sizing: border-box;
      }
      > .length-count {
        position: absolute;
        left: calc(100% - 120px);
        top: 50%;
        transform: translateY(-50%);
        text-align: right;
        width: 50px;
        > span {
          color: #fff;
        text-shadow: 1px 1px 0 rgba(0,0,0,.16);
        }
      }
      > .length-count.no {
        > span {
          color: #f00;
        }
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