var topics = ["Akita", "Boxer", "Boston Terrier", "Bulldog"];

var app = {

	renderButtons: function() {
		for (var i=0;i<topics.length;i++){
			$("#breedButtons").append("<button class='breed-button' id='button' data-name='" + topics[i]
      + "'>" + topics[i] + "</button>");
    	}
	},//end renderBeginButtons

	addButton: function(event){
		event.preventDefault();
      
        // This line of code will grab the input from the textbox
        var breed = $("#breed-input").val().trim();
        if (breed !== "") {

        	// The movie from the textbox is then added to our array
        	topics.push(breed);

        	// Calling renderButtons which handles the processing of our movie array
        	$("#breed-input").val('');
        	$("#breedButtons").empty();
        	app.renderButtons();
    	}//end if

	}, //end addButton

	buttonClicked: function(event) {
		//display images and ratings
		//first clear out the display
        $("#dogDisplay").empty();
        //create the query string and use ajax to send the search 
    	var selected = $(event.target).data("name"); 
    	var reformatName = app.reformatInput(selected);
    	console.log(reformatName);
      	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        reformatName + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
      $.ajax({
          url: queryURL,
          method: "GET"
        })
      	//display still images that are the results of the search and set the attributes for each image
      	// i.e., data-state will be still, the images displayed will be the still images and the animaged images
      	// url is stored in the data-animate attribute for use later
        .done(function(response) {
          var result = response.data;
          for (var i = 0; i < result.length; i++) {

            var gifDiv = $("<div class='item'>");

            var rating = result[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var breedImage = $("<img>");
            breedImage.attr("src", result[i].images.fixed_height_still.url);
            breedImage.attr("data-still", result[i].images.fixed_height_still.url);
            breedImage.attr("data-animate", result[i].images.fixed_height.url);
            breedImage.attr("data-state", "still");
            breedImage.addClass("gif");

            gifDiv.prepend(p);
            gifDiv.prepend(breedImage);

            $("#dogDisplay").prepend(gifDiv);
          }
        }); //end .done

  }, //end buttonClicked

  // So here, I created a function for the imageClick event, but $(this) becomes undefined
  //  - not sure why, so I left the code for this event in the main code section

  // imageClicked: function(event) {

  // 	var state = $(this).attr("data-state");
  // 	console.log(state);
  // 	if (state === "still"){
  //       var newSource = $(this).attr("data-animate");
  //       $(this).attr("src",newSource);
  //       $(this).attr("data-state","animate");
  //    }
  //    else if (state==="animate"){
  //       var newSource = $(this).attr("data-still");
  //       $(this).attr("src",newSource);
  //       $(this).attr("data-state","data-still");
  //    }

  // }


// reformatInput replaces all spaces in the search term with + and also adds
// dog to the search so that when you search for boxer, for example, you don't get gifs of people boxing
  reformatInput: function(searchTerm) {

  	var res = searchTerm.replace(/ /gi,"+");
  	res = res + "+dog";
  	return res;
  }


} //end object app

//begin code execution here

	
	app.renderButtons();

	$(document).on("click", "#add-breed", function(e) {
  		app.addButton(e);
	});

	$(document).on("click", "button", function(e) {
  		app.buttonClicked(e);
	});

	$(document).on("click", ".gif", function(e){

		// when image is clicked, switch from still to animate or from animate to still depending on current state

  		var state = $(this).attr("data-state");
  		console.log(state);
  	  	if (state === "still"){
        	var newSource = $(this).attr("data-animate");
        	$(this).attr("src",newSource);
        	$(this).attr("data-state","animate");
     	}
     	else if (state==="animate"){
        	var newSource = $(this).attr("data-still");
        	$(this).attr("src",newSource);
        	$(this).attr("data-state","still");
     	}
		// app.imageClicked(e);  this is the call to the function that did not retain the pointer $(this)

	});
