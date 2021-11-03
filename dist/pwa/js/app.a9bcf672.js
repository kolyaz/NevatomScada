(()=>{"use strict";var e={3762:(e,t,r)=>{r(71),r(7280),r(5363);var n=r(8880),o=r(9592),a=r(3673);function i(e,t,r,n,o,i){const l=(0,a.up)("router-view");return(0,a.wg)(),(0,a.j4)(l)}const l=(0,a.aZ)({name:"App"});l.render=i;const s=l;var d=r(7083),c=r(9582);const u=[{path:"/",component:()=>Promise.all([r.e(736),r.e(609)]).then(r.bind(r,9609)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(366)]).then(r.bind(r,6366))},{path:"/settings",component:()=>Promise.all([r.e(736),r.e(668)]).then(r.bind(r,2668))},{path:"/trends",component:()=>Promise.all([r.e(736),r.e(842)]).then(r.bind(r,8195))},{path:"/alarms",component:()=>Promise.all([r.e(736),r.e(285)]).then(r.bind(r,5285))},{path:"/net_settings",component:()=>Promise.all([r.e(736),r.e(795)]).then(r.bind(r,5795))},{path:"/modbus_settings",component:()=>Promise.all([r.e(736),r.e(369)]).then(r.bind(r,7369))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(434)]).then(r.bind(r,6434))}],f=u,p=(0,d.BC)((()=>{const e=c.r5,t=(0,c.p7)({scrollBehavior:()=>({left:0,top:0}),routes:f,history:e("")});return t}));async function h(e,t){const r="function"===typeof p?await p({}):p,n=e(s);return n.use(o.Z,t),{app:n,router:r}}var m=r(4434),v=r(6246),b=r(499);const g={config:{},plugins:{Notify:m.Z,AddressbarColor:v.Z,Dialog:b.Z}};var y=r(1413);(0,y.z)("service-worker.js",{ready(){},registered(){},cached(){},updatefound(){},updated(){},offline(){},error(){}}),/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream&&window.navigator.standalone&&r.e(736).then(r.t.bind(r,9501,23));const w="";async function P({app:e,router:t},r){let n=!1;const o=e=>{n=!0;const r=Object(e)===e?t.resolve(e).fullPath:e;window.location.href=r},a=window.location.href.replace(window.location.origin,"");for(let l=0;!1===n&&l<r.length;l++)try{await r[l]({app:e,router:t,ssrContext:null,redirect:o,urlPath:a,publicPath:w})}catch(i){return i&&i.url?void(window.location.href=i.url):void console.error("[Quasar] boot error:",i)}!0!==n&&(e.use(t),e.mount("#q-app"))}h(n.ri,g).then((e=>Promise.all([Promise.resolve().then(r.bind(r,5224)),Promise.resolve().then(r.bind(r,1697))]).then((t=>{const r=t.map((e=>e.default)).filter((e=>"function"===typeof e));P(e,r)}))))},1697:(e,t,r)=>{r.r(t),r.d(t,{default:()=>a});r(71);var n=r(798),o=r.n(n);const a=({app:e})=>{e.config.globalProperties.$global={$on:(...e)=>o().on(...e),$once:(...e)=>o().once(...e),$off:(...e)=>o().off(...e),$emit:(...e)=>o().emit(...e)}}},5224:(e,t,r)=>{r.r(t),r.d(t,{default:()=>i});var n=r(7083),o=r(3009),a=r.n(o);const i=(0,n.xr)((async({app:e})=>{const t=3080;e.use(a(),`ws://${window.location.hostname}:${t}/wss`,{reconnection:!0,reconnectionAttempts:5,reconnectionDelay:3e3})}))}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}r.m=e,(()=>{var e=[];r.O=(t,n,o,a)=>{if(!n){var i=1/0;for(c=0;c<e.length;c++){for(var[n,o,a]=e[c],l=!0,s=0;s<n.length;s++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[s])))?n.splice(s--,1):(l=!1,a<i&&(i=a));if(l){e.splice(c--,1);var d=o();void 0!==d&&(t=d)}}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,o,a]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{var e,t=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__;r.t=function(n,o){if(1&o&&(n=this(n)),8&o)return n;if("object"===typeof n&&n){if(4&o&&n.__esModule)return n;if(16&o&&"function"===typeof n.then)return n}var a=Object.create(null);r.r(a);var i={};e=e||[null,t({}),t([]),t(t)];for(var l=2&o&&n;"object"==typeof l&&!~e.indexOf(l);l=t(l))Object.getOwnPropertyNames(l).forEach((e=>i[e]=()=>n[e]));return i["default"]=()=>n,r.d(a,i),a}})(),(()=>{r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{285:"a7501c94",366:"9eebd4b0",369:"eed0906c",434:"75d588ca",609:"67e991a0",668:"2eeabe1d",795:"fd61a4a0",842:"0c67fdcf"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+({143:"app",736:"vendor"}[e]||e)+"."+{143:"3abe2d2b",285:"596505c0",366:"a1eb96d8",369:"9f00f86f",609:"019ea3aa",668:"9f00f86f",736:"d99c7b69",795:"9f00f86f",842:"3bb499a4"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="nevatomscada:";r.l=(n,o,a,i)=>{if(e[n])e[n].push(o);else{var l,s;if(void 0!==a)for(var d=document.getElementsByTagName("script"),c=0;c<d.length;c++){var u=d[c];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==t+a){l=u;break}}l||(s=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,r.nc&&l.setAttribute("nonce",r.nc),l.setAttribute("data-webpack",t+a),l.src=n),e[n]=[o];var f=(t,r)=>{l.onerror=l.onload=null,clearTimeout(p);var o=e[n];if(delete e[n],l.parentNode&&l.parentNode.removeChild(l),o&&o.forEach((e=>e(r))),t)return t(r)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=f.bind(null,l.onerror),l.onload=f.bind(null,l.onload),s&&document.head.appendChild(l)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e)})(),(()=>{r.p=""})(),(()=>{var e=(e,t,r,n)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var a=a=>{if(o.onerror=o.onload=null,"load"===a.type)r();else{var i=a&&("load"===a.type?"missing":a.type),l=a&&a.target&&a.target.href||t,s=new Error("Loading CSS chunk "+e+" failed.\n("+l+")");s.code="CSS_CHUNK_LOAD_FAILED",s.type=i,s.request=l,o.parentNode.removeChild(o),n(s)}};return o.onerror=o.onload=a,o.href=t,document.head.appendChild(o),o},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=r[n],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){o=i[n],a=o.getAttribute("data-href");if(a===e||a===t)return o}},n=n=>new Promise(((o,a)=>{var i=r.miniCssF(n),l=r.p+i;if(t(i,l))return o();e(n,l,o,a)})),o={143:0};r.f.miniCss=(e,t)=>{var r={285:1,366:1,369:1,609:1,668:1,795:1,842:1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=n(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}})(),(()=>{var e={143:0};r.f.j=(t,n)=>{var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise(((r,n)=>o=e[t]=[r,n]));n.push(o[2]=a);var i=r.p+r.u(t),l=new Error,s=n=>{if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",l.name="ChunkLoadError",l.type=a,l.request=i,o[1](l)}};r.l(i,s,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,[i,l,s]=n,d=0;if(i.some((t=>0!==e[t]))){for(o in l)r.o(l,o)&&(r.m[o]=l[o]);if(s)var c=s(r)}for(t&&t(n);d<i.length;d++)a=i[d],r.o(e,a)&&e[a]&&e[a][0](),e[i[d]]=0;return r.O(c)},n=self["webpackChunknevatomscada"]=self["webpackChunknevatomscada"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=r.O(void 0,[736],(()=>r(3762)));n=r.O(n)})();