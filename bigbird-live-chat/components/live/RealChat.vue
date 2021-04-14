<template>
  <section class="chat-wrap">
    <div class="real-chat">
      <h4>실시간 채팅</h4>
      <div class="real-chat-box">
        <ul class="chat-list" ref="listScroll">
          <!-- 채팅 로그 -->
          <li
            v-for="(list, idx) in chatList"
            :key="idx"
            :class="list.userID === myId ? 'my-chat' : ''"
          >
            <ul :class="list.type">
              <li class="user-name">
                <a href="#" @click.prevent="showUserInfo($event, list)" v-if="list.type === 'purchaser'" :disabled="false">
                  {{ typeID(
                    list.type,
                    list.brandName,
                    list.nickName,
                    list.marketNickName
                  ) +
                  "(" +
                  list.userID +
                  ")"}}
                </a>     
                <a :href="false" :disabled="true" v-else>
                  {{ typeID(
                    list.type,
                    list.brandName,
                    list.nickName,
                    list.marketNickName
                  ) +
                  "(" +
                  list.userID +
                  ")"}}
                </a>                
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
          <button @click.prevent="submit">전송</button>
        </div>
      </div>
    </div>
    <notice-modal v-if="isNoticeModal" :text="noticeText" />
    <user-info-modal v-if="isUserInfoModal" :left="infoLeft" :top="infoTop" :data="useInfoData" @close="isUserInfoModal = false" @goMute="goMute" @goBan="goBan" :type="1" />
  </section>
</template>

<script>
import NoticeModal from '@/components/modal/NoticeModal'
import UserInfoModal from '../modal/UserInfoModal.vue';
export default {
  name: "op-cl-realchat",
  data() {
    return {
      chatList: [],
      isComment: "",
      myComment: {},
      noticeText: null,
      isNoticeModal: false,
      isUserInfoModal: false,
      infoLeft: null,
      infoTop: null,
      useInfoData: null
    };
  },
  components: {
    NoticeModal,
    UserInfoModal
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

  // updated() {
  //   this.$refs.listScroll.scrollTop = this.$refs.listScroll.scrollHeight;
  // },
  computed: {
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
      if (
        this.$moment().format("YYYY.MM.DD HH:mm") >
        this.$moment(this.loadedPayloads.influencerShop.date.start, 'YYYY.MM.DD HH:mm').format("YYYY.MM.DD HH:mm")
      ) {
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
          this.fb_chat_send_message(this.myComment, this.loadedConfigs.chat.type.marktet);
          const time = setInterval(() => {
            this.$refs.listScroll.scrollTop = this.$refs.listScroll.scrollHeight;
            clearInterval(time);
          }, 100);          
        } else {
          this.noticeData("입력해주세요.")
        }
      } else {
        this.noticeData("라이브 시간에 실시간 채팅 가능합니다. 기다려주세요.")
      }
    },
    
    getUserList(user) {
      // console.debug("User :", user);
    },
   
    getMarketChat(message) {
      if(this.isUserInfoModal){
          this.chatList.push(message.data);
      } else {
        const time = setInterval(() => {
            this.$refs.listScroll.scrollTop = this.$refs.listScroll.scrollHeight;
            clearInterval(time);
          }, 100);
        this.chatList.push(message.data);
      }
      
      
      // console.debug("Market message :", message);
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
    showUserInfo(e, data){
      console.log(e);      
      
        const v = setInterval(()=> {
        if(e.clientY > 560){          
          this.infoTop = e.clientY - 61;
        } else {
          this.infoTop = e.clientY;
        }
        this.infoLeft = e.clientX;
        
        this.useInfoData = data;
        this.isUserInfoModal = true;
        clearInterval(v);
      },10) 
           
    },
    goMute(id){
      this.fb_chat_user_state(id, 'muted', true);
      this.isUserInfoModal = false;
    },
    goBan(id){
      this.fb_chat_user_state(id, 'banned', true);
      this.isUserInfoModal = false;
    }
  },
};
</script>

<style lang="scss" scoped>
input:focus {
  outline: none;
}
h4 {
  background: #fff;
  padding: 40px 20px 20px;
  box-sizing: border-box;
  font-size: 16px;
  color: #000;
  border-bottom: 1px solid #eeeeee;
}
.chat-wrap {
  position: relative;
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
          > ul.supervisor {
            > .user-name {
              > a {
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
              > a {
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
              > a {
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
          border-radius: 0;
        }
        > button.disabled {
          background: #d4d4d4;
          cursor: default;
        }
      }
    }
  }
}
</style>