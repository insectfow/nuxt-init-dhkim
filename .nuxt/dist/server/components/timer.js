exports.ids = [7];
exports.modules = {

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add CSS to SSR context
var add = __webpack_require__(5).default
module.exports.__inject__ = function (context) {
  add("19d5e561", content, true, context)
};

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_style_index_0_id_13d25364_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_style_index_0_id_13d25364_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_style_index_0_id_13d25364_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_style_index_0_id_13d25364_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_vue_style_loader_index_js_ref_7_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_7_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_7_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_7_oneOf_1_3_node_modules_sass_resources_loader_lib_loader_js_ref_7_oneOf_1_4_node_modules_nuxt_components_dist_loader_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Timer_vue_vue_type_style_index_0_id_13d25364_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(4);
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(12);
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(13);
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(14);
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__(15);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "@font-face{font-family:\"notoserifRegular\";src:local(※),url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format(\"otf\")}@font-face{font-family:\"notoserifMedium\";src:local(※),url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"otf\")}@font-face{font-family:\"notoserifBold\";src:local(※),url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"otf\")}*[data-v-13d25364]{box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-touch-callout:none}body[data-v-13d25364],html[data-v-13d25364]{height:100%;font-size:14px;background:#000}a[data-v-13d25364],body[data-v-13d25364],button[data-v-13d25364],div[data-v-13d25364],footer[data-v-13d25364],h1[data-v-13d25364],h2[data-v-13d25364],h3[data-v-13d25364],h4[data-v-13d25364],h5[data-v-13d25364],h6[data-v-13d25364],header[data-v-13d25364],html[data-v-13d25364],input[data-v-13d25364],li[data-v-13d25364],nav[data-v-13d25364],ol[data-v-13d25364],p[data-v-13d25364],section[data-v-13d25364],select[data-v-13d25364],span[data-v-13d25364],ul[data-v-13d25364]{margin:0;padding:0;font-family:\"notoserifRegular\"}a[data-v-13d25364],a[data-v-13d25364]:active,a[data-v-13d25364]:focus{text-decoration:none}@media screen and (min-width:640px){body[data-v-13d25364],html[data-v-13d25364]{font-size:24px}}.page-wrap[data-v-13d25364]{bottom:0;right:0;height:100%;box-sizing:border-box}.page[data-v-13d25364],.page-wrap[data-v-13d25364]{position:absolute;left:0;top:0;width:100%}.page[data-v-13d25364]{bottom:2.8rem;background:#000}.page-content[data-v-13d25364]{position:absolute;top:2.6rem;right:0;bottom:0;left:0;overflow:auto;color:#f5df4d}.page-content section.main-menu[data-v-13d25364]{display:flex;justify-content:space-around;align-items:center;flex-wrap:wrap;padding:.5rem}.page-content section.main-menu>.card-wrap[data-v-13d25364]{width:calc(50% - .5rem);height:120px;background:rgba(0,0,0,.4);border:1px solid #f5df4d;border-radius:5px;display:flex;justify-content:center;align-items:center;font-size:xxx-large;text-transform:uppercase;color:#f5df4d}.page-content section.main-menu>.card-wrap[data-v-13d25364]:nth-child(2n){margin-right:0}.page-content section.main-menu>img[data-v-13d25364]{width:100%}.nav[data-v-13d25364]{position:absolute;left:0;top:0;right:0;z-index:3;height:2.6rem;padding-right:.5rem;padding-left:.5rem;background-color:#000;-webkit-backface-visibility:hidden;backface-visibility:hidden}.nav .title[data-v-13d25364]{display:block;padding:0;margin:0;font-size:.9rem;font-weight:500;line-height:2.6rem;color:#f5df4d;text-align:center;white-space:nowrap}.nav .title[data-v-13d25364],.nav[data-v-13d25364]:after{position:absolute;left:0;width:100%}.nav[data-v-13d25364]:after{content:\"\";bottom:0;height:1px;background-color:#f5df4d;box-sizing:border-box}.footer[data-v-13d25364]{position:absolute;bottom:0;z-index:10;background-color:#000}.footer[data-v-13d25364],.footer .footer-item[data-v-13d25364]{width:100%;height:2.8rem;display:flex}.footer .footer-item[data-v-13d25364]{position:relative;text-align:center;color:#f5df4d;flex:1;flex-direction:column;align-items:center;justify-content:center}.footer[data-v-13d25364]:after{content:\"\";position:absolute;top:0;left:0;width:100%;height:1px;background-color:#f5df4d;box-sizing:border-box}.popup-modal[data-v-13d25364]{width:100%;max-height:100%;position:fixed;z-index:11;bottom:0;border-radius:0;opacity:.6;transition-duration:.3s;height:auto;transition-property:transform,opacity;overflow-x:hidden;overflow-y:auto;opacity:1;display:block;transform:translateZ(0);border-radius:5px 5px 0 0}.modal-content[data-v-13d25364]{height:100%;overflow:auto;box-sizing:border-box}.timer-wrap[data-v-13d25364]{height:400px;width:100%;background:#f5df4d}.timer-wrap>.title[data-v-13d25364]{font-size:20px;text-align:center;padding:.5rem 0}.timer-wrap>.timer[data-v-13d25364]{text-align:center;font-size:30px}.active-button[data-v-13d25364],.cancel-button[data-v-13d25364]{width:100%;padding:5px 10px}.active-button button[data-v-13d25364],.cancel-button button[data-v-13d25364]{width:100%;height:50px;border-radius:5px}.cancel-button button[data-v-13d25364]{color:red}.totop-enter-active[data-v-13d25364],.totop-leave-active[data-v-13d25364]{transition:bottom .5s}.totop-enter[data-v-13d25364],.totop-leave-to[data-v-13d25364]{bottom:-100%}", ""]);
// Exports
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Timer.vue?vue&type=template&id=13d25364&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"totop"}},[_c('div',{staticClass:"popup-modal actions-modal"},[_c('div',{staticClass:"modal-content"},[_c('div',{staticClass:"timer-wrap"},[_c('h3',{staticClass:"title"},[_vm._v("Timer")]),_vm._v(" "),_c('div',{staticClass:"timer"},[_vm._v("00 : 00")]),_vm._v(" "),_c('div',{staticClass:"set-time-box"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.minutes),expression:"minutes"}],attrs:{"type":"number"},domProps:{"value":(_vm.minutes)},on:{"input":function($event){if($event.target.composing){ return; }_vm.minutes=$event.target.value}}}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.secondes),expression:"secondes"}],attrs:{"type":"number"},domProps:{"value":(_vm.secondes)},on:{"input":function($event){if($event.target.composing){ return; }_vm.secondes=$event.target.value}}}),_vm._v(" "),_c('button',{on:{"click":function($event){$event.preventDefault();return _vm.setTime()}}},[_vm._v("Set Time")])])])])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./components/Timer.vue?vue&type=template&id=13d25364&scoped=true&

