(function(o,l){typeof exports=="object"&&typeof module<"u"?l(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],l):(o=typeof globalThis<"u"?globalThis:o||self,l(o["lxhby-utils"]={},o.Vue))})(this,function(o,l){"use strict";const q=l.defineComponent({name:"vite-sign"}),L=l.defineComponent({...q,props:{width:{type:Number,default:800},height:{type:Number,default:300},lineWidth:{type:Number,default:4},lineColor:{type:String,default:"#000000"},bgColor:{type:String,default:""},isCrop:{type:Boolean,default:!1},isClearBgColor:{type:Boolean,default:!0},format:{type:String,default:"image/png"},quality:{type:Number,default:1}},emits:["update:bgColor"],setup(d,{expose:g,emit:C}){const R=d,{height:w,width:x,bgColor:X,lineWidth:Y,lineColor:U,isCrop:W,isClearBgColor:z,format:J,quality:V}=l.toRefs(R),b=l.ref(!1),S=l.ref(""),p=l.ref([]),t=l.ref(null),m=l.ref(0),y=l.ref(0),T=l.ref(!1),r=l.ref(1),a=l.ref(),F=l.computed(()=>w.value/x.value);l.computed(()=>{var e;return(e=a.value)==null?void 0:e.getBoundingClientRect()});const B=l.computed(()=>X.value?X.value:"rgba(255, 255, 255, 0)");l.watch(B,e=>{a.value.style.background=e}),l.onBeforeMount(()=>{window.addEventListener("resize",k)}),l.onBeforeUnmount(()=>{window.removeEventListener("resize",k)}),l.onMounted(()=>{l.nextTick(()=>{a.value.height=w.value,a.value.width=x.value,a.value.style.background=B.value,k(),document.onmouseup=()=>{T.value=!1}})});const k=()=>{a.value.style.width=x.value+"px";const e=parseFloat(window.getComputedStyle(a.value).width);a.value.style.height=F.value*e+"px",t.value=a.value.getContext("2d"),t.value.scale(1*r.value,1*r.value),r.value=e/x.value,t.value.scale(1/r.value,1/r.value)},A=e=>{e=e||event,e.preventDefault(),T.value=!0,b.value=!0;let n={x:e.offsetX,y:e.offsetY};I(n)},H=e=>{if(e=e||event,e.preventDefault(),T.value){let n={x:e.offsetX,y:e.offsetY};P(n)}},Q=e=>{e=e||event,e.preventDefault();let n={x:e.offsetX,y:e.offsetY};E(n),T.value=!1},$=e=>{if(e=e||event,e.preventDefault(),b.value=!0,e.touches.length===1){let n={x:e.targetTouches[0].clientX-a.value.getBoundingClientRect().left,y:e.targetTouches[0].clientY-a.value.getBoundingClientRect().top};I(n)}},G=e=>{if(e=e||event,e.preventDefault(),e.touches.length===1){let n={x:e.targetTouches[0].clientX-a.value.getBoundingClientRect().left,y:e.targetTouches[0].clientY-a.value.getBoundingClientRect().top};P(n)}},K=e=>{if(e=e||event,e.preventDefault(),e.touches.length===1){let n={x:e.targetTouches[0].clientX-a.value.getBoundingClientRect().left,y:e.targetTouches[0].clientY-a.value.getBoundingClientRect().top};E(n)}},I=e=>{m.value=e.x,y.value=e.y,t.value.beginPath(),t.value.moveTo(m.value,y.value),t.value.lineTo(e.x,e.y),t.value.lineCap="round",t.value.lineJoin="round",t.value.lineWidth=Y.value*r.value,t.value.stroke(),t.value.closePath(),p.value.push(e)},P=e=>{t.value.beginPath(),t.value.moveTo(m.value,y.value),t.value.lineTo(e.x,e.y),t.value.strokeStyle=U.value,t.value.lineWidth=Y.value*r.value,t.value.lineCap="round",t.value.lineJoin="round",t.value.stroke(),t.value.closePath(),y.value=e.y,m.value=e.x,p.value.push(e)},E=e=>{t.value.beginPath(),t.value.moveTo(m.value,y.value),t.value.lineTo(e.x,e.y),t.value.lineCap="round",t.value.lineJoin="round",t.value.stroke(),t.value.closePath(),p.value.push(e),p.value.push({x:-1,y:-1})},Z=e=>{let n=e&&e.format?e.format:J.value,i=e&&e.quality?e.quality:V.value;return new Promise((f,v)=>{if(!b.value){v("Warning: Not Signned!");return}var u=t.value.getImageData(0,0,a.value.width,a.value.height);t.value.globalCompositeOperation="destination-over",t.value.fillStyle=B.value,t.value.fillRect(0,0,a.value.width,a.value.height),S.value=a.value.toDataURL(n,i);let s=S.value;if(t.value.clearRect(0,0,a.value.width,a.value.height),t.value.putImageData(u,0,0),t.value.globalCompositeOperation="source-over",W.value){const h=ee(u.data);let c=document.createElement("canvas");const D=c.getContext("2d");c.width=h[2]-h[0],c.height=h[3]-h[1];const te=t.value.getImageData(...h);D.globalCompositeOperation="destination-over",D.putImageData(te,0,0),D.fillStyle=B.value,D.fillRect(0,0,c.width,c.height),s=c.toDataURL(n,i),c=null}f(s)})},j=()=>{t.value.clearRect(0,0,a.value.width,a.value.height),z.value&&(C("update:bgColor",""),a.value.style.background="rgba(255, 255, 255, 0)"),p.value=[],b.value=!1,S.value=""},ee=e=>{for(var n=a.value.width,i=0,_=a.value.height,f=0,v=0;v<a.value.width;v++)for(var u=0;u<a.value.height;u++){var s=(v+a.value.width*u)*4;(e[s]>0||e[s+1]>0||e[s+2]||e[s+3]>0)&&(f=Math.max(u,f),i=Math.max(v,i),_=Math.min(u,_),n=Math.min(v,n))}return n++,i++,_++,f++,[n,_,i,f]};return g({reset:j,generate:Z}),(e,n)=>(l.openBlock(),l.createElementBlock("canvas",{ref_key:"canvas",ref:a,onMousedown:A,onMousemove:H,onMouseup:Q,onTouchstart:$,onTouchmove:G,onTouchend:K},null,544))}}),ae="",M=((d,g)=>{const C=d.__vccOpts||d;for(const[R,w]of g)C[R]=w;return C})(L,[["__scopeId","data-v-af746271"]]),N=[M],O={install(d){N.forEach(g=>{d.component(g.name,M)})}};o.ViteSign=M,o.default=O,Object.defineProperties(o,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
