/**
 * Created by OluwadamilolaAdebayo on 9/17/16.
 */
app.controller('ReportController', ['$scope','$state', '$stateParams', function($scope, $state, $stateParams){
    $scope.month_name = 'September';
    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];
    $scope.months_cliam = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];

    $scope.setMonth = function(month){
        $scope.month_name = month;
    }

    $scope.labels = ['Week1', 'Week2', 'Week3', 'Week4'];
    $scope.series = ['Abuja Branch', 'Lagos Branch', 'Port Harcourt Branch'];
    $scope.data = [[65, 59, 80, 45], [28, 48, 40, 56], [11, 23, 40, 23]];
    $scope.colors = [{
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
    }, {
        fillColor: 'rgba(151,187,205,0.5)',
        strokeColor: 'rgba(151,187,205,0.8)',
        highlightFill: 'rgba(151,187,205,0.75)',
        highlightStroke: 'rgba(151,187,205,1)',
        pointHighlightStroke: 'rgba(151,187,205,1)'
    }];
    // Chart.js Options
    $scope.options = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1

    };

    $scope.month_name_claim = 'September';
    $scope.setMonthClaim = function(month){
        $scope.month_name_claim = month;
    }
    $scope.labels_claims = ['Week1', 'Week2', 'Week3', 'Week4'];
    $scope.series_claims = ['Abuja Branch', 'Lagos Branch', 'Port Harcourt Branch'];
    $scope.data_claims = [[65, 59, 80, 45], [28, 48, 40, 56], [11, 23, 40, 23]];
    $scope.colors_claims = [{
        fillColor: 'rgba(220,220,220,0.5)',
        strokeColor: 'rgba(220,220,220,0.8)',
        highlightFill: 'rgba(220,220,220,0.75)',
        highlightStroke: 'rgba(220,220,220,1)',
    }, {
        fillColor: 'rgba(151,187,205,0.5)',
        strokeColor: 'rgba(151,187,205,0.8)',
        highlightFill: 'rgba(151,187,205,0.75)',
        highlightStroke: 'rgba(151,187,205,1)',
        pointHighlightStroke: 'rgba(151,187,205,1)'
    }];
    // Chart.js Options
    $scope.options_claims = {

        // Sets the chart to be responsive
        responsive: true,

        //Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        //Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines: true,

        //String - Colour of the grid lines
        scaleGridLineColor: "rgba(0,0,0,.05)",

        //Number - Width of the grid lines
        scaleGridLineWidth: 1,

        //Boolean - If there is a stroke on each bar
        barShowStroke: true,

        //Number - Pixel width of the bar stroke
        barStrokeWidth: 2,

        //Number - Spacing between each of the X value sets
        barValueSpacing: 5,

        //Number - Spacing between data sets within X values
        barDatasetSpacing: 1

    };

}]);