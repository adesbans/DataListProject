(function(e){function t(t){for(var a,c,i=t[0],s=t[1],u=t[2],p=0,f=[];p<i.length;p++)c=i[p],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&f.push(n[c][0]),n[c]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);l&&l(t);while(f.length)f.shift()();return o.push.apply(o,u||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],a=!0,i=1;i<r.length;i++){var s=r[i];0!==n[s]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=r[0]))}return e}var a={},n={app:0},o=[];function c(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=a,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(r,a,function(t){return e[t]}.bind(null,a));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],s=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=s;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"38c8":function(e,t,r){},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d"),r("e792"),r("0cdd");var a=r("2b0e"),n=r("5f5b"),o=r("b1e0");r("ab8b"),r("2dd8");a["default"].use(n["a"]),a["default"].use(o["a"]);var c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{style:{"background-image":"url("+e.imageURL+")"}},[e._m(0),r("b-button",{on:{click:e.getServerData}},[e._v("Refesh Data")]),e.weatherData?r("section",[r("p",[e._v("Current Forecast")]),r("p",{staticClass:"forecast"},[e._v(e._s(e.weatherData.forecast))]),r("p",{staticClass:"forecast"},[e._v(e._s(e.weatherData.temp)+"° C")]),r("p",{staticClass:"forecast"},[e._v(e._s(e.weatherData.humidity)+"%")])]):r("section",[r("p",{staticClass:"forecast"},[e._v(e._s(e.message))])])],1)},i=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("header",[r("h1",[e._v("Simple Weather App")]),r("p",{staticClass:"attribution"},[e._v("Powered by "),r("a",{attrs:{href:"http://flickr.com/services/api/"}},[e._v("Flickr")]),e._v(" and "),r("a",{attrs:{href:"http://openweathermap.org"}},[e._v("Open Weather Map")]),e._v(". Original idea by "),r("a",{attrs:{href:"https://twitter.com/fourtonfish"}},[e._v("@fourtonfish")]),e._v(". ")])])}],s=r("1da1"),u=(r("96cf"),r("99af"),r("d3b7"),{name:"App",data:function(){return{useRemoteServer:!0,message:"Loading ...",location:null,imageURL:"",weatherData:null}},methods:{setLocation:function(e){this.location={lat:e.coords.latitude,lon:e.coords.longitude},this.getServerData()},getServerData:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var r,a,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.location){t.next=2;break}return t.abrupt("return");case 2:return r=e.useRemoteServer?"https://banana-crisp-29603.herokuapp.com/":"",a="".concat(r,"api/get_data?lat=").concat(e.location.lat,"&lon=").concat(e.location.lon),console.log(a),t.next=7,fetch(a);case 7:return n=t.sent,t.next=10,n.json();case 10:o=t.sent,console.log(o),n.ok&&o.imageURL?(e.imageURL=o.imageURL,e.weatherData=o.weatherData):e.message=o.message;case 13:case"end":return t.stop()}}),t)})))()}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:navigator.geolocation?navigator.geolocation.getCurrentPosition(e.setLocation):e.message="Geolocation is not supported by this browser";case 1:case"end":return t.stop()}}),t)})))()}}),l=u,p=r("2877"),f=Object(p["a"])(l,c,i,!1,null,null,null),d=f.exports;r("38c8");a["default"].config.productionTip=!1,new a["default"]({render:function(e){return e(d)}}).$mount("#app")}});
//# sourceMappingURL=app.040d4c11.js.map