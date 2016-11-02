app.controller('ModalController', ['$scope', 'EnrolleeService', '$uibModalInstance', '$aside', '$state', '$stateParams', 'OrganizationService', '$rootScope', 'PlaceService', '$timeout', 'PlanService', 'healthNotify',
    function ($scope, EnrolleeService, $uibModalInstance, $aside, $state, $stateParams, OrganizationService, $rootScope, PlaceService, $timeout, PlanService, healthNotify) {
        var vm = this;

        vm.enrolleeCreation = {};
        vm.organizationCreation = {};
        $scope.states = [];
        $scope.lgs = [];
        $scope.organizations = [];
        $scope.plans = [];
        vm.allPlans = [];
        $scope.fileToUpload = []
        $rootScope.spinner = { active_modal: false };
        $scope.planError = false;
        var day_range = [];

        for (var i = 1; i < 32; i++) {
            day_range.push(i);
        }
        $scope.days = day_range;

        var month_range = []
        for (var i = 1; i < 12; i++) {
            month_range.push(i);
        }
        $scope.months = month_range;

        var year = new Date().getFullYear();
        var year_range = [];
        year_range.push(year);
        for (var i = 0; i < 101; i++) {
            year_range.push(year - i);
        }
        $scope.years = year_range;


        //Get States
        PlaceService.getAllStates().then(function (res) {
            $scope.states = res.state;
        })

        //Get all Organization for this HMO
        OrganizationService.getAllOrganization().then(function (res) {
            $scope.organizations = res.organizations.data
        })

        //Get all Plans for the selected Organization
        $scope.getPlans = function () {
            var org_id = vm.enrolleeCreation.selectedOrg.organization_id;
            OrganizationService.getOrganizationPlans(org_id).then(function (res) {
                if (res.plans.data.lenght > 0) {
                    $scope.plans = res.plans.data
                } else {
                    $scope.planError = true;
                }
            })
        }

        //Get all Plans
        PlanService.getAllPlans().then(function (res) {
            vm.allPlans = res.plans.data
        })

        //Get all LGs for Enrollee
        $scope.getLgs = function () {
            var id = vm.enrolleeCreation.selectedState.id;
            PlaceService.getAllLgs(id).then(function (res) {
                $scope.lgs = res.lg;
            });
        }

        // Get all lgs for Organization
        $scope.getLgs = function () {
            var id = vm.organizationCreation.selectedState.id;
            PlaceService.getAllLgs(id).then(function (res) {
                $scope.lgs = res.lg;
            });
        }

        $scope.uploadedFile = function (element) {
            $scope.$apply(function ($scope) {
                vm.enrolleCreation.files = element.files;
            });
        }

        vm.createEnrollee = function (form) {
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
            } else {
                EnrolleeService.createEnrollee(vm.enrolleeCreation).then(function (res) {
                    if (res.enrollee) {
                        var url = '/#/partners/dashboard/clients/enrollee/' + res.enrollee.id
                        $uibModalInstance.dismiss();
                        healthNotify.set('New enrollee created, view <a href="' + url + '"> here</a>', 'success')
                    } else {
                        $uibModalInstance.dismiss();
                        healthNotify.set('Please try again something went wrong', 'error')
                    }
                });
            }
        }

        vm.createOrganization = function (form) {
            if (vm.organizationCreation.outPutPlan.length ==  0) {
                $scope.planError = true;
            } else {
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
                } else {
                    
                    OrganizationService.createOrganization(vm.organizationCreation).then(function(res){
                        if(res.organization){
                            var url = '/#/partners/dashboard/clients/organization/' + res.organization.id
                            $uibModalInstance.dismiss();
                            healthNotify.set('New organization created, view <a href="' + url + '"> here</a>', 'success')
                        }else{
                            $uibModalInstance.dismiss();
                            healthNotify.set('Please try again something went wrong', 'error')
                        }
                    })
                }
            }

        }
    }]);