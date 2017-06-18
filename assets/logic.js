var topics = ["Ricky Bobby", "Grandma's Boy"];



function renderButtons() {
	for (var i=0; i < topics.length; i++) {
		var topicButton = $("<button>");

		topicButton.text(topics[i]);
		topicButton.addClass("topics");
		topicButton.attr("data-name", topics[i]);
		$("#button-display").append(topicButton);
		console.log(topicButton);
	};
}

$("#add-gif").on("click", function() {
	$("#button-display").empty();

	event.preventDefault();
	var newTopic = $("#gif-input").val();
	topics.push(newTopic);
	$("#gif-input").val("");
	renderButtons();
});

function displayGifs() {
	var topic = $(this).text();
	var queryUrl = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=&api_key=dc6zaTOxFJmzC";
	
	$("#gif-display").empty();
	$.ajax({
		url: queryUrl,
		method: "GET"
	}).done(function(response) {
		for (var i=0; i<10; i++) {
			
			var stillURL = response.data[i].images.fixed_height.url;
			var movingURL = response.data[i].images.fixed_height.url;
			var gifRating = response.data[i].rating;

			var gifImage = $("<img>");
			var gifDiv = $("<div>");
			var rating = $("<p>");

			gifDiv.addClass("gif-div");

			gifImage.attr("src", stillURL);
			gifImage.attr("data-still", stillURL);
			gifImage.attr("data-animate", movingURL);
			gifImage.attr("data-state", "still");

			gifImage.attr("alt", "new image");
			gifImage.addClass("gif-image");

			rating.text(gifRating);

			gifDiv.append(gifImage);
			gifDiv.append(rating);

			$("#gif-display").append(gifDiv);
		};

			// console.log(topic);
			// console.log(queryUrl);
			// console.log(response.data[0].images.original.url);
	});
}

function animate() {
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
}

$(document).on("click", ".gif-image", animate);

$(document).on("click", ".topics", displayGifs);

renderButtons();