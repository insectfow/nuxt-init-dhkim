<template>
  <div class="side-content">
    <h4 class="side-content-title">
      시청자 목록
      <span>{{ "(" + viewerList.length + ")" }}</span>
    </h4>
    <div class="side-content-box">
      <div class="viewer-list-box">
        <div class="viewer-search-box">
          <span></span>
          <form autocomplete="off">
            <input
              name="search"
              autocomplete="off"
              type="text"
              placeholder="시청자 검색"
              v-model="searchData"
              @input="search"
            />
          </form>
        </div>
        <ul class="viewer-list-scroll" v-if="searchData === ''">
          <li v-for="(list, idx) in viewerList" :key="idx">
            <a href="#" @click.prevent="showUserInfo($event, list)">{{`${list.nickname}(${list.id}) `}}</a>
          </li>         
        </ul>
        <ul class="viewer-list-scroll" v-else>
          <li v-for="(list, idx) in searchList" :key="idx">
            <a href="#"  @click.prevent="showUserInfo($event, list)">{{`${list.nickname}(${list.id}) `}}</a>
          </li>
        </ul>
      </div>
    </div>
    <user-info-modal v-if="isUserInfoModal" :left="infoLeft" :top="infoTop" :data="useInfoData" @close="isUserInfoModal = false" @goMute="goMute" @goBan="goBan" :type="1" />
  </div>
</template>

<script>
export default {
  name: "viewerList",
  data() {
    return {
      viewerList: [],     
      chatty: null,
      loggedIn: null,
      timer: null,
      searchList: [],
      searchData: "",

      isUserInfoModal: false,
      infoLeft: null,
      infoTop: null,
      useInfoData: null
    };
  },
  async mounted() {
    await this.$store.dispatch('setPayload', this.jwt_decode(this.$route.query.token));
    // this.payload = await this.getPayload();
    await this.$store.dispatch('setConfig', this.getConfig());
    console.log('mounted =>',this.loadedPayloads);    

    await this.fb_chat_init(this.loadedConfigs, this.loadedPayloads);
    await this.fb_chat_login();
    await this.fb_chat_load_userlist(this.getUserList);

    await this.fb_chat_user_count(this.getLoginInAndChatty, 'logged_in');
    await this.fb_chat_user_count(this.getLoginInAndChatty, 'chatty');     
    
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
    // firebase load userList
    getUserList(user) {
      // ID duplicate check
      if (!this.viewerList.find((v) => v.id == user.id)) {
        this.viewerList.push(user);
      }
      console.log('dsf', user);

      this.fb_chat_user_count(this.getLoginInAndChatty, 'logged_in');
      this.fb_chat_user_count(this.getLoginInAndChatty, 'chatty');     
      
    },

    // 시청자 목록 검색 (id or nickName )
    search() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {       
        this.searchList = this.viewerList.filter(
          (v) => v.id.toLowerCase().includes(this.searchData.toLowerCase()) || 
          v.nickname.toLowerCase().includes(this.searchData.toLowerCase())
        );
      }, 200);
    },
    getLoginInAndChatty(value, type){
      if(type === 'logged_in'){

        this.loggedIn = value;
      }else if(
        type === 'chatty'
      ){
        this.chatty = value;
      }
      window.parent.postMessage(
        {
          status: "userCount",
          loggedIn: this.loggedIn,
          chatty: this.chatty,
        },
        "*"
      );
      
    },
    showUserInfo(e, data){
      console.log(e);      
      const v = setInterval(()=> {
        if(e.clientY > 560){          
          this.infoTop = e.clientY - 200;
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
      console.log(id);
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
.side-content-title {
  background: #fff;
  padding: 40px 20px 20px;
  box-sizing: border-box;
  font-size: 16px;
  color: #000;
  border-bottom: 1px solid #eeeeee;
}
.viewer-list-box {
  > .viewer-search-box {
    height: 40px;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eeeeee;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    justify-content: left;
    align-items: center;
    > form {
      width: calc(100% - 24px);
      height: 100%;
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        color: #000;
        border: none;
        box-sizing: border-box;
      }
      input::placeholder {
        color: #bbbbbb;
      }
    }

    > span {
      display: inline-block;
      width: 17px;
      height: 17px;
      background: url(../../assets/img/dodbo@2x.png) repeat center;
      background-size: cover;
      margin-right: 7px;
    }
  }
  > .viewer-list-scroll {
    overflow-x: hidden;
    overflow-y: auto;
    height: 705px;
    > li {
      padding: 6px 20px;
      box-sizing: border-box;
      font-size: 12px;
      color: #000;
    }
    > li:nth-child(2n-1) {
      background: #f9f9f9;
    }
    > li:nth-child(2n) {
      background: #fff;
    }
  }
}
</style>