(window["webpackJsonpcorona-react"]=window["webpackJsonpcorona-react"]||[]).push([[10],{335:function(e,a,t){},405:function(e,a,t){"use strict";t.r(a);var c=t(42),l=t(0),n=t.n(l),r=t(198),s=t.n(r),m=(t(43),t(54)),i=(t(335),t(25));a.default=function(){var e=Object(l.useState)([]),a=Object(c.a)(e,2),t=a[0],r=a[1],o=Object(l.useState)(!1),d=Object(c.a)(o,2),u=d[0],p=d[1],E=Object(i.g)(),b={infinite:!0,speed:500,slidesToShow:1,slidesToScroll:1};Object(l.useEffect)((function(){v()}),[u]);var v=function(){m.a.get("/getproducts").then((function(e){var a=e.data;r(a)}))};return console.log(t),n.a.createElement("div",null,n.a.createElement("div",{className:"page-header"},n.a.createElement("h3",{className:"page-title"},"Products"),n.a.createElement("nav",{"aria-label":"breadcrumb"},n.a.createElement("ol",{className:"breadcrumb"},n.a.createElement("li",{className:"breadcrumb-item"},n.a.createElement("a",{href:"!#",onClick:function(e){return e.preventDefault()}},"UI Elements")),n.a.createElement("li",{className:"breadcrumb-item active","aria-current":"page"},"Buttons")))),n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col-12 grid-margin stretch-card"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title"},"All Products"),n.a.createElement("p",{className:"card-description"},"You can edit this products by clicking them."),n.a.createElement("div",{className:"template-demo"},n.a.createElement("div",{className:"row text-center"},t.map((function(e,a){return n.a.createElement("div",{className:"col-md-6 col-xl-4 grid-margin stretch-card"},n.a.createElement("div",{className:"card"},n.a.createElement("div",{className:"card-body"},n.a.createElement("h4",{className:"card-title"},e.name),n.a.createElement(s.a,Object.assign({className:"portfolio-slider"},b),e.images.map((function(e,a){return n.a.createElement("div",{className:"parent"},n.a.createElement("img",{style:{height:"30em"},className:"image1",src:e.image1,alt:"carousel-item"}))}))),n.a.createElement("div",{className:"d-flex py-4"},n.a.createElement("div",{className:"preview-list w-100"},n.a.createElement("div",{className:"preview-item p-0"},n.a.createElement("div",{className:"preview-item-content d-flex flex-grow"},n.a.createElement("div",{className:"flex-grow"},n.a.createElement("div",{className:"d-flex d-md-block d-xl-flex justify-content-between"},n.a.createElement("h6",{className:"preview-subject"},e.category),n.a.createElement("p",{className:"text-muted text-small"},e.description,".")),n.a.createElement("p",{className:"text-muted"},e.price)))))),n.a.createElement("div",{className:" progress-md portfolio-progress"},n.a.createElement("button",{onClick:function(){var a;a=e._id,E.push("/editproducts/".concat(a))},type:"button",className:"btn btn-outline-primary btn-fw"},"Edit"),n.a.createElement("button",{onClick:function(){var a;a=e._id,p(!u),console.log(a),m.a.post("/deleteproduct/?id=".concat(a)).then((function(e){console.log("all finish")}))},type:"button",className:"btn btn-outline-danger btn-fw "},"Delete")))))})))))))))}}}]);
//# sourceMappingURL=10.34e06ced.chunk.js.map