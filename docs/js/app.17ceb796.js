(function(e){function t(t){for(var r,i,l=t[0],s=t[1],c=t[2],d=0,f=[];d<l.length;d++)i=l[d],Object.prototype.hasOwnProperty.call(n,i)&&n[i]&&f.push(n[i][0]),n[i]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);u&&u(t);while(f.length)f.shift()();return o.push.apply(o,c||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],r=!0,l=1;l<a.length;l++){var s=a[l];0!==n[s]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=a[0]))}return e}var r={},n={app:0},o=[];function i(t){if(r[t])return r[t].exports;var a=r[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=e,i.c=r,i.d=function(e,t,a){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(i.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(a,r,function(t){return e[t]}.bind(null,r));return a},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/marika_kitada/";var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var c=0;c<l.length;c++)t(l[c]);var u=s;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"034f":function(e,t,a){"use strict";var r=a("85ec"),n=a.n(r);n.a},"56d7":function(e,t,a){"use strict";a.r(t);a("e260"),a("e6cf"),a("cca6"),a("a79d");var r=a("2b0e"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"app"}},[a("v-app",[a("v-main",[a("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[a("v-stage",{ref:"stage",attrs:{config:e.configKonva,id:"stage"}},[a("v-layer",{ref:"marika",attrs:{id:"marika"}},[a("v-group",{ref:"marikaGroup"},[a("v-rect",{attrs:{config:{x:0,y:0,width:1280,height:780,fill:"#EEE"}}}),a("v-image",{ref:"eyes",attrs:{config:{image:e.eyesImage,scaleX:e.allScale,scaleY:e.allScale,x:e.eyeX,y:e.eyeY}}}),a("v-image",{ref:"body",attrs:{config:{image:e.bodyImage,scaleX:e.allScale,scaleY:e.allScale}}})],1)],1)],1)],1)],1),a("v-app-bar",{attrs:{app:"",color:"indigo",dark:""}},[a("v-toolbar-title",[e._v("@marika_kitada")])],1),a("v-navigation-drawer",{attrs:{app:"",right:"",permanent:!0},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-list",[a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[e._v("eyeX: "+e._s(e.eyeX))]),a("v-slider",{staticClass:"align-center",attrs:{max:12,min:-14,step:"0.1"},model:{value:e.eyeX,callback:function(t){e.eyeX=t},expression:"eyeX"}})],1)],1),a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[e._v("eyeY: "+e._s(e.eyeY))]),a("v-slider",{attrs:{max:15,min:-15,step:"0.1"},model:{value:e.eyeY,callback:function(t){e.eyeY=t},expression:"eyeY"}})],1)],1),a("v-list-item",[a("v-list-item-content",[a("v-list-item-title",[e._v("録画")]),a("v-btn",{on:{click:e.start}},[e._v("start")]),a("v-btn",{on:{click:e.stop}},[e._v("stop")]),e.movieData?a("v-btn",{attrs:{href:e.movieData,download:"movie.webm"}},[e._v("download")]):e._e()],1)],1)],1)],1)],1)],1)},o=[],i=(a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),a("96cf"),a("1da1"));function l(e){return new Promise((function(t,a){var r=new Image;r.src=e,r.onload=function(){return t(r)},r.onerror=a}))}var s={name:"App",components:{},data:function(){return{bodyImage:null,eyesImage:null,configKonva:{width:1280,height:780},eyeX:0,eyeY:0,allScale:.23,stream:null,recorder:null,movieData:null}},methods:{start:function(){console.log("start"),this.movieData=null,this.recorder.start(),console.log(this.recorder)},stop:function(){console.log("stop"),this.recorder.stop(),console.log(this.recorder)}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l("/marika_kitada/images/hitomi.png");case 2:return e.eyesImage=t.sent,t.next=5,l("/marika_kitada/images/karada.png");case 5:e.bodyImage=t.sent,e.$refs.eyes.getNode().moveToBottom(),e.stream=document.getElementsByTagName("canvas")[0].captureStream(),e.recorder=new MediaRecorder(e.stream,{mimeType:"video/webm;codecs=vp9"}),e.recorder.ondataavailable=function(t){console.log("ondataavailable");var a=new Blob([t.data],{type:t.data.type});e.movieData=window.URL.createObjectURL(a)},console.log(e.stream);case 11:case"end":return t.stop()}}),t)})))()},created:function(){}},c=s,u=(a("034f"),a("2877")),d=a("6544"),f=a.n(d),p=a("7496"),v=a("40dc"),m=a("8336"),g=a("a523"),y=a("8860"),b=a("da13"),h=a("5d23"),w=a("f6c4"),k=a("f774"),_=a("ba0d"),x=a("2a7f"),O=Object(u["a"])(c,n,o,!1,null,null,null),j=O.exports;f()(O,{VApp:p["a"],VAppBar:v["a"],VBtn:m["a"],VContainer:g["a"],VList:y["a"],VListItem:b["a"],VListItemContent:h["a"],VListItemTitle:h["b"],VMain:w["a"],VNavigationDrawer:k["a"],VSlider:_["a"],VToolbarTitle:x["a"]});var S=a("7591"),V=a.n(S),I=a("f309");r["default"].use(I["a"]);var T=new I["a"]({});r["default"].config.productionTip=!1,r["default"].use(V.a),new r["default"]({vuetify:T,render:function(e){return e(j)}}).$mount("#app")},"85ec":function(e,t,a){}});
//# sourceMappingURL=app.17ceb796.js.map