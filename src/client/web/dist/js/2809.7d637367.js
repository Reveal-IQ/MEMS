"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[2809,8343,6206],{2809:function(e,o,l){l.r(o),l.d(o,{default:function(){return w}});var s=l(6252),t=l(3907),n=l(8343),c=l(6206);const r=e=>((0,s.dD)("data-v-256e5130"),e=e(),(0,s.Cn)(),e),a=r((()=>(0,s._)("div",{class:"row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3"},[(0,s._)("div",{class:"col-lg-6"},[(0,s._)("label",{for:"vendorSite",class:"form-label"},"Vendor Site ID"),(0,s._)("select",{class:"form-select mb-3","aria-label":"Default select example",id:"vendorSite"},[(0,s._)("option",{selected:""},"Select Vendor Site")])])],-1))),i=r((()=>(0,s._)("div",{class:"row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3"},[(0,s._)("div",{class:"col-lg-6"},[(0,s._)("label",{for:"personnelList",class:"form-label"},"Personnel Assigned"),(0,s._)("select",{class:"form-select mb-3","aria-label":"Default select example",id:"personnelList"},[(0,s._)("option",{selected:""},"Open this select menu")])])],-1))),d={class:"row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3"},u={class:"col"};var p={setup(e){(0,s.f3)("modelInfo");const o=(0,t.oR)();async function l(){var e={Expiry:2e4,Type:"REQUEST",Request:{Module:"MEMS",ServiceCode:"BIOMD",API:"FIND"}};let l=await o.dispatch("sendHTTPReq",e);"REQUEST"===l.Type?console.log("API Success..."):console.log("Unable to Find Asset Parent")}return(e,o)=>((0,s.wg)(),(0,s.j4)(c["default"],{sectionTitle:"Vendor Support"},{default:(0,s.w5)((()=>[a,i,(0,s._)("div",d,[(0,s._)("div",u,[(0,s.Wm)(n["default"],{BtnName:"Add Personnel",backgroundColor:"#1266F1",icon:"plus",onClick:l,class:"rounded-pill"})])])])),_:1}))}},f=l(3744);const m=(0,f.Z)(p,[["__scopeId","data-v-256e5130"]]);var w=m},8343:function(e,o,l){l.r(o),l.d(o,{default:function(){return i}});var s=l(6252),t=l(3577),n=l(2262),c={props:{BtnName:{type:String,default:"Button Name"},class:{type:String,default:""},showLoader:{type:Boolean,default:!1},backgroundColor:{type:String,default:"#586974"},icon:null},emits:["onUserClick"],setup(e,{emit:o}){const l=e;let c=l.icon;function r(){o("onUserClick")}return(o,l)=>{const a=(0,s.up)("font-awesome-icon");return(0,s.wg)(),(0,s.iD)("button",{type:"button",class:(0,t.C_)(["btn buttonBackground d-inline-flex align-items-center fs-6 rounded-pill",e.class]),style:(0,t.j5)("--color:"+e.backgroundColor),onClick:l[0]||(l[0]=e=>r())},[(0,s.Wm)(a,{icon:(0,n.SU)(c),size:"1x",class:"me-2"},null,8,["icon"]),(0,s._)("span",null,(0,t.zw)(e.BtnName),1),(0,s.WI)(o.$slots,"default")],6)}}},r=l(3744);const a=(0,r.Z)(c,[["__scopeId","data-v-e5edf4dc"]]);var i=a},6206:function(e,o,l){l.r(o),l.d(o,{default:function(){return d}});var s=l(6252),t=l(3577);const n={class:"section p-4 rounded"},c={class:"pb-3 fsXl section-title"};var r={props:{sectionTitle:{type:String,default:"Section Title"}},setup(e){return(o,l)=>((0,s.wg)(),(0,s.iD)("section",n,[(0,s._)("h5",c,(0,t.zw)(e.sectionTitle),1),(0,s.WI)(o.$slots,"default")]))}},a=l(3744);const i=(0,a.Z)(r,[["__scopeId","data-v-9468e16e"]]);var d=i}}]);
//# sourceMappingURL=2809.7d637367.js.map