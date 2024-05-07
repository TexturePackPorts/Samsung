
  //# sourceURL=pzn-gnb-sc-init.js
  (function initNewSearchComponents() {

    var selectorMap
    , recForYouClickTrkConfig
    , recentlyViewedClickTrkConfig
    , trendingProductsClickTrkConfig;
    
    let intvlMap = [];
    
    function createSwiper(swiperSelector, mode) {
      let swiperComp = null;
      switch (mode) {
        case "mobile" :
          swiperComp = new Swiper(swiperSelector, {
            "freeMode": true
            , "slidesPerView": "auto"
            , "spaceBetween": 8
            , "slidesOffsetBefore": 16
            , "slidesOffsetAfter": 32
          });
          break;
        case "desktop" :
          let swiperWrapper = document.querySelector(swiperSelector+' .swiper-wrapper');
          if(swiperWrapper.children.length > 5) {
            swiperComp = new Swiper(swiperSelector, {
              "width": 670
              , "navigation": {
                "nextEl": ".swiper-button-next",
                "prevEl": ".swiper-button-prev",
              }
              , "slidesPerView": 5.5
              , "slidesPerGroup": 3
              , "spaceBetween": 18
            });
          }
      }
      return swiperComp;
    }
    
    function startCheckingSwiper(swiperSelector) {
      let searchComp = null;
      function checkSwiper() {
        searchComp = document.querySelector('.gnb-search');
        let swiperContainer = document.querySelector(swiperSelector);
        if(window.Swiper && swiperContainer && searchComp) {
          let swiperComp = swiperContainer.swiper;
          const mode = window.innerWidth <= 768 ? "mobile" : "desktop";
          if(!swiperComp) {
            swiperComp = createSwiper(swiperSelector, mode);
            swiperContainer._mode = mode;
          }
          else if(swiperComp && swiperContainer._mode != mode) {
            swiperComp.destroy();
            swiperComp = null;
          }
        }
      }
      if(!intvlMap[swiperSelector]) intvlMap[swiperSelector] = window.setInterval(checkSwiper, 250);
    }
    
    function renderRecForYouCards(recForYouCardsContainer, rfyInfo) {
      
      function createRecForYouCard(config) {
        let rfyCardWrapper = document.createElement('div');
        rfyCardWrapper.className = "swiper-slide";
        
        let rfyCard = document.createElement('a');
        rfyCard.className = "rec-for-you-card";
        rfyCard.innerHTML = 
          `<div class="img-wrap">
             <img src="`+config["img_url"]+`">
           </div>
           <div class="text-wrap">
             <span class="product-name">`+config["name"]+`</span>
           </div>`;
        rfyCard._copy = config["name"];
        rfyCard._href = config["cta_url"];
        rfyCard._imgUrl = config["img_url"];
        rfyCard.setAttribute('title', config["name"]);
        rfyCard.setAttribute('data-sku', config["id"]);
        rfyCard.setAttribute('tabindex', 0);
        Object.entries(recForYouClickTrkConfig)
          .forEach(
            function setCardAttrs([attrName, attrVal]) {
              attrVal = attrVal.replace("[copy]", this._copy);
              this.setAttribute(attrName, attrVal)
            }
            , rfyCard
          );
        
        rfyCardWrapper.appendChild(rfyCard);
        return rfyCardWrapper;
      }
      
      recForYouCardsContainer.classList.add("pzn");
      recForYouCardsContainer.innerHTML =
        `<div class="rfy-title-wrapper">
          <span class="rfy-title">
            Recommended For You
          </span>
        </div>
        <div class="cards-container rec-for-you-swiper">
          <div class="cards-wrapper swiper-wrapper"></div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>`;

      let cardsWrapper = recForYouCardsContainer.querySelector('.cards-wrapper');
      rfyInfo
        .map(rfyItemInfo => createRecForYouCard(rfyItemInfo))
        .forEach(rfyCard => cardsWrapper.appendChild(rfyCard));
      
      function onRecForYouCardClick(e) {
        function getRecForYouCard(node) {
          if(node.className.indexOf("rec-for-you-card") > -1)
            return node;
          else if(node.parentElement) 
            return getRecForYouCard(node.parentElement);
          return undefined;
        }
        if(e.target.nodeType && e.target.nodeType == Node.ELEMENT_NODE) {
          let card = getRecForYouCard(e.target);
          window.location.href = card._href;
        }
      }
      
      cardsWrapper.onclick = onRecForYouCardClick;
      
      startCheckingSwiper('.rec-for-you-swiper');
      
      let searchComp = document.querySelector('.gnb-search');
      searchComp && searchComp.classList.add('pzn');
      
      recForYouCardsContainer.style.display = "";
    }

    function renderTrendingChips(trendingChipsContainer, tpInfo) {
      
      function createTrendingSearchChip(config) {
        let sChipWrapper = document.createElement('div');
        sChipWrapper.className = "swiper-slide";
        
        let sChip = document.createElement('a');
        sChip.className = "trending-chip";
        sChip.innerHTML = 
          `<div class="img-wrap">
             <img src="`+config["img_url"]+`">
           </div>
           <div class="text-wrap">
             <span class="product-name">`+config["name"]+`</span>
           </div>`;
        sChip._copy = config["name"];
        sChip._href = config["cta_url"];
        sChip._imgUrl = config["img_url"];
        sChip.setAttribute('title', config["name"]);
        sChip.setAttribute('data-sku', config["id"]);
        sChip.setAttribute('tabindex', 0);
        Object.entries(trendingProductsClickTrkConfig)
          .forEach(
            function setChipAttrs([attrName, attrVal]) {
              attrVal = attrVal.replace("[copy]", this._copy);
              this.setAttribute(attrName, attrVal)
            }
            , sChip
          );
        
        sChipWrapper.appendChild(sChip);
        return sChipWrapper;
      }
      
     
      trendingChipsContainer.classList.add("pzn");
      trendingChipsContainer.innerHTML =
        `<div class="chips-title-wrapper">
          <span class="chips-title">
            Trending Now
            <svg class="icon" focusable="false" role="presentation" aria-hidden="true" tabindex="-1">
		      <use xlink:href="#outlink-bold" href="#outlink-bold"></use>
			</svg>
          </span>
        </div>
        <div class="chips-container trending-chips-swiper">
          <div class="chips-wrapper swiper-wrapper"></div>
          <div class="swiper-pagination"></div>
          <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>
        </div>`;

      let chipsWrapper = trendingChipsContainer.querySelector('.chips-wrapper');
      tpInfo
        .map(tpItemInfo => createTrendingSearchChip(tpItemInfo))
        .forEach(searchChip => chipsWrapper.appendChild(searchChip));
      
      function onTrendingChipsClick(e) {
        function getTrendingChip(node) {
          if(node.className.indexOf("trending-chip") > -1)
            return node;
          else if(node.parentElement)
            return getTrendingChip(node.parentElement);
          return undefined;
        }
        if(e.target.nodeType && e.target.nodeType == Node.ELEMENT_NODE) {
          let chip = getTrendingChip(e.target);
          window.location.href = chip._href;
        }
      }
      
      chipsWrapper.onclick = onTrendingChipsClick;
      
      startCheckingSwiper('.trending-chips-swiper');
      
      let searchComp = document.querySelector('.gnb-search');
      searchComp && searchComp.classList.add('pzn');
      
      trendingChipsContainer.style.display = "";
    }
    
    function renderRecentlyViewedList(recVContainer, rvInfo) {
      
      function createRecViewedItem(itemInfo) {
        let rvItem = document.createElement('button');
        rvItem.className = "rec-viewed-item";
        rvItem._copy = itemInfo["name"];
        rvItem._href = itemInfo["cta_url"];
        rvItem.setAttribute('title', itemInfo["name"]);
        rvItem.setAttribute('data-sku', itemInfo["id"])
        rvItem.innerHTML = itemInfo["name"];
        Object.entries(recentlyViewedClickTrkConfig)
          .forEach(
            function setChipAttrs([attrName, attrVal]) {
              attrVal = attrVal.replace("[copy]", this._copy);
              this.setAttribute(attrName, attrVal)
            }
            , rvItem
          );
        return rvItem;
      }
      
      recVContainer.classList.add("pzn");
            
      recVContainer.innerHTML = 
        `<div class="rvi-title-wrapper">
          <span class="rvi-title">
            Recently Viewed
          </span>
        </div>
        <div class="rvi-wrapper">
        </div>`;
      
      let rviWrapper = recVContainer.querySelector('.rvi-wrapper');
      rvInfo
        .map(rvItemInfo => createRecViewedItem(rvItemInfo))
        .forEach(rvItem => rviWrapper.appendChild(rvItem));
      
      function onRVItemClick(e) {
        if(e.target.nodeType == Node.ELEMENT_NODE
           && e.target.className == "rec-viewed-item") {
          let btn = e.target;
          window.location.href = btn._href;
        }
      }
      
      rviWrapper.onclick = onRVItemClick;
      
      let searchComp = document.querySelector('.gnb-search');
      searchComp && searchComp.classList.add('pzn');
      
      recVContainer.style.display = "";
    }
    
    let to_id = null;
    function scrollerUpdate(e) {
      if(to_id) window.clearTimeout(to_id); 
      to_id = window.setTimeout( function delayedExec(e) {
        let searchComp = document.querySelector('.gnb-search');
        let srchContentsWrapper = document.querySelector('.pzn .gnb-search__contents');
        let chipsWrapper = document.querySelector('.pzn .gnb-search__chip-wrap');
        if(searchComp && searchComp.style.display != "none" && srchContentsWrapper && chipsWrapper) {
          let wrapperBounds = chipsWrapper.getBoundingClientRect();
          let wrapperCss = window.getComputedStyle(chipsWrapper);
          if(window.innerHeight < (wrapperBounds.top + wrapperBounds.height + parseInt(wrapperCss.marginTop) + parseInt(wrapperCss.marginBottom)))
            srchContentsWrapper.style.overflowY = 'scroll';
          else
            srchContentsWrapper.style.overflowY = '';
        }
        to_id = null;
      }, 250);
    }
    window.addEventListener('resize', scrollerUpdate);
    
    function renderSearchChips(containerSelector) {
      let searchChipsWrapper = document.body.querySelector(containerSelector);
      let searchChatContainer = document.body.querySelector(".search-chat-expert");
      
      if(searchChipsWrapper) {  
        let recForYouContainer = document.createElement('div');
          recForYouContainer.className = "rec-for-you-cards";
          recForYouContainer.style.display = "none";
          if(searchChatContainer)
            searchChipsWrapper.insertBefore(recForYouContainer, searchChatContainer);
          else searchChipsWrapper.appendChild(recForYouContainer);
          
        let trendingCardsContainer = document.createElement('div');
          trendingCardsContainer.className = "search-trending-chips";
          trendingCardsContainer.style.display = "none";
          if(searchChatContainer)
            searchChipsWrapper.insertBefore(trendingCardsContainer, searchChatContainer);
          else searchChipsWrapper.appendChild(trendingCardsContainer);
          
        let recentlyViewedContainer = document.createElement('div');
          recentlyViewedContainer.className = "recently-viewed-search-chips";
          recentlyViewedContainer.style.display = "none";
          if(searchChatContainer)
            searchChipsWrapper.insertBefore(recentlyViewedContainer, searchChatContainer);
          else searchChipsWrapper.appendChild(recentlyViewedContainer);
          
        if(tgtCommonStore["pzn-845"] && tgtCommonStore["pzn-845"]["rec-for-you-data"])
          renderRecForYouCards(recForYouContainer, tgtCommonStore["pzn-845"]["rec-for-you-data"]);
        else {
          document.documentElement.addEventListener("pzn-845-rec-for-you-data", function onRFYData(e) {
            const rfyd = e.detail;
            renderRecForYouCards(recForYouContainer, rfyd);
          });
        }
            
        if(tgtCommonStore["pzn-845"] && tgtCommonStore["pzn-845"]["trending-products-data"])
          renderTrendingChips(trendingCardsContainer, tgtCommonStore["pzn-845"]["trending-products-data"]);
        else {
          document.documentElement.addEventListener("pzn-845-trending-products-data", function onTPData(e) {
            const tp = e.detail;
            renderTrendingChips(trendingCardsContainer, tp);
          });
        }
            
        if(tgtCommonStore["pzn-845"] && tgtCommonStore["pzn-845"]["rec-viewed-data"])
          renderRecentlyViewedList(recentlyViewedContainer, tgtCommonStore["pzn-845"]["rec-viewed-data"]);
        else {
          document.documentElement.addEventListener("pzn-845-rec-viewed-data", function onRVPData(e) {
            const rvp = e.detail;
            renderRecentlyViewedList(recentlyViewedContainer, rvp);
          });
        }
      }
    }
    
    function initComponents() {
      var tgtCommonStore = window.tgtCommonStore;
      if (tgtCommonStore && tgtCommonStore["pzn-845"]) {
        selectorMap = tgtCommonStore["pzn-845"]["selectorMap"];
        recForYouClickTrkConfig = tgtCommonStore["pzn-845"]["recForYouClickTrkConfig"];
        trendingProductsClickTrkConfig = tgtCommonStore["pzn-845"]["trendingProductsClickTrkConfig"];
        recentlyViewedClickTrkConfig = tgtCommonStore["pzn-845"]["recentlyViewedClickTrkConfig"];
      }
      else
        console.error("PZN-845 unable to read config");
      
      if (selectorMap && recForYouClickTrkConfig && recentlyViewedClickTrkConfig && trendingProductsClickTrkConfig) {
        let searchChipsWrapper = document.querySelector(selectorMap["searchChipsWrapper"]);
        if(searchChipsWrapper) renderSearchChips(selectorMap["searchChipsWrapper"]);
        window.pznRenderSearchChips = renderSearchChips;
        //else console.error("PZN-845 unable to find search chips wrapper");
      }
      else
        console.error("PZN-845 unable to read one or more configs");
    }

    if(window.Swiper) initComponents();
    else {
      document.documentElement.addEventListener("swiper-load", function onSwiperLoad(e) {
        initComponents();
      });
    }
  })();
