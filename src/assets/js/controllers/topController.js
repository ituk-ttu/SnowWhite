app.controller("topController", ["$q", "$scope", "$http", "$interval",
    function ($q, $scope, $http, $interval) {
        var tick = function() {
            $scope.clock = Date.now();
        };
        tick();
        $interval(tick, 1000);
    }]);