/**
 * Created by OluwadamilolaAdebayo on 9/6/16.
 */
app.controller('OrganizationController', function($scope, healthNotify, $timeout, $localStorage, OrganizationService, $stateParams, $rootScope, $state, $aside){

    var vm = this;

    vm.org = {};
    vm.orgEnrollees = {};
    vm.orgPlans = {};
    var organization_id = $stateParams.id;
    $rootScope.spinner = {active: true};

    $scope.$on('onRepeatLast', function(scope, element, attrs){
        //work your magic
        $rootScope.spinner = {active: false};
    });

    OrganizationService.getOrganization(organization_id).then(function(res){
        console.log(res)
        vm.org = res.organization.data;
    })

    OrganizationService.getOrganizationEnrollees(organization_id).then(function(res){
        vm.orgEnrollees = res.enrollees.data
    })

    vm.checkForNull = function (data) {
        if (data === null) {
            return false;
        } else {
            return true;
        }
    }

    //Get This Organizatin Plan(s)
    OrganizationService.getOrganizationPlans(organization_id).then(function(res){
        vm.orgPlans = res.plans.data;
    })

    //Redirect to Enrollee Page
    vm.showEnrollee = function (id) {
        $state.go('partners.clients.enrollee', { id: id });
    };

    //Check Plan data
    vm.planData = function (id) {
        $aside.open({
            templateUrl: 'assets/views/hmo/clients-partials/modals/plan_data.html',
            placement: 'right',
            size: 'lg',
            backdrop: true,
            controller: 'ImageUploadModal',
            controllerAs: 'uploadCtrl',
            resolve: {
                data: function () {
                    return { 'id': id};
                }
            }
        });
    };


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
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