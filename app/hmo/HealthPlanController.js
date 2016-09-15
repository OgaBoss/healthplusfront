/**
 * Created by OluwadamilolaAdebayo on 9/8/16.
 */
app.controller('HealthPlanController', ['$scope','$state','$stateParams', function($scope, $state, $stateParams){
    var vm = this;

    if($stateParams.pageName){
        $scope.pageName = $stateParams.pageName
    }else{
        $scope.pageName = 'Gold';
    }

    if($stateParams.tabIndex){
        var index = parseInt($stateParams.tabIndex)
        vm.tabIndex = index
    }else{
        vm.tabIndex = 0;
    }

    vm.createPlan = function(){
        $state.go('healthPlan.plan', {id:1,tabIndex: 2});
    }

    $scope.labels = ['Mch', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept'];
    $scope.series = ['dataset'];
    $scope.data = [[65, 59, 80, 81, 56, 95, 100]];
    $scope.colors = [{
        fillColor: 'rgba(0,0,0,0)',
        strokeColor: 'rgba(0,0,0,0.2)'
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
        bezierCurve: false,
        bezierCurveTension: 0.2,
        scaleLineColor: 'transparent',
        scaleShowVerticalLines: false,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        animationEasing: "easeInOutExpo",
        tooltipTemplate: "<%= value  %><%= '%' %>",
    };
}])