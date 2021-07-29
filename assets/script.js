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
        const temp = data.main.temp;
        const uvIndex = 99;

        $("#date").text(moment().format(`on MMMM Do, YYYY:`));
        $("#city").text(`The weather in ${city}`);   
        $("#icon").attr("src", iconurl);
        $("#humid").text(`Humidity: ${humidity}%`);
        $("#speed").text(`Wind Speed: ${speed}mph`);
        $("#temp").text("Temperature: " + temp + "\xB0 F");
        $("#uv").text(`UV Index: ${uvIndex}`);
    }
});

$(".searchBtn").on("click", function forecast() {
    const cityName = $("#cityInput").val();
    const query = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=475f5f6bb734d8c713688458591cd41b";

});