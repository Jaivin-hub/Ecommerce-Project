(window["webpackJsonpcorona-react"]=window["webpackJsonpcorona-react"]||[]).push([[10],{334:function(e,t,a){},404:function(e,t,a){"use strict";a.r(t);var c=a(42),l=a(0),n=a.n(l),r=a(197),s=a.n(r),m=a(54),i=(a(334),a(25));t.default=function(){var e=Object(l.useState)([]),t=Object(c.a)(e,2),a=t[0],r=t[1],o=Object(l.useState)(!1),d=Object(c.a)(o,2),u=d[0],E=d[1],p=Object(i.g)(),b={infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1};Object(l.useEffect)((function(){v()}),[u]);var v=function(){m.a.get("/getproducts").then((function(e){var t=e.data;r(t)}))};return console.log(a),n.a.createElement("div",null,n.a.createElement("div",{className:"page-header"},n.a.createElement("h3",{className:"page-title"},"Products"),n.a.createElement("nav",{"aria-label":"breadcrumb"},n.a.createElement("ol",{className:"breadcrumb"},n.a.createElement("li",{className:"breadcrumb-item"},n.a.createElement("a",{href:"!#",onClick:function(e){return e.preventDefault()}},"UI Elements")),n.a.createElement("li",{className:"breadcrumb-item active","aria-current":"page"},"Buttons")))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12 grid-margin stretch-card"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title"},"All Products"),n.a.createElement("p",{className:"card-description"},"You can edit this products by clicking them."),n.a.createElement("div",{className:"template-demo"},n.a.createElement("div",{className:"row text-center",style:{overflowY:"scroll",height:"70vh"}},a.map((function(e,t){return n.a.createElement("div",{className:"col-md-3 col-xl-2 grid-margin stretch-card"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title"},e.name),n.a.createElement("p",{className:"text-muted text-small text-center justify-content-center"},e.description,"."),n.a.createElement(s.a,Object.assign({className:"portfolio-slider"},b),e.images.map((function(e,t){return n.a.createElement("div",{className:"parent mt-3"},n.a.createElement("img",{style:{height:"10em"},className:"image1",src:e.image1,alt:"carousel-item"}))}))),n.a.createElement("div",{className:"d-flex py-4"},n.a.createElement("div",{className:"preview-list w-100"},n.a.createElement("div",{className:"preview-item p-0"},n.a.createElement("div",{className:"preview-item-content d-flex flex-grow"},n.a.createElement("div",{className:"flex-grow"},n.a.createElement("div",{className:"d-flex d-md-block d-xl-flex justify-content-between"},n.a.createElement("h6",{className:"preview-subject"},e.category)),0==e.quantity?n.a.createElement("small",{className:"text-danger"},"Out of stock"):e.quantity<=3?n.a.createElement("small",{className:"text-warning"},"Only ",e.quantity," stock!"):n.a.createElement("small",null,e.quantity),n.a.createElement("p",{className:"text-muted pt-1"},e.price)))))),n.a.createElement("div",{className:" progress-md portfolio-progress"},n.a.createElement("button",{onClick:function(){var t;t=e._id,p.push("/editproducts/".concat(t))},type:"button",className:"btn btn-outline-primary btn-fw"},"Edit"),n.a.createElement("button",{onClick:function(){var t;t=e._id,E(!u),console.log(t),m.a.post("/deleteproduct/?id=".concat(t)).then((function(e){console.log("all finish")}))},type:"button",className:"btn btn-outline-danger btn-fw "},"Delete")))))})))))))))}}}]);
//# sourceMappingURL=10.fe7cb837.chunk.js.map