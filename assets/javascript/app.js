var attributesChosen = [];
  var APIKey = "166a433c57516f51dfab1f7edaed8413";
$(document).ready(function() {
    var queryURL1;

    var queryURL2;



    var cityName;
    // **** SAM Y MARIO **** //
var userName;
var categories = ['Housing', 'Cost of Living', 'Education', 'Safety', "Outdoors", "Leisure & Culture", "Taxation", 'Economy', 'Environmental Quality'];


var numberOfClicks = 0;

window.onload = function () {

   // SUBMIT BTN on click hidden:
    $('#userNameSubmit').on('click', function (event) {
        event.preventDefault();
        userName = $('#userNameInput').val().trim();
        $('#initialPrompt').hide();
        fireQuestionnaire();
    });

   // BTN OPTIONS PICK 3
    function fireQuestionnaire() {
        var question = '<h3 class="header col s12 light">Choose three attributes most important in a city to you:</h3   >';
        $('#questionDiv').html(question);
        for (var i = 0; i < categories.length; i++) {
            var categoryButton = $('<button>');
            categoryButton.addClass('attributes waves-effect waves-light btn attBtn');
            categoryButton.attr('data-category', categories[i]);
            categoryButton.text(categories[i]);
            $('#questionnaire').append(categoryButton);
        }
    }
    // GRAB 3 BTN OPTIONS store in var attributesChosen[]:
    $('#questionnaire').on('click','.attributes', function(){
       var dataName = $(this).data('category');
        console.log(dataName);
        attributesChosen.push(dataName);
        numberOfClicks++;
        console.log(numberOfClicks)
        $(this).hide();
        if (numberOfClicks === 3) {
            $('.questions').hide();
            showCity0List();
            showCity1List();
            showCity2List();
        }
        console.log(attributesChosen);
    });
};


// *****   SAM Y MARIO ****  ////

	for (var i = 0; i < cities.length; i++) {
		// console.log(cities[i].city); 
		// API url that grabs geoname API
		queryURL1 = "https://api.teleport.org/api/urban_areas/slug:" + cities[i].city + "/"	
		// console.log(queryURL1);
		
		$.ajax({
        url: queryURL1,
        method: "GET"
	    }).done(function(response) {
	        // console.log("Lets see ", response);
	        var link = response._links;
	        // grabs API url inside of queryURL1 that grabs
	        // city name and population
	        var geoID = response["_links"]["ua:identifying-city"]["href"];
			// console.log(geoID);

			$.ajax ({
				url: geoID,
			  	method: "GET"
			}).done(function(pop) {
			  	var cityPop = pop.population;  	
			  	cityName = pop.full_name;
			  	// console.log(cityName);			  	
			  	// console.log("Population: ", cityPop);
			  	showScores(response);
			})
		})

	    // API url that grabs the scores from the city
	    // 
	    queryURL2 =  "https://api.teleport.org/api/urban_areas/slug:" + cities[i].city + "/scores/";

	    $.ajax({
	    	url: queryURL2,
	    	method: "GET"
	    }).done(function(response) {
	    	// console.log("response ", response);
	    	// for (var i = 0; i < cities.length; i++) {


	    	// cities.response[i] = response;
	    	// console.log(cities[i]);

	    	showScores(response);
	    
	    })


    // 
	// end for loop
	// 
    }
    //beginning show city loop
    //console.log(cities[0][attributesChosen[0]][0])
    //console.log(cities[0][attributesChosen[0]][1])
   	
   	
   		function showCity0List(){ 
        	for(var i = 0; i < cities.length; i++){
              
 
   
            	if(cities[i][attributesChosen[0]][0] >= 4){
    var queryURL3 = "http://api.openweathermap.org/data/2.5/weather?" +
      "q="+cities[i].city+"&units=imperial&appid=" + APIKey;

    
    $.ajax({
        url: queryURL3,
        method: "GET"
      })
      
      .done(function(response) {

        console.log(queryURL3);

        console.log(response);
        console.log(response.coord.lat);
        console.log(response.coord.lon);
       /* $(".city").html("<h1>" + response.name + " Weather Details</h1>");
        $(".wind").html("Wind Speed: " + response.wind.speed);
        $(".humidity").html("Humidity: " + response.main.humidity);
        $(".temp").html("Temperature (F) " + response.main.temp);*/

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed);
        console.log("Humidity: " + response.main.humidity);
        console.log("Temperature (F): " + response.main.temp);
      
                	var citybutton = $('<button>')
                    
                	.attr("data-name", cities[i].city)
                	.text(cities[i].city)
                    .attr('data-lat', response.coord.lat)
                    citybutton.addClass('cityBtn');
                	$("#first").append(citybutton); 
                    $('#name').html(userName);
                    $('#firstAttribute').html(attributesChosen[0]);
                 	console.log(cities[i][attributesChosen[0]][1]);   
           		})
        	}   
        }            
    	}

    	function showCity1List(){ 
        	for(var i = 0; i < cities.length; i++){
        		console.log(attributesChosen[1])
            	if(cities[i][attributesChosen[1]][0] >= 4){
                	var citybutton = $('<button>')
                	.attr("data-name", cities[i].city)
                	.text(cities[i].city)
                    citybutton.addClass('cityBtn');
                	$("#second").append(citybutton); 
                    $('#name').html(userName);
                    $('#secondAttribute').html([attributesChosen[1]]);
                 	console.log(cities[i][attributesChosen[1]][1]);   
           		}
        	}               
    	}
    	function showCity2List(){ 
        	for(var i = 0; i < cities.length; i++){
            	if(cities[i][attributesChosen[2]][0] >= 4){
                	var citybutton = $('<button>')
                	.attr("data-name", cities[i].city)
                	.text(cities[i].city)
                    citybutton.addClass('cityBtn');
                	$("body").append(citybutton);
                    $("#third").append(citybutton); 
                    $('#name').html(userName);
                    $('#thirdAttribute').html([attributesChosen[2]]);
                 	console.log(cities[i][attributesChosen[2]][1]);   
           		}
        	}               
    	}

    //end of functions to showcity lists


    function showScores(response) {

    	

    	$.each(response.categories, function(key, value) {

    		var out_of_5 = value.score_out_of_10 / 2;

    		var roundScore = Math.round(out_of_5);

    		valueName = value.name;
    		// console.log("", value.name, "", ": ", roundScore);
    		

    	})

    }
	
	
})
   
	
	



