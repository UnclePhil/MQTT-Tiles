(function(e){function n(n){for(var r,o,c=n[0],l=n[1],d=n[2],s=0,u=[];s<c.length;s++)o=c[s],a[o]&&u.push(a[o][0]),a[o]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);f&&f(n);while(u.length)u.shift()();return i.push.apply(i,d||[]),t()}function t(){for(var e,n=0;n<i.length;n++){for(var t=i[n],r=!0,o=1;o<t.length;o++){var c=t[o];0!==a[c]&&(r=!1)}r&&(i.splice(n--,1),e=l(l.s=t[0]))}return e}var r={},o={app:0},a={app:0},i=[];function c(e){return l.p+"js/"+({}[e]||e)+"."+{"02e96fcc":"2c4c0b22","3861d210":"4f731189","607658c8":"6712dc4b","4b47640d":"21cfc388"}[e]+".js"}function l(n){if(r[n])return r[n].exports;var t=r[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.e=function(e){var n=[],t={"3861d210":1,"607658c8":1};o[e]?n.push(o[e]):0!==o[e]&&t[e]&&n.push(o[e]=new Promise(function(n,t){for(var r="css/"+({}[e]||e)+"."+{"02e96fcc":"31d6cfe0","3861d210":"d5aec8e9","607658c8":"d16249e3","4b47640d":"31d6cfe0"}[e]+".css",o=l.p+r,a=document.getElementsByTagName("link"),i=0;i<a.length;i++){var c=a[i],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===r||d===o))return n()}var s=document.getElementsByTagName("style");for(i=0;i<s.length;i++){c=s[i],d=c.getAttribute("data-href");if(d===r||d===o)return n()}var u=document.createElement("link");u.rel="stylesheet",u.type="text/css",u.onload=n,u.onerror=function(n){var r=n&&n.target&&n.target.src||o,a=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");a.request=r,t(a)},u.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(u)}).then(function(){o[e]=0}));var r=a[e];if(0!==r)if(r)n.push(r[2]);else{var i=new Promise(function(n,t){r=a[e]=[n,t]});n.push(r[2]=i);var d,s=document.getElementsByTagName("head")[0],u=document.createElement("script");u.charset="utf-8",u.timeout=120,l.nc&&u.setAttribute("nonce",l.nc),u.src=c(e),d=function(n){u.onerror=u.onload=null,clearTimeout(f);var t=a[e];if(0!==t){if(t){var r=n&&("load"===n.type?"missing":n.type),o=n&&n.target&&n.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");i.type=r,i.request=o,t[1](i)}a[e]=void 0}};var f=setTimeout(function(){d({type:"timeout",target:u})},12e4);u.onerror=u.onload=d,s.appendChild(u)}return Promise.all(n)},l.m=e,l.c=r,l.d=function(e,n,t){l.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},l.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,n){if(1&n&&(e=l(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)l.d(t,r,function(n){return e[n]}.bind(null,r));return t},l.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(n,"a",n),n},l.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},l.p="",l.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],s=d.push.bind(d);d.push=n,d=d.slice();for(var u=0;u<d.length;u++)n(d[u]);var f=s;i.push([0,"vendor"]),t()})({0:function(e,n,t){e.exports=t("2f39")},"034f":function(e,n,t){"use strict";var r=t("fb1c"),o=t.n(r);o.a},"1e5d":function(e,n,t){},"2f39":function(e,n,t){"use strict";t.r(n);t("4a91"),t("a114"),t("d14b"),t("113c"),t("1e5d"),t("7e6d");var r=t("2b0e"),o=t("e84f"),a=t("7051"),i=t("2040"),c=t("cf12"),l=t("46a9"),d=t("32a1"),s=t("52b5"),u=t("f30c"),f=t("ce67"),p=t("0952"),v=t("2a70"),b=t("1180"),h=t("1e55"),m=t("506f"),g=t("b8d9"),w=t("7d43"),y=t("9541"),Q=t("91c8"),q=t("482e"),T=t("5d8b"),P=t("5931"),x=t("525b"),C=t("03d8"),E=t("b5b8"),S=t("7646"),j=t("6580"),L=t("3a08"),k=t("3054"),M=t("6ddb"),O=t("dc23"),A=t("bc9b"),_=t("4bf4"),N=t("1526"),B=t("2bd2"),I=t("133b"),D=t("f9d8"),H=t("6780");r["default"].use(o["a"],{config:{},components:{QLayout:a["a"],QLayoutHeader:i["a"],QLayoutDrawer:c["a"],QPageContainer:l["a"],QPage:d["a"],QIcon:s["a"],QToolbar:u["a"],QToolbarTitle:f["a"],QModal:p["a"],QModalLayout:v["a"],QList:b["a"],QListHeader:h["a"],QItem:m["a"],QItemMain:g["a"],QItemSide:w["a"],QItemTile:y["a"],QItemSeparator:Q["a"],QBtn:q["a"],QInput:T["a"],QSelect:P["a"],QCheckbox:x["a"],QTooltip:C["a"],QPopover:E["a"],QCard:S["a"],QCardTitle:j["a"],QCardMain:L["a"],QCardSeparator:k["a"],QCardActions:M["a"],QCardMedia:O["a"],QToggle:A["a"],QChip:_["a"]},directives:{Ripple:N["a"],CloseOverlay:B["a"]},plugins:{Notify:I["a"],LocalStorage:D["a"],Dialog:H["a"]}});var J=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"q-app"}},[t("router-view")],1)},R=[];J._withStripped=!0;var $={name:"App"},z=$,F=(t("034f"),t("2877")),G=Object(F["a"])(z,J,R,!1,null,null,null);G.options.__file="App.vue";var K=G.exports,U=t("8c4f"),V=[{path:"/",component:function(){return Promise.all([t.e("02e96fcc"),t.e("607658c8")]).then(t.bind(null,"f241"))},children:[{path:"",component:function(){return Promise.all([t.e("02e96fcc"),t.e("3861d210")]).then(t.bind(null,"8b24"))}}]}];V.push({path:"*",component:function(){return t.e("4b47640d").then(t.bind(null,"e51e"))}});var W=V;r["default"].use(U["a"]);var X=function(){var e=new U["a"]({scrollBehavior:function(){return{y:0}},routes:W,mode:"hash",base:""});return e},Y=function(){var e="function"===typeof X?X({}):X,n={el:"#q-app",router:e,render:function(e){return e(K)}};return{app:n,router:e}},Z=t("9483");Object(Z["a"])("service-worker.js",{ready:function(){console.log("App is being served from cache by a service worker.")},registered:function(e){console.log("Service worker has been registered.")},cached:function(e){console.log("Content has been cached for offline use.")},updatefound:function(e){console.log("New content is downloading.")},updated:function(e){var n=document.createElement("div");n.id="sw-notification",n.innerHTML='<div class="q-notification-list q-notification-list-bottom fixed column items-end absolute">\n                                              <div class="q-notification">\n                                                <div class="q-alert row no-wrap shadow-2 bg-amber-9 text-white">\n                                                  <div class="q-alert-side col-auto row flex-center">\n                                                    <i aria-hidden="true" class="q-icon material-icons">warning</i>\n                                                  </div>\n                                                  <div class="q-alert-content col self-center">\n                                                    <div>The new version of MQQT Tiles is available. Refresh the page to update?</div>\n                                                  </div>\n                                                  <div class="q-alert-actions col-auto gutter-xs column flex-center">\n                                                    <div class="full-width">\n                                                      <button tabindex="0" class="q-btn inline relative-position q-btn-item non-selectable full-width q-btn-rectangle q-btn-flat q-focusable q-hoverable q-btn-dense">\n                                                        <div class="q-focus-helper"></div>\n                                                        <div class="q-btn-inner row col items-center justify-start">\n                                                          <div>Agree</div>\n                                                        </div>\n                                                      </button>\n                                                    </div>\n                                                    <div class="full-width">\n                                                      <button tabindex="0" class="q-btn inline relative-position q-btn-item non-selectable full-width q-btn-rectangle q-btn-flat q-focusable q-hoverable q-btn-dense">\n                                                        <div class="q-focus-helper"></div>\n                                                        <div class="q-btn-inner row col items-center justify-start">\n                                                          <div>Abort</div>\n                                                        </div>\n                                                      </button>\n                                                    </div>\n                                                  </div>\n                                                </div>\n                                              </div>\n                                            </div>';var t=n.getElementsByTagName("button"),r=document.getElementsByTagName("body")[0];t[0].addEventListener("click",function(e){window.location.reload()}),t[1].addEventListener("click",function(e){n.remove()}),r.appendChild(n)},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});var ee=t("fe3c"),ne=t.n(ee),te=Y(),re=te.app;te.router;/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&window.navigator.standalone&&document.addEventListener("DOMContentLoaded",function(){ne.a.attach(document.body)},!1),new r["default"](re)},"7e6d":function(e,n,t){},fb1c:function(e,n,t){}});