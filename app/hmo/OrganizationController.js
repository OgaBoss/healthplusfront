/**
 * Created by OluwadamilolaAdebayo on 9/6/16.
 */
app.controller('OrganizationController', function($scope, healthNotify, $timeout, $localStorage){

    var vm = this;

    if($localStorage.currentUser.data.role.data.name == 'claims'){
        vm.overview = 2;
    }else{
        vm.overview = 0;
    }

    $scope.update = function(){
        healthNotify.set('Data Updated successfully', 'success');
    }

    vm.activeEnrollees = true
    vm.inActiveEnrollees = true
    vm.allEnrollees = true

    vm.allBtn = true
    vm.activeBtn = false
    vm.inActiveBtn = false

    vm.setTabIndex = function(index, type, plan){
        vm.overview = index;
        if(type == 'active'){
            vm.inActiveEnrollees = false;
        }else if(type == 'inactive'){
            vm.activeEnrollees = false
        }
    }

    vm.enrolleeFilter = function(type){
        if(type == 'active'){
            vm.activeBtn = true
            vm.inActiveBtn = false
            vm.allBtn = false

            vm.activeEnrollees = true
            vm.inActiveEnrollees = false
        }else if(type == 'inactive'){
            vm.activeBtn = false
            vm.inActiveBtn = true
            vm.allBtn = false

            vm.activeEnrollees = false
            vm.inActiveEnrollees = true
        }else{
            vm.activeBtn = false
            vm.inActiveBtn = false
            vm.allBtn = true

            vm.activeEnrollees = true
            vm.inActiveEnrollees = true
        }
    }

    $timeout(function() {
        $scope.renderChartOrg= true;
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
})