// CONCATENATED MODULE: ./node_modules/babel-loader/lib??ref--2-0!./node_modules/@nuxt/components/dist/loader.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./components/Timer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var Timervue_type_script_lang_js_ = ({
  data() {
    return {
      timer: null,
      totalTime: 1 * 60,
      resetButton: false
    };
  },

  computed: {
    minutes() {
      const minutes = Math.floor(this.totalTime / 60);
      return this.padTime(minutes);
    },

    seconds() {
      const seconds = this.totalTime - this.minutes * 60;
      return this.padTime(seconds);
    }

  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => this.countdown(), 1000);
      this.resetButton = true;
    },

    stopTimer() {
      clearInterval(this.timer);
      this.timer = nullthis.resetButton = true;
    },

    resetTimer() {
      this.totalTime = 1 * 60;
      clearInterval(this.timer);
      this.timer = null;
      this.resetButton = false;
    },

    padTime(time) {
      return (time < 10 ? '0' : '') + time;
    },

    countdown() {
      if (this.totalTime >= 1) {
        this.totalTime--;
      } else {
        this.totalTime = 0;
        this.resetTimer;
      }
    }

  }
});
// CONCATENATED MODULE: ./components/Timer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Timervue_type_script_lang_js_ = (Timervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__(2);

// CONCATENATED MODULE: ./components/Timer.vue



function injectStyles (context) {
  
  var style0 = __webpack_require__(32)
if (style0.__inject__) style0.__inject__(context)

}

/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  components_Timervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  injectStyles,
  "13d25364",
  "5d57692d"
  
)

/* harmony default export */ var Timer = __webpack_exports__["default"] = (component.exports);

/***/ })

};;
//# sourceMappingURL=timer.js.map