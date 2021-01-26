$(document).ready(function () {

    $('#search-text').hide();
    $('#search-button, #search-text').show();

    // onClick searchbutton
    $("#search-button").click(function (e) {
        e.preventDefault()
        var searchCity = "";
        searchCity = $("#search-text").val();

        // Query url
        var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=44d3bab9c0874cb28adefc58849abffd`;

        // appending the searched places temperature and stuffs

        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function (response) {
            // console.log(response);
            var lon = response.coord.lon;
            var lat = response.coord.lat;
            // uv index
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
                    $("#uv-i").addClass("indicator indicator-danger");
                }
                else if (response.value < 3) {
                    $("#uv-i").removeClass();
                    $("#uv-i").addClass("indicator indicator-success");
                }
                else if (response.value > 3 && response.value < 7) {
                    $("#uv-i").removeClass()
                    $("#uv-i").addClass("indicator indicator-warning");
                }
            });
            $("#place-name").text(response.name);
            $("#tempt").text("Temperature: " + response.main.temp + "°F");
            $("#humid").text("Humidity: " + response.main.humidity + "%");
            $("#windSpeed").text("Wind Speed: " + response.wind.speed + "MPH");


            // API for weather and append

            var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&appid=44d3bab9c0874cb28adefc58849abffd`;


            var cDate = $('.currentDay');



            // appending the 5day forecast
            $.ajax({
                url: forecastURL,
                method: "GET",
            }).then(function (response) {
                // console.log(response);
                $("#forecast").text(JSON.stringify(response.list));
                console.log(response.list);
                $("#forecast").empty();
                $("#dailyForecast").empty();
                for (var i = 0; i < response.list.length; i++) {
                    // console.log("1");
                    // response.list[i].dt_txt
                    if (response.list[i].dt_txt.includes("12:00")) {
                        // console.log(response.list[i].main.temp);
                        var day = $("<div>").addClass("forecast-box");
                        var p2 = $("<p>").text(response.list[i].dt_txt)
                        var p = $("<p>").text("Temperature: " + response.list[i].main.temp + "°F");
                        var p1 = $("<p>").text("Humidity: " + response.list[i].main.humidity + "%")
                        
                        day.append(p2)
                        day.append(p);
                        day.append(p1);
                        
                        $("#dailyForecast").append(day);
                        
                    }
                }


            });
            cDate.text(moment().format('L'));

            function clearSearch(){
                $("#search-text").trigger('reset');
            }
            clearSearch()
        });
        

    });







});

