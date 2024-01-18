import{d as z,r as _,c as A,a as f,b as s,n as h,e as D,t as W,u as p,w as v,F as Z,f as q,g as L,h as S,v as $,o as I,p as G,i as H,_ as J}from"./index-LULr0uCE.js";const K="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M4.36358%2011.3636C4.01211%2011.715%204.01211%2012.2849%204.36358%2012.6364L10.3636%2018.6364L11.6364%2017.3636L7.27277%2013L20%2013L20%2011L7.27277%2011L11.6364%206.63638L10.3636%205.36359L4.36358%2011.3636Z'%20fill='%23222222'/%3e%3c/svg%3e";function C(){return Date.now()}const Q=r=>(G("data-v-70f4b945"),r=r(),H(),r),X={class:"design"},Y={class:"design__container"},ee={class:"design__top"},te={class:"design__top-left"},ae=Q(()=>s("img",{src:K,alt:""},null,-1)),se=[ae],le={class:"design__status"},ne={class:"design__btns"},oe={class:"design__form"},de=["onDragstart","onDrop"],ie={class:"upload__wrapp"},re=["src"],ue=["onClick"],ce=["value"],pe=z({__name:"DesignDetails",props:{data:Object},emits:["handleChanges","removeDesign"],setup(r,{emit:F}){const d=r,k=F,a=_({code:"",address:"",name:""});let n=_([]);d.data&&(a.value.address=d.data.address||"",a.value.code=d.data.code||"",a.value.name=d.data.name||"",n.value=[...d.data.images]);const g=_(!1),m=_(!1),U=A(()=>a.value.code.trim()!==""?`https://design${a.value.code}.horoshop.ua/`:""),V=t=>{a.value.address=t.target.value},B=t=>{t.preventDefault();const l=t.target.files;if(l&&l.length>0){const o=l[0];w(o)?x(o):alert("Please select a valid image file.")}else alert("Please select a file.")},w=t=>t.type.startsWith("image/"),x=t=>{const e=new FileReader;e.onload=l=>{var u;const o=(u=l.target)==null?void 0:u.result;o?n.value.push({id:C(),url:o,file:t}):console.error("Failed to read the file.")},e.readAsDataURL(t)},j=t=>{var l;t.preventDefault();const e=(l=t.dataTransfer)==null?void 0:l.files[0];console.log(e),e&&(w(e)?x(e):alert("Please select a valid image file."))},E=t=>{g.value&&(g.value=!1);const l=t.target.value.replace(/[^0-9]/g,"");a.value.code=l},M=t=>{m.value&&(m.value=!1),a.value.name=t.target.value},N=t=>{n.value=n.value.filter(e=>e.id!==t)},O=()=>{if(!a.value.code||!a.value.name){a.value.code||(g.value=!0),a.value.name||(m.value=!0),alert("Both code and design title should be completed to proceed.");return}const t={id:C(),code:a.value.code,name:a.value.name,address:a.value.address,published:!0,images:y()};if(!d.data)k("handleChanges","add",t);else{const e={...d.data,code:a.value.code,name:a.value.name,address:a.value.address,images:y()};k("handleChanges","edit",e)}},y=()=>n.value.length>0?[...n.value]:[{id:C(),url:"/src/images/no_img.png"}];let b=null;const P=t=>{b=t},R=t=>{t.preventDefault()},T=t=>{const e=n.value.findIndex(o=>o.id===b),l=n.value.findIndex(o=>o.id===t);if(e!==-1&&l!==-1){const[o]=n.value.splice(e,1);n.value.splice(l,0,o)}b=null};return(t,e)=>{var l,o,u;return I(),f("section",X,[s("div",Y,[s("div",ee,[s("div",te,[s("div",{onClick:e[0]||(e[0]=i=>t.$router.back()),class:"design__back"},se),s("div",le,[s("div",{class:h(["design__indicator",{"design__indicator--active":(l=d.data)==null?void 0:l.published}])},null,2),s("p",{class:"design__status-title",style:D({color:(o=d.data)!=null&&o.published?"#699707":"#222"})},W((u=d.data)!=null&&u.published?"Oпублікований":"Неопублікований"),5)])]),s("div",ne,[s("button",{class:h(["design__btn-delete",{"design__btn-delete--hide":!d.data}]),onClick:e[1]||(e[1]=i=>{var c;return t.$emit("removeDesign",(c=d.data)==null?void 0:c.id)})}," Видалити ",2),s("button",{class:"design__btn-submit",onClick:O},"Зберегти і вийти")])]),s("div",oe,[s("ul",{class:"upload",style:D({gridTemplateColumns:p(n).length>0?"repeat(4, 120px)":"1fr"}),onDragover:e[3]||(e[3]=v(()=>{},["prevent"]))},[p(n).length>0?(I(!0),f(Z,{key:0},q(p(n),i=>(I(),f("li",{class:"upload__item",key:"item.id",draggable:"true",onDragstart:c=>P(i.id),onDragover:v(R,["prevent"]),onDrop:c=>T(i.id)},[s("div",ie,[s("img",{src:i.url,alt:""},null,8,re),s("button",{class:"upload__delete",onClick:c=>N(i.id)},null,8,ue)])],40,de))),128)):L("",!0),p(n).length<4?(I(),f("li",{key:1,class:"upload__item upload-input",onDragover:e[2]||(e[2]=v(()=>{},["prevent"])),onDrop:v(j,["prevent"])},[s("label",{for:"upload-input",class:"upload__label",style:D({backgroundImage:p(n).length>0?"url(/vue-project-design/src/icons/add.svg)":"url(/vue-project-design/src/icons/picture.svg)"})},[s("input",{type:"file",accept:"image/*",id:"upload-input",onChange:B},null,32)],4)],32)):L("",!0)],36),s("form",{class:"form",action:"",onSubmit:e[6]||(e[6]=v(()=>{},["prevent"]))},[S(s("input",{class:h(["form__input",{"code-error":g.value}]),type:"text",placeholder:"###","onUpdate:modelValue":e[4]||(e[4]=i=>a.value.code=i),onInput:E},null,34),[[$,a.value.code]]),S(s("input",{class:h(["form__input",{"name-error":m.value}]),type:"text",placeholder:"Назва дизайну","onUpdate:modelValue":e[5]||(e[5]=i=>a.value.name=i),onInput:M},null,34),[[$,a.value.name]]),s("input",{class:"form__input",type:"text",placeholder:"https://design###.horoshop.ua/",onInput:V,value:U.value},null,40,ce)],32)])])])}}}),ge=J(pe,[["__scopeId","data-v-70f4b945"]]);export{ge as default};
