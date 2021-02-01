var searchCity = "";
var searchList;
searchCityEl = $("#search-text");
// var city = $("#search-text");

$(document).ready(function () {

    if (localStorage.getItem("searchedCity") == null) {
        searchList = [];
        localStorage.setItem("searchedCity", JSON.stringify(searchList));
    } else {
        searchList = JSON.parse(localStorage.getItem("searchedCity"));
        for (var i = 0; i < searchList.length; i++) {
            
        }
    }
});
$('#search-text').hide();
$('#search-button, #search-text').show();

// onClick searchbutton
$("#search-button").click(function (e) {
    e.preventDefault()
    searchList.push(searchCityEl.val());
    localStorage.setItem("searchedCity", JSON.stringify(searchList));

    // Query url
    var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityEl.val()}&appid=44d3bab9c0874cb28adefc58849abffd`;

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {
        //  console.log(response);
        var currentIcon = $("<img>");
        currentIcon.attr("src", "https://api.openweathermap.org/img/w/" + response.weather[0].icon + ".png"
        );

        $("#icon").empty();

        //UV Inde
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        const celsius = (response.main.temp - 273).toFixed(2);
        // UV URL
        var uvURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=44d3bab9c0874cb28adefc58849abffd`;


        // appending the uv index
        $.ajax({
            url: uvURL,
            method: "GET",
        }).then(function (response) {
            // console.log(response);
            $("#uv-i").text("UV Index: " + response.value);

            if (response.value > 7) {
                $("#uv-i").removeClass();
                $("#uv-i").addClass("indicator uvResult-danger");
            }
            else if (response.value < 3) {
                $("#uv-i").removeClass();
                $("#uv-i").addClass("indicator uvResult-success");
            }
            else if (response.value > 3 && response.value < 7) {
                $("#uv-i").removeClass()
                $("#uv-i").addClass("indicator uvResult-warning");
            }
        });
        // appending the searched places temperature and stuffs
        $("#place-name").text(response.name);
        $("#icon").append(currentIcon);
        $("#tempt").text("Temperature: " + celsius + " °C");
        $("#humid").text("Humidity: " + response.main.humidity + "%");
        $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");

        // API for weather and append

        var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCityEl.val()}&appid=44d3bab9c0874cb28adefc58849abffd`;
        var cDate = $('.currentDay');

        // appending the 5day forecast
        $.ajax({
            url: forecastURL,
            method: "GET",
        }).then(function (response) {
            // console.log(response);
            $("#forecast").text(JSON.stringify(response.list));
            // console.log(response.list);
            $("#forecast").empty();
            $("#dailyForecast").empty();
            for (var i = 0; i < response.list.length; i++) {
                // console.log("1");
                // response.list[i].dt_txt
                if (response.list[i].dt_txt.includes("00:00:00")) {
                    // console.log(response.list[i]);
                    var day = $("<div>").addClass("forecast-box");
                    var p2 = $("<p>").text(response.list[i].dt_txt.slice(0, -9));
                    var wIcon = $("<img>").attr("src", "https://api.openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");
                    var cTemp = (response.list[i].main.temp - 273).toFixed(2);
                    var p = $("<p>").text("Temp: " + cTemp + " °C");
                    var p1 = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%")


                    day.append(p2);
                    day.append(wIcon);
                    day.append(p);
                    day.append(p1);

                    $("#dailyForecast").append(day);

                };
            };

        });

        cDate.text(moment().format('L'));

        function clearSearch() {
            $("#search-text").trigger('reset');
        };
        clearSearch();
    });

});



