(function(){
  var storage = chrome.storage;
  var quotes;

  function quoteDB()
  {
    storage.local.get(["allQuotes"], function(items)
    {
      if(items.allQuotes === undefined)
      {
        quotes = 
        [  
           {
              "quote":"If you are not willing to risk the unusual, you will have to settle for the ordinary.",
              "author":"Jim Rohn"
           },
           {
              "quote":"Will it be easy? Nope.<br>Worth it? Absolutely."
           },
           {  
              "quote":"Integrity is doing the right thing, even when no one is watching.",
              "author":"C.S. Lewis"
           },
           {  
              "quote":"Put out more imperfect work."
           },
           {  
              "quote":"In a race between a lion and a deer, the deer will often win. Because the lion runs for food and the dear for its life.<br>The purpose is more important than need."
           },
           {  
              "quote":"Only those who attempt the absurd can achieve the impossible.",
              "author":"Albert Einstein"
           },
           {  
              "quote":"Don't wait for<br>opportunity.<br>Create it."
           },
           {  
              "quote":"Nothing can harm you as much as your own thoughts unguarded.",
              "author":"Buddha"
           },
           {  
              "quote":"Your desire to change must be greater than your desire to stay the same."
           },
           {  
              "quote":"Sacrifice useless things that have nothing to do with your goals for your goals, don't sacrifice your goals for useless things."
           },
           {  
              "quote":"I don't want to be in a relationship, I want to be in a Lamborghini."
           },
           {  
              "quote":"A bad attitude is like a flat tire, you can't get very far until you change it."
           },
           {  
              "quote":"We are only as blind as we want to be.",
              "author":"Maya Angelou"
           },
           {  
              "quote":"All I knew is that I never wanted to be average."
           },
           {  
              "quote":"You can't change what's going on around until you start changing whats going on within you."
           },
           {  
              "quote":"Once you have control over your mind, anything you want is possible."
           },
           {  
              "quote":"Some succeed because they are destined to but most succeed because they are detemined to.",
              "author":"Henry Van Dyke"
           },
           {  
              "quote":"Quit slacking and<br>make it happen."
           },
           {  
              "quote":"You will never always be motivated. You have to learn to be disciplined."
           },
           {  
              "quote":"You don't have to be great to start, but you have to start to be great.",
              "author":"Zig Ziglar"
           },
           {  
              "quote":"What I've learned about comfort zones is this, you've got to smash through them to become great."
           },
           {  
              "quote":"A man who conquers himself is greater than one who conquers a thousand men in battle."
           },
           {  
              "quote":"You wanna fly, you got to give up shit that weighs you down.",
              "author":"Toni Morrison"
           },
           {  
              "quote":"Your success depends on you, Committing and persisting to get things done. Now get to work!"
           },
           {  
              "quote":"And I quote...<br>Your worst battle is between what you know and what you feel."
           },
           {  
              "quote":"Watch what the idiots are doing, and do the opposite.",
              "author":"Robert Kiyosaki"
           },
           {  
              "quote":"Don't be afraid to start over. It's a chance to build something better this time."
           },
           {  
              "quote":"With our thoughts, we make the world.",
              "author":"Buddha"
           },
           {  
              "quote":"Self-discipline is about controlling your desires and impulses while staying focused on what needs to get done to achieve your goal.",
              "author":"Adam Sicinski"
           },
           {  
              "quote":"Really think about your goals and how much energy you are truly putting into them. Your routine is costing you."
           },
           {  
              "quote":"Every day you must unlearn the ways that hold you back. You must rid yourself of negativity, so you can learn to fly.",
              "author":"Leon Brown"
           },
           {  
              "quote":"The bad news is time flies. The good news is you're the pilot.",
              "author":"Michael Altshuler"
           },
           {  
              "quote":"The trouble is, you think you have time.",
              "author":"Buddha"
           },
           {  
              "quote":"Be like a tree and let the dead leaves drop.",
              "author":"Buddha"
           },
           {  
              "quote":"Do not learn how to react. Learn how to respond.",
              "author":"Buddha"
           },
           {  
              "quote":"Maturity is the ability to reap without apology and not complain when things don't go well.",
              "author":"Jim Rohn"
           },
           {  
              "quote":"If you want to live a happy life, tie it to a goal, not to people or objects.",
              "author":"Albert Einstein"
           },
           {  
              "quote":"It's not about having time. It's about making time."
           },
           {  
              "quote":"Shootout to those who are getting things done while you are reading this."
           },
           {  
              "quote":"Trust the timing of your life. Stay patient, stay calm, stay determined, stay focused, and most of all trust your journey."
           },
           {  
              "quote":"Risk is the price you pay for the opportunity."
           },
           {  
              "quote":"If you are not willing to sacrifice for what you want, what you want eventually becomes the sacrifice."
           },
           {  
              "quote":"We become what we think about and what we act upon. Everyone has personal doubts about themselves, but successful people take action even when success seems hopeless or impossible."
           },
           {  
              "quote":"Change the story you tell yourself, and you will change your life."
           },
           {  
              "quote":"The key to happiness is having dreams; The key to success is making them come true."
           },
           {  
              "quote":"There are two primary choices in life: To accept conditions as they exist, Or accept the responsibility for changing them."
           },
           {  
              "quote":"A problem is a chance for you to do your best."
           },
           {  
              "quote":"Today, somewhere in the world, someone is training to overtake you.<br>What are you doing?"
           },
           {  
              "quote":"It is observed that successful people get ahead in the time that other people waste."
           },
           {
              "quote":"Life has no remote. Get up and change it yourself!"
           }
        ];

        storage.local.set({"allQuotes" : quotes});
      }
      else
      {
        quotes = items.allQuotes;
      }
    });
  }


  // Colors Collection
  var colors = ["#BCE4DF", "#E0D144", "#E4A629", "#F39040", "#E66751", "#CA83A5", "#A39BCB", "#8EB7BF", "#6DC4A6", "#8AA651"];
   
  // Random number Constructor
  // Generate a random number within a provided
  // range a stores the last value, so the next value
  // doesn't macth the previous
  function Random(max) {
    var prev, next;
    this.max = max;
    this.generate = function generate() {
      while(prev === next) 
        next = Math.floor(Math.random() * this.max);
      prev = next;
      return next;
    };
  }

  

  // Main app function
  // Generates Quotes and app themes
  function newQuote(e)
  {
    storage.local.get(["allQuotes"], function(items)
    {       
        quotes = items.allQuotes;

        randomQuote = new Random(quotes.length);  // Random instance for quote
        randomColor = new Random(colors.length);  // Random instance for colors
        // Get a quote and a theme
        var quote = quotes[randomQuote.generate()];
        var color = colors[randomColor.generate()];
        
        // Cache some DOM Elements
        $page = $('.page');
        $button = $page.find('.new-quote');
        $quote = $page.find('.quote');
        $quoteFooter = $quote.find('.quote__footer');
        
        // Test if the quote has an author 
        hasAuthor = !!quote.author;
        
        // Replace the old quote with a new one
        $quote.find('.quote__body').html( quote.quote );
        
        // Change the theme  
        $page.css('background-color', color);
        $button.css('color', color);
        
        // Some quotes have author
        // others not
        if ( hasAuthor ) {
          // Put the text and
          // show the footer
          $quoteFooter
            .find('.quote__cite')
            .text( '– ' + quote.author + ' –')
            .end()
            .show();
        
        } else {
          // hide the footer
          $quoteFooter.hide();
        }
    });    
  }

  // Buttons functionality
  function registerHandlers()
  {
    $(document).on('click', '.new-quote', newQuote);
  }

  
  quoteDB();
  registerHandlers();
  newQuote();

})();