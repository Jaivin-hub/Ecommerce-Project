(window["webpackJsonpcorona-react"]=window["webpackJsonpcorona-react"]||[]).push([[13],{149:function(e,t,a){},414:function(e,t,a){"use strict";a.r(t),a.d(t,"Subcategory",(function(){return u}));var r=a(28),c=a(42),n=a(0),o=a.n(n),l=a(37),m=(a(171),a(177),a(149),a(54));function s(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function u(){var e=Object(n.useState)(),t=Object(c.a)(e,2),a=t[0],u=t[1],i=Object(n.useState)([]),b=Object(c.a)(i,2),d=b[0],p=b[1];Object(n.useEffect)((function(){f()}),[]);var f=function(){m.a.get("/getcatagory").then((function(e){var t=e.data;p(t)})).catch((function(e){console.log(e)}))},g=function(e){var t=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?s(a,!0).forEach((function(t){Object(r.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):s(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},a);t[e.target.id]=e.target.value,u(t)};return o.a.createElement("div",null,o.a.createElement("div",{className:"page-header"},o.a.createElement("h3",{className:"page-title"}," Add New Subcatagory"),o.a.createElement("nav",{"aria-label":"breadcrumb"},o.a.createElement("ol",{className:"breadcrumb"},o.a.createElement("li",{className:"breadcrumb-item"},o.a.createElement("a",{href:"!#",onClick:function(e){return e.preventDefault()}},"New Products")),o.a.createElement("li",{className:"breadcrumb-item active","aria-current":"page"},"Add products")))),o.a.createElement("div",{className:"row mt-5 "},o.a.createElement("div",{className:"col-md-6 grid-margin stretch-card"},o.a.createElement("div",{className:"card"},o.a.createElement("div",{className:"card-body"},o.a.createElement("h4",{className:"card-title"},"Category Management"),o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),m.a.post("/addsubcatagory",a).then((function(){console.log("success")})).catch((function(e){console.log(e)}))},className:"forms-sample"},o.a.createElement(l.a.Group,null,o.a.createElement("label",{htmlFor:"exampleSelectGender"},"Categories"),o.a.createElement("select",{onChange:g,className:"form-control",id:"Category"},d.map((function(e,t){return o.a.createElement("option",null,e.Categoryname)})))),o.a.createElement(l.a.Group,{className:"row"},o.a.createElement("label",{htmlFor:"exampleInputUsername2",className:"col-sm-3 col-form-label"},"Sub Category"),o.a.createElement("div",{className:"col-sm-9"},o.a.createElement(l.a.Control,{onChange:g,type:"text",className:"form-control",id:"subcategory",placeholder:"Username"}))),o.a.createElement("button",{type:"submit",className:"btn btn-primary mr-2"},"Submit"),o.a.createElement("button",{className:"btn btn-dark"},"Cancel")))))))}t.default=u}}]);
//# sourceMappingURL=13.a79d080e.chunk.js.map