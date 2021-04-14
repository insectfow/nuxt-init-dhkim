<template>
  <div id="bottom" :class="`${platform} === 'mobile' ? ${checkMobile}-${browser} : ''`">
      <span>{{platform}} 이고,</span>
      <span>{{checkMobile}} 입니다.</span>
      <span>현재 브라우저는 {{browser}} 입니다.</span>
      <span>{{checkMobile +'-' +browser}}</span>
      <span>{{nav}}</span>
      <span>{{width +':' + height}}</span>
  </div>
</template>

<script>
export default {
    data(){
        return {
            platform: null,
            browser: null,
            nav: null,
            width: null,
            height: null
        }
    },
    mounted(){
        this.width = document.querySelector('html').clientWidth;
        this.height = document.querySelector('html').clientHeight;
        this.checkPlatform();        
        this.checkBroswer();
        this.nav = navigator.userAgent;
        
    },
    computed:{
        checkMobile(){
            const varUA = navigator.userAgent.toLowerCase();
            if ( varUA.indexOf('android') > -1) {
                //안드로이드
                return "android";
            } else if ( varUA.indexOf("iphone") > -1||varUA.indexOf("ipad") > -1||varUA.indexOf("ipod") > -1 ) {
                //IOS
                return "ios";
            } else {
                //아이폰, 안드로이드 외
                return "other";
            }
        },
        
    },
    methods:{
        checkPlatform(){
            var filter = "win16|win32|win64|mac";
            if(navigator.platform){

                if(filter.indexOf(navigator.platform.toLowerCase()) < 0){
                    
                    this.platform = 'mobile';
                
                } else{
                
                    this.platform = 'pc';

                }

            }
        },
        checkBroswer(){
            var agent = navigator.userAgent.toLowerCase(),
            name = navigator.appName,
            browser;
    
            // MS 계열 브라우저를 구분하기 위함.
            if(name === 'Microsoft Internet Explorer' || agent.indexOf('trident') > -1 || agent.indexOf('edge/') > -1) {
                browser = 'ie';
                if(name === 'Microsoft Internet Explorer') { // IE old version (IE 10 or Lower)
                    agent = /msie ([0-9]{1,}[\.0-9]{0,})/.exec(agent);
                    browser += parseInt(agent[1]);
                } else { // IE 11+
                    if(agent.indexOf('trident') > -1) { // IE 11 
                        browser += 11;
                    } else if(agent.indexOf('edge/') > -1) { // Edge
                        browser = 'edge';
                    }
                }
            } else if(agent.indexOf('safari') > -1) { // Chrome or Safari
                if(agent.indexOf('opr') > -1) { // Opera
                    browser = 'opera';
                } else if(agent.indexOf('chrome') > -1) { // Chrome                   
                    if(agent.indexOf('naver') > -1) { // Naver
                        browser = 'naver';
                    } else if (agent.indexOf('samsung') > -1) { // samsung
                         browser = 'samsungbrowser';
                    } else if (agent.indexOf('kakao') > -1) { // kakaotalk
                         browser = 'kakao';
                    } else if(agent.indexOf('whale') > -1){ // whale                          
                        browser = 'whale';
                    }  else {
                         browser = 'chrome';
                    }
                } else if (agent.indexOf('crios') > -1) { // ios는 crIos가 크롬이다
                    
                    if(this.height < 555){ // Chrome 
                        browser = 'oidChrome';
                    } else if (555 <= this.height <= 650) {
                        browser = 'newChrome';
                    } else {
                        browser = 'chrome';
                    }
                    
                } else if (agent.indexOf('naver') > -1) { // Naver
                    browser = 'naver';
                } else if (agent.indexOf('kakao') > -1) { // kakaotalk
                    browser = 'kakao';
                } else if (agent.indexOf('fxios') > -1) { // firefox
                    browser = 'firefox';
                } else { // Safari                    
                    if(this.height <= 560){                        
                        if(agent.indexOf('whale') > -1){  // whale                          
                            browser = 'oidWhale';
                        } else {
                            browser = 'oidSafari';
                        }
                    } else {
                        if(agent.indexOf('whale') > -1){  // whale                         
                            browser = 'whale';
                        } else {
                            browser = 'safari';  // safari
                        }
                        
                    }
                }
            } else if(agent.indexOf('firefox') > -1) { // Firefox
                browser = 'firefox';
            } else if (agent.indexOf('kakao') > -1) { // kakao
                browser = 'kakao';
            } 
            
            return this.browser = browser;
        },
        bottomCss(){
            if(this.platform === 'mobile'){
                if(this.checkMobile() === 'ios'){
                    return `ios-${this.browser}`;
                } else {
                    return this.browser;
                }
            } else {
                return '';
            }
        }
        
    }
}

</script>

<style lang="scss" scoped>
#bottom {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    background: #000;
    border: 20px solid red;
    box-sizing: border-box;
    color: #fff;
}
#bottom.chrome {
    height: calc(100vh - 55px) !important;
}
#bottom.ios-chrome {
    height: calc(100vh - 170px) !important;
    height: calc(100vh - 170px) !important;
}
#bottom.ios-newChrome {
    height: calc(100vh - 108px) !important;
}
#bottom.ios-safari {
    height: calc(100vh - 113px) !important;
}
#bottom.ios-naver, #bottom.ios-firefox, #bottom.ios-kakao,  #bottom.ios-oldWhale, #bottom.ios-whale, #bottom.android-samsungbrowser, #bottom.android-kakao {
    height: 100vh !important;
}
#bottom.safari {
    height: calc(100vh - 108px) !important;
}
#bottom.android-chrome, #bottom.android-firefox {
    height: calc(100vh - 55px) !important;
}
#bottom.ios-oidChrome, #bottom.ios-oidSafari {
    height: calc(100vh - 74px) !important;
}
#bottom.android-whale {
    height: calc(100vh - 80px) !important;
}
</style>
