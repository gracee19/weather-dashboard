$(document).ready(function () {
    
    $('#search-text').hide();
    $('#search-button, #search-text').show();

    // onClick searchbutton
    var searchCity = $('#search-text');
    $("#search-button").click(function(){
        $(".search-area").append(searchCity.val());
    });


    // API for weather and append
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=adelaide&appid=44d3bab9c0874cb28adefc58849abffd";
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=adelaide&appid=44d3bab9c0874cb28adefc58849abffd";
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=-34.9333&lon=138.6&appid=44d3bab9c0874cb28adefc58849abffd"

    var cDate= $('.currentDay');
    
    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
        $("#place-name").text(response.name );
        $("#tempt").text("Temperature: " + response.main.temp + "°F");
        $("#humid").text("Humidity: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");
    });

    $.ajax({
        url: forecastURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
        $("#day-1").text(JSON.stringify(response.list));
         var forecastList = $(this).attr("list");
         console.log(forecastList);
        for(var i = 0; i < forecastList.length; i++){
            
        }
        // $("#day-2").text(response.list);
        // $("#day-3").text(response.list);
        // $("#day-4").text(response.list);
        // $("#day-4").text(response.list);
    });


    $.ajax({
        url: uvURL,
        method: "GET",
    }).then(function(response){
        console.log(response);
        $("#uv-i").text("UV Index: " + response.value);
    })
    cDate.text(moment().format("dddd, MMMM Do YYYY"));
});

