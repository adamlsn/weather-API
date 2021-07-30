$(".searchBtn").on("click", function getWeather () {
    const cityName = $("#cityInput").val().toUpperCase();
    const query= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=475f5f6bb734d8c713688458591cd41b";
    const forecastQuery = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=475f5f6bb734d8c713688458591cd41b`

    $.getJSON(query, weatherCallback);
    function weatherCallback(data) {
        const city = data.name;
        const condition = data.weather[0].icon;
        const iconurl = "https://openweathermap.org/img/w/" + condition + ".png";
        const humidity = data.main.humidity;
        const speed = data.wind.speed;
        const temp = Math.round((data.main.temp - 273.15)*(9/5)+32);

        const lat = data.coord.lat;
        const lon = data.coord.lon;
        const uvQuery=`https://api.openweathermap.org/data/2.5/uvi?appid=475f5f6bb734d8c713688458591cd41b&lat=${lat}&lon=${lon}`

        $.getJSON(uvQuery, callUV);
        function callUV(data){
            const uvIndex = data.value;
            $("#uv").text(`UV Index: ${uvIndex}`);

            if(uvIndex >= 0 && uvIndex <=2) $(".uv").css({"background-color":"green", "color":"white"});
            else if(uvIndex > 2 && uvIndex <= 5) $(".uv").css({"background-color":"yellow", "color":"white"})
            else if (uvIndex > 5 && uvIndex <= 7) $(".uv").css({"background-color":"orange", "color":"white"})
            else if (uvIndex > 7) $(".uv").css({"background-color":"red", "color":"white"})
        }

        $("#date").text(moment().format(`on MMMM Do, YYYY:`));
        $("#city").text(`The weather in ${city}`);   
        $("#icon").attr("src", iconurl);
        $("#humid").text(`Humidity: ${humidity}%`);
        $("#speed").text(`Wind Speed: ${speed}mph`);
        $("#temp").text("Temperature: " + temp + "\xB0 F");

        let currentWeather = JSON.parse(localStorage.getItem("currentWeather")) || {};
        currentWeather = [city, condition, humidity, speed, temp]
        localStorage.setItem("currentWeather", JSON.stringify(currentWeather))

        const forecast = (forecastData) => {
            fetch(forecastQuery).then(function(data) {
                if(data.ok) {
                    data.json().then(function(data) {
                        const day1 = data.list[0];

                        $("#day1").text(moment(day1.dt_txt).format('MM.DD.YY'));
                        $("#icon1").attr("src", "https://openweathermap.org/img/w/" + day1.weather[0].icon + ".png");
                        $(".temp1").text("Temp: " + Math.round(((day1.main.temp_max-273.15)*(9/5)+32)) + "\xB0 F");
                        $(".humid1").text(`Humidity: ${day1.main.humidity}%`);
                    });
                }
            });
        };

        forecast();
    }
});

// $(".searchBtn").on("click", function forecast() {
//     const cityName = $("#cityInput").val();
//     const query = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=475f5f6bb734d8c713688458591cd41b";

// });