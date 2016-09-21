/**
 * Created by OluwadamilolaAdebayo on 9/6/16.
 */
app.controller('EnrolleeController', function($scope,$timeout,$state,$stateParams,$uibModal, $aside, $localStorage){

    var vm = this;

    if($stateParams.tabIndex != undefined){
        var index = parseInt($stateParams.tabIndex);
        vm.tabIndex = index;
    }else{
        if($localStorage.currentUser.data.role.data.name == 'claims'){
            vm.tabIndex = 4;
        }else{
            vm.tabIndex = 0;
        }
    }

    $scope.month_name = 'September';

    $scope.setMonth = function(month){
        $scope.month_name = month;
    }

    $scope.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'];

    $scope.max = 200;

    $scope.random = function() {
        var value = Math.floor((Math.random() * 100) + 1);
        var type, text;

        if (value < 25) {
            type = 'success';
            text = value + '%';
        } else if (value < 50) {
            type = 'info';
            text = value + '%';
        } else if (value < 75) {
            type = 'warning';
            text = value + '%';
        } else {
            type = 'danger';
            text = value + '%';
        }

        $scope.showWarning = (type === 'danger' || type === 'warning');

        $scope.dynamic = value;
        $scope.type = type;
        $scope.text = text;
    };
    $scope.random();

    $timeout(function() {
        $scope.renderChart= true;
        console.log('Rendering chart')
    }, 1000);

    $scope.labels = ['Hospital', 'Pharmacy'];
    $scope.data = [200, 150];

    $scope.colors = ['#F7464A', '#46BFBD'];
    // Chart.js Options - complete list at http://www.chartjs.org/docs/
    $scope.options = {
        responsive: true,
        maintainAspectRatio: false,
        tooltipFontSize: 11,
        tooltipFontFamily: "'Helvetica', 'Arial', sans-serif",
        tooltipCornerRadius: 0,
        tooltipCaretSize: 2,
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 2,
        percentageInnerCutout: 50,
        animationSteps: 100,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false
    };

    $scope.dates = {
        startDate: moment('2013-09-20'),
        endDate: moment('2013-09-25')
    };
    $scope.dates2 = {
        startDate: moment().subtract(1, 'day').format('MM/DD/YYYY'),
        endDate: moment().subtract(1, 'day').format('MM/DD/YYYY')
    };
    $scope.ranges = {
        'Today': [moment(), moment()],
        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 days': [moment().subtract(7, 'days'), moment()],
        'Last 30 days': [moment().subtract(30, 'days'), moment()],
        'This month': [moment().startOf('month'), moment().endOf('month')]
    };

    // Modals
    $scope.pending = true;
    $scope.approved = false;
    $scope.not_approved = false
    $scope.openAside = function (position, type) {
        console.log(type)
        $aside.open({
            templateUrl: 'asideContent.html',
            placement: position,
            size: 'sm',
            backdrop: true,
            controller: function ($scope, $uibModalInstance) {
                if(type == 'pending'){
                    $scope.pending = true;
                    $scope.approved = false;
                    $scope.not_approved = false
                }else if(type == 'approved'){
                    $scope.pending = false;
                    $scope.approved = true;
                    $scope.not_approved = false
                }else if(type == 'not_approved'){
                    $scope.pending = false;
                    $scope.approved = false;
                    $scope.not_approved = true
                }
                $scope.ok = function (e) {
                    $uibModalInstance.close();
                    e.stopPropagation();
                };
                $scope.cancel = function (e) {
                    $uibModalInstance.dismiss();
                    e.stopPropagation();
                };
            }
        });
    };
});