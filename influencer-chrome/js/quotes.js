(function(){
	var storage = chrome.storage;

    var quotesListTemplate = '<tr id="{{ id }}" class="row100 body">'+
   								'<td class="column2 text-center">'+
			                      '{{ count }}'+
			                    '</td>'+

			                    '<td class="column6 text-center">'+
			                      '{{ elem }}'+
			                    '</td>'+

			                    '<td class="column3 text-center">'+
			                    	'{{ auth }}'+
			                    '</td>'+
			                    '<td class="column2 text-center deleteQ" style="color:#25C18C; text-decoration: none; font-size:18px;">'+
			                      '&#10008;'+
			                    '</td>'+
			                  '</tr>';

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
	
	function loadQuotes(flag)
	{
		storage.local.get(["allQuotes"], function(items)
		{
			if(items.allQuotes !== undefined)
			{
				var quotes = items.allQuotes;
				var qList = document.getElementById('quotesList');
				qList.innerHTML = "";
				var counter = 0;

				for(var i in quotes)
				{
					++counter;
					var quote = quotes[i];
					var author = quote.author == undefined ? "-" : quote.author;
					var output = refactorTemplate(quotesListTemplate, {"id": "quote"+i, "count": counter, "elem": quote.quote, "auth": author});
					qList.innerHTML += output;
				}

				if(flag === true)
				{
					var listTable = document.getElementById('m-table-quotes');
					listTable.scrollTo(0, listTable.scrollHeight+100);
				}
				
				bindActions();
			}
		});
	}

	function bindActions()
	{
		//Delete - cross button
		var cross = document.getElementsByClassName('deleteQ');		
		for(var i = 0; i < cross.length; i++)
		{
			cross.item(i).addEventListener("click", deleteQuote);
		}
	}

	//adding a new quote in the list
	function addQuote(e)
	{
		if(e.type == "click" || e.charCode == 13)
		{
			var quote = document.getElementById("addingQuote");
			var author = document.getElementById("addingAuthor");

			if(quote.value.length === 0)
			{
				return;
			}

			storage.local.get("allQuotes", function(items)
			{
				if(items.allQuotes !== undefined)
				{
					var totalQuotes = items.allQuotes.length;
					if(totalQuotes === 100)
					{
						console.log(totalQuotes);
						document.getElementById('error').innerHTML = "Cannot add more than 100 quotes!";
						window.scrollBy(0, 100);
					}
					else
					{
						var array = items.allQuotes;
						if(author.value == "")
						{
							array.push({"quote": quote.value});
						}
						else
						{
							array.push({"quote": quote.value, "author": author.value});
						}

						storage.local.set({"allQuotes":array}, function(){
							loadQuotes(true);
						});

						quote.value = "";
						author.value = "";
						document.getElementById('error').innerHTML = "";
					}
				}
			});
		}
	}

	function deleteQuote(e)
	{
		var id = this.parentElement.id.replace("quote", "");

		storage.local.get("allQuotes", function(items)
		{
			if(items.allQuotes !== undefined)
			{
				var quotes = items.allQuotes;
				quotes.splice(id, 1);

				storage.local.set({"allQuotes" : quotes}, function(){
					loadQuotes();
				})
			}
		});
	}

	loadQuotes();

	// Pressing Button
	$("input[type='button']").click(addQuote);
	// Pressing Return key
	document.getElementById("addingQuote").addEventListener("keypress", addQuote);

})();