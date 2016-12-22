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

        // The movie from the textbox is then added to our array
        topics.push(breed);

        // Calling renderButtons which handles the processing of our movie array
        $("#breed-input").val('');
        $("#breedButtons").empty();
        app.renderButtons();

	}, //end addButton

	buttonClicked: function(event) {
		//display images and ratings
   
    	var selected = $(event.target).data("name"); 
    	var reformatName = app.reformatInput(selected);
    	console.log(reformatName);
      	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        reformatName + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(queryURL);
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var result = response.data;
          console.log(result);
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

  reformatInput: function(searchTerm) {

  	var res = searchTerm.replace(/ /gi,"+");
  	res = res + "+dog";
  	return res;
  }


} //end object app

	
	app.renderButtons();

	$(document).on("click", "#add-breed", function(e) {
  		app.addButton(e);
	});

	$(document).on("click", "button", function(e) {
  		app.buttonClicked(e);
	});

	$(document).on("click", ".gif", function(e){

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
		// app.imageClicked(e);

	});
