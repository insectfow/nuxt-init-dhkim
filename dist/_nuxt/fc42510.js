(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{174:function(t,e,o){var content=o(181);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,o(64).default)("19d5e561",content,!0,{sourceMap:!1})},180:function(t,e,o){"use strict";o(174)},181:function(t,e,o){var d=o(63),n=o(120),r=o(121),l=o(122),c=o(123),v=d(!1),m=n(r),f=n(l),h=n(c);v.push([t.i,'@font-face{font-family:"notoserifRegular";src:local(※),url('+m+') format("otf")}@font-face{font-family:"notoserifMedium";src:local(※),url('+f+') format("otf")}@font-face{font-family:"notoserifBold";src:local(※),url('+h+') format("otf")}*[data-v-13d25364]{box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-touch-callout:none}body[data-v-13d25364],html[data-v-13d25364]{height:100%;font-size:14px;background:#000}a[data-v-13d25364],body[data-v-13d25364],button[data-v-13d25364],div[data-v-13d25364],footer[data-v-13d25364],h1[data-v-13d25364],h2[data-v-13d25364],h3[data-v-13d25364],h4[data-v-13d25364],h5[data-v-13d25364],h6[data-v-13d25364],header[data-v-13d25364],html[data-v-13d25364],input[data-v-13d25364],li[data-v-13d25364],nav[data-v-13d25364],ol[data-v-13d25364],p[data-v-13d25364],section[data-v-13d25364],select[data-v-13d25364],span[data-v-13d25364],ul[data-v-13d25364]{margin:0;padding:0;font-family:"notoserifRegular"}a[data-v-13d25364],a[data-v-13d25364]:active,a[data-v-13d25364]:focus{text-decoration:none}@media screen and (min-width:640px){body[data-v-13d25364],html[data-v-13d25364]{font-size:24px}}.page-wrap[data-v-13d25364]{bottom:0;right:0;height:100%;box-sizing:border-box}.page[data-v-13d25364],.page-wrap[data-v-13d25364]{position:absolute;left:0;top:0;width:100%}.page[data-v-13d25364]{bottom:2.8rem;background:#000}.page-content[data-v-13d25364]{position:absolute;top:2.6rem;right:0;bottom:0;left:0;overflow:auto;color:#f5df4d}.page-content section.main-menu[data-v-13d25364]{display:flex;justify-content:space-around;align-items:center;flex-wrap:wrap;padding:.5rem}.page-content section.main-menu>.card-wrap[data-v-13d25364]{width:calc(50% - .5rem);height:120px;background:rgba(0,0,0,.4);border:1px solid #f5df4d;border-radius:5px;display:flex;justify-content:center;align-items:center;font-size:xxx-large;text-transform:uppercase;color:#f5df4d}.page-content section.main-menu>.card-wrap[data-v-13d25364]:nth-child(2n){margin-right:0}.page-content section.main-menu>img[data-v-13d25364]{width:100%}.nav[data-v-13d25364]{position:absolute;left:0;top:0;right:0;z-index:3;height:2.6rem;padding-right:.5rem;padding-left:.5rem;background-color:#000;-webkit-backface-visibility:hidden;backface-visibility:hidden}.nav .title[data-v-13d25364]{display:block;padding:0;margin:0;font-size:.9rem;font-weight:500;line-height:2.6rem;color:#f5df4d;text-align:center;white-space:nowrap}.nav .title[data-v-13d25364],.nav[data-v-13d25364]:after{position:absolute;left:0;width:100%}.nav[data-v-13d25364]:after{content:"";bottom:0;height:1px;background-color:#f5df4d;box-sizing:border-box}.footer[data-v-13d25364]{position:absolute;bottom:0;z-index:10;background-color:#000}.footer[data-v-13d25364],.footer .footer-item[data-v-13d25364]{width:100%;height:2.8rem;display:flex}.footer .footer-item[data-v-13d25364]{position:relative;text-align:center;color:#f5df4d;flex:1;flex-direction:column;align-items:center;justify-content:center}.footer[data-v-13d25364]:after{content:"";position:absolute;top:0;left:0;width:100%;height:1px;background-color:#f5df4d;box-sizing:border-box}.popup-modal[data-v-13d25364]{width:100%;max-height:100%;position:fixed;z-index:11;bottom:0;border-radius:0;opacity:.6;transition-duration:.3s;height:auto;transition-property:transform,opacity;overflow-x:hidden;overflow-y:auto;opacity:1;display:block;transform:translateZ(0);border-radius:5px 5px 0 0}.modal-content[data-v-13d25364]{height:100%;overflow:auto;box-sizing:border-box}.timer-wrap[data-v-13d25364]{height:400px;width:100%;background:#f5df4d}.timer-wrap>.title[data-v-13d25364]{font-size:20px;text-align:center;padding:.5rem 0}.timer-wrap>.timer[data-v-13d25364]{text-align:center;font-size:30px}.active-button[data-v-13d25364],.cancel-button[data-v-13d25364]{width:100%;padding:5px 10px}.active-button button[data-v-13d25364],.cancel-button button[data-v-13d25364]{width:100%;height:50px;border-radius:5px}.cancel-button button[data-v-13d25364]{color:red}.totop-enter-active[data-v-13d25364],.totop-leave-active[data-v-13d25364]{transition:bottom .5s}.totop-enter[data-v-13d25364],.totop-leave-to[data-v-13d25364]{bottom:-100%}',""]),t.exports=v},184:function(t,e,o){"use strict";o.r(e);var d={data:function(){return{timer:null,totalTime:60,resetButton:!1}},computed:{minutes:function(){var t=Math.floor(this.totalTime/60);return this.padTime(t)},seconds:function(){var t=this.totalTime-60*this.minutes;return this.padTime(t)}},methods:{startTimer:function(){var t=this;this.timer=setInterval((function(){return t.countdown()}),1e3),this.resetButton=!0},stopTimer:function(){clearInterval(this.timer),this.timer=nullthis.resetButton=!0},resetTimer:function(){this.totalTime=60,clearInterval(this.timer),this.timer=null,this.resetButton=!1},padTime:function(time){return(time<10?"0":"")+time},countdown:function(){this.totalTime>=1?this.totalTime--:(this.totalTime=0,this.resetTimer)}}},n=(o(180),o(30)),component=Object(n.a)(d,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("transition",{attrs:{name:"totop"}},[o("div",{staticClass:"popup-modal actions-modal"},[o("div",{staticClass:"modal-content"},[o("div",{staticClass:"timer-wrap"},[o("h3",{staticClass:"title"},[t._v("Timer")]),t._v(" "),o("div",{staticClass:"timer"},[t._v("00 : 00")]),t._v(" "),o("div",{staticClass:"set-time-box"},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.minutes,expression:"minutes"}],attrs:{type:"number"},domProps:{value:t.minutes},on:{input:function(e){e.target.composing||(t.minutes=e.target.value)}}}),t._v(" "),o("input",{directives:[{name:"model",rawName:"v-model",value:t.secondes,expression:"secondes"}],attrs:{type:"number"},domProps:{value:t.secondes},on:{input:function(e){e.target.composing||(t.secondes=e.target.value)}}}),t._v(" "),o("button",{on:{click:function(e){return e.preventDefault(),t.setTime()}}},[t._v("Set Time")])])])])])])}),[],!1,null,"13d25364",null);e.default=component.exports}}]);