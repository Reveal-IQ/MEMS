"use strict";(self["webpackChunkclient"]=self["webpackChunkclient"]||[]).push([[6286],{6286:function(e,a,l){l.r(a),l.d(a,{default:function(){return k}});var o=l(6252),t=l(3577);const r=e=>((0,o.dD)("data-v-78c77c7a"),e=e(),(0,o.Cn)(),e),u={class:"table-container card shadow-2"},s={class:"table table-striped table-hover table-borderless"},n={class:""},c=r((()=>(0,o._)("td",null,null,-1))),i={class:"px-4 py-1"},v={class:"checkBoxStyle"},d=["onClick"];function w(e,a,l,r,w,p){const b=(0,o.up)("font-awesome-icon");return(0,o.wg)(),(0,o.iD)("div",u,[(0,o._)("table",s,[(0,o._)("thead",null,[(0,o._)("tr",n,[c,((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.columnData,((e,a)=>((0,o.wg)(),(0,o.iD)("th",{key:a,class:"py-4"},[(0,o._)("tr",null,[(0,o._)("td",null,(0,t.zw)(e.column),1),(0,o._)("td",i,[r.arrowUp?((0,o.wg)(),(0,o.j4)(b,{key:0,icon:"arrow-up",class:"arrowIcon",onClick:a=>r.sortTable(e.sortType,"asc",e.fieldName)},null,8,["onClick"])):(0,o.kq)("",!0),r.arrowDown?((0,o.wg)(),(0,o.j4)(b,{key:1,icon:"arrow-down",class:"arrowIcon",onClick:a=>r.sortTable(e.sortType,"dsc",e.fieldName)},null,8,["onClick"])):(0,o.kq)("",!0)])])])))),128))])]),(0,o._)("tbody",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(r.tableData,((e,a)=>((0,o.wg)(),(0,o.iD)("tr",{key:a,style:(0,t.j5)("--color:"+l.hoverColor)},[(0,o._)("td",v,[(0,o._)("input",{type:"checkbox",onClick:l=>r.selectedRowData(a,e)},null,8,d)]),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e,((e,a)=>((0,o.wg)(),(0,o.iD)("td",{key:a,class:"RowData"},(0,t.zw)(e),1)))),128))],4)))),128))])])])}var p=l(2262),b={props:{columnData:{type:Array},tableData:{type:Array},hoverColor:{type:String,default:"#a6e9d5"}},setup(e){const{tableData:a,columnData:l}=(0,p.BK)(e),o=(0,p.iH)(l.value[0].fieldName),t=(0,p.iH)(l.value[0].sortType),r=(0,p.iH)("asc"),u=(0,p.iH)(!0),s=(0,p.iH)(!1),n=(0,p.iH)([]);function c(e,l,o){"alpha"==e&&"asc"==l?(u.value=!1,s.value=!0,a.value.sort(((e,a)=>{let l=e[`${o}`].toLowerCase(),t=a[`${o}`].toLowerCase();return l<t?1:l>t?-1:0}))):"alpha"==e&&"dsc"==l?(s.value=!1,u.value=!0,a.value.sort(((e,a)=>{let l=e[`${o}`].toLowerCase(),t=a[`${o}`].toLowerCase();return l<t?-1:l>t?1:0}))):"numeric"==e&&"asc"==l?(u.value=!1,s.value=!0,a.value.sort(((e,a)=>e[`${o}`]-a[`${o}`]))):"numeric"==e&&"dsc"==l?(s.value=!1,u.value=!0,a.value.sort(((e,a)=>a[`${o}`]-e[`${o}`]))):"boolean"==e&&"asc"==l?(u.value=!1,s.value=!0,a.value.sort(((e,a)=>e[`${o}`]&&!a[`${o}`]?-1:!e[`${o}`]&&a[`${o}`]?1:0))):"boolean"==e&&"dsc"==l&&(s.value=!1,u.value=!0,a.value.sort(((e,a)=>e[`${o}`]&&!a[`${o}`]?1:!e[`${o}`]&&a[`${o}`]?-1:0)))}function i(){var e=t.value,l=r.value;"alpha"==e&&"asc"==l?(u.value=!1,s.value=!0,a.value.sort(((e,a)=>{let l=e[o.value].toLowerCase(),t=a[o.value].toLowerCase();return l<t?1:l>t?-1:0}))):"numeric"==e&&"asc"==l?(u.value=!1,s.value=!0,a.value.sort(((e,a)=>e[o.value]-a[o.value]))):"boolean"==e&&"asc"==l&&(u.value=!1,s.value=!0,a.value.sort(((e,a)=>e[`${fieldName}`]&&!a[`${fieldName}`]?-1:!e[`${fieldName}`]&&a[`${fieldName}`]?1:0)))}function v(e,a){n.value.push({index:e,data:a}),console.log(n.value)}return i(),{tableData:a,columnData:l,sortTable:c,arrowUp:u,arrowDown:s,resetTable:i,selectedRow:n,selectedRowData:v}}},D=l(3744);const $=(0,D.Z)(b,[["render",w],["__scopeId","data-v-78c77c7a"]]);var k=$}}]);
//# sourceMappingURL=6286.14873996.js.map