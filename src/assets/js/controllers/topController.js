app.controller("topController", ["$q", "$scope", "$http", "$interval",
    function ($q, $scope, $http, $interval) {

        var UPDATE_DELAY = 10 * 1000;
        var CITY = "Tallinn,EE";

        $scope.weather = null;

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
                    sky: result.data.weather[0].main
                }
            });
        };

        $interval(updateWeather, UPDATE_DELAY);
        updateWeather();
    }]);