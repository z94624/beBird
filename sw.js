if(!self.define){let e,c={};const n=(n,i)=>(n=new URL(n+".js",i).href,c[n]||new Promise((c=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=c,document.head.appendChild(e)}else e=n,importScripts(n),c()})).then((()=>{let e=c[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(i,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(c[o])return;let r={};const f=e=>n(e,o),l={module:{uri:o},exports:r,require:f};c[o]=Promise.all(i.map((e=>l[e]||f(e)))).then((e=>(s(...e),r)))}}define(["./workbox-2dfdff9b"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-DFrJhTIQ.css",revision:null},{url:"assets/RareBirds-BT6IF-Tr.css",revision:null},{url:"index.html",revision:"5e1af9b6ccdb39ba922979c870a1ee06"},{url:"logo-144x144.png",revision:"bab45464274a3d95f5663f5be8300561"},{url:"logo-168x168.png",revision:"55aa34c54667b6556f8bc001693d12d3"},{url:"logo-192x192.png",revision:"118f49e9b8d2b09689db7a6d7c8f70c0"},{url:"logo-256x256.png",revision:"4b9cdf7aaf6d4a3011b513d0079e3c04"},{url:"logo-48x48.png",revision:"b6017c46ef3531afce78250c1968286e"},{url:"logo-512x512.png",revision:"d2c2c125fc4773afa948fc38422c5fe0"},{url:"logo-72x72.png",revision:"f1be99a0fd8f504882650cc54a832693"},{url:"logo-96x96.png",revision:"56849d7c5cc14b12b0079c85c54adc80"},{url:"manifest.webmanifest",revision:"5f8ef6306d5073bc210150f8521c0529"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/(.*?)\.(ttf|woff|woff2)/,new e.CacheFirst({cacheName:"font-cache",plugins:[]}),"GET"),e.registerRoute(/(.*?)\.(css)/,new e.CacheFirst({cacheName:"css-cache",plugins:[]}),"GET"),e.registerRoute(/(.*?)\.(png|jpe?g|svg|gif|bmp|psd|tiff|tga|eps)/,new e.CacheFirst({cacheName:"image-cache",plugins:[]}),"GET")}));
