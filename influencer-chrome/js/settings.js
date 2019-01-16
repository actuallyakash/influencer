(function(){
	var storage = chrome.storage;

	var blockedWebsiteTemplate = '<tr id="{{ id }}" class="row100 body">' +
                      	'<td class="column2 text-center">'+
                        '<input type="checkbox" class="checkbox" {{ checked }}>'+
                        '<td style="font-size:18px;" class="column1 text-center">{{ elem }}</td>'+
                        '<td class="column2 text-center deleteSite" style="color:#25C18C; text-decoration: none; font-size:18px;">'+
                          '&#10008;'+
                        '</td>'+
                      '</tr>';
    
    // document.getElementById('websitesList').innerHTML = blockedWebsiteTemplate;

    function refactorTemplate(template,data)
    {
    	var res = template;
    	for(var elem in data)
    	{
    		var subtitute = "{{ " + elem + " }}";
    		res = res.replace(subtitute, data[elem]);
    	}
    	return res;
    }
	
	function loadWebsites()
	{
		storage.local.get(["blockedWebsites"], function(sites)
		{
			// console.log(sites.blockedWebsites);
			if(sites.blockedWebsites !== undefined)
			{
				var websites = sites.blockedWebsites;
				var wList = document.getElementById('websitesList');
				wList.innerHTML = "";

				for(var i in websites)
				{
					var website = websites[i];
					var checked = website.on ? "checked" : "";
					var output = refactorTemplate(blockedWebsiteTemplate, {"id": "website"+i, "elem": website.url, "checked": checked});
					wList.innerHTML += output;
				}
				bindActions();
			}		    
			// console.log(sites.blockedWebsites[0].on);
		});

		storage.local.get(['dAttempts'], function(result)
		{
			if(result.dAttempts === undefined)
			{
				document.getElementById('d-num').innerHTML = 0;
			}
			else
			{
				document.getElementById('d-num').innerHTML = result.dAttempts;
			}
		});
	}

	function switchBlockedWebsite(e)
	{
		var id = this.parentElement.parentElement.id.replace("website", "");
		var checked = this.checked;

		storage.local.get("blockedWebsites", function(sites){
			if(sites.blockedWebsites !== undefined)
			{
				sites.blockedWebsites[id].on = checked;
				storage.local.set({"blockedWebsites": sites.blockedWebsites});
			}
		});
	}

	function bindActions()
	{
		//Delete - cross button
		var cross = document.getElementsByClassName('deleteSite');		
		for(var i = 0; i < cross.length; i++)
		{
			cross.item(i).addEventListener("click", deleteWebsite);
		}

		/*check box*/
		var checkboxes = document.getElementById("websitesTable").getElementsByClassName("checkbox");
		for(i=0; i<checkboxes.length; i++)
		{
			checkboxes.item(i).addEventListener("change", switchBlockedWebsite);
		}
	}

	//adding a new website in the list to block
	function blockWebsite(e)
	{
		// console.log(e.charCode);
		// console.log(e.type);
		if(e.type == "click" || e.charCode == 13)
		{
			var site = document.getElementById("addingSite");

			if(site.value.length === 0)
			{
				return;
			}

			storage.local.get("blockedWebsites", function(sites)
			{
				if(sites.blockedWebsites !== undefined)
				{
					var array = sites.blockedWebsites;				
					var flag;

					//checking for stored website
					for(var i=0; i<array.length; i++)
					{
					  if(array[i].url === site.value)
					  {
					    flag = 1;
					  }
					}

					if(flag !== 1)
					{
						array.push({"url": site.value, "on": true});

						storage.local.set({"blockedWebsites":array}, function(){
							loadWebsites();
						});

						site.value = "";
						document.getElementById('error').innerHTML = "";
					}
					else
					{
						document.getElementById('error').innerHTML = "Already Blocked!";
						window.scrollBy(0, 100);
					}
					
				}
			});
		}
		
	}

	function deleteWebsite(e)
	{
		var id = this.parentElement.id.replace("website", "");

		storage.local.get("blockedWebsites", function(sites)
		{
			if(sites.blockedWebsites !== undefined)
			{
				var websites = sites.blockedWebsites;
				websites.splice(id, 1);

				storage.local.set({"blockedWebsites" : websites}, function(){
					loadWebsites();
				})
			}
		});
	}

	loadWebsites();

	// Pressing Button
	$("input[type='button']").click(blockWebsite);
	// Pressing Return key
	document.getElementById("addingSite").addEventListener("keypress", blockWebsite);

})();