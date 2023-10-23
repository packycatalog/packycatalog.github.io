function loadIsotope(){$(".isotope-grid").each(function(){$(this).isotope({itemSelector:".isotope-item",layoutMode:"fitRows",percentPosition:!0,sortBy:"update",sortAscending:!1,animationEngine:"best-available",masonry:{columnWidth:".isotope-item"},getSortData:{price:"[data-price] parseFloat",update:"[data-update] parseFloat"},filter:function(){var n,t;for(let n in currentFilter)if(!$(this).hasClass(n+"-"+currentFilter[n]))return!1;if(n=$('[name="search-product"]').val(),n!=null&&n.length>0){let i=$(this).attr("class");t=getFilterValues(i,"category").concat(getFilterValues(i,"subcategory")).concat(getFilterValues(i,"feature")).concat(getFilterValues(i,"label"));t=t.join(" ");let r=n.split(" ");for(let n=0;n<r.length;n++){let i=normalizeText(r[n]);if(!t.includes(i))return!1}}return!0}})})}function loadData(n,t){var r,i,u,c,e,o,a;let s=n(".isotope-grid").first(),h=n(".filter-tope-group"),l=n(".wrap-filter"),f=addFiltersTag(l,1,"Ordenar por");addFilterLi(f,"Recientes","orderBy",!0,()=>sortProducts("update","desc","Recientes"));addFilterLi(f,"Más económicos","orderBy",!1,()=>sortProducts("price","asc","Más económicos"));addFilterLi(f,"Más costosos","orderBy",!1,()=>sortProducts("price","desc","Más costosos"));r=new URLSearchParams(window.location.search);i=r.get("category");i!=null&&i.length>0&&(currentFilter.category=i,u=r.get("subcategory"),u!=null&&u.length>0&&(currentFilter.subcategory=u));c=r.get("search");n('[name="search-product"]').val(c);addCategoryTag(h,"Todos","*",i==null||i.length==0);for(const n in t){filterTree[n]==null&&(filterTree[n]=[]);filterData[normalizeText(n)]=n;addCategoryTag(h,n,n,normalizeText(n)==i);const r=t[n];for(const t in r){filterData[normalizeText(t)]=t;filterTree[n][t]==null&&(filterTree[n][t]=[]);const i=r[t];for(const r in i){const u=i[r];filterTree[n][t][u.Date]==null&&(filterTree[n][t][u.Date]=[]);e="";o=extendFeatures(u);for(const i in o){const r=o[i],f=normalizeText(r);f.length>0&&(e+=" feature-"+f,filterData[f]=r,filterTree[n][t][u.Date].push(r))}addProductCard(s,u,n,t,e)}}}s.on("arrangeComplete",updateView);n('[name="search-product"]').keyup(debounce(function(){n(".isotope-grid").isotope();updateViewSearch(n(this))},200));a=new LazyLoad({elements_selector:"img[data-src]",callback_loaded:function(){let t=n(".isotope-grid");t.data("isotope")&&t.isotope("layout")}})}function debounce(n,t){var i;return t=t||100,function(){function f(){n.apply(u,r)}clearTimeout(i);var r=arguments,u=this;i=setTimeout(f,t)}}function updateViewSearch(n=null){n==null&&(n=$('[name="search-product"]'));let t=n.val();t!=null&&t.length>0?$(".js-show-search").addClass("how-active1"):$(".js-show-search").removeClass("how-active1")}function udpateViewFilter(){let n=!1;currentFilter.subcategory!=null&&currentFilter.subcategory.length>0&&(n=!0);!n&&currentFilter.feature!=null&&currentFilter.feature.length>0&&(n=!0);n?$(".js-show-filter").addClass("how-active1"):$(".js-show-filter").removeClass("how-active1")}function updateView(){var f,n,s;let i=[],e=currentFilter.category,r=currentFilter.subcategory,u=null;if(e==null){for(f in filterTree)if(i.push(f),r!=null){let t=filterTree[f];for(n in t)r==normalizeText(n)&&(u=n)}}else{let t=filterData[e];i.push(t);let f=filterTree[t];if(r!=null)for(n in f)r==normalizeText(n)&&(u=n)}let t=[],o=[];for(let n in i){let f=i[n],r=filterTree[f];for(let n in r)if(t.push(n),u==null||u==n){let i=r[n];for(let n in i){let t=i[n];t!=null&&t.length>0&&o.push(t)}}}t=t.filter(function(n,i){return t.indexOf(n)===i});updateFilters("Subcategorías",2,t.sort(),!1,"subcategory");s=getKeywords(o,15);updateFilters("Palabras clave",3,s,!0,"feature");udpateViewFilter()}function extendFeatures(n){const t=n.Label.split(" ");let i=(n.Features||[]).concat(t);return i.flatMap(n=>n.split("-")).filter(n=>n.length>1)}function getKeywords(n,t){const f=n.flatMap(n=>n.map(n=>n.toLowerCase())),i=f.reduce((n,t)=>n[t]=(n[t]||0)+1,n,{}),r=n.length,e=Math.ceil(r*.05),o=Math.floor(r*.7),u=Object.keys(i).filter(n=>i[n]>=e&&i[n]<=o);return u.sort((n,t)=>i[t]-i[n]),u.slice(0,t)}function updateFilters(n,t,i,r,u){let o=$(".wrap-filter"),f=addFiltersTag(o,t,n,r);f.innerHTML="";let e=currentFilter[u];for(var s in i){let n=i[s];r?addFilterDiv(f,n,u,e==normalizeText(n)):addFilterLi(f,n,u,e==normalizeText(n))}}function addCategoryTag(n,t,i,r){let u=document.createElement("button"),f="stext-106 cl6 hov1 bor3 trans-04 m-r-32 m-tb-5";r&&(f+=" how-active1");u.setAttribute("class",f);u.textContent=spanishFormat(t);u.addEventListener("click",()=>{(i!="*"||currentFilter.category!=null)&&currentFilter.category!=normalizeText(i)&&(currentFilter=[],i!="*"&&(currentFilter.category=normalizeText(i)),$(".isotope-grid").isotope())});n.append(u)}function addFiltersTag(n,t,i,r=false){let e="filter-col"+t,u=n.find("."+e);if(u!=null&&u.length>0)return(u=u.first(),r)?u.find("div")[1]:u.find("ul").first().get(0);u=document.createElement("div");r?u.setAttribute("class",e+" p-b-27"):u.setAttribute("class",e+" p-r-15 p-b-27");let o=document.createElement("div");o.setAttribute("class","mtext-102 cl2 p-b-15");o.textContent=spanishFormat(i);u.appendChild(o);n.append(u);let f;return r?(f=document.createElement("div"),f.setAttribute("class","flex-w p-t-4 m-r--5"),u.appendChild(f),f):(f=document.createElement("ul"),u.appendChild(f),f)}function addFilterLi(n,t,i=null,r=false,u=null){let e=document.createElement("li");e.setAttribute("class","p-b-6");let f=document.createElement("a"),o="filter-link stext-106 trans-04";i!=null&&i.length>0&&(o+=" "+i,f.addEventListener("click",()=>{if(u!=null){u();return}currentFilter[i]==normalizeText(t)?delete currentFilter[i]:currentFilter[i]=normalizeText(t);delete currentFilter.feature;$(".isotope-grid").isotope()}));r&&(o+=" filter-link-active");f.setAttribute("class",o);f.setAttribute("href","#");var s=spanishFormat(t);f.textContent=s;e.appendChild(f);n.appendChild(e);$(f).on("click",function(n){n.preventDefault()})}function addFilterDiv(n,t,i=null,r=false){let u=document.createElement("a"),f="flex-c-m stext-107 cl6 size-301 bor7 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5";i!=null&&i.length>0&&(f+=" "+i,u.addEventListener("click",()=>{currentFilter[i]==normalizeText(t)?delete currentFilter[i]:currentFilter[i]=normalizeText(t),$(".isotope-grid").isotope()}));r&&(f="flex-c-m stext-107 size-301 p-lr-15 hov-tag1 trans-04 m-r-5 m-b-5 filter-link-active-bor");u.setAttribute("class",f);u.setAttribute("href","#");u.textContent=spanishFormat(t);n.appendChild(u)}function addProductCard(n,t,i,r,u){let f=normalizeText(i);f.length>0&&(u+=" category-"+f);f=normalizeText(r);f.length>0&&(u+=" subcategory-"+f);f=normalizeText(t.Label);f.length>0&&(u+=" label-"+f);t.Category=i;t.SubCategory=r;addProductCardBase(n,t,u)}function sortProducts(n,t,i){$(".isotope-grid").isotope({sortBy:n,sortAscending:t=="asc"});$(".orderBy").each(function(){var n=$(this);n.removeClass("filter-link-active");n.text()==spanishFormat(i)&&n.addClass("filter-link-active")})}(function(n){"use strict";n.getJSON("./data/products-index.json",function(t){var s,i,r,u,f,e,o;loadData(n,t);n(".parallax100").parallax100();n(".gallery-lb").each(function(){n(this).magnificPopup({delegate:"a",type:"image",gallery:{enabled:!0},mainClass:"mfp-fade"})});n(".js-pscroll").each(function(){n(this).css("position","relative");n(this).css("overflow","hidden");var t=new PerfectScrollbar(this,{wheelSpeed:1,scrollingThreshold:1e3,wheelPropagation:!1});n(window).on("resize",function(){t.update()})});s=n(window).height()/2;n(window).on("scroll",function(){n(this).scrollTop()>s?n("#myBtn").css("display","flex"):n("#myBtn").css("display","none")});n("#myBtn").on("click",function(){n("html, body").animate({scrollTop:0},300)});i=n(".container-menu-desktop");r=n(".wrap-menu-desktop");u=n(".top-bar").length>0?n(".top-bar").height():0;n(window).scrollTop()>u?(n(i).addClass("fix-menu-desktop"),n(r).css("top",0)):(n(i).removeClass("fix-menu-desktop"),n(r).css("top",u-n(this).scrollTop()));n(window).on("scroll",function(){n(this).scrollTop()>u?(n(i).addClass("fix-menu-desktop"),n(r).css("top",0)):(n(i).removeClass("fix-menu-desktop"),n(r).css("top",u-n(this).scrollTop()))});n(".btn-show-menu-mobile").on("click",function(){n(this).toggleClass("is-active");n(".menu-mobile").slideToggle()});for(f=n(".arrow-main-menu-m"),e=0;e<f.length;e++)n(f[e]).on("click",function(){n(this).parent().find(".sub-menu-m").slideToggle();n(this).toggleClass("turn-arrow-main-menu-m")});n(window).resize(function(){n(window).width()>=992&&(n(".menu-mobile").css("display")=="block"&&(n(".menu-mobile").css("display","none"),n(".btn-show-menu-mobile").toggleClass("is-active")),n(".sub-menu-m").each(function(){n(this).css("display")=="block"&&(console.log("hello"),n(this).css("display","none"),n(f).removeClass("turn-arrow-main-menu-m"))}))});n(".js-show-modal-search").on("click",function(){n(".modal-search-header").addClass("show-modal-search");n(this).css("opacity","0")});n(".js-hide-modal-search").on("click",function(){n(".modal-search-header").removeClass("show-modal-search");n(".js-show-modal-search").css("opacity","1")});n(".container-search-header").on("click",function(n){n.stopPropagation()});n(".isotope-grid").imagesLoaded({},function(){loadIsotope()});o=n(".filter-tope-group button");n(o).each(function(){n(this).on("click",function(){for(var t=0;t<o.length;t++)n(o[t]).removeClass("how-active1");n(this).addClass("how-active1")})});n(".js-show-filter").on("click",function(t){t.preventDefault();n(this).toggleClass("show-filter");n(".panel-filter").slideToggle(400);n(".js-show-search").hasClass("show-search")&&(n(".js-show-search").removeClass("show-search"),n(".panel-search").slideUp(400))});n(".js-show-search").on("click",function(t){t.preventDefault();n(this).toggleClass("show-search");n(".panel-search").slideToggle(400);n(".js-show-filter").hasClass("show-filter")&&(n(".js-show-filter").removeClass("show-filter"),n(".panel-filter").slideUp(400))});n(".btn-num-product-down").on("click",function(){var t=Number(n(this).next().val());t>0&&n(this).next().val(t-1)});n(".btn-num-product-up").on("click",function(){var t=Number(n(this).prev().val());n(this).prev().val(t+1)})})})(jQuery);var filterData=[],filterTree=[],currentFilter=[]