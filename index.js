import{a as M,S as q,i as v}from"./assets/vendor-BjRz3xa9.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))t(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const d of s.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&t(d)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function t(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();const B="49618570-65d81de6e7a9899840c4a7811",H="https://pixabay.com/api/",$=15;async function y(e,o=1){if(!e.trim())throw new Error("Search query cannot be empty");const n={key:B,q:encodeURIComponent(e),image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:$};try{const t=await M.get(H,{params:n});return{hits:t.data.hits,totalHits:t.data.totalHits}}catch{throw new Error("Failed to fetch images. Please try again later.")}}const h=document.querySelector(".gallery"),g=document.querySelector(".loader"),p=document.querySelector(".load-more"),m=document.querySelector(".end-message");let a;function b(e,o=!1){const n=e.map(t=>`
    <li class="gallery-item">
      <a href="${t.largeImageURL}">
        <img src="${t.webformatURL}" alt="${t.tags}" class="gallery-image" loading="lazy">
        <div class="image-info">
          <p><b>Likes:</b> ${t.likes}</p>
          <p><b>Views:</b> ${t.views}</p>
          <p><b>Comments:</b> ${t.comments}</p>
          <p><b>Downloads:</b> ${t.downloads}</p>
        </div>
      </a>
    </li>
  `).join("");h.insertAdjacentHTML("beforeend",n),a||(a=new q(".gallery a")),a.refresh(),!o&&e.length>0&&O()}function O(){const e=document.querySelector(".gallery-item");if(e){const{height:o}=e.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}}function R(){h.innerHTML="",a&&(a.destroy(),a=null),x()}function w(){g.hidden=!1}function L(){g.hidden=!0}function I(){p.hidden=!1,m.hidden=!0}function E(){p.hidden=!0}function S(){m.hidden=!1}function x(){m.hidden=!0}function P(e){return h.children.length>=e}const A=document.querySelector(".form"),u=document.querySelector(".load-more");let i=1,f="",l=0;A.addEventListener("submit",async e=>{e.preventDefault();const o=e.target.elements["search-text"].value.trim();if(!o){c("Please enter a search term");return}i=1,f=o,w(),E(),R();try{const{hits:n,totalHits:t}=await y(f,i);if(l=t,n.length===0){c("No images found. Please try a different search term.");return}b(n,!0),n.length===15&&n.length<l?I():P(l)&&S()}catch(n){c(n.message)}finally{L()}});u.addEventListener("click",async()=>{i++,w(),u.disabled=!0;try{const{hits:e}=await y(f,i);b(e),(e.length<15||P(l))&&(E(),S())}catch(e){i--,c(e.message)}finally{L(),u.disabled=!1}});function c(e){v.error({title:"Error",message:e,position:"topRight"})}
//# sourceMappingURL=index.js.map
