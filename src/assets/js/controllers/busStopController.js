app.controller("busStopController", ["$q", "$scope", "$http", "$interval",
    function ($q, $scope, $http, $interval) {

        var self = this;

        var UPDATE_DELAY = 3 * 1000;
        var STOP_ID = "tal_03504-1";
        var REGION_ID = "tallinn";

        $scope.departures = null;

        var updateEvents = function () {
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
                            route: schedule.Name,
                            destination: schedule.Destination,
                            minutesRemaining: departure.MinutesRemaining,
                            timestamp: departure.TimeUtc
                        }
                    })
                }).reduce(function(a, b) {
                    return a.concat(b);
                }).sort(function(a, b) {
                    return a.timestamp - b.timestamp;
                }).slice(0, 3);
            });
        };

        $interval(updateEvents, UPDATE_DELAY);
        updateEvents();

    }]);