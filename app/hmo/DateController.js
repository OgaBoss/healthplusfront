/**
 * Created by OluwadamilolaAdebayo on 9/6/16.
 */
app.controller('DateController', ['$scope', function($scope){
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();
    $scope.start = $scope.minDate;
    $scope.end = $scope.maxDate;

    $scope.clear = function() {
        $scope.dt = null;
    };
    $scope.datepickerOptions = {
        showWeeks : false,
        startingDay : 1
    };
    $scope.dateDisabledOptions = {
        dateDisabled : disabled,
        showWeeks : false,
        startingDay : 1
    };
    $scope.startOptions = {
        showWeeks : false,
        startingDay : 1,
        minDate: $scope.minDate,
        maxDate: $scope.maxDate
    };
    $scope.endOptions = {
        showWeeks : false,
        startingDay : 1,
        minDate: $scope.minDate,
        maxDate: $scope.maxDate
    };
    // Disable weekend selection
    function disabled(data) {
        var date = data.date, mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }


    $scope.toggleMin = function() {
        $scope.datepickerOptions.minDate = $scope.datepickerOptions.minDate ? null : new Date();
        $scope.dateDisabledOptions.minDate = $scope.dateDisabledOptions.minDate ? null : new Date();
    };
    $scope.maxDate = new Date(2020, 5, 22);
    $scope.minDate = new Date(1970, 12, 31);

    $scope.open = function() {
        $scope.opened = !$scope.opened;
    };


    $scope.endOpen = function() {
        $scope.endOptions.minDate = $scope.start;
        $scope.startOpened = false;
        $scope.endOpened = !$scope.endOpened;
    };
    $scope.startOpen = function() {
        $scope.startOptions.maxDate = $scope.end;
        $scope.endOpened = false;
        $scope.startOpened = !$scope.startOpened;
    };

    $scope.dateOptions = {
        formatYear : 'yy',
        startingDay : 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    $scope.hstep = 1;
    $scope.mstep = 15;
}]);