//JS to display random GIF based on user search input including RobotTest
$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});

/**
 * Sends asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * at time of receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {

    // Prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Since we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    // grab user's input text from the DOM
    var searchQuery = $('#tag').val();
    //cosole.log(searchQuery);
    var testRobot = $('#notRobot').val();
    //cosole.log(testRobot);

    if (testRobot != 5) {
      $("#gif").attr("hidden", true);
      $("#notRobot").attr("style", "border: 5px solid yellow");
      $("#fail-text").text("WRONG! No GIF!");
      $("#fail-text").attr("style", "color: yellow");
      
    }
    else {
      //this will clear error messages
      $("#fail-text").text("");
      $("#notRobot").attr("style", "border: 2px solid bl");
      

      //  parameters to attach to Gif request
      var params = {
          api_key: "dc6zaTOxFJmzC",
          tag : "jackson 5 " + searchQuery
      };

      // For ajax request
      $.ajax({
          url: "http://api.giphy.com/v1/gifs/search?q=" + params.tag + "&api_key=" + params.api_key,
          success: function(response) {
              // if the response comes back successfully, the code in here will execute.
              // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us

              //console.log("Received response");
              //console.log(response);

              // TODO
              // Sets the source attribute of image to the image_url of the GIF
              // Hide the feedback message and display the image
              var randNum = Math.floor(Math.random() * 25);
              var randGif = response.data[randNum];
              //cosole.log(randNum);
              var gifURL = randGif.images.original.url;
              //console.log(gifURL);
              $('#gif').attr("src", gifURL);
              setGifLoadedStatus(true);
          },
          error: function() {
              // If something went wrong, the code in here will execute instead of the success function

              // displays user an error message
              $("#feedback").text("Sorry, could not load your GIF. Please try again!");
              setGifLoadedStatus(false);
          }
        });

        // gives the user a "Loading..." message while they wait
        $("#feedback").text("Gif Loading...");
        setGifLoadedStatus(false);
    }
}

/**
 * Will toggle the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */

function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}