var website;
var fullDomain;
var title;

chrome.tabs.query({ 
    "active": true,
    "currentWindow": true,
    "windowType": "normal"
}, function (tabs) {

    title = tabs[0].title;
    fullDomain = tabs[0].url;
    url_domain(tabs[0].url);
});

function url_domain(data) {
  var a = document.createElement('a');
  a.href = data;
  website = a.hostname;
  return website;
}

(function(){
  var storage = chrome.storage;
  //Checking website's url for banned sites
  function checkUrl(url,sites)
  {
    var result = false;
    
    for(var i in sites){
      if(sites[i].on && url.indexOf(sites[i].url) != -1){
        result = true;
        break;
      }
    }

    return result;
  }
  
  function validateUrl(details)
  {
    var websites;

    storage.local.get(["blockedWebsites"], function(sites)
    {
      if(sites.blockedWebsites === undefined)
      {
        websites = 
        [
          {"url" : "www.pinterest.com", "on" : true},
          {"url" : "www.youtube.com", "on" : true},
          {"url" : "twitter.com", "on" : true},
          {"url" : "www.facebook.com", "on" : true},
          {"url" : "www.instagram.com", "on" : true},
        ];
        storage.local.set({"blockedWebsites" : websites});
      }
      else
      {
        websites = sites.blockedWebsites;
      }
      
      var currentSite = details.url;
      if(details.frameId === 0 && checkUrl(details.url,websites) && currentSite.indexOf('http') > -1)
      {
        var id = details.tabId;

        var oldSite = url_domain(details.url);

        chrome.tabs.update(id, {"url": "html/influencer.html?site="+oldSite});
        updateAttempts();
      }
    });
  }

  function updateAttempts()
  {
    var attempts;

    storage.local.get(['dAttempts'], function(result) {
      if(result.dAttempts == undefined)
      {
        attempts = 0;
        storage.local.set({"dAttempts" : attempts});
      }
      else
      {
        attempts = result.dAttempts;
        attempts = attempts+1;
        storage.local.set({"dAttempts": attempts});
      }
    });
  }

  chrome.webNavigation.onCommitted.addListener(validateUrl);

  chrome.runtime.setUninstallURL("https://actuallyakash.github.io/influencer/feedback");

})();
