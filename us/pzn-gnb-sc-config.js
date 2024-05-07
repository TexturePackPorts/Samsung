
  //# sourceURL=pzn-gnb-sc-config.js
  (function () {

    let tgtCommonStore = window.tgtCommonStore || {};
    if (undefined == tgtCommonStore["pzn-845"])
        tgtCommonStore["pzn-845"] = {};
    
    const recForYouClickTrkConfig = {
        "an-tr": "sr02_rec_for_you input--ctabutton"
        , "an-ca": "search"
        , "an-ac": "search layer"
        , "an-la": "rec for you cards:[copy]>buy now"
        , "data-link_cat": "search rec for you"
        , "data-link_id": "search rec for you>[copy]>buy now"
        , "data-link_meta": "search rec for you: [copy]"
        , "data-link_position": "search>search layer"
        , "data-event_name": "select_search_rec_for_you_card"
    };

    tgtCommonStore["pzn-845"]["recForYouClickTrkConfig"] = recForYouClickTrkConfig;
    window.tgtCommonStore = tgtCommonStore;
    

    const trendingProductsClickTrkConfig = {
        "an-tr": "sr03_trending input--ctabutton"
        , "an-ca": "search"
        , "an-ac": "search layer"
        , "an-la": "trending cards:[copy]>buy now"
        , "data-link_cat": "search trending"
        , "data-link_id": "search trending>[copy]>buy now"
        , "data-link_meta": "search trending: [copy]"
        , "data-link_position": "search>search layer"
        , "data-event_name": "select_search_trending_card"
    };

    tgtCommonStore["pzn-845"]["trendingProductsClickTrkConfig"] = trendingProductsClickTrkConfig;
    window.tgtCommonStore = tgtCommonStore;
    
    const recentlyViewedClickTrkConfig = {
        "an-tr": "sr04_rv input--ctabutton"
        , "an-ca": "search"
        , "an-ac": "search layer"
        , "an-la": "rv cards:[copy]>buy now"
        , "data-link_cat": "search rv"
        , "data-link_id": "search rv>[copy]>buy now"
        , "data-link_meta": "search rv: [copy]"
        , "data-link_position": "search>search layer"
        , "data-event_name": "select_search_rv_card"
    };

    tgtCommonStore["pzn-845"]["recentlyViewedClickTrkConfig"] = recentlyViewedClickTrkConfig;
    window.tgtCommonStore = tgtCommonStore;
    
    
    const selectorMap = {
        "searchComponent": '.gnb-search'
        , "searchChipsWrapper": '.gnb-search__chip-wrap'
        , "expertChatContainer": '.search-chat-expert'
    };

    tgtCommonStore["pzn-845"]["selectorMap"] = selectorMap;
    window.tgtCommonStore = tgtCommonStore;
  })();
