import{ae as U,b9 as T,ba as M,bb as W,bc as R,bd as H,be as V,bf as F,aH as K,aK as k,bg as G,bh as I,bi as J,r as _,a as S,w as Z,g as z,a5 as A,az as ee,bj as te,a6 as N,b6 as ne,a1 as oe,ak as ie,bk as ae,bl as re,e as se,bm as ue,ai as le,a$ as ce,bn as de}from"./index-S7_6R-pO.js";function fe(t){const n=[.06,6,50];return typeof t=="string"&&t.length&&t.split(":").forEach((s,p)=>{const m=parseFloat(s);m&&(n[p]=m)}),n}const ve=U({name:"touch-swipe",beforeMount(t,{value:n,arg:s,modifiers:p}){if(p.mouse!==!0&&T.has.touch!==!0)return;const m=p.mouseCapture===!0?"Capture":"",e={handler:n,sensitivity:fe(s),direction:M(p),noop:W,mouseStart(o){R(o,e)&&H(o)&&(V(e,"temp",[[document,"mousemove","move",`notPassive${m}`],[document,"mouseup","end","notPassiveCapture"]]),e.start(o,!0))},touchStart(o){if(R(o,e)){const r=o.target;V(e,"temp",[[r,"touchmove","move","notPassiveCapture"],[r,"touchcancel","end","notPassiveCapture"],[r,"touchend","end","notPassiveCapture"]]),e.start(o)}},start(o,r){T.is.firefox===!0&&F(t,!0);const b=K(o);e.event={x:b.left,y:b.top,time:Date.now(),mouse:r===!0,dir:!1}},move(o){if(e.event===void 0)return;if(e.event.dir!==!1){k(o);return}const r=Date.now()-e.event.time;if(r===0)return;const b=K(o),g=b.left-e.event.x,c=Math.abs(g),y=b.top-e.event.y,d=Math.abs(y);if(e.event.mouse!==!0){if(c<e.sensitivity[1]&&d<e.sensitivity[1]){e.end(o);return}}else if(window.getSelection().toString()!==""){e.end(o);return}else if(c<e.sensitivity[2]&&d<e.sensitivity[2])return;const a=c/r,f=d/r;e.direction.vertical===!0&&c<d&&c<100&&f>e.sensitivity[0]&&(e.event.dir=y<0?"up":"down"),e.direction.horizontal===!0&&c>d&&d<100&&a>e.sensitivity[0]&&(e.event.dir=g<0?"left":"right"),e.direction.up===!0&&c<d&&y<0&&c<100&&f>e.sensitivity[0]&&(e.event.dir="up"),e.direction.down===!0&&c<d&&y>0&&c<100&&f>e.sensitivity[0]&&(e.event.dir="down"),e.direction.left===!0&&c>d&&g<0&&d<100&&a>e.sensitivity[0]&&(e.event.dir="left"),e.direction.right===!0&&c>d&&g>0&&d<100&&a>e.sensitivity[0]&&(e.event.dir="right"),e.event.dir!==!1?(k(o),e.event.mouse===!0&&(document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),G(),e.styleCleanup=x=>{e.styleCleanup=void 0,document.body.classList.remove("non-selectable");const C=()=>{document.body.classList.remove("no-pointer-events--children")};x===!0?setTimeout(C,50):C()}),e.handler({evt:o,touch:e.event.mouse!==!0,mouse:e.event.mouse,direction:e.event.dir,duration:r,distance:{x:c,y:d}})):e.end(o)},end(o){e.event!==void 0&&(I(e,"temp"),T.is.firefox===!0&&F(t,!1),e.styleCleanup!==void 0&&e.styleCleanup(!0),o!==void 0&&e.event.dir!==!1&&k(o),e.event=void 0)}};if(t.__qtouchswipe=e,p.mouse===!0){const o=p.mouseCapture===!0||p.mousecapture===!0?"Capture":"";V(e,"main",[[t,"mousedown","mouseStart",`passive${o}`]])}T.has.touch===!0&&V(e,"main",[[t,"touchstart","touchStart",`passive${p.capture===!0?"Capture":""}`],[t,"touchmove","noop","notPassiveCapture"]])},updated(t,n){const s=t.__qtouchswipe;s!==void 0&&(n.oldValue!==n.value&&(typeof n.value!="function"&&s.end(),s.handler=n.value),s.direction=M(n.modifiers))},beforeUnmount(t){const n=t.__qtouchswipe;n!==void 0&&(I(n,"main"),I(n,"temp"),T.is.firefox===!0&&F(t,!1),n.styleCleanup!==void 0&&n.styleCleanup(),delete t.__qtouchswipe)}});function pe(){let t=Object.create(null);return{getCache:(n,s)=>t[n]===void 0?t[n]=typeof s=="function"?s():s:t[n],setCache(n,s){t[n]=s},hasCache(n){return Object.hasOwnProperty.call(t,n)},clearCache(n){n!==void 0?delete t[n]:t=Object.create(null)}}}const he={name:{required:!0},disable:Boolean},L={setup(t,{slots:n}){return()=>A("div",{class:"q-panel scroll",role:"tabpanel"},N(n.default))}},be={modelValue:{required:!0},animated:Boolean,infinite:Boolean,swipeable:Boolean,vertical:Boolean,transitionPrev:String,transitionNext:String,transitionDuration:{type:[String,Number],default:300},keepAlive:Boolean,keepAliveInclude:[String,Array,RegExp],keepAliveExclude:[String,Array,RegExp],keepAliveMax:Number},ye=["update:modelValue","beforeTransition","transition"];function ge(){const{props:t,emit:n,proxy:s}=z(),{getCache:p}=pe(),{registerTimeout:m}=J();let e,o;const r=_(null),b=_(null);function g(i){const l=t.vertical===!0?"up":"left";E((s.$q.lang.rtl===!0?-1:1)*(i.direction===l?1:-1))}const c=S(()=>[[ve,g,void 0,{horizontal:t.vertical!==!0,vertical:t.vertical,mouse:!0}]]),y=S(()=>t.transitionPrev||`slide-${t.vertical===!0?"down":"right"}`),d=S(()=>t.transitionNext||`slide-${t.vertical===!0?"up":"left"}`),a=S(()=>`--q-transition-duration: ${t.transitionDuration}ms`),f=S(()=>typeof t.modelValue=="string"||typeof t.modelValue=="number"?t.modelValue:String(t.modelValue)),x=S(()=>({include:t.keepAliveInclude,exclude:t.keepAliveExclude,max:t.keepAliveMax})),C=S(()=>t.keepAliveInclude!==void 0||t.keepAliveExclude!==void 0);Z(()=>t.modelValue,(i,l)=>{const P=v(i)===!0?h(i):-1;o!==!0&&q(P===-1?0:P<h(l)?-1:1),r.value!==P&&(r.value=P,n("beforeTransition",i,l),m(()=>{n("transition",i,l)},t.transitionDuration))});function w(){E(1)}function $(){E(-1)}function u(i){n("update:modelValue",i)}function v(i){return i!=null&&i!==""}function h(i){return e.findIndex(l=>l.props.name===i&&l.props.disable!==""&&l.props.disable!==!0)}function B(){return e.filter(i=>i.props.disable!==""&&i.props.disable!==!0)}function q(i){const l=i!==0&&t.animated===!0&&r.value!==-1?"q-transition--"+(i===-1?y.value:d.value):null;b.value!==l&&(b.value=l)}function E(i,l=r.value){let P=l+i;for(;P!==-1&&P<e.length;){const D=e[P];if(D!==void 0&&D.props.disable!==""&&D.props.disable!==!0){q(i),o=!0,n("update:modelValue",D.props.name),setTimeout(()=>{o=!1});return}P+=i}t.infinite===!0&&e.length!==0&&l!==-1&&l!==e.length&&E(i,i===-1?e.length:-1)}function O(){const i=h(t.modelValue);return r.value!==i&&(r.value=i),!0}function j(){const i=v(t.modelValue)===!0&&O()&&e[r.value];return t.keepAlive===!0?[A(ne,x.value,[A(C.value===!0?p(f.value,()=>({...L,name:f.value})):L,{key:f.value,style:a.value},()=>i)])]:[A("div",{class:"q-panel scroll",style:a.value,key:f.value,role:"tabpanel"},[i])]}function Q(){if(e.length!==0)return t.animated===!0?[A(ee,{name:b.value},j)]:j()}function X(i){return e=te(N(i.default,[])).filter(l=>l.props!==null&&l.props.slot===void 0&&v(l.props.name)===!0),e.length}function Y(){return e}return Object.assign(s,{next:w,previous:$,goTo:u}),{panelIndex:r,panelDirectives:c,updatePanelsList:X,updatePanelIndex:O,getPanelContent:Q,getEnabledPanels:B,getPanels:Y,isValidPanelName:v,keepAliveProps:x,needsUniqueKeepAliveWrapper:C,goToPanelByOffset:E,goToPanel:u,nextPanel:w,previousPanel:$}}const xe=oe({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(t,{slots:n,emit:s}){const p=z(),m=_(null);let e=0;const o=[];function r(a){const f=typeof a=="boolean"?a:t.noErrorFocus!==!0,x=++e,C=(u,v)=>{s(`validation${u===!0?"Success":"Error"}`,v)},w=u=>{const v=u.validate();return typeof v.then=="function"?v.then(h=>({valid:h,comp:u}),h=>({valid:!1,comp:u,err:h})):Promise.resolve({valid:v,comp:u})};return(t.greedy===!0?Promise.all(o.map(w)).then(u=>u.filter(v=>v.valid!==!0)):o.reduce((u,v)=>u.then(()=>w(v).then(h=>{if(h.valid===!1)return Promise.reject(h)})),Promise.resolve()).catch(u=>[u])).then(u=>{if(u===void 0||u.length===0)return x===e&&C(!0),!0;if(x===e){const{comp:v,err:h}=u[0];if(h!==void 0&&console.error(h),C(!1,v),f===!0){const B=u.find(({comp:q})=>typeof q.focus=="function"&&ue(q.$)===!1);B!==void 0&&B.comp.focus()}}return!1})}function b(){e++,o.forEach(a=>{typeof a.resetValidation=="function"&&a.resetValidation()})}function g(a){a!==void 0&&k(a);const f=e+1;r().then(x=>{f===e&&x===!0&&(t.onSubmit!==void 0?s("submit",a):a!==void 0&&a.target!==void 0&&typeof a.target.submit=="function"&&a.target.submit())})}function c(a){a!==void 0&&k(a),s("reset"),le(()=>{b(),t.autofocus===!0&&t.noResetFocus!==!0&&y()})}function y(){ce(()=>{if(m.value===null)return;const a=m.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||m.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||m.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(m.value.querySelectorAll("[tabindex]"),f=>f.tabIndex!==-1);a!=null&&a.focus({preventScroll:!0})})}ie(de,{bindComponent(a){o.push(a)},unbindComponent(a){const f=o.indexOf(a);f!==-1&&o.splice(f,1)}});let d=!1;return ae(()=>{d=!0}),re(()=>{d===!0&&t.autofocus===!0&&y()}),se(()=>{t.autofocus===!0&&y()}),Object.assign(p.proxy,{validate:r,resetValidation:b,submit:g,reset:c,focus:y,getValidationComponents:()=>o}),()=>A("form",{class:"q-form",ref:m,onSubmit:g,onReset:c},N(n.default))}});export{xe as Q,be as a,ye as b,ge as c,pe as d,he as u};
