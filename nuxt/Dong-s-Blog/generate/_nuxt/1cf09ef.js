(window.webpackJsonp=window.webpackJsonp||[]).push([[8,2],{197:function(t,e,n){var content=n(199);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(66).default)("dbd9a0ae",content,!0,{sourceMap:!1})},198:function(t,e,n){"use strict";n(197)},199:function(t,e,n){var r=n(65)(!1);r.push([t.i,".slide-enter-active,.slide-leave-active{transition:opacity .5s}.slide-enter,.slide-leave-to{opacity:0}.pending{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:20px;box-sizing:border-box;width:100%;display:flex;justify-content:center}div,h1,h2,h3,h4,h5,h6,html body,li,ol,p,ul{margin:0;padding:0}li,ol,ul{list-style:none}.card-wrap{margin:0 auto}.card-wrap,.card-wrap>li{width:100%;padding:20px;box-sizing:border-box}.card-wrap>li{margin-bottom:10px;box-shadow:0 0 4px rgba(0,0,0,.2);transition:all 1s ease}.card-wrap>li:last-child{margin-bottom:0}@media screen and (max-width:600px){.card-wrap{width:100%}.card-wrap>li{margin-right:0}}",""]),t.exports=r},200:function(t,e,n){var content=n(206);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(66).default)("6ff7030c",content,!0,{sourceMap:!1})},204:function(t,e,n){"use strict";n.r(e);n(26),n(21),n(25),n(42),n(43);var r=n(3),o=n(18),c=(n(41),n(12),n(67),n(68),n(52));function l(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}var d={data:function(){return{newsLists:[],baseUrl:"https://api.hnpwa.com/v0/",baseUrl2:"http://192.168.0.57:8085/api/"}},watch:{path:"$fetch"},computed:function(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?l(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):l(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}({},Object(c.b)(["path"])),fetch:function(t){function e(){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}((function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(t.baseUrl).concat(t.path,"/1.json")).then((function(t){return t.json()}));case 2:t.newsLists=e.sent,console.log("fetch");case 4:case"end":return e.stop()}}),e)})))()}))},f=(n(198),n(33)),component=Object(f.a)(d,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hacker-wrap"},[t.$fetchState.pending?n("p",{staticClass:"pending"},[t._v("불러오는 중...")]):t.$fetchState.error?n("p",[t._v("An error occurred :(")]):n("transition",{attrs:{name:"slide"}},[n("ul",{staticClass:"card-wrap"},t._l(t.newsLists,(function(e,r){return n("li",{key:r},[n("ul",[n("li",[n("h3",[t._v(t._s(e.title))])])])])})),0)])],1)}),[],!1,null,null,null);e.default=component.exports},205:function(t,e,n){"use strict";n(200)},206:function(t,e,n){var r=n(65)(!1);r.push([t.i,".contents{display:flex;justify-content:center;position:fixed;top:2.4rem;width:100%;margin:20px}.window2{right:30px;width:700px}.window,.window2{height:calc(100vh - 2.4rem - 40px);box-shadow:0 0 4px rgba(0,0,0,.2);background:#fff;z-index:10;overflow-x:hidden;overflow-y:auto}.window{margin-right:20px;width:400px;min-width:400px;box-sizing:border-box;display:flex;justify-content:flex-start;align-items:center;flex-flow:column;flex-wrap:wrap}.window div{width:100%;height:auto}",""]),t.exports=r},215:function(t,e,n){"use strict";n.r(e);var r={name:"news",data:function(){return{}},methods:{}},o=(n(205),n(33)),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"page"},[n("lazy-modules-the-header",{attrs:{title:t.$route.name}}),t._v(" "),n("div",{staticClass:"contents"},[n("lazy-modules-hacker-news-list",{staticClass:"window"}),t._v(" "),n("modules-hacker-news-list",{staticClass:"window2"})],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ModulesHackerNewsList:n(204).default})}}]);