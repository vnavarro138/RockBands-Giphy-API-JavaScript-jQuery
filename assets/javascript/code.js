//Pseudocode
//Create an array of strings, with 10 bands
//save the array with 10 bands as a variable called topics
//take the topics in the array and create buttons in html
//create a loop that appends a button for each string in the array
//when users clicks on a band button (create click function)
//grab 10 static gif images from giphy api
//place images on page
//when still gif is clicked, gif should animate
//when gif is clicked again, gif should stop playing
//display rating under each gif
//add a form to page
//take value from user input box, and add to your topics array
//make a function that remakes the buttons on the page for all topics in topics array
//////////////////////////////////////////////////////////////////////
//DONE: Create an array of strings, with 10 bands
//DONE: save the array with 10 bands as a variable called topics
var topics = ["Linkin Park", "Incubus", "Smashing Pumpkins", "Taking Back Sunday", "Guns n Roses", "Deftones", "Rob Zombie", "Slipknot", "Disturbed", "Blink 182"];
//public API beta key
var APIKey = "dc6zaTOxFJmzC";
//DONE: take the topics in the array and create buttons in html
//DONE: create a loop that appends a button for each string in the array
       function renderButtons() {   
//DONE: Empties band-view div so that the buttons don't get repeated every time you add a band button
        $("#band-view").empty();   
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          // Adding a class to button
          a.addClass("band");
          // Adding a data-attribute with a value of the band at index i
          a.attr("data-name", topics[i]);
          // Providing the button's text with a value of the band at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#band-view").append(a);
        }
      }


//TO DO: add a form to page
      $("#add-band").on("click", function(event) {
      	event.preventDefault();
      	var band = $("#band-input").val().trim();
//TO DO: take value from user input box, and add to your topics array
        topics.push(band);
        renderButtons();
      });
// Calling the renderButtons function at least once to display the initial list of movies
//DONE: make a function that remakes the buttons on the page for all topics in topics array
      renderButtons();

//TO DO: place giphys on page
    // Event listener for all button elements
    //event handler isnt running once render buttons is ran

    $(document).on("click", ".band", function() {
      // In this case, the "this" keyword refers to the button that was clicked
      var band = $(this).attr("data-name");

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        band + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
        	console.log(response);
        	console.log(response.data[0].rating)
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (response.data[i].rating !== "r" && response.data[i].rating !== "pg-13") {
              // Creating a div with the class "item", therefore does not need to be in html
              var gifDiv = $("<div>");

              // DONE: Storing the result item's rating
              var rating = response.data[i].rating;

              // DONE: Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag with class item
              var bandImage = $("<img class='item'>");

              // Giving the image tag an src attribute of a proprty pulled off the giphy website: https://developers.giphy.com/docs/
              // result item. setting the source = to results[i].images.original.url. 
              //the source is the master, it's what displays when the page is loaded
              //we want it to be still to start, and animate when clicked
              bandImage.attr("src", results[i].images.original_still.url);
              //set data-animate = to source
              bandImage.attr("data-animate", results[i].images.original.url);
              //from giphy developer doucmentation, we can use the console window or the website for this 
              bandImage.attr("data-still", results[i].images.original_still.url);
              bandImage.attr("data-state", "still");

              console.log(results[i].images.original.url);
              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(bandImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#bandsgifs-appear-here").prepend(gifDiv);
            }
          }
        });
    });
//TO DO: when still gif is clicked, gif with class = "item" should toggle between a still to animate
//can't use .on click for dynamically added objects (ie. the gifs came )
    //$(".item").on("click", function() {

      $('body').on('click', '.item', function() {
            // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
      //?put display info in a funtion, then 
     // $(document).on('click', '.gif', call funtion)