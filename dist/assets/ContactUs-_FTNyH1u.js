var Le=Object.defineProperty;var Te=(e,t,r)=>t in e?Le(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var ne=(e,t,r)=>Te(e,typeof t!="symbol"?t+"":t,r);import{_ as J,o as z,c as T,q as E,i as Z,E as Me,A as me,y as he,ad as se,I as Se,J as Pe,K as je,u as C,r as H,w as K,a4 as te,aG as Ne,d as x,M as ae,aH as $e,ar as Re,aI as Be,aJ as qe,aK as De,a7 as xe,e as Oe,S as A,aL as Ze,aM as Ue,f as ue,aN as He,aO as ve,aP as pe,aQ as Ge,G as Qe,v as V,af as ge,H as Ke,n as Ye,m as W,ae as Ie,aa as Ae,aR as We,al as Je,x as Xe,p as et,R as tt,aS as de,a1 as nt,aT as at,T as fe,aU as Ve,U as lt,V as ot,a6 as st,ay as rt,W as it,aV as ut,l as _e}from"./index-nmmA835_.js";import{f as ct,Q as dt,u as ft,a as mt,g as ht,b as vt,c as pt,d as gt}from"./QForm-Bo7BGU6x.js";const _t={},wt={class:"flex justify-center"};function kt(e,t){return z(),T("div",wt,t[0]||(t[0]=[E("iframe",{allow:"autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share",allowfullscreen:"true",frameborder:"0",height:"506",scrolling:"no",src:"https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D61565159713117&tabs=timeline&width=340&height=506&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=3833501433534587",style:{border:"none",overflow:"hidden"},width:"340"},null,-1)]))}const yt=J(_t,[["render",kt]]),bt={class:"formLabel flex justify-between items-center gap-2"},Ct={class:"formLabel__top-left"},Mt={key:1,class:"text-negative"},St={class:"formLabel__top-right"},xt=Z({__name:"FormLabel",props:{title:{},titleColor:{},tips:{},tipsColor:{},required:{type:Boolean}},setup(e){const t=Me();return(r,d)=>(z(),T("label",Pe(je(C(t))),[E("div",bt,[E("div",Ct,[r.title?(z(),T("span",{key:0,style:me({color:r.titleColor})},he(r.title),5)):se("",!0),r.required?(z(),T("sup",Mt," * ")):se("",!0),r.tips?(z(),T("small",{key:2,style:me({color:r.tipsColor})},he(r.tips),5)):se("",!0)]),E("div",St,[Se(r.$slots,"top-right")])])],16))}}),we={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},ie={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},Ee=Object.keys(ie);Ee.forEach(e=>{ie[e].regex=new RegExp(ie[e].pattern)});const It=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+Ee.join("")+"])|(.)","g"),ke=/[.*+?^${}()|[\]\\]/g,P="",At={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function Vt(e,t,r,d){let a,i,k,f,p,v;const m=H(null),h=H(N());function $(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}K(()=>e.type+e.autogrow,g),K(()=>e.mask,s=>{if(s!==void 0)u(h.value,!0);else{const l=D(h.value);g(),e.modelValue!==l&&t("update:modelValue",l)}}),K(()=>e.fillMask+e.reverseFillMask,()=>{m.value===!0&&u(h.value,!0)}),K(()=>e.unmaskedValue,()=>{m.value===!0&&u(h.value)});function N(){if(g(),m.value===!0){const s=X(D(e.modelValue));return e.fillMask!==!1?oe(s):s}return e.modelValue}function B(s){if(s<a.length)return a.slice(-s);let l="",c=a;const o=c.indexOf(P);if(o!==-1){for(let y=s-c.length;y>0;y--)l+=P;c=c.slice(0,o)+l+c.slice(o)}return c}function g(){if(m.value=e.mask!==void 0&&e.mask.length!==0&&$(),m.value===!1){f=void 0,a="",i="";return}const s=we[e.mask]===void 0?e.mask:we[e.mask],l=typeof e.fillMask=="string"&&e.fillMask.length!==0?e.fillMask.slice(0,1):"_",c=l.replace(ke,"\\$&"),o=[],y=[],w=[];let L=e.reverseFillMask===!0,b="",S="";s.replace(It,(j,n,F,U,O)=>{if(U!==void 0){const R=ie[U];w.push(R),S=R.negate,L===!0&&(y.push("(?:"+S+"+)?("+R.pattern+"+)?(?:"+S+"+)?("+R.pattern+"+)?"),L=!1),y.push("(?:"+S+"+)?("+R.pattern+")?")}else if(F!==void 0)b="\\"+(F==="\\"?"":F),w.push(F),o.push("([^"+b+"]+)?"+b+"?");else{const R=n!==void 0?n:O;b=R==="\\"?"\\\\\\\\":R.replace(ke,"\\\\$&"),w.push(R),o.push("([^"+b+"]+)?"+b+"?")}});const Y=new RegExp("^"+o.join("")+"("+(b===""?".":"[^"+b+"]")+"+)?"+(b===""?"":"["+b+"]*")+"$"),Q=y.length-1,I=y.map((j,n)=>n===0&&e.reverseFillMask===!0?new RegExp("^"+c+"*"+j):n===Q?new RegExp("^"+j+"("+(S===""?".":S)+"+)?"+(e.reverseFillMask===!0?"$":c+"*")):new RegExp("^"+j));k=w,f=j=>{const n=Y.exec(e.reverseFillMask===!0?j:j.slice(0,w.length+1));n!==null&&(j=n.slice(1).join(""));const F=[],U=I.length;for(let O=0,R=j;O<U;O++){const ee=I[O].exec(R);if(ee===null)break;R=R.slice(ee.shift().length),F.push(...ee)}return F.length!==0?F.join(""):j},a=w.map(j=>typeof j=="string"?j:P).join(""),i=a.split(P).join(l)}function u(s,l,c){const o=d.value,y=o.selectionEnd,w=o.value.length-y,L=D(s);l===!0&&g();const b=X(L),S=e.fillMask!==!1?oe(b):b,Y=h.value!==S;o.value!==S&&(o.value=S),Y===!0&&(h.value=S),document.activeElement===o&&te(()=>{if(S===i){const I=e.reverseFillMask===!0?i.length:0;o.setSelectionRange(I,I,"forward");return}if(c==="insertFromPaste"&&e.reverseFillMask!==!0){const I=o.selectionEnd;let j=y-1;for(let n=p;n<=j&&n<I;n++)a[n]!==P&&j++;M.right(o,j);return}if(["deleteContentBackward","deleteContentForward"].indexOf(c)!==-1){const I=e.reverseFillMask===!0?y===0?S.length>b.length?1:0:Math.max(0,S.length-(S===i?0:Math.min(b.length,w)+1))+1:y;o.setSelectionRange(I,I,"forward");return}if(e.reverseFillMask===!0)if(Y===!0){const I=Math.max(0,S.length-(S===i?0:Math.min(b.length,w+1)));I===1&&y===1?o.setSelectionRange(I,I,"forward"):M.rightReverse(o,I)}else{const I=S.length-w;o.setSelectionRange(I,I,"backward")}else if(Y===!0){const I=Math.max(0,a.indexOf(P),Math.min(b.length,y)-1);M.right(o,I)}else{const I=y-1;M.right(o,I)}});const Q=e.unmaskedValue===!0?D(S):S;String(e.modelValue)!==Q&&(e.modelValue!==null||Q!=="")&&r(Q,!0)}function _(s,l,c){const o=X(D(s.value));l=Math.max(0,a.indexOf(P),Math.min(o.length,l)),p=l,s.setSelectionRange(l,c,"forward")}const M={left(s,l){const c=a.slice(l-1).indexOf(P)===-1;let o=Math.max(0,l-1);for(;o>=0;o--)if(a[o]===P){l=o,c===!0&&l++;break}if(o<0&&a[l]!==void 0&&a[l]!==P)return M.right(s,0);l>=0&&s.setSelectionRange(l,l,"backward")},right(s,l){const c=s.value.length;let o=Math.min(c,l+1);for(;o<=c;o++)if(a[o]===P){l=o;break}else a[o-1]===P&&(l=o);if(o>c&&a[l-1]!==void 0&&a[l-1]!==P)return M.left(s,c);s.setSelectionRange(l,l,"forward")},leftReverse(s,l){const c=B(s.value.length);let o=Math.max(0,l-1);for(;o>=0;o--)if(c[o-1]===P){l=o;break}else if(c[o]===P&&(l=o,o===0))break;if(o<0&&c[l]!==void 0&&c[l]!==P)return M.rightReverse(s,0);l>=0&&s.setSelectionRange(l,l,"backward")},rightReverse(s,l){const c=s.value.length,o=B(c),y=o.slice(0,l+1).indexOf(P)===-1;let w=Math.min(c,l+1);for(;w<=c;w++)if(o[w-1]===P){l=w,l>0&&y===!0&&l--;break}if(w>c&&o[l-1]!==void 0&&o[l-1]!==P)return M.leftReverse(s,c);s.setSelectionRange(l,l,"forward")}};function ce(s){t("click",s),v=void 0}function le(s){if(t("keydown",s),Ne(s)===!0||s.altKey===!0)return;const l=d.value,c=l.selectionStart,o=l.selectionEnd;if(s.shiftKey||(v=void 0),s.keyCode===37||s.keyCode===39){s.shiftKey&&v===void 0&&(v=l.selectionDirection==="forward"?c:o);const y=M[(s.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];if(s.preventDefault(),y(l,v===c?o:c),s.shiftKey){const w=l.selectionStart;l.setSelectionRange(Math.min(v,w),Math.max(v,w),"forward")}}else s.keyCode===8&&e.reverseFillMask!==!0&&c===o?(M.left(l,c),l.setSelectionRange(l.selectionStart,o,"backward")):s.keyCode===46&&e.reverseFillMask===!0&&c===o&&(M.rightReverse(l,o),l.setSelectionRange(c,l.selectionEnd,"forward"))}function X(s){if(s==null||s==="")return"";if(e.reverseFillMask===!0)return G(s);const l=k;let c=0,o="";for(let y=0;y<l.length;y++){const w=s[c],L=l[y];if(typeof L=="string")o+=L,w===L&&c++;else if(w!==void 0&&L.regex.test(w))o+=L.transform!==void 0?L.transform(w):w,c++;else return o}return o}function G(s){const l=k,c=a.indexOf(P);let o=s.length-1,y="";for(let w=l.length-1;w>=0&&o!==-1;w--){const L=l[w];let b=s[o];if(typeof L=="string")y=L+y,b===L&&o--;else if(b!==void 0&&L.regex.test(b))do y=(L.transform!==void 0?L.transform(b):b)+y,o--,b=s[o];while(c===w&&b!==void 0&&L.regex.test(b));else return y}return y}function D(s){return typeof s!="string"||f===void 0?typeof s=="number"?f(""+s):s:f(s)}function oe(s){return i.length-s.length<=0?s:e.reverseFillMask===!0&&s.length!==0?i.slice(0,-s.length)+s:s+i.slice(s.length)}return{innerValue:h,hasMask:m,moveCursorForPaste:_,updateMaskValue:u,onMaskedKeydown:le,onMaskedClick:ce}}function Et(e,t){function r(){const d=e.modelValue;try{const a="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(d)===d&&("length"in d?Array.from(d):[d]).forEach(i=>{a.items.add(i)}),{files:a.files}}catch{return{files:void 0}}}return x(()=>{if(e.type==="file")return r()})}const zt=ae({name:"QInput",inheritAttrs:!1,props:{...$e,...At,...Re,modelValue:[String,Number,FileList],shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...Be,"paste","change","keydown","click","animationend"],setup(e,{emit:t,attrs:r}){const{proxy:d}=ue(),{$q:a}=d,i={};let k=NaN,f,p,v=null,m;const h=H(null),$=qe(e),{innerValue:N,hasMask:B,moveCursorForPaste:g,updateMaskValue:u,onMaskedKeydown:_,onMaskedClick:M}=Vt(e,t,b,h),ce=Et(e),le=x(()=>pe(N.value)),X=Ge(w),G=De({changeEvent:!0}),D=x(()=>e.type==="textarea"||e.autogrow===!0),oe=x(()=>D.value===!0||["text","search","url","tel","password"].includes(e.type)),s=x(()=>{const n={...G.splitAttrs.listeners.value,onInput:w,onPaste:y,onChange:Y,onBlur:Q,onFocus:ve};return n.onCompositionstart=n.onCompositionupdate=n.onCompositionend=X,B.value===!0&&(n.onKeydown=_,n.onClick=M),e.autogrow===!0&&(n.onAnimationend=L),n}),l=x(()=>{const n={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:$.value,...G.splitAttrs.attributes.value,id:G.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return D.value===!1&&(n.type=e.type),e.autogrow===!0&&(n.rows=1),n});K(()=>e.type,()=>{h.value&&(h.value.value=e.modelValue)}),K(()=>e.modelValue,n=>{if(B.value===!0){if(p===!0&&(p=!1,String(n)===k))return;u(n)}else N.value!==n&&(N.value=n,e.type==="number"&&i.hasOwnProperty("value")===!0&&(f===!0?f=!1:delete i.value));e.autogrow===!0&&te(S)}),K(()=>e.autogrow,n=>{n===!0?te(S):h.value!==null&&r.rows>0&&(h.value.style.height="auto")}),K(()=>e.dense,()=>{e.autogrow===!0&&te(S)});function c(){He(()=>{const n=document.activeElement;h.value!==null&&h.value!==n&&(n===null||n.id!==G.targetUid.value)&&h.value.focus({preventScroll:!0})})}function o(){h.value!==null&&h.value.select()}function y(n){if(B.value===!0&&e.reverseFillMask!==!0){const F=n.target;g(F,F.selectionStart,F.selectionEnd)}t("paste",n)}function w(n){if(!n||!n.target)return;if(e.type==="file"){t("update:modelValue",n.target.files);return}const F=n.target.value;if(n.target.qComposing===!0){i.value=F;return}if(B.value===!0)u(F,!1,n.inputType);else if(b(F),oe.value===!0&&n.target===document.activeElement){const{selectionStart:U,selectionEnd:O}=n.target;U!==void 0&&O!==void 0&&te(()=>{n.target===document.activeElement&&F.indexOf(n.target.value)===0&&n.target.setSelectionRange(U,O)})}e.autogrow===!0&&S()}function L(n){t("animationend",n),S()}function b(n,F){m=()=>{v=null,e.type!=="number"&&i.hasOwnProperty("value")===!0&&delete i.value,e.modelValue!==n&&k!==n&&(k=n,F===!0&&(p=!0),t("update:modelValue",n),te(()=>{k===n&&(k=NaN)})),m=void 0},e.type==="number"&&(f=!0,i.value=n),e.debounce!==void 0?(v!==null&&clearTimeout(v),i.value=n,v=setTimeout(m,e.debounce)):m()}function S(){requestAnimationFrame(()=>{const n=h.value;if(n!==null){const F=n.parentNode.style,{scrollTop:U}=n,{overflowY:O,maxHeight:R}=a.platform.is.firefox===!0?{}:window.getComputedStyle(n),ee=O!==void 0&&O!=="scroll";ee===!0&&(n.style.overflowY="hidden"),F.marginBottom=n.scrollHeight-1+"px",n.style.height="1px",n.style.height=n.scrollHeight+"px",ee===!0&&(n.style.overflowY=parseInt(R,10)<n.scrollHeight?"auto":"hidden"),F.marginBottom="",n.scrollTop=U}})}function Y(n){X(n),v!==null&&(clearTimeout(v),v=null),m!==void 0&&m(),t("change",n.target.value)}function Q(n){n!==void 0&&ve(n),v!==null&&(clearTimeout(v),v=null),m!==void 0&&m(),f=!1,p=!1,delete i.value,e.type!=="file"&&setTimeout(()=>{h.value!==null&&(h.value.value=N.value!==void 0?N.value:"")})}function I(){return i.hasOwnProperty("value")===!0?i.value:N.value!==void 0?N.value:""}xe(()=>{Q()}),Oe(()=>{e.autogrow===!0&&S()}),Object.assign(G,{innerValue:N,fieldClass:x(()=>`q-${D.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:x(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length!==0),inputRef:h,emitValue:b,hasValue:le,floatingLabel:x(()=>le.value===!0&&(e.type!=="number"||isNaN(N.value)===!1)||pe(e.displayValue)),getControl:()=>A(D.value===!0?"textarea":"input",{ref:h,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...l.value,...s.value,...e.type!=="file"?{value:I()}:ce.value}),getShadowControl:()=>A("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(D.value===!0?"":" text-no-wrap")},[A("span",{class:"invisible"},I()),A("span",e.shadowText)])});const j=Ze(G);return Object.assign(d,{focus:c,select:o,getNativeElement:()=>h.value}),Ue(d,"nativeEl",()=>h.value),j}}),re=e=>(!!e||e===0)&&(e+"").trim()!==""||"This field is required!",Ft=e=>e&&/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)||"The email is not valid!",Lt=Z({__name:"FormInput",props:{modelValue:{},rules:{},title:{},titleColor:{},tips:{},tipsColor:{}},setup(e){const t=e,r=Me(),d=Qe(),a=x(()=>(t.rules||[]).indexOf(re)>-1);return(i,k)=>{const f=xt;return z(),T("div",null,[V(f,ge(t,{required:a.value}),null,16,["required"]),V(C(zt),ge(C(r),{"hide-bottom-space":!0,"model-value":i.modelValue,rules:i.rules,clearable:"",standout:"bg-secondary text-white"}),Ke({_:2},[Ye(Object.keys(C(d)),(p,v)=>({name:p,fn:W(()=>[Se(i.$slots,p)])}))]),1040,["model-value","rules"])])}}}),Tt=e=>ct.post("/v1.0/email/send-form",e,{headers:{"Content-Type":"multipart/form-data"}});class ye{constructor(t){ne(this,"name","");ne(this,"email","");ne(this,"subject","");ne(this,"message","");if(!t)return;const{name:r="",email:d="",subject:a="",message:i=""}=t;this.name=r,this.email=d,this.subject=a,this.message=i}}const Pt={class:"flex flex-col justify-center gap-6"},jt=Z({__name:"ContactEmail",setup(e){const{$notify:t}=ft(),r=H(!1),d=H(),a=H(new ye),i=()=>{r.value=!0,Tt(a.value).then(()=>{a.value=new ye}).catch(()=>{t.error("Send Fail! Please try again later...")}).finally(()=>{r.value=!1,d.value.resetValidation()})};return(k,f)=>{const p=Lt,v=Ie;return z(),T("div",Pt,[f[4]||(f[4]=E("h3",{class:"text-white text-center"},"Email Us",-1)),V(dt,{ref_key:"formRef",ref:d,class:"flex flex-col gap-3",onSubmit:i},{default:W(()=>[V(p,{modelValue:a.value.name,"onUpdate:modelValue":f[0]||(f[0]=m=>a.value.name=m),rules:[C(re)],dark:"",dense:"",title:"Name",titleColor:"white"},null,8,["modelValue","rules"]),V(p,{modelValue:a.value.email,"onUpdate:modelValue":f[1]||(f[1]=m=>a.value.email=m),rules:[C(re),C(Ft)],dark:"",dense:"",title:"Email",titleColor:"white"},null,8,["modelValue","rules"]),V(p,{modelValue:a.value.subject,"onUpdate:modelValue":f[2]||(f[2]=m=>a.value.subject=m),dark:"",dense:"",title:"Subject",titleColor:"white"},null,8,["modelValue"]),V(p,{modelValue:a.value.message,"onUpdate:modelValue":f[3]||(f[3]=m=>a.value.message=m),rules:[C(re)],dark:"",dense:"",title:"Message",titleColor:"white",type:"textarea"},null,8,["modelValue","rules"]),V(v,{loading:r.value,color:"primary",label:"SEND",type:"submit"},null,8,["loading"])]),_:1},512)])}}}),Nt=["href"],$t=["fill","height","width"],Rt=Z({__name:"Github",props:{href:{},size:{default:"32"},fill:{default:"#fff"},hasColor:{type:Boolean}},setup(e){return(t,r)=>(z(),T("a",{href:t.href,class:"inline-block",rel:"noopener noreferrer",target:"_blank"},[(z(),T("svg",{fill:t.hasColor?"#24292e":t.fill,height:t.size,width:t.size,class:"githubSM",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},r[0]||(r[0]=[E("path",{d:"M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"},null,-1)]),8,$t))],8,Nt))}}),Bt=J(Rt,[["__scopeId","data-v-04930620"]]),qt=["href"],Dt=["fill","height","width"],Ot=Z({__name:"YouTube",props:{href:{},size:{default:"32"},fill:{default:"#fff"},hasColor:{type:Boolean}},setup(e){return(t,r)=>(z(),T("a",{href:t.href,class:"inline-block",rel:"noopener noreferrer",target:"_blank"},[(z(),T("svg",{fill:t.hasColor?"#ff0000":t.fill,height:t.size,width:t.size,class:"youtubeSM",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},r[0]||(r[0]=[E("path",{d:"M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"},null,-1)]),8,Dt))],8,qt))}}),Zt=J(Ot,[["__scopeId","data-v-516045b1"]]),Ut=["href"],Ht=["height","width"],Gt={style:{stroke:"none","stroke-width":"0","stroke-dasharray":"none","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-miterlimit":"10",fill:"none","fill-rule":"nonzero",opacity:"1"},transform:"translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"},Qt=["fill"],Kt=Z({__name:"Line",props:{href:{},size:{default:"32"},fill:{default:"#fff"},hasColor:{type:Boolean}},setup(e){return(t,r)=>(z(),T("a",{href:t.href,class:"inline-block",rel:"noopener noreferrer",target:"_blank"},[(z(),T("svg",{height:t.size,width:t.size,class:"lineSM","xml:space":"preserve",version:"1.1",viewBox:"0 0 256 256","xmlns:xlink":"http://www.w3.org/1999/xlink",xmlns:"http://www.w3.org/2000/svg"},[E("g",Gt,[E("path",{fill:t.hasColor?"#4cc764":t.fill,d:"M 90 38.641 C 90 18.505 69.813 2.123 45 2.123 c -24.811 0 -45 16.382 -45 36.518 c 0 18.052 16.009 33.17 37.634 36.029 c 1.465 0.316 3.46 0.966 3.964 2.219 c 0.454 1.137 0.297 2.92 0.146 4.069 c 0 0 -0.528 3.175 -0.642 3.852 c -0.196 1.137 -0.904 4.45 3.898 2.426 c 4.803 -2.024 25.916 -15.26 35.357 -26.126 h -0.002 C 86.876 53.958 90 46.7 90 38.641 z M 29.123 49.392 c 0 0.484 -0.391 0.877 -0.875 0.877 H 15.639 h -0.001 c -0.235 0 -0.448 -0.093 -0.605 -0.244 c -0.004 -0.004 -0.009 -0.008 -0.013 -0.012 c -0.005 -0.004 -0.008 -0.009 -0.012 -0.013 c -0.151 -0.157 -0.245 -0.37 -0.245 -0.605 v -0.001 V 29.786 c 0 -0.484 0.393 -0.876 0.877 -0.876 h 3.157 c 0.484 0 0.876 0.392 0.876 0.876 v 15.572 h 8.577 c 0.484 0 0.875 0.393 0.875 0.877 V 49.392 z M 36.733 49.393 c 0 0.483 -0.393 0.874 -0.877 0.874 H 32.7 c -0.484 0 -0.877 -0.391 -0.877 -0.874 V 29.786 c 0 -0.483 0.393 -0.875 0.877 -0.875 h 3.157 c 0.484 0 0.877 0.392 0.877 0.875 V 49.393 z M 58.459 49.393 c 0 0.483 -0.392 0.874 -0.877 0.874 h -3.156 c -0.078 0 -0.153 -0.011 -0.224 -0.03 c -0.004 -0.001 -0.009 -0.002 -0.013 -0.003 c -0.02 -0.006 -0.039 -0.012 -0.06 -0.019 c -0.009 -0.003 -0.017 -0.006 -0.026 -0.01 c -0.015 -0.006 -0.028 -0.012 -0.043 -0.018 c -0.014 -0.006 -0.028 -0.013 -0.042 -0.021 c -0.009 -0.004 -0.016 -0.008 -0.025 -0.013 c -0.018 -0.01 -0.036 -0.021 -0.054 -0.033 c -0.003 -0.003 -0.006 -0.005 -0.009 -0.007 c -0.084 -0.057 -0.161 -0.129 -0.222 -0.216 l -8.997 -12.15 v 11.645 c 0 0.483 -0.393 0.874 -0.877 0.874 h -3.156 c -0.484 0 -0.877 -0.391 -0.877 -0.874 V 29.786 c 0 -0.483 0.393 -0.875 0.877 -0.875 h 3.156 c 0.011 0 0.02 0.001 0.031 0.001 c 0.016 0.001 0.031 0.001 0.045 0.003 c 0.016 0.001 0.031 0.003 0.046 0.006 c 0.012 0.001 0.025 0.003 0.037 0.005 c 0.017 0.004 0.033 0.007 0.05 0.011 c 0.011 0.003 0.021 0.005 0.031 0.008 c 0.018 0.005 0.035 0.011 0.052 0.017 c 0.01 0.003 0.018 0.006 0.028 0.01 c 0.018 0.006 0.034 0.014 0.05 0.021 c 0.009 0.004 0.018 0.009 0.028 0.013 c 0.016 0.008 0.031 0.017 0.047 0.026 c 0.009 0.005 0.018 0.01 0.026 0.016 c 0.016 0.01 0.031 0.021 0.045 0.031 c 0.008 0.006 0.016 0.011 0.023 0.018 c 0.016 0.012 0.032 0.026 0.047 0.039 c 0.006 0.005 0.011 0.01 0.016 0.015 c 0.018 0.017 0.036 0.035 0.053 0.054 c 0.001 0.001 0.004 0.004 0.006 0.006 c 0.024 0.028 0.048 0.058 0.068 0.089 l 8.986 12.135 V 29.786 c 0 -0.483 0.392 -0.875 0.877 -0.875 h 3.156 c 0.484 0 0.877 0.392 0.877 0.875 V 49.393 z M 75.889 32.944 c 0 0.484 -0.391 0.877 -0.875 0.877 h -8.576 v 3.314 h 8.576 c 0.484 0 0.875 0.393 0.875 0.877 v 3.156 c 0 0.484 -0.391 0.877 -0.875 0.877 h -8.576 v 3.315 h 8.576 c 0.484 0 0.875 0.393 0.875 0.877 v 3.157 c 0 0.484 -0.391 0.877 -0.875 0.877 H 62.404 h -0.001 c -0.235 0 -0.448 -0.094 -0.605 -0.245 c -0.004 -0.004 -0.009 -0.008 -0.013 -0.011 c -0.004 -0.004 -0.009 -0.009 -0.012 -0.013 c -0.151 -0.157 -0.245 -0.37 -0.245 -0.605 v -0.001 V 29.788 v -0.001 c 0 -0.234 0.093 -0.447 0.243 -0.604 c 0.004 -0.005 0.009 -0.01 0.014 -0.016 c 0.003 -0.003 0.007 -0.006 0.01 -0.009 c 0.158 -0.153 0.371 -0.247 0.608 -0.247 h 0.001 h 12.609 c 0.484 0 0.875 0.393 0.875 0.877 V 32.944 z","stroke-linecap":"round",style:{stroke:"none","stroke-width":"1","stroke-dasharray":"none","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-miterlimit":"10","fill-rule":"nonzero",opacity:"1"},transform:" matrix(1 0 0 1 0 0) "},null,8,Qt)])],8,Ht))],8,Ut))}}),Yt=J(Kt,[["__scopeId","data-v-4c7d9fc5"]]),Wt=["href"],Jt=["height","width"],Xt={id:"lineSmRg",cx:"30%",cy:"107%",r:"150%"},en=["stop-color"],tn=["stop-color"],nn=["stop-color"],an=["stop-color"],ln=["stop-color"],on=Z({__name:"Instagram",props:{href:{},size:{default:"32"},stopColor:{default:"#fff"},hasColor:{type:Boolean}},setup(e){return(t,r)=>(z(),T("a",{href:t.href,class:"inline-block",rel:"noopener noreferrer",target:"_blank"},[(z(),T("svg",{height:t.size,width:t.size,class:"instagramSM",fill:"url(#lineSmRg)",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},[r[0]||(r[0]=E("path",{d:"M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"},null,-1)),E("radialGradient",Xt,[E("stop",{"stop-color":t.hasColor?"#fdf497":t.stopColor,offset:"0"},null,8,en),E("stop",{"stop-color":t.hasColor?"#fdf497":t.stopColor,offset:"0.05"},null,8,tn),E("stop",{"stop-color":t.hasColor?"#fd5949":t.stopColor,offset:"0.45"},null,8,nn),E("stop",{"stop-color":t.hasColor?"#d6249f":t.stopColor,offset:"0.6"},null,8,an),E("stop",{"stop-color":t.hasColor?"#285aeb":t.stopColor,offset:"0.9"},null,8,ln)])],8,Jt))],8,Wt))}}),sn=J(on,[["__scopeId","data-v-1b4eb64a"]]),rn=["href"],un=["fill","height","width"],cn=Z({__name:"Facebook",props:{href:{},size:{default:"32"},fill:{default:"#fff"},hasColor:{type:Boolean}},setup(e){return(t,r)=>(z(),T("a",{href:t.href,class:"inline-block",rel:"noopener noreferrer",target:"_blank"},[(z(),T("svg",{fill:t.hasColor?"#0866ff":t.fill,height:t.size,width:t.size,class:"facebookSM",viewBox:"0 0 16 16",xmlns:"http://www.w3.org/2000/svg"},r[0]||(r[0]=[E("path",{d:"M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"},null,-1)]),8,un))],8,rn))}}),dn=J(cn,[["__scopeId","data-v-467f8e76"]]),fn="/beBird/assets/logo-B9oaKlc1.png",mn="data:image/svg+xml,%3c?xml%20version='1.0'%20encoding='utf-8'?%3e%3csvg%20version='1.1'%20id='Layer_1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20x='0px'%20y='0px'%20viewBox='0%200%20122.88%2092.12'%20style='enable-background:new%200%200%20122.88%2092.12'%20xml:space='preserve'%3e%3cstyle%20type='text/css'%3e%3c![CDATA[%20.st0{fill:%23EA4335;}%20.st1{fill:%23C5221F;}%20.st2{fill:%23FBBC04;}%20.st3{fill:%2334A853;}%20.st4{fill:%234285F4;}%20]]%3e%3c/style%3e%3cg%3e%3cpath%20class='st4'%20d='M8.36,92.12h19.54V44.67L0,23.76v60.08C0,88.42,3.78,92.12,8.36,92.12L8.36,92.12z'/%3e%3cpath%20class='st3'%20d='M94.97,92.12h19.54c4.67,0,8.36-3.78,8.36-8.36v-60L94.97,44.67V92.12L94.97,92.12z'/%3e%3cpath%20class='st2'%20d='M94.97,8.4v36.27l27.91-20.91V12.58c0-10.37-11.82-16.25-20.11-10.05L94.97,8.4L94.97,8.4z'/%3e%3cpolygon%20class='st0'%20points='27.9,44.67%2027.9,8.4%2061.44,33.57%2094.97,8.4%2094.97,44.67%2061.44,69.76%2027.9,44.67'/%3e%3cpath%20class='st1'%20d='M0,12.58v11.18l27.91,20.91V8.4l-7.8-5.87C11.82-3.66,0,2.29,0,12.58L0,12.58z'/%3e%3c/g%3e%3c/svg%3e",hn="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkJz48c3ZnIGhlaWdodD0iNTEycHgiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMiA1MTI7IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiB3aWR0aD0iNTEycHgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnIGlkPSJfeDM4XzAtZmFjZWJvb2siPjxnPjxnPjxwYXRoIGQ9Ik0zNzUuMzAxLDE4MS4yMzZoLTg5LjQ3NXYtNTkuODEzYzAtMTYuNTEsMTMuMzU5LTI5LjkwOCwyOS44MjgtMjkuOTA4aDI5LjgyNFYxNi43NWgtNTkuNjUyICAgICBjLTQ5LjQyLDAtODkuNDc1LDQwLjE2Mi04OS40NzUsODkuNzE4djc0Ljc2OGgtNTkuNjU0VjI1Nmg1OS42NTR2MjM5LjI1aDg5LjQ3NVYyNTZoNTkuNjUyTDM3NS4zMDEsMTgxLjIzNnogTTM3NS4zMDEsMTgxLjIzNiIgc3R5bGU9ImZpbGw6IzFCODBFNDsiLz48L2c+PC9nPjwvZz48ZyBpZD0iTGF5ZXJfMSIvPjwvc3ZnPg==";var q=(e=>(e.EMAIL="email",e.FAN_PAGE="fanPage",e))(q||{});const vn={class:"flex flex-col justify-center items-center gap-4"},pn=["src"],gn={class:"flex gap-4"},_n={key:0,class:"flex gap-1"},wn=Z({__name:"ContactConnections",props:{step:{}},emits:["change-step"],setup(e,{emit:t}){const r=t,{isMobile:d}=Ae();return(a,i)=>{const k=dn,f=sn,p=Yt,v=Zt,m=Bt,h=Ie;return z(),T("div",vn,[V(We,{style:{width:"90%","max-width":"350px",height:"auto"}},{default:W(()=>[E("img",{src:C(fn)},null,8,pn)]),_:1}),i[2]||(i[2]=E("span",{class:"text-white"},"Email: z94624@gmail.com",-1)),E("div",gn,[V(k,{"has-color":C(d),href:"https://www.facebook.com/profile.php?id=61565159713117"},null,8,["has-color"]),V(f,{"has-color":C(d),href:"https://www.instagram.com/smobee_universe/"},null,8,["has-color"]),V(p,{"has-color":C(d),href:"https://lin.ee/ctu3G0j"},null,8,["has-color"]),V(v,{"has-color":C(d),href:"https://www.youtube.com/@smoBEEUniverse"},null,8,["has-color"]),V(m,{"has-color":C(d),href:"https://github.com/z94624/beBird"},null,8,["has-color"])]),C(d)?se("",!0):(z(),T("div",_n,[V(h,{color:a.step===C(q).EMAIL?"white":void 0,flat:a.step!==C(q).EMAIL,icon:`img:${C(mn)}`,round:"",onClick:i[0]||(i[0]=$=>r("change-step",C(q).EMAIL))},null,8,["color","flat","icon"]),V(h,{color:a.step===C(q).FAN_PAGE?"white":void 0,flat:a.step!==C(q).FAN_PAGE,icon:`img:${C(hn)}`,round:"",onClick:i[1]||(i[1]=$=>r("change-step",C(q).FAN_PAGE))},null,8,["color","flat","icon"])]))])}}}),kn={class:"bvContainer"},yn={autoplay:"",loop:"",muted:""},bn=["src","type"],Cn=Z({__name:"BackgroundVideo",props:{src:{},type:{default:"webm"}},setup(e){return(t,r)=>(z(),T("div",kn,[E("video",yn,[E("source",{src:t.src,type:`video/${t.type}`},null,8,bn)])]))}}),Mn=J(Cn,[["__scopeId","data-v-d37e840d"]]),Sn=ae({name:"QSlideTransition",props:{appear:Boolean,duration:{type:Number,default:300}},emits:["show","hide"],setup(e,{slots:t,emit:r}){let d=!1,a,i,k=null,f=null,p,v;function m(){a&&a(),a=null,d=!1,k!==null&&(clearTimeout(k),k=null),f!==null&&(clearTimeout(f),f=null),i!==void 0&&i.removeEventListener("transitionend",p),p=null}function h(g,u,_){u!==void 0&&(g.style.height=`${u}px`),g.style.transition=`height ${e.duration}ms cubic-bezier(.25, .8, .50, 1)`,d=!0,a=_}function $(g,u){g.style.overflowY=null,g.style.height=null,g.style.transition=null,m(),u!==v&&r(u)}function N(g,u){let _=0;i=g,d===!0?(m(),_=g.offsetHeight===g.scrollHeight?0:void 0):(v="hide",g.style.overflowY="hidden"),h(g,_,u),k=setTimeout(()=>{k=null,g.style.height=`${g.scrollHeight}px`,p=M=>{f=null,(Object(M)!==M||M.target===g)&&$(g,"show")},g.addEventListener("transitionend",p),f=setTimeout(p,e.duration*1.1)},100)}function B(g,u){let _;i=g,d===!0?m():(v="show",g.style.overflowY="hidden",_=g.scrollHeight),h(g,_,u),k=setTimeout(()=>{k=null,g.style.height=0,p=M=>{f=null,(Object(M)!==M||M.target===g)&&$(g,"hide")},g.addEventListener("transitionend",p),f=setTimeout(p,e.duration*1.1)},100)}return xe(()=>{d===!0&&m()}),()=>A(Je,{css:!1,appear:e.appear,onEnter:N,onLeave:B},t.default)}}),ze=ae({name:"StepHeader",props:{stepper:{},step:{},goToPanel:Function},setup(e,{attrs:t}){const{proxy:{$q:r}}=ue(),d=H(null),a=x(()=>e.stepper.modelValue===e.step.name),i=x(()=>{const u=e.step.disable;return u===!0||u===""}),k=x(()=>{const u=e.step.error;return u===!0||u===""}),f=x(()=>{const u=e.step.done;return i.value===!1&&(u===!0||u==="")}),p=x(()=>{const u=e.step.headerNav,_=u===!0||u===""||u===void 0;return i.value===!1&&e.stepper.headerNav&&_}),v=x(()=>e.step.prefix&&(a.value===!1||e.stepper.activeIcon==="none")&&(k.value===!1||e.stepper.errorIcon==="none")&&(f.value===!1||e.stepper.doneIcon==="none")),m=x(()=>{const u=e.step.icon||e.stepper.inactiveIcon;if(a.value===!0){const _=e.step.activeIcon||e.stepper.activeIcon;return _==="none"?u:_||r.iconSet.stepper.active}if(k.value===!0){const _=e.step.errorIcon||e.stepper.errorIcon;return _==="none"?u:_||r.iconSet.stepper.error}if(i.value===!1&&f.value===!0){const _=e.step.doneIcon||e.stepper.doneIcon;return _==="none"?u:_||r.iconSet.stepper.done}return u}),h=x(()=>{const u=k.value===!0?e.step.errorColor||e.stepper.errorColor:void 0;if(a.value===!0){const _=e.step.activeColor||e.stepper.activeColor||e.step.color;return _!==void 0?_:u}return u!==void 0?u:i.value===!1&&f.value===!0?e.step.doneColor||e.stepper.doneColor||e.step.color||e.stepper.inactiveColor:e.step.color||e.stepper.inactiveColor}),$=x(()=>"q-stepper__tab col-grow flex items-center no-wrap relative-position"+(h.value!==void 0?` text-${h.value}`:"")+(k.value===!0?" q-stepper__tab--error q-stepper__tab--error-with-"+(v.value===!0?"prefix":"icon"):"")+(a.value===!0?" q-stepper__tab--active":"")+(f.value===!0?" q-stepper__tab--done":"")+(p.value===!0?" q-stepper__tab--navigation q-focusable q-hoverable":"")+(i.value===!0?" q-stepper__tab--disabled":"")),N=x(()=>e.stepper.headerNav!==!0?!1:p.value);function B(){d.value!==null&&d.value.focus(),a.value===!1&&e.goToPanel(e.step.name)}function g(u){u.keyCode===13&&a.value===!1&&e.goToPanel(e.step.name)}return()=>{const u={class:$.value};p.value===!0&&(u.onClick=B,u.onKeyup=g,Object.assign(u,i.value===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:t.tabindex||0}));const _=[A("div",{class:"q-focus-helper",tabindex:-1,ref:d}),A("div",{class:"q-stepper__dot row flex-center q-stepper__line relative-position"},[A("span",{class:"row flex-center"},[v.value===!0?e.step.prefix:A(Xe,{name:m.value})])])];if(e.step.title!==void 0&&e.step.title!==null){const M=[A("div",{class:"q-stepper__title"},e.step.title)];e.step.caption!==void 0&&e.step.caption!==null&&M.push(A("div",{class:"q-stepper__caption"},e.step.caption)),_.push(A("div",{class:"q-stepper__label q-stepper__line relative-position"},M))}return et(A("div",u,_),[[tt,N.value]])}}});function Fe(e){return A("div",{class:"q-stepper__step-content"},[A("div",{class:"q-stepper__step-inner"},fe(e.default))])}const be={setup(e,{slots:t}){return()=>Fe(t)}},Ce=ae({name:"QStep",props:{...mt,icon:String,color:String,title:{type:String,required:!0},caption:String,prefix:[String,Number],doneIcon:String,doneColor:String,activeIcon:String,activeColor:String,errorIcon:String,errorColor:String,headerNav:{type:Boolean,default:!0},done:Boolean,error:Boolean,onScroll:[Function,Array]},setup(e,{slots:t,emit:r}){const{proxy:{$q:d}}=ue(),a=nt(Ve,de);if(a===de)return console.error("QStep needs to be a child of QStepper"),de;const{getCache:i}=ht(),k=H(null),f=x(()=>a.value.modelValue===e.name),p=x(()=>d.platform.is.ios!==!0&&d.platform.is.chrome===!0||f.value!==!0||a.value.vertical!==!0?{}:{onScroll(h){const{target:$}=h;$.scrollTop>0&&($.scrollTop=0),e.onScroll!==void 0&&r("scroll",h)}}),v=x(()=>typeof e.name=="string"||typeof e.name=="number"?e.name:String(e.name));function m(){const h=a.value.vertical;return h===!0&&a.value.keepAlive===!0?A(at,a.value.keepAliveProps.value,f.value===!0?[A(a.value.needsUniqueKeepAliveWrapper.value===!0?i(v.value,()=>({...be,name:v.value})):be,{key:v.value},t.default)]:void 0):h!==!0||f.value===!0?Fe(t):void 0}return()=>A("div",{ref:k,class:"q-stepper__step",role:"tabpanel",...p.value},a.value.vertical===!0?[A(ze,{stepper:a.value,step:e,goToPanel:a.value.goToPanel}),a.value.animated===!0?A(Sn,m):m()]:[m()])}}),xn=/(-\w)/g;function In(e){const t={};for(const r in e){const d=r.replace(xn,a=>a[1].toUpperCase());t[d]=e[r]}return t}const An=ae({name:"QStepper",props:{...lt,...vt,flat:Boolean,bordered:Boolean,alternativeLabels:Boolean,headerNav:Boolean,contracted:Boolean,headerClass:String,inactiveColor:String,inactiveIcon:String,doneIcon:String,doneColor:String,activeIcon:String,activeColor:String,errorIcon:String,errorColor:String},emits:pt,setup(e,{slots:t}){const r=ue(),d=ot(e,r.proxy.$q),{updatePanelsList:a,isValidPanelName:i,updatePanelIndex:k,getPanelContent:f,getPanels:p,panelDirectives:v,goToPanel:m,keepAliveProps:h,needsUniqueKeepAliveWrapper:$}=gt();st(Ve,x(()=>({goToPanel:m,keepAliveProps:h,needsUniqueKeepAliveWrapper:$,...e})));const N=x(()=>`q-stepper q-stepper--${e.vertical===!0?"vertical":"horizontal"}`+(e.flat===!0?" q-stepper--flat":"")+(e.bordered===!0?" q-stepper--bordered":"")+(d.value===!0?" q-stepper--dark q-dark":"")),B=x(()=>`q-stepper__header row items-stretch justify-between q-stepper__header--${e.alternativeLabels===!0?"alternative":"standard"}-labels`+(e.flat===!1||e.bordered===!0?" q-stepper__header--border":"")+(e.contracted===!0?" q-stepper__header--contracted":"")+(e.headerClass!==void 0?` ${e.headerClass}`:""));function g(){const u=fe(t.message,[]);if(e.vertical===!0){i(e.modelValue)&&k();const _=A("div",{class:"q-stepper__content"},fe(t.default));return u===void 0?[_]:u.concat(_)}return[A("div",{class:B.value},p().map(_=>{const M=In(_.props);return A(ze,{key:M.name,stepper:e,step:M,goToPanel:m})})),u,it("div",{class:"q-stepper__content q-panel-parent"},f(),"cont",e.swipeable,()=>v.value)]}return()=>(a(t),A("div",{class:N.value},rt(t.navigation,g())))}}),Vn="/beBird/assets/taiwanBirds-zbFwbl3v.webm",En={class:"h-full"},zn={class:"w-full grid grid-flow-row grid-cols-1 lg:grid-cols-2 gap-8"},Pn=Z({__name:"ContactUs",setup(e){const{isMobile:t}=Ae(),r=H(q.EMAIL),d=a=>{r.value=a};return(a,i)=>{const k=Mn,f=wn,p=jt,v=yt;return z(),T("div",En,[V(k,{src:C(Vn),style:{"padding-top":"50px",filter:"brightness(50%) saturate(125%) contrast(125%)"}},null,8,["src"]),V(ut,{class:"cuScrollArea h-full"},{default:W(()=>[E("div",zn,[V(f,{step:r.value,onChangeStep:i[0]||(i[0]=m=>d(m))},null,8,["step"]),C(t)?(z(),_e(p,{key:0})):(z(),_e(An,{key:1,modelValue:r.value,"onUpdate:modelValue":i[1]||(i[1]=m=>r.value=m),animated:"",class:"bg-transparent flex flex-col justify-center",flat:"","header-class":"hidden",infinite:"","keep-alive":"",swipeable:"","transition-next":"scale","transition-prev":"scale"},{default:W(()=>[V(Ce,{name:C(q).EMAIL,title:C(q).EMAIL},{default:W(()=>[V(p)]),_:1},8,["name","title"]),V(Ce,{name:C(q).FAN_PAGE,title:C(q).FAN_PAGE},{default:W(()=>[V(v)]),_:1},8,["name","title"])]),_:1},8,["modelValue"]))])]),_:1})])}}});export{Pn as default};
