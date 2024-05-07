
  //# sourceURL=pzn-search-chat-init.js
  (function() {
    if (window.innerWidth > 768) {
      function renderSearchChat(event) {
        const searchExpStyles = '<style type="text/css">.search-chat-expert {position: relative;display: flex;width: 50%;margin: auto;justify-content: center;align-items: center;margin-top: 20px;}.search-chat-expert-img {width: 128px;}.search-chat-expert-text {font-size: 14px;color: white;}.search-chat-expert-link {color: white;text-decoration: underline;text-align: left;}</style>';
        
        var shopWithExpert = '<br/><div class="search-chat-expert" ><img class="search-chat-expert-img" src="//image-us.samsung.com/us/gnb/search_chat_icon_img.png" alt="expert-chat" ><p class="search-chat-expert-text" ><a class="search-chat-expert-link" href="#" an-tr="sr01_search input--ctabutton" an-ca="search" an-ac="search layer" an-la="search chips:Shop With An Expert" data-link_cat="search" data-link_id="search chips: Shop With An Expert" data-link_meta="search chips: Shop With An Expert" data-link_position="search>search layer" data-event_name="select_search_chips">Click here </a> to start a conversation with our product experts.</p></div>';
          
        let scWrap = document.body.querySelector('.gnb-search__chip-wrap');
        if(scWrap && !document.body.querySelector('.search-chat-expert')) {
          document.head.insertAdjacentHTML('beforeend', searchExpStyles);
          scWrap.insertAdjacentHTML('beforeend', shopWithExpert);
        }
        let lnk = document.body.querySelector('.search-chat-expert-link');
        lnk.onclick = function onLnkClick(e) {
          e.preventDefault();
		  var chatUrl = 'https://www.samsung.com/us/expert-chat/?search_instant';
		  if (window.innerWidth <= 768) {
  		    window.open (chatUrl, 'newwindow');
		  } else {
		    window.open (chatUrl, 'newwindow', 'height=700, width=440, top=0, left=0, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no');
		  }
	    }
      }
      
      if(document.readyState === "loading")
	    window.addEventListener('DOMContentLoaded', renderSearchChat);
      else
        renderSearchChat();
    }
  })();
