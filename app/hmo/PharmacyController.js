/**
 * Created by OluwadamilolaAdebayo on 9/9/16.
 */
app.controller('PharmacyController', ['$scope', function($scope){
    $scope.labels_phar = ['Primary', 'Secondary', 'Tertiary'];
    $scope.data_phar = [300, 50, 100];
    $scope.color_phars = ['#F7464A', '#46BFBD', '#FDB45C'];
    // Chart.js Options
    $scope.options_phar = {

        // Sets the chart to be responsive
        responsive: false,

        //Boolean - Whether we should show a stroke on each segment
        segmentShowStroke: true,

        //String - The colour of each segment stroke
        segmentStrokeColor: '#fff',

        //Number - The width of each segment stroke
        segmentStrokeWidth: 2,

        //Number - The percentage of the chart that we cut out of the middle
        percentageInnerCutout: 50, // This is 0 for Pie charts

        //Number - Amount of animation steps
        animationSteps: 100,

        //String - Animation easing effect
        animationEasing: 'easeOutBounce',

        //Boolean - Whether we animate the rotation of the Doughnut
        animateRotate: true,

        //Boolean - Whether we animate scaling the Doughnut from the centre
        animateScale: false

    };

    $scope.dates = {
        startDate: moment('2013-09-20'),
        endDate: moment('2013-09-25')
    };
    $scope.dates2 = {
        startDate: moment().subtract(1, 'day'),
        endDate: moment().subtract(1, 'day')
    };
    $scope.ranges = {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 days': [moment().subtract(7, 'days'), moment()],
        'Last 30 days': [moment().subtract(30, 'days'), moment()],
        'This month': [moment().startOf('month'), moment().endOf('month')]
    };
}])