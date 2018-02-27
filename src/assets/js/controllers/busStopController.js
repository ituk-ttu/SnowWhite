app.controller("busStopController", ["$q", "$scope", "$http", "$interval",
    function ($q, $scope, $http, $interval) {

        var self = this;

        var UPDATE_DELAY = 15 * 60 * 1000;
        var STOP_ID = "tal_03504-1";
        var REGION_ID = "tallinn";

        $scope.departures = null;

        $scope.shouldShowDeparture = function (departure) {
            return departure.time.isAfter(moment());
        };

        $scope.underAMinuteRemaining = function (event) {
            return event.time.diff(moment(), "minutes") < 1;
        };

        var updateDepartures = function () {
            $http.get("http://api-ext.trafi.com/departures",
                      {
                          params: {
                              stop_id: STOP_ID,
                              region: REGION_ID,
                              api_key: TRAFI_API_KEY
                          }
                      }
            ).then(function(result) {
                $scope.departures = result.data.Schedules.map(function (schedule) {
                    return schedule.Departures.map(function (departure) {
                        return {
                            route: schedule.Name.split(" ")[0],
                            destination: schedule.Destination,
                            time: moment.unix(departure.TimeUtc)
                        }
                    })
                }).reduce(function(a, b) {
                    return a.concat(b);
                }).sort(function(a, b) {
                    return a.time.diff(b.time);
                });
            });
        };

        $interval(updateDepartures, UPDATE_DELAY);
        updateDepartures();

    }]);