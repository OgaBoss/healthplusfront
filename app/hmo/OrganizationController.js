/**
 * Created by OluwadamilolaAdebayo on 9/6/16.
 */
app.controller('OrganizationController', function($scope, healthNotify, $timeout, $localStorage, $stateParams, $rootScope, $state, $aside,PlaceService,OrganizationService,PlanService){

    var vm = this;

    vm.org = {};
    vm.orgEdit = {}
    vm.orgEnrollees = {};
    vm.orgPlans = {};
    var organization_id = $stateParams.id;
    $rootScope.spinner = {active: true};

    var org_id = $stateParams.id;
    $scope.$on('onRepeatLast', function(scope, element, attrs){
        //work your magic
        $rootScope.spinner = {active: false};
    });



    OrganizationService.getOrganization(organization_id).then(function(res){
        vm.org = res.organization.data;
        vm.orgEdit = vm.org;

        PlaceService.getAllStates().then(function (res) {
            $scope.states = res.state;
            angular.forEach($scope.states, function (state) {
                if (state.state == vm.org.state) {
                    vm.org.selectedState = state;
                }
            });

            var id = vm.org.selectedState.id;
            PlaceService.getAllLgs(id).then(function (res) {
                $scope.lgs = res.lg;
                angular.forEach($scope.lgs, function (lg) {
                    if (lg.lga == vm.org.lg) {
                        vm.org.selectedLg = lg;
                    }
                })
            });

            //Get all the Plan



            //Get all Plans for this Org
            OrganizationService.getOrganizationPlans(org_id).then(function (res) {
                $scope.plans = res.plans.data;
                $scope.complete_plans = [];

                PlanService.getAllPlans().then(function (res) {
                    $scope.all_plans = res.plans.data;
                    angular.forEach($scope.plans, function (plan, index) {
                        angular.forEach($scope.all_plans, function(value, index){
                            if(value.name == plan.name){
                                value.ticked = true;
                            }
                        });
                    });
                });
            })
        });
    });

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
    });

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

    vm.updateOrganization = function (form){
        console.log(vm.orgEdit)
        if(vm.orgEdit.outPutPlan.length == 0){
            healthNotify.set('Plan cannot be empty !', 'error')
        }else{
            if (form.$invalid) {
                var field = null,
                    firstError = null;

                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }
                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
            }else{
                OrganizationService.updateOrganization(vm.orgEdit,org_id).then(function(res){
                    if(res.success){
                        healthNotify.set('Organization data successfully updated', 'success');
                    }else{
                        healthNotify.set('Please try again something went wrong', 'error');
                    }
                });
            }
        }
    }
})