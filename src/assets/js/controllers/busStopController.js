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
            $http.get("https://transport.tallinn.ee/siri-stop-departures.php?stopid=926&time="
            ).then(function (result) {
                let today = new Date(new Date().setHours(0, 0, 0, 0));
                $scope.departures = result.data.split("\n").slice(2).map(function (schedule) {
                    return {
                        route: schedule.split(",")[1],
                        destination: schedule.split(",")[4],
                        time: moment(today).add(schedule.split(",")[2], 'seconds')
                    }
                })
                console.log($scope.departures)
            })
        };
        $interval(updateDepartures, UPDATE_DELAY);
        updateDepartures();

    }]);