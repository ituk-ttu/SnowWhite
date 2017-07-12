app.controller("bottomController", ["$q", "$scope", "$http", "$interval",
    function ($q, $scope, $http, $interval) {

        var UPDATE_DELAY = 10 * 1000;

        var CARDS = [
        "busSchedule",
        "events"
        ];

        var counter = 1;
        var current = CARDS[0];
        var previous = CARDS[1];

        $scope.getClassForCard = function (cardName) {
            return current === cardName ? "current" :
                   previous === cardName ? "previous" :
                   "";
        };

        var updateCurrentCard = function () {
            previous = "";
            $scope.$$postDigest(function() {
                previous = current;
                current = CARDS[counter % CARDS.length];
                counter++;
            });
        };

        $interval(updateCurrentCard, UPDATE_DELAY);

    }]);