var website;
var fullDomain;
var favicon;
var title;

chrome.tabs.query({ 
    "active": true,
    "currentWindow": true,
    "windowType": "normal"
}, function (tabs) {
    favicon = tabs[0].favIconUrl;
	if(favicon === undefined || favicon === ""){
		favicon = "../images/notFound.png";
	}
    title = tabs[0].title;
    fullDomain = tabs[0].url;
    url_domain(tabs[0].url);
});

function url_domain(data) {
  var a = document.createElement('a');
  a.href = data;
  website = a.hostname;
  document.getElementById('icon').src = favicon;
  if(fullDomain.indexOf('http') > -1)
  {
    window.document.getElementById('blacklist').innerHTML = "<img src='../css/ban.svg'/> | " + website;
    window.document.getElementById('whitelist').innerHTML = "<img src='../css/check-circle.svg'/> | " + website;
  }
  else
  {
    var url = new URL(fullDomain);
    var site = url.searchParams.get("site");
    if(site === null)
    {
      window.document.getElementById('blacklist').innerHTML = "<img src='../css/ban.svg'> | ";
      window.document.getElementById('whitelist').innerHTML = "<img src='../css/check-circle.svg'/> | ";
    }
    else
    {
      window.document.getElementById('blacklist').innerHTML = "<img src='../css/ban.svg'> | " + site;
      window.document.getElementById('whitelist').innerHTML = "<img src='../css/check-circle.svg'/> | " + site;
    }     
  }

}

(function(){
  var storage = chrome.storage;
  /* Open the options tab */
  function settingsBtn()
  {
    chrome.tabs.create({"url": "settings.html"});
  }

  function addWebsite()
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

      //adding website in the array
      storage.local.get("blockedWebsites", function(sites){
        var flag;
        if(sites !== undefined)
        {
          var array = sites.blockedWebsites;
          var len = array.length;

          //checking for stored website
          for(var i=0;i<len;i++)
          {
            if(array[i].url === website)
            {
              flag = 1;
            }
          }

          //redirect if the website is blocked by user
          if(flag !== 1)
          {
            array.push({"url" : website, "on" : true});
            storage.local.set({"blockedWebsites": array}, function(){
              chrome.tabs.update({"url": "influencer.html?site="+website});
            });
            updateAttempts();
          }
        }

      });
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

  function filterWebsite()
  {
    if(fullDomain.indexOf('http') > -1)
    {
      removeWebsite(website);
    }
    else
    {
        var url = new URL(fullDomain);
        var site = url.searchParams.get("site");
        removeWebsite(site);
    }
  }

  function removeWebsite(remSite)
  {
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
        if(sites !== undefined)
        {
          var array = sites.blockedWebsites;
          var len = array.length;
          var flag = -1;

          //checking for stored website
          for(var i=0;i<len;i++)
          {
            if(array[i].url === remSite)
            {
              flag = i;
            }
          }

          //whitelisting the website
          if(flag >= 0)
          {
            array.splice(flag,1);
            storage.local.set({"blockedWebsites": array}, function(){
              chrome.tabs.update({"url": "http://"+remSite});
            });
          }
        }
      }
    });
  }

  /* Attach onclick functions */
  var storeWebsite = document.getElementById("blacklist");
  storeWebsite.addEventListener("click", addWebsite);

  var allowWebsite = document.getElementById("whitelist");
  allowWebsite.addEventListener("click", filterWebsite);

  var settings = document.getElementById("settings");
  settings.addEventListener("click", settingsBtn);  

})();