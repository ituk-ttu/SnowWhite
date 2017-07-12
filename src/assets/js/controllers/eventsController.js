app.controller("eventsController", ["$q", "$scope", "$http", "$interval",
    function ($q, $scope, $http, $interval) {

        var self = this;

        var CALENDAR_ID = "sflecuo8b8t3rv7vn35rni8nfc@group.calendar.google.com";
        var UPDATE_DELAY = 3 * 1000;

        $scope.events = null;

        var updateEvents = function () {
            $http.get("https://content.googleapis.com/calendar/v3/calendars/" + CALENDAR_ID + "/events",
                      {
                          params: {
                              maxResults: 3,
                              orderBy: "startTime",
                              singleEvents: true,
                              timeMin: new Date().toISOString(),
                              key: GOOGLE_CALENDAR_API_KEY
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