(this["webpackJsonpcovid19-dashboard-vaccini"]=this["webpackJsonpcovid19-dashboard-vaccini"]||[]).push([[0],{124:function(e,t,a){},185:function(e,t,a){},218:function(e,t,a){"use strict";a.r(t);var n=a(2),s=a(1),c=a.n(s),i=a(26),r=a.n(i),o=(a(185),a(11)),l=a(19),m=(a(124),a(186),a(187),a(188),a(189),a(132)),d=function(){return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)(m.a,{small:!1,theme:"",type:"slim",className:"App-header",children:Object(n.jsxs)("div",{className:"d-flex justify-content-center mb-3 logo-section mx-auto",children:[Object(n.jsxs)("div",{className:"presidenza",children:[Object(n.jsx)("img",{src:"logo.svg",alt:"Logo",className:"logo"}),Object(n.jsx)("span",{children:"Presidenza Del"}),Object(n.jsx)("span",{children:"Consiglio dei Ministri"})]}),Object(n.jsxs)("div",{className:"presidenza",children:[Object(n.jsx)("img",{src:"logo.svg",alt:"Logo",className:"logo"}),Object(n.jsx)("span",{children:"Commissario"}),Object(n.jsx)("span",{children:"Straordinario Covid-19"})]}),Object(n.jsxs)("div",{className:"presidenza",children:[Object(n.jsx)("img",{src:"logo.svg",alt:"Logo",className:"logo"}),Object(n.jsx)("span",{children:"Ministero"}),Object(n.jsx)("span",{children:"della Salute"})]})]})}),Object(n.jsx)("div",{className:"d-flex flex-column justify-content-center mainBanner",children:Object(n.jsxs)("div",{className:"d-flex justify-content-center",children:[Object(n.jsx)("img",{src:"logo.png",alt:"Logo",className:"main-logo"}),Object(n.jsx)("span",{className:"pl-3",children:"Report Vaccini Anti COVID-19"})]})})]})},j=a(8),u=a.n(j),b=a(33),x=a(42),h=a(136),f=(a(10),function(e){return function(t){return function(a){return a[e]===t}}}),g=f("area"),O=g("ITA"),v=(f("TML_FASCIA_ETA"),function(e){return Object(o.a)(Object(o.a)({},e),{},{area:p[e.area]})}),p={ABR:"Abruzzo",BAS:"Basilicata",CAL:"Calabria",CAM:"Campania",EMR:"Emilia-Romagna",FVG:"Friuli-Venezia Giulia",LAZ:"Lazio",LIG:"Liguria",LOM:"Lombardia",MAR:"Marche",MOL:"Molise",PAB:"Trentino-Alto Adige/S\xfcdtirol",PAT:"Prov. Aut. Trento",PIE:"Piemonte",PUG:"Puglia",SAR:"Sardegna",SIC:"Sicilia",TOS:"Toscana",UMB:"Umbria",VDA:"Valle d'Aosta/Vall\xe9e d'Aoste",VEN:"Veneto"},y=function(e){var t=Object(s.useState)([]),a=Object(l.a)(t,2),c=a[0],i=a[1],r=Object(s.useState)([]),o=Object(l.a)(r,2),m=o[0],d=o[1],j=x.a().center([0,41]).rotate([347,0]).parallels([35,45]).scale(4e3).translate([320,320]);return Object(s.useEffect)((function(){(function(){var e=Object(b.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("data/geo/it.json");case 2:return t=e.sent,e.next=5,t.json();case 5:a=e.sent,i(h.a(a,a.objects.regions).features);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(n.jsx)("svg",{width:640,height:640,viewBox:"0 0 800 450",children:Object(n.jsxs)("g",{className:"countries",children:[c.map((function(t,a){var s,c,i=null===(s=e.summary)||void 0===s||null===(c=s.deliverySummary)||void 0===c?void 0:c.filter(g(t.properties.reg_name)),r={};return i&&i.length>0&&(r=i[0]),Object(n.jsx)("path",{d:x.b().projection(j)(t),className:"country",fill:"rgba(0,102,204,".concat(.02*r.percentuale_somministrazione,")"),stroke:"#FFFFFF",strokeWidth:.7,onClick:function(){return t=r.index,void(m===t?(e.handleCountryClick(null),d(null)):(e.handleCountryClick(t),d(t)));var t},children:Object(n.jsx)("title",{children:Object(n.jsxs)("span",{className:"bg-info",children:[r.area," ",r.percentuale_somministrazione,"%"]})})},"path-".concat(a))})),");"]})})},N=function(e){return Object(n.jsx)("div",{className:"d-flex m-2 p-2 pt-4 pb-4 w-100 h-75 justify-content-center text-center "+e.classes,children:e.text})},S=a(22),w=a.n(S),C=a(40),A=a.n(C);a(216);w.a.DataTable=A.a;var L=[{title:"Regioni",data:"area"},{title:"Somm",data:"dosi_somministrate"},{title:"Cons",data:"dosi_consegnate"},{title:"%",data:"percentuale_somministrazione"}],z=function(e){return Object(s.useEffect)((function(){var t,a,n=w()("#datatable").find("table").DataTable({dom:"<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>><'row'<'col-sm-12'tr>>",paging:!1,searching:!0,destroy:!0,data:(null===(t=e.summary)||void 0===t?void 0:t.deliverySummary)||[],columns:L});(null===e||void 0===e||null===(a=e.selected)||void 0===a?void 0:a.area)?n.search(e.selected.area).draw():n.search(" ").draw()})),Object(n.jsx)("div",{id:"datatable",className:"d-flex",children:Object(n.jsx)("table",{className:"table table-borderless compact",cellSpacing:"0",width:"100%"})})},V=a(135),F=a.n(V),M=function(e){var t;return Object(n.jsxs)("div",{className:"d-flex flex-column justify-content-center h-100 mt-2 mb-3",children:[Object(n.jsx)("div",{className:"timestamp mx-auto",children:Object(n.jsxs)("h6",{children:["Dati aggiornati al:"," ",F()(e.summary.timestamp).format("DD-MM-YYYY HH:mm")]})}),Object(n.jsx)("div",{className:"container",children:Object(n.jsxs)("div",{className:"d-flex flex-column justify-content-center",children:[Object(n.jsxs)("div",{className:"d-flex justify-content-center",children:[Object(n.jsx)("img",{src:"meds.png",alt:"meds",className:"pr-5"})," ",Object(n.jsx)("h1",{className:"pl-5 mt-4 font-weight-light",children:null===(t=e.summary.tot)||void 0===t?void 0:t.toLocaleString("en")})]}),Object(n.jsx)("span",{className:"border-top mt-2 mb-2"}),Object(n.jsxs)("div",{className:"d-flex justify-content-center",children:[Object(n.jsx)("img",{src:"logo.png",alt:"fiore",height:"30"}),Object(n.jsx)("img",{src:"logo.png",alt:"fiore",height:"30"}),Object(n.jsx)("img",{src:"logo.png",alt:"fiore",height:"30",className:"pr-5"})," ",Object(n.jsx)("h6",{className:"pl-5",children:"Totale vaccinazioni"})]})]})})]})},T=function(e){var t;return console.log(e),{timestamp:e.dataConsegneVaxSummary.data.slice(0,1)[0].data,tot:e.dataSommVaxSummary.data.filter(O).reduce((t="totale",function(e,a){return e+ +(null===a||void 0===a?void 0:a[t])}),0),deliverySummary:e.dataConsegneVaxSummary.data.map(v)}},D=function(){var e=Object(b.a)(u.a.mark((function e(){var t,a,n,s,c,i;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("data/somministrazioni-vaccini-summary-latest.json");case 2:return t=e.sent,e.next=5,fetch("data/somministrazioni-vaccini-latest.json");case 5:return a=e.sent,e.next=8,fetch("data/consegne-vaccini-summary-latest.json");case 8:return n=e.sent,e.next=11,t.json();case 11:return s=e.sent,e.next=14,a.json();case 14:return c=e.sent,e.next=17,n.json();case 17:return i=e.sent,e.abrupt("return",T({dataSommVaxSummary:s,dataSommVaxDetail:c,dataConsegneVaxSummary:i}));case 19:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();var k=function(){var e=Object(s.useState)({}),t=Object(l.a)(e,2),a=t[0],c=t[1],i=Object(s.useState)({}),r=Object(l.a)(i,2),m=r[0],j=r[1];return Object(s.useEffect)((function(){D().then((function(e){c(e)}))}),[]),Object(n.jsxs)("div",{children:[Object(n.jsx)(d,{}),Object(n.jsx)(M,{className:"mb-3",summary:Object(o.a)({},a)}),Object(n.jsxs)("div",{className:"d-flex flex-column flex-sm-row justify-content-center w-75 h-100 mx-auto mt-3",style:{height:150},children:[Object(n.jsx)(N,{classes:"bg-primary text-white",text:"Il 27 dicembre sono state consegnate 9.750 dosi di vaccino, interamente somministrate."}),Object(n.jsx)(N,{classes:"bg-primary text-white",text:"Dal 30 Dicembre al 1\xb0 Gennaio sono state consegnate 469.950 dosi di vaccino."})]}),Object(n.jsx)("div",{className:"d-flex justify-content-center w-75 mx-auto",style:{height:150},children:Object(n.jsx)(N,{classes:"text-black text-uppercase font-weight-bold",text:"Le somministrazioni delle 469.950 dosi di vaccino su tutto il territorio sono iniziate il 31 dicembre"})}),Object(n.jsxs)("div",{className:"d-flex flex-column flex-sm-row justify-content-center w-75 mx-auto h-100 mt-3",children:[Object(n.jsx)(z,{summary:Object(o.a)({},a),selected:m,className:"mr-5 h-100"}),Object(n.jsx)(y,{summary:Object(o.a)({},a),handleCountryClick:function(e){j(Object(o.a)({},a.deliverySummary[e]))},className:"ml-5 w-100 h-100"})]})]})},P=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,219)).then((function(t){var a=t.getCLS,n=t.getFID,s=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),n(e),s(e),c(e),i(e)}))};r.a.render(Object(n.jsx)(c.a.StrictMode,{children:Object(n.jsx)(k,{})}),document.getElementById("root")),P()}},[[218,1,2]]]);
//# sourceMappingURL=main.39736be8.chunk.js.map