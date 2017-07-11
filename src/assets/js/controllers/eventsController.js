app.controller("eventsController", ["$q", "$scope", "$http", "$interval",
    function ($q, $scope, $http, $interval) {

        var self = this;

        var API_KEY = "<insert API key here>";
        var UPDATE_DELAY = 3 * 1000;
        var CALENDAR_ID = "<insert calendar ID here>";
        $scope.events = null;

        var updateEvents = function () {
            $http.get("https://content.googleapis.com/calendar/v3/calendars/" + CALENDAR_ID + "/events",
                      {
                          params: {
                              maxResults: 3,
                              orderBy: "startTime",
                              singleEvents: true,
                              timeMin: new Date().toISOString(),
                              key: API_KEY
                          }
                      }
            ).then(function(result) {
                $scope.events = result.data.items.map(function(item) {
                    return {
                        startTime: new Date(item.start.dateTime),
                        endTime: new Date(item.end.dateTime),
                        title: item.summary,
                        location: item.location
                    }
                });
            });
        };

        $interval(updateEvents, UPDATE_DELAY);
        updateEvents();

  }]);