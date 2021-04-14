<template>
  <div class="side-content">
    <h4 class="side-content-title">시청자 관리</h4>
    <div class="side-content-box">
      <div class="viewer-management-box">
        <div class="viewer-management-list">
          <h5>
            채팅 금지
            <span>({{muteList.length}})</span>
          </h5>
          <div class="viewer-search-box">
            <span></span>
            <form autocomplete="off">
              <input 
              name="search"
              autocomplete="off"
              type="text"
              placeholder="시청자 검색"
              v-model="muteSearchData"
              @input="muteSearch" />
            </form>
          </div>
          <ul class="viewer-list-scroll" v-if="muteSearchData === ''">
            <li v-for="(mute, index) in muteList" :key="index+ 'mute'">
              <a href="#" @click.prevent="showUserInfo($event, mute, 'muted')">
                <span>{{mute.nickname+ '(' + mute.id + ')'}}</span>                
              </a>              
            </li>                    
          </ul>
          <ul class="viewer-list-scroll" v-else>
            <li v-for="(mute, index) in muteSearchList" :key="index + 'muteSearch'">
              <a href="#" @click.prevent="showUserInfo($event, mute, 'muted')">
                <span>{{mute.nickname+ '(' + mute.id + ')'}}</span>        
              </a>
            </li>         
          </ul>
        </div>
        <div class="viewer-management-list">
          <h5>
            입장 제한
            <span>({{banList.length}})</span>
          </h5>
          <div class="viewer-search-box">
            <span></span>
            <form autocomplete="off">
              <input 
              name="search"
              autocomplete="off"
              type="text"
              placeholder="시청자 검색"
              v-model="banSearchData"
              @input="banSearch" />
            </form>
          </div>
          <ul class="viewer-list-scroll" v-if="banSearchData === ''">
            <li v-for="(ban, index) in banList" :key="index+ 'ban'">
              <a href="#" @click.prevent="showUserInfo($event, ban, 'ban')">
                <span>{{ban.nickname+ '(' + ban.id + ')'}}</span>             
              </a>              
            </li>      
          </ul>
          <ul class="viewer-list-scroll" v-else>            
            <li v-for="(ban, index) in banSearchList" :key="index + 'banSearch'">
              <a href="#" @click.prevent="showUserInfo($event, ban, 'ban')">
                <span>{{ban.nickname+ '(' + ban.id + ')'}}</span>      
              </a>
            </li>           
          </ul>
        </div>
      </div>
    </div>
    <user-info-modal v-if="isUserInfoModal" :left="infoLeft" :top="infoTop" :data="useInfoData" @close="isUserInfoModal = false" @goMute="goMute" @goBan="goBan" :type="0" :userInfoTab="userInfoTab"  />
  </div>
</template>

<script>
import UserInfoModal from '../modal/UserInfoModal.vue';
export default {
  components: { UserInfoModal },
  data(){
    return {
      muteList: [],     
      banList: [],
      muteTimer: null,
      banTimer: null,
      muteSearchList: [],
      muteSearchData: "",
      banSearchList: [],
      banSearchData: "",

      isUserInfoModal: false,
      infoLeft: null,
      infoTop: null,
      useInfoData: null,
      userInfoTab:null
    }
  },
  async mounted() {
    await this.$store.dispatch('setPayload', this.jwt_decode(this.$route.query.token));
    // this.payload = await this.getPayload();
    await this.$store.dispatch('setConfig', this.getConfig());
    console.log('mounted =>',this.loadedPayloads);    

    await this.fb_chat_init(this.loadedConfigs, this.loadedPayloads);
    await this.fb_chat_login();
    await this.fb_chat_load_userlist(this.getMuteList, 'muted');
    await this.fb_chat_load_userlist(this.getBanList, 'banned');
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
    getMuteList(user, type) {
      // ID duplicate check
      if (!this.muteList.find((v) => v.id == user.id)) {
        this.muteList.push(user);
      }
      console.log('user!!! :',user, type);

      if(type === 'removed'){
        const index = this.muteList.findIndex((v) => v.id === user.id);
        console.log(index);
        this.muteList.splice(index, 1);
      }      
    },
    getBanList(user, type) {
      // ID duplicate check
      if (!this.banList.find((v) => v.id == user.id)) {
        this.banList.push(user);
      }
      console.log('user!!! :',user, type);

      if(type === 'removed'){
        const index = this.banList.findIndex((v) => v.id === user.id);
        console.log(index);
        this.banList.splice(index, 1);
      }   
    },
    showUserInfo(e, data, type){
      console.log(e);      
      const v = setInterval(()=> {
        if(e.clientY > 560){          
          this.infoTop = e.clientY - 32;
        } else {
          this.infoTop = e.clientY;
        }
        this.infoLeft = e.clientX;        

        this.userInfoTab = type;
        
        this.useInfoData = data;
        this.isUserInfoModal = true;
        clearInterval(v);
      },10)      
    },
    goMute(id){
      console.log(id);
      this.fb_chat_user_state(id, 'muted', false);
      
      
      
      // if(this.muteList.findIndex((v) => v.muted)){
      //   this.muteList = this.muteList.splice(v, 0);
      // }
      
      this.isUserInfoModal = false;
    },
    goBan(id){
      this.fb_chat_user_state(id, 'banned', false);
      this.isUserInfoModal = false;
    },
    muteSearch() {
      if (this.muteTimer) {
        clearTimeout(this.muteTimer);
      }
      this.muteTimer = setTimeout(() => {       
        this.muteSearchList = this.muteList.filter(
          (v) => v.id.toLowerCase().includes(this.muteSearchData.toLowerCase()) || 
          v.nickname.toLowerCase().includes(this.muteSearchData.toLowerCase())
        );
      }, 200);
    },
    banSearch() {
      if (this.banTimer) {
        clearTimeout(this.banTimer);
      }
      this.banTimer = setTimeout(() => {       
        this.banSearchList = this.banList.filter(
          (v) => v.id.toLowerCase().includes(this.banSearchData.toLowerCase()) || 
          v.nickname.toLowerCase().includes(this.banSearchData.toLowerCase())
        );
      }, 200);
    },
  }
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
.viewer-management-box {
  > .viewer-management-list {
    > h5 {
      padding: 20px;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      font-size: 14px;
      color: #000;
    }
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
          height: calc(100% - 2px);
          color: #000;
          border: none;
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
      height: 250px;
      border-bottom: 1px solid #eeeeee;
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
  > .viewer-management-list:last-child {
    margin-top: 40px;
    border-top: 1px solid #eeeeee;
  }
}
</style>