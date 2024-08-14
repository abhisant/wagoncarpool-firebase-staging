!function(){function e(t){return e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},e(t)}function t(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */t=function(){return r};var r={},n=Object.prototype,o=n.hasOwnProperty,i=Object.defineProperty||function(e,t,r){e[t]=r.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",u=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function l(e,t,r){return Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{l({},"")}catch(S){l=function(e,t,r){return e[t]=r}}function p(e,t,r,n){var o=t&&t.prototype instanceof d?t:d,a=Object.create(o.prototype),c=new O(n||[]);return i(a,"_invoke",{value:L(e,r,c)}),a}function f(e,t,r){try{return{type:"normal",arg:e.call(t,r)}}catch(S){return{type:"throw",arg:S}}}r.wrap=p;var h={};function d(){}function v(){}function y(){}var m={};l(m,c,(function(){return this}));var w=Object.getPrototypeOf,b=w&&w(w(_([])));b&&b!==n&&o.call(b,c)&&(m=b);var g=y.prototype=d.prototype=Object.create(m);function x(e){["next","throw","return"].forEach((function(t){l(e,t,(function(e){return this._invoke(t,e)}))}))}function E(t,r){function n(i,a,c,u){var s=f(t[i],t,a);if("throw"!==s.type){var l=s.arg,p=l.value;return p&&"object"==e(p)&&o.call(p,"__await")?r.resolve(p.__await).then((function(e){n("next",e,c,u)}),(function(e){n("throw",e,c,u)})):r.resolve(p).then((function(e){l.value=e,c(l)}),(function(e){return n("throw",e,c,u)}))}u(s.arg)}var a;i(this,"_invoke",{value:function(e,t){function o(){return new r((function(r,o){n(e,t,r,o)}))}return a=a?a.then(o,o):o()}})}function L(e,t,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=P(a,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=f(e,t,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function P(e,t){var r=t.method,n=e.iterator[r];if(void 0===n)return t.delegate=null,"throw"===r&&e.iterator.return&&(t.method="return",t.arg=void 0,P(e,t),"throw"===t.method)||"return"!==r&&(t.method="throw",t.arg=new TypeError("The iterator does not provide a '"+r+"' method")),h;var o=f(n,e.iterator,t.arg);if("throw"===o.type)return t.method="throw",t.arg=o.arg,t.delegate=null,h;var i=o.arg;return i?i.done?(t[e.resultName]=i.value,t.next=e.nextLoc,"return"!==t.method&&(t.method="next",t.arg=void 0),t.delegate=null,h):i:(t.method="throw",t.arg=new TypeError("iterator result is not an object"),t.delegate=null,h)}function k(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function j(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function O(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(k,this),this.reset(!0)}function _(t){if(t||""===t){var r=t[c];if(r)return r.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return i.next=i}}throw new TypeError(e(t)+" is not iterable")}return v.prototype=y,i(g,"constructor",{value:y,configurable:!0}),i(y,"constructor",{value:v,configurable:!0}),v.displayName=l(y,s,"GeneratorFunction"),r.isGeneratorFunction=function(e){var t="function"==typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},r.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,l(e,s,"GeneratorFunction")),e.prototype=Object.create(g),e},r.awrap=function(e){return{__await:e}},x(E.prototype),l(E.prototype,u,(function(){return this})),r.AsyncIterator=E,r.async=function(e,t,n,o,i){void 0===i&&(i=Promise);var a=new E(p(e,t,n,o),i);return r.isGeneratorFunction(t)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},x(g),l(g,s,"Generator"),l(g,c,(function(){return this})),l(g,"toString",(function(){return"[object Generator]"})),r.keys=function(e){var t=Object(e),r=[];for(var n in t)r.push(n);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},r.values=_,O.prototype={constructor:O,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(j),!e)for(var t in this)"t"===t.charAt(0)&&o.call(this,t)&&!isNaN(+t.slice(1))&&(this[t]=void 0)},stop:function(){this.done=!0;var e=this.tryEntries[0].completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var t=this;function r(r,n){return a.type="throw",a.arg=e,t.next=r,n&&(t.method="next",t.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var c=o.call(i,"catchLoc"),u=o.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(e,t){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===e||"continue"===e)&&i.tryLoc<=t&&t<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=e,a.arg=t,i?(this.method="next",this.next=i.finallyLoc,h):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),h},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.finallyLoc===e)return this.complete(r.completion,r.afterLoc),j(r),h}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var r=this.tryEntries[t];if(r.tryLoc===e){var n=r.completion;if("throw"===n.type){var o=n.arg;j(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(e,t,r){return this.delegate={iterator:_(e),resultName:t,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},r}function r(e,t,r,n,o,i,a){try{var c=e[i](a),u=c.value}catch(s){return void r(s)}c.done?t(u):Promise.resolve(u).then(n,o)}function n(e){return function(){var t=this,n=arguments;return new Promise((function(o,i){var a=e.apply(t,n);function c(e){r(a,o,i,c,u,"next",e)}function u(e){r(a,o,i,c,u,"throw",e)}c(void 0)}))}}function o(t,r){for(var n=0;n<r.length;n++){var o=r[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,(i=o.key,a=void 0,a=function(t,r){if("object"!==e(t)||null===t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,r||"default");if("object"!==e(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(t)}(i,"string"),"symbol"===e(a)?a:String(a)),o)}var i,a}function i(e,t){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},i(e,t)}function a(t){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=c(t);if(r){var i=c(this).constructor;n=Reflect.construct(o,arguments,i)}else n=o.apply(this,arguments);return function(t,r){if(r&&("object"===e(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)}(this,n)}}function c(e){return c=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},c(e)}System.register(["./index-legacy-e3cc8bb4.js"],(function(e,r){"use strict";var c,u,s,l;return{setters:[function(e){c=e.W,u=e.C,s=e.v,l=e.x}],execute:function(){var r=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&i(e,t)}(g,e);var r,c,p,f,h,d,v,y,m,w,b=a(g);function g(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,g),b.apply(this,arguments)}return r=g,c=[{key:"getPhoto",value:(w=n(t().mark((function e(r){var o=this;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=n(t().mark((function e(i,a){var c;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r.webUseInput||r.source===u.Photos?o.fileInputExperience(r,i):r.source===u.Prompt?((c=document.querySelector("pwa-action-sheet"))||(c=document.createElement("pwa-action-sheet"),document.body.appendChild(c)),c.header=r.promptLabelHeader||"Photo",c.cancelable=!1,c.options=[{title:r.promptLabelPhoto||"From Photos"},{title:r.promptLabelPicture||"Take Picture"}],c.addEventListener("onSelection",function(){var e=n(t().mark((function e(n){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:0===n.detail?o.fileInputExperience(r,i):o.cameraExperience(r,i,a);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())):o.cameraExperience(r,i,a);case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)}))),function(e){return w.apply(this,arguments)})},{key:"pickImages",value:(m=n(t().mark((function e(r){var o=this;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",new Promise(function(){var e=n(t().mark((function e(r){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:o.multipleFileInputExperience(r);case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 1:case"end":return e.stop()}}),e)}))),function(e){return m.apply(this,arguments)})},{key:"cameraExperience",value:(y=n(t().mark((function e(r,o,i){var a,c=this;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!customElements.get("pwa-camera-modal")){e.next=16;break}return(a=document.createElement("pwa-camera-modal")).facingMode=r.direction===s.Front?"user":"environment",document.body.appendChild(a),e.prev=4,e.next=7,a.componentOnReady();case 7:a.addEventListener("onPhoto",function(){var e=n(t().mark((function e(n){var u;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==(u=n.detail)){e.next=5;break}i(new l("User cancelled photos app")),e.next=14;break;case 5:if(!(u instanceof Error)){e.next=9;break}i(u),e.next=14;break;case 9:return e.t0=o,e.next=12,c._getCameraPhoto(u,r);case 12:e.t1=e.sent,(0,e.t0)(e.t1);case 14:a.dismiss(),document.body.removeChild(a);case 16:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),a.present(),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(4),this.fileInputExperience(r,o);case 14:e.next=18;break;case 16:console.error("Unable to load PWA Element 'pwa-camera-modal'. See the docs: https://capacitorjs.com/docs/web/pwa-elements."),this.fileInputExperience(r,o);case 18:case"end":return e.stop()}}),e,this,[[4,11]])}))),function(e,t,r){return y.apply(this,arguments)})},{key:"fileInputExperience",value:function(e,t){var r=document.querySelector("#_capacitor-camera-input"),n=function(){var e;null===(e=r.parentNode)||void 0===e||e.removeChild(r)};r||((r=document.createElement("input")).id="_capacitor-camera-input",r.type="file",r.hidden=!0,document.body.appendChild(r),r.addEventListener("change",(function(o){var i=r.files[0],a="jpeg";if("image/png"===i.type?a="png":"image/gif"===i.type&&(a="gif"),"dataUrl"===e.resultType||"base64"===e.resultType){var c=new FileReader;c.addEventListener("load",(function(){if("dataUrl"===e.resultType)t({dataUrl:c.result,format:a});else if("base64"===e.resultType){var r=c.result.split(",")[1];t({base64String:r,format:a})}n()})),c.readAsDataURL(i)}else t({webPath:URL.createObjectURL(i),format:a}),n()}))),r.accept="image/*",r.capture=!0,e.source===u.Photos||e.source===u.Prompt?r.removeAttribute("capture"):e.direction===s.Front?r.capture="user":e.direction===s.Rear&&(r.capture="environment"),r.click()}},{key:"multipleFileInputExperience",value:function(e){var t=document.querySelector("#_capacitor-camera-input-multiple");t||((t=document.createElement("input")).id="_capacitor-camera-input-multiple",t.type="file",t.hidden=!0,t.multiple=!0,document.body.appendChild(t),t.addEventListener("change",(function(r){for(var n,o=[],i=0;i<t.files.length;i++){var a=t.files[i],c="jpeg";"image/png"===a.type?c="png":"image/gif"===a.type&&(c="gif"),o.push({webPath:URL.createObjectURL(a),format:c})}e({photos:o}),null===(n=t.parentNode)||void 0===n||n.removeChild(t)}))),t.accept="image/*",t.click()}},{key:"_getCameraPhoto",value:function(e,t){return new Promise((function(r,n){var o=new FileReader,i=e.type.split("/")[1];"uri"===t.resultType?r({webPath:URL.createObjectURL(e),format:i,saved:!1}):(o.readAsDataURL(e),o.onloadend=function(){var e=o.result;"dataUrl"===t.resultType?r({dataUrl:e,format:i,saved:!1}):r({base64String:e.split(",")[1],format:i,saved:!1})},o.onerror=function(e){n(e)})}))}},{key:"checkPermissions",value:(v=n(t().mark((function e(){var r;return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("undefined"!=typeof navigator&&navigator.permissions){e.next=2;break}throw this.unavailable("Permissions API not available in this browser");case 2:return e.prev=2,e.next=5,window.navigator.permissions.query({name:"camera"});case 5:return r=e.sent,e.abrupt("return",{camera:r.state,photos:"granted"});case 9:throw e.prev=9,e.t0=e.catch(2),this.unavailable("Camera permissions are not available in this browser");case 12:case"end":return e.stop()}}),e,this,[[2,9]])}))),function(){return v.apply(this,arguments)})},{key:"requestPermissions",value:(d=n(t().mark((function e(){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw this.unimplemented("Not implemented on web.");case 1:case"end":return e.stop()}}),e,this)}))),function(){return d.apply(this,arguments)})},{key:"pickLimitedLibraryPhotos",value:(h=n(t().mark((function e(){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw this.unavailable("Not implemented on web.");case 1:case"end":return e.stop()}}),e,this)}))),function(){return h.apply(this,arguments)})},{key:"getLimitedLibraryPhotos",value:(f=n(t().mark((function e(){return t().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:throw this.unavailable("Not implemented on web.");case 1:case"end":return e.stop()}}),e,this)}))),function(){return f.apply(this,arguments)})}],c&&o(r.prototype,c),p&&o(r,p),Object.defineProperty(r,"prototype",{writable:!1}),g}(c);e("CameraWeb",r);e("Camera",new r)}}}))}();