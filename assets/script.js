$(".searchBtn").on("click", function getWeather () {
    const cityName = $("#cityInput").val().toUpperCase();
    const  query= "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=475f5f6bb734d8c713688458591cd41b";
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
        }

        $("#date").text(moment().format(`on MMMM Do, YYYY:`));
        $("#city").text(`The weather in ${city}`);   
        $("#icon").attr("src", iconurl);
        $("#humid").text(`Humidity: ${humidity}%`);
        $("#speed").text(`Wind Speed: ${speed}mph`);
        $("#temp").text("Temperature: " + temp + "\xB0 F");
    }
});

$(".searchBtn").on("click", function forecast() {
    const cityName = $("#cityInput").val();
    const query = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=475f5f6bb734d8c713688458591cd41b";

});