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
var topics = ["Linkin Park", "Incubus", "Smashing Pumpkins", "Taking Back Sunday", "Thursday", "Deftones", "Rob Zombie", "Slipknot", "Disturbed", "Blink 182"];
//TO DO: take the topics in the array and create buttons in html
//TO DO: create a loop that appends a button for each string in the array
       function renderButtons() {   
//DONE: Empties band-view div so that the buttons don't get repeated every time you add a band button
        $("#band-view").empty();   
        for (var i = 0; i < topics.length; i++) {
          var a = $("<button>");
          // Adding a class
          a.addClass("band");
          // Adding a data-attribute with a value of the band at index i
          a.attr("data-name", topics[i]);
          // Providing the button's text with a value of the band at index i
          a.text(topics[i]);
          // Adding the button to the HTML
          $("#band-view").append(a);
        }
      }
//TO DO: when users clicks on a band button (create click function)

//TO DO: grab 10 static gif images from giphy api
//TO DO: place images on page
//TO DO: when still gif is clicked, gif should animate
//TO DO: when gif is clicked again, gif should stop playing
//TO DO: display rating under each gif
//TO DO: add a form to page
      $("#add-band").on("click", function(event) {
      	event.preventDefault();
      	var band = $("#band-input").val().trim();
//TO DO: take value from user input box, and add to your topics array
        topics.push(band);
        renderButtons();
      });
// Calling the renderButtons function at least once to display the initial list of movies
      renderButtons();
//TO DO: make a function that remakes the buttons on the page for all topics in topics array