(function($) {

    'use strict';

    function detectBrowser()
    {
        //firefox
        var isFirefox = typeof InstallTrigger !== 'undefined';
        var isChrome = !!window.chrome && !!window.chrome.webstore;
        var linkBtn = document.getElementById('extension-button');

        if(isFirefox)
        {
            linkBtn.innerHTML = "<a target='_blank' href='https://addons.mozilla.org/en-US/firefox/addon/influencer/' id='installBtn' class='menu custom-btn btn-inf'><i class='addExt fas fa-plus'></i> Add Influencer to Firefox</a>";
        }
        else if(isChrome)
        {
            linkBtn.innerHTML = "<a target='_blank' href='https://chrome.google.com/webstore/detail/dfgpeekcneclmfdalhopgneoaedfkfbl' id='installBtn' class='chromeBtn menu custom-btn btn-inf'><i class='addExt fas fa-plus'></i> Add Influencer to Chrome</button>";
        }
        else
        {
            linkBtn.innerHTML = "<button id='installBtn' class='menu custom-btn btn-inf'>Influencer is available for <i class='availFor fab fa-chrome'> or <i class='availFor fab fa-firefox'></i></button>";
        }
    }

    function openSite() {
        $(window).on('load', function() {
            setTimeout(function(){
                $('.loader-wrapper').remove();
                $(".into").fadeIn();
              }, 100);
            });
    }

    openSite();
    detectBrowser();
    
}(jQuery));