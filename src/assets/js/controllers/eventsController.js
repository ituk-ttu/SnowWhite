app.controller("eventsController", ["$q", "$scope", "$http", "$interval",
    function ($q, $scope, $http, $interval) {

        var self = this;

        var CALENDAR_ID = "sflecuo8b8t3rv7vn35rni8nfc@group.calendar.google.com";
        var UPDATE_DELAY = 60 * 60 * 1000;

        $scope.events = null;

        $scope.isSingleDayEvent = function (event) {
            return event.startTime.isSame(event.endTime, "day");
        };

        $scope.isOngoing = function (event) {
            return moment().isAfter(event.startTime) &&
                   event.endTime.isAfter(moment());
        };

        $scope.isOver = function (event) {
            return moment().isAfter(event.endTime);
        };

        var updateEvents = function () {
            $http.get("https://content.googleapis.com/calendar/v3/calendars/" + CALENDAR_ID + "/events",
                      {
                          params: {
                              maxResults: 3,
                              orderBy: "startTime",
                              singleEvents: true,
                              timeMin: moment().format(),
                              key: GOOGLE_CALENDAR_API_KEY
                          }
                      }
            ).then(function(result) {
                $scope.events = result.data.items.map(function(item) {
                    return {
                        startTime: moment(item.start.dateTime),
                        endTime: moment(item.end.dateTime),
                        title: item.summary,
                        location: item.location
                    }
                });
            });
        };

        $interval(updateEvents, UPDATE_DELAY);
        updateEvents();

    }]);