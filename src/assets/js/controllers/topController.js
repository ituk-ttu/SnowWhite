app.controller("topController", ["$q", "$scope", "$http", "$interval",
    function ($q, $scope, $http, $interval) {

        var UPDATE_DELAY = 10 * 1000;
        var CITY = "Tallinn,EE";

        $scope.weather = null;

        var icons = {
            "01d": "Sun",
            "01n": "Moon",
            "02d": "Cloud-Sun",
            "02n": "Cloud-Moon",
            "03d": "Cloud",
            "03n": "Cloud",
            "04d": "Cloud",
            "04n": "Cloud",
            "09d": "Cloud-Rain",
            "09n": "Cloud-Rain",
            "10d": "Cloud-Rain-Sun",
            "10n": "Cloud-Rain-Moon",
            "11d": "Cloud-Lightning",
            "11n": "Cloud-Lightning",
            "13d": "Cloud-Snow",
            "13n": "Cloud-Snow",
            "50d": "Cloud-Fog",
            "50n": "Cloud-Fog"
        };

        var tick = function () {
            $scope.clock = Date.now();
        };
        tick();
        $interval(tick, 1000);

        var updateWeather = function () {
            $http.get("http://api.openweathermap.org/data/2.5/weather",
                {
                    params: {
                        q: CITY,
                        appid: OPEN_WEATHER_MAP_API_KEY,
                        units: "metric"
                    }
                }
            ).then(function (result) {
                $scope.weather = {
                    temperature: result.data.main.temp,
                    icon: icons[result.data.weather[0].icon]
                }
            });
        };

        $interval(updateWeather, UPDATE_DELAY);
        updateWeather();
    }]);