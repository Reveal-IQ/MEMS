"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[8254],{8077:function(e,t,l){l.r(t),l.d(t,{default:function(){return f}});var o=l(6252),a=l(8343),n=l(1028),s=l(6206);const r={class:"row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3"},d={class:"col"},c={class:"col"},i={class:"col"},u={class:"col"},_={class:"col"};var p={setup(e){return(e,t)=>((0,o.wg)(),(0,o.j4)(s["default"],{sectionTitle:"Customer Service Contact"},{default:(0,o.w5)((()=>[(0,o._)("div",r,[(0,o._)("div",d,[(0,o.Wm)(n["default"],{label:"Contact Number",type:"number",id:"contactNumber",placeholder:"Enter Contact Number"})]),(0,o._)("div",c,[(0,o.Wm)(n["default"],{label:"Contact Name",type:"text",id:"contactName",placeholder:"Enter Contact Name"})]),(0,o._)("div",i,[(0,o.Wm)(n["default"],{label:"Email",type:"email",id:"email",placeholder:"Enter email"})]),(0,o._)("div",u,[(0,o.Wm)(n["default"],{label:"Personnel Type",type:"text",id:"personnelType",placeholder:"Enter Personnel Type"})])]),(0,o._)("div",_,[(0,o.Wm)(a["default"],{BtnName:"Add New Contact",backgroundColor:"#1266F1",icon:"plus",onClick:t[0]||(t[0]=()=>{}),class:"rounded-pill"})])])),_:1}))}},m=l(3744);const v=(0,m.Z)(p,[["__scopeId","data-v-64058028"]]);var f=v},502:function(e,t,l){l.r(t),l.d(t,{default:function(){return u}});var o=l(6252),a=(l(1028),l(6206));const n=e=>((0,o.dD)("data-v-2dc51dbe"),e=e(),(0,o.Cn)(),e),s=n((()=>(0,o._)("div",{class:"row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3 mb-3"},[(0,o._)("div",{class:"col"},[(0,o._)("label",{for:"manufacturerList",class:"form-label"},"Manufacturer"),(0,o._)("input",{class:"form-control",list:"manufacturerOptions",id:"manufacturerList",placeholder:"Search and Select Manufacturer...",autocomplete:"off"}),(0,o._)("datalist",{id:"manufacturerOptions"},[(0,o._)("option",{value:"General Electric"})])])],-1))),r={class:"col"};var d={setup(e){return(e,t)=>((0,o.wg)(),(0,o.j4)(a["default"],{sectionTitle:"Manufacturer Information"},{default:(0,o.w5)((()=>[s,(0,o._)("div",r,[(0,o.WI)(e.$slots,"default")])])),_:3}))}},c=l(3744);const i=(0,c.Z)(d,[["__scopeId","data-v-2dc51dbe"]]);var u=i},4540:function(e,t,l){l.r(t),l.d(t,{default:function(){return u}});var o=l(6252),a=(l(1028),l(6206));const n=e=>((0,o.dD)("data-v-639510fd"),e=e(),(0,o.Cn)(),e),s=n((()=>(0,o._)("div",{class:"row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3 mb-3"},[(0,o._)("div",{class:"col"},[(0,o._)("label",{for:"modelList",class:"form-label"},"Model"),(0,o._)("input",{class:"form-control",list:"modelOptions",id:"modelList",placeholder:"Search and Select Model...",autocomplete:"off"}),(0,o._)("datalist",{id:"modelOptions"},[(0,o._)("option",{value:"General Electric"})])])],-1))),r={class:"col"};var d={setup(e){return(e,t)=>((0,o.wg)(),(0,o.j4)(a["default"],{sectionTitle:"Model Information"},{default:(0,o.w5)((()=>[s,(0,o._)("div",r,[(0,o.WI)(e.$slots,"default")])])),_:3}))}},c=l(3744);const i=(0,c.Z)(d,[["__scopeId","data-v-639510fd"]]);var u=i},3693:function(e,t,l){l.r(t),l.d(t,{default:function(){return U}});var o=l(6252),a=l(2262),n=l(9963),s=l(3907),r=l(1028),d=l(6206);const c=e=>((0,o.dD)("data-v-45a9896e"),e=e(),(0,o.Cn)(),e),i={class:"row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 g-3"},u={class:"col"},_=c((()=>(0,o._)("label",{for:"vendorName",class:"form-label"},"Vendor Name",-1))),p={class:"input-group mb-3"},m={class:"col"},v=c((()=>(0,o._)("label",{for:"countryList",class:"form-label"},"Country",-1))),f={id:"countryOptions"},y=["value"],C={class:"col"},S=c((()=>(0,o._)("label",{for:"stateList",class:"form-label"},"Province/State/Region",-1))),L={id:"stateOptions"},g=["value"],b={class:"col"},A=c((()=>(0,o._)("label",{for:"districtList",class:"form-label"},"District",-1))),w={id:"districtOptions"},N=["value"],T={class:"row g-3 mt-3"},E={class:"col-12"},R={class:"col-12"},I={class:"col-lg-6"},h={class:"col-6"};var D={setup(e){const t=(0,s.oR)(),l=(0,o.f3)("vendorInfo"),c=(0,o.f3)("Global_Vendor_Definition"),D=(0,a.iH)(null),k=(0,a.iH)(null),x=(0,a.iH)(null),U=e=>{t.dispatch("sendSocketReq",e)},O=async e=>{try{const t=e?e.target.value:"";!e||e instanceof InputEvent&&"insertReplacementText"!==e.inputType?(c.value.vendorAddress.Country=null,c.value.vendorAddress.State=null,l.value.selectedState={Loci_Name_Country:null,Loci_Code_Country:null},c.value.vendorAddress.District=null,l.value.selectedDistrict={Loci_Name_Area_L1:null,Loci_Code_Area_L1:null},U({data:{Expiry:2e4,Type:"REQUEST",Request:{Module:"GLOBAL",ServiceCode:"GLOBL",API:"GET_GEO_LIST",Max_List:500,Criteria:{Type_Code:"CNTY",Loci_Name_Country:""}}},callback:e=>{"RESPONSE"===e.Type?(console.log("Response Packet --\x3e",e.Response),D.value=e.Response.Country_List):e.Type}})):(l.value.selectedCountry=D.value.find((e=>t===e.Loci_Name_Country)),c.value.vendorAddress.Country=l.value.selectedCountry.Loci_Code_Country,await V())}catch(t){console.log(t)}},V=async e=>{try{const t=e?e.target.value:"";!e||e instanceof InputEvent&&"insertReplacementText"!==e.inputType?(c.value.vendorAddress.State=null,c.value.vendorAddress.District=null,l.value.selectedDistrict={Loci_Name_Area_L1:null,Loci_Code_Area_L1:null},U({data:{Expiry:2e4,Type:"REQUEST",Request:{Module:"GLOBAL",ServiceCode:"GLOBL",API:"GET_GEO_LIST",Max_List:500,Criteria:{Type_Code:"STATE",Loci_Code_Country:c.value.vendorAddress.Country,Loci_Name_State:""}}},callback:e=>{"RESPONSE"===e.Type?(console.log("Response Packet --\x3e",e.Response),k.value=e.Response.State_List):e.Type}})):(l.value.selectedState=k.value.find((e=>t===e.Loci_Name_State)),c.value.vendorAddress.State=l.value.selectedState.Loci_Code_State,await P())}catch(t){console.log(t)}},P=async e=>{try{const t=e?e.target.value:"";!e||e instanceof InputEvent&&"insertReplacementText"!==e.inputType?(c.value.vendorAddress.District=null,U({data:{Expiry:2e4,Type:"REQUEST",Request:{Module:"GLOBAL",ServiceCode:"GLOBL",API:"GET_GEO_LIST",Max_List:500,Criteria:{Type_Code:"ARL1",Loci_Code_Country:c.value.vendorAddress.Country,Loci_Code_State:c.value.vendorAddress.State,Loci_Name_District:""}}},callback:e=>{"RESPONSE"===e.Type?(console.log("Response Packet --\x3e",e.Response),x.value=e.Response.ARL1_List):e.Type}})):(l.value.selectedDistrict=x.value.find((e=>t===e.Loci_Name_Area_L1)),c.value.vendorAddress.District=l.value.selectedDistrict.Loci_Code_Area_L1)}catch(t){console.log(t)}};return(0,o.bv)((()=>{O()})),(e,t)=>((0,o.wg)(),(0,o.iD)("main",null,[(0,o.Wm)(d["default"],{sectionTitle:"Vendor Information"},{default:(0,o.w5)((()=>[(0,o._)("div",i,[(0,o._)("div",u,[_,(0,o._)("div",p,[(0,o.wy)((0,o._)("input",{type:"text",class:"form-control",id:"vendorName","aria-describedby":"basic-addon3",placeholder:"Enter Vendor Name","onUpdate:modelValue":t[0]||(t[0]=e=>(0,a.SU)(l).vendorName=e)},null,512),[[n.nr,(0,a.SU)(l).vendorName]])])]),(0,o._)("div",m,[v,(0,o.wy)((0,o._)("input",{class:"form-control",list:"countryOptions",id:"countryList",placeholder:"Type to search...","onUpdate:modelValue":t[1]||(t[1]=e=>(0,a.SU)(l).selectedCountry.Loci_Name_Country=e),onInput:O,autocomplete:"off"},null,544),[[n.nr,(0,a.SU)(l).selectedCountry.Loci_Name_Country]]),(0,o._)("datalist",f,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(D.value,(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.index,value:e.Loci_Name_Country},null,8,y)))),128))])]),(0,o._)("div",C,[S,(0,o.wy)((0,o._)("input",{class:"form-control",list:"stateOptions",id:"stateList",placeholder:"Type to search...","onUpdate:modelValue":t[2]||(t[2]=e=>(0,a.SU)(l).selectedState.Loci_Name_State=e),onInput:V,autocomplete:"off"},null,544),[[n.nr,(0,a.SU)(l).selectedState.Loci_Name_State]]),(0,o._)("datalist",L,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(k.value,(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.index,value:e.Loci_Name_State},null,8,g)))),128))])]),(0,o._)("div",b,[A,(0,o.wy)((0,o._)("input",{class:"form-control",list:"districtOptions",id:"districtList",placeholder:"Type to search...","onUpdate:modelValue":t[3]||(t[3]=e=>(0,a.SU)(l).selectedDistrict.Loci_Name_Area_L1=e),onInput:P,autocomplete:"off"},null,544),[[n.nr,(0,a.SU)(l).selectedDistrict.Loci_Name_Area_L1]]),(0,o._)("datalist",w,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(x.value,(e=>((0,o.wg)(),(0,o.iD)("option",{key:e.index,value:e.Loci_Name_Area_L1},null,8,N)))),128))])])]),(0,o._)("div",T,[(0,o._)("div",E,[(0,o.Wm)(r["default"],{label:"Street Address 1",type:"text",id:"street1",placeholder:"Enter Street Address 1",modelValue:(0,a.SU)(l).streetAddress1,"onUpdate:modelValue":t[4]||(t[4]=e=>(0,a.SU)(l).streetAddress1=e)},null,8,["modelValue"])]),(0,o._)("div",R,[(0,o.Wm)(r["default"],{label:"Street Address 2",type:"text",id:"street2",placeholder:"Enter Street Address 2",modelValue:(0,a.SU)(l).streetAddress2,"onUpdate:modelValue":t[5]||(t[5]=e=>(0,a.SU)(l).streetAddress2=e)},null,8,["modelValue"])]),(0,o._)("div",I,[(0,o.Wm)(r["default"],{label:"Zip/Postal Code",type:"number",id:"zip",placeholder:"Enter Zip/Postal Code",modelValue:(0,a.SU)(l).zipCode,"onUpdate:modelValue":t[6]||(t[6]=e=>(0,a.SU)(l).zipCode=e)},null,8,["modelValue"])]),(0,o._)("div",h,[(0,o.Wm)(r["default"],{label:"Site Id",type:"text",id:"siteId",placeholder:"Enter Site ID"})])])])),_:1})]))}},k=l(3744);const x=(0,k.Z)(D,[["__scopeId","data-v-45a9896e"]]);var U=x},3393:function(e,t,l){l.r(t),l.d(t,{default:function(){return w}});var o=l(6252);const a={class:"RevealContainer mb-5"},n={class:"container p-4 m-4"},s={class:"d-lg-flex d-md-flex d-sm-flex gap-lg-0 gap-sm-5 align-items-center justify-content-lg-between justify-content-md-between justify-content-sm-center"},r={class:"mt-3"},d={class:"d-flex gap-2 d-md-block"},c={class:"d-flex justify-content-center py-3"},i={class:""};function u(e,t,l,u,_,p){const m=(0,o.up)("Header"),v=(0,o.up)("Btn2"),f=(0,o.up)("VendorInformation"),y=(0,o.up)("CustomerService"),C=(0,o.up)("Btn");return(0,o.wg)(),(0,o.iD)("div",a,[(0,o._)("div",n,[(0,o._)("div",s,[(0,o._)("div",r,[(0,o.Wm)(m,{title:"Create New Vendor",subTitle:"Enter all details required for this equipment vendor"})]),(0,o._)("div",d,[(0,o.Wm)(v,{BtnName:"Return",icon:"arrow-left",backgroundColor:"none",onClick:u.goBack,class:"text-secondary btn-sm"},null,8,["onClick"]),(0,o.Wm)(v,{BtnName:"Dashboard",backgroundColor:"#2A94B6",onClick:u.goBack,class:"text-light btn-sm"},null,8,["onClick"])])]),(0,o._)("main",null,[(0,o.Wm)(f),(0,o.Wm)(y),(0,o._)("div",c,[(0,o._)("div",i,[(0,o.Wm)(C,{BtnName:"Create Vendor",backgroundColor:"#27AE60",class:"mb-3",onClick:u.createRecord},null,8,["onClick"]),(0,o.Wm)(C,{BtnName:"Clear Content"})])])])])])}var _=l(3907),p=l(2262),m=l(3693),v=l(8077),f=l(502),y=l(4540),C=l(1696),S=l(8343),L=l(290),g={components:{CustomerService:v["default"],VendorInformation:m["default"],ManufacturerInformation:f["default"],ModelInformation:y["default"],Btn2:S["default"],Btn:C["default"],Header:L["default"]},name:"vendor",props:{tabid:{type:String}},emits:["updatePage"],setup(e,{emit:t}){const{props_variable:l}=(0,p.BK)(e),a=(0,_.oR)(),n=(0,o.Fl)((()=>a.state.globalStore.UserInfo.Institute_Info.Code)),s=e=>a.dispatch("changeServiceState",e);function r(){s({service:"<App_Name>",tabcode:tabid.value,status:"<Navigate_To_This_Page>"})}const d=(0,p.iH)({vendorName:null,selectedCountry:{Loci_Name_Country:null,Loci_Code_Country:null},selectedState:{Loci_Name_State:null,Loci_Code_State:null},selectedDistrict:{Loci_Name_Area_L1:null,Loci_Code_Area_L1:null},streetAddress1:null,streetAddress2:null,zipCode:null}),c=(0,p.iH)({vendorAddress:{Country:null,State:null,District:null}}),i=async e=>{t("updatePage",e)},u=e=>{a.dispatch("sendSocketReq",e)},m=(0,p.iH)({});function v(e){}function f(){u({data:{Expiry:2e4,Type:"REQUEST",Request:{Module:"MEMS",ServiceCode:"BIOMD",API:"CREATE_RECORD",collection:"Vendor",record:{vendor_name:d.value.vendorName,country:c.value.vendorAddress.Country,area:c.value.vendorAddress.State,city:c.value.vendorAddress.District,address_1:d.value.streetAddress1,address_2:d.value.streetAddress2,areaCode:d.value.zipCode,contactID:[],manufacturer_id:[]},Institute_Code:n.value}},callback:e=>{"RESPONSE"===e.Type?(i("success"),console.log("Response Packet --\x3e",e.Response),m.value=e.Response.Site_Info[0]):e.Type}})}const y=()=>{t("updatePage","landing")};return(0,o.JJ)("vendorInfo",d),(0,o.JJ)("Global_Vendor_Definition",c),{getValues:m,goBack:y,changePage:i,function_name:v,redirectToPage:r,createRecord:f}}},b=l(3744);const A=(0,b.Z)(g,[["render",u],["__scopeId","data-v-9c349860"]]);var w=A}}]);
//# sourceMappingURL=8254.8a1d3959.js.map