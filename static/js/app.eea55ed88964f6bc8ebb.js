webpackJsonp([1],{"E+bY":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},i=s("VU/8")({name:"app"},a,!1,function(t){s("g/Mr"),s("xWXB")},null,null).exports,c=s("/ocq"),o=s("mvHQ"),r=s.n(o),l={name:"Home",data:function(){return{money:0,clickCounter:0,timer:"",ws:{}}},methods:{parseMessage:function(t){this.money=parseInt(t.data.split(" ")[2],10)},flushClick:function(){this.clickCounter>0&&(fetch("https://app-6ed8f5ca-03ad-43e9-9366-bf87b695ff01.cleverapps.io/api/v0/money",{method:"POST",headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"},body:r()({click:this.clickCounter})}),this.clickCounter=0)}},created:function(){this.ws=new WebSocket("wss://warp.pierrezemb.org/api/v0/plasma"),this.ws.addEventListener("open",function(t){this.send("SUBSCRIBE DlkMIXbwIKIw9Q25BP.o4G7zDibiURUEc1ATjqah2rNQgMys2SbuoXEwG6nPaCi5K61LhtnXRKSjt3EavUJW84r9FG.O1bo6upi.WrKDEj2fQ0hwto4tYk ~.*{} SUBSCRIPTIONS")}),this.ws.addEventListener("message",this.parseMessage),this.timer=setInterval(this.flushClick,1e3)}},u={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"home"},[n("div",{staticClass:"container"},[n("div",{staticClass:"columns"},[n("div",{staticClass:"column col-6 col-mx-auto",on:{click:function(e){t.connectWS()}}},[n("h1",[t._v(t._s(t.money)+" euros")])])]),t._v(" "),n("div",{staticClass:"columns"},[n("div",{staticClass:"column col-6 col-mx-auto"},[n("a",{attrs:{href:"#/"}},[n("img",{staticClass:"money",attrs:{src:s("lYLx"),height:"300px"},on:{click:function(e){t.clickCounter+=1,t.money+=1}}})])])])])])},staticRenderFns:[]},p=s("VU/8")(l,u,!1,function(t){s("x7So")},"data-v-1f12fc9a",null).exports,d={name:"Store",data:function(){return{assets:[]}},created:function(){var t=this;fetch("https://app-6ed8f5ca-03ad-43e9-9366-bf87b695ff01.cleverapps.io/api/v0/assets").then(function(t){return t.json()}).then(function(e){t.assets=e})}},f={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"store"},[s("div",{staticClass:"column col-12"},[s("div",{staticClass:"panel"},[t._m(0),t._v(" "),t._l(t.assets,function(e){return s("div",{staticClass:"panel-body"},[s("div",{staticClass:"tile"},[s("div",{staticClass:"tile-content"},[s("p",{staticClass:"tile-title"},[t._v(" "+t._s(e.name)+" ")]),t._v(" "),s("p",{staticClass:"tile-subtitle"},[t._v(t._s(e.description))]),t._v(" "),s("button",{staticClass:"btn btn-primary badge",attrs:{"data-badge":""+e.number}},[t._v("Buy for "+t._s(e.price)+" euros")])])])])})],2)])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"panel-header"},[e("div",{staticClass:"panel-title h6"},[this._v("Store")])])}]},v=s("VU/8")(d,f,!1,function(t){s("E+bY")},"data-v-0c89a416",null).exports;n.a.use(c.a);var m=new c.a({routes:[{path:"/",name:"Home",component:p},{path:"/store",name:"Store",component:v}]});n.a.config.productionTip=!1,new n.a({el:"#app",router:m,template:"<App/>",components:{App:i}})},"g/Mr":function(t,e){},lYLx:function(t,e,s){t.exports=s.p+"static/img/money.b0316a1.png"},x7So:function(t,e){},xWXB:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.eea55ed88964f6bc8ebb.js.map