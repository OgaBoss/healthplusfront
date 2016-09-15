'use strict';
/**
 * controllers used for the dashboard
 */

app.controller('DashBoardController', ['$scope',
    function($scope) {
        $scope.labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'];
        $scope.series = ['Abuja Brn', 'Lagos Brn', 'Port Harcourt Brn'];
        $scope.data = [[65, 59, 80, 81, 56, 55, 40, 84, 64, 120, 132, 87],
            [172, 175, 193, 194, 161, 175, 153, 190, 175, 231, 234, 250],
            [89, 230, 110, 112, 89, 167, 235, 100, 111, 135, 189, 300]
        ];
        $scope.colors = [{
            fillColor: 'rgba(91,155,209,0.5)',
            strokeColor: 'rgba(91,155,209,1)'
        }, {
            fillColor: 'rgba(91,155,209,0.5)',
            strokeColor: 'rgba(91,155,209,0.6)'
        }, {
            fillColor: 'rgba(91,155,209,0.5)',
            strokeColor: 'rgba(91,155,209,0.3)'
        }];

        // Chart.js Options - complete list at http://www.chartjs.org/docs/
        $scope.options = {
            maintainAspectRatio: false,
            showScale: false,
            scaleLineWidth: 0,
            responsive: true,
            scaleFontFamily: "'Helvetica', 'Arial', sans-serif",
            scaleFontSize: 11,
            scaleFontColor: "#aaa",
            scaleShowGridLines: true,
            tooltipFontSize: 11,
            tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontFamily: "'Helvetica', 'Arial', sans-serif",
            tooltipTitleFontSize: 12,
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            scaleGridLineWidth: 1,
            bezierCurve: true,
            bezierCurveTension: 0.5,
            scaleLineColor: 'transparent',
            scaleShowVerticalLines: false,
            pointDot: false,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 2,
            datasetFill: true,
            animationEasing: "easeInOutExpo"
        };
    }
]);
