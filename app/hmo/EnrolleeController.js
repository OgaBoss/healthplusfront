/**
 * Created by OluwadamilolaAdebayo on 9/6/16.
 */
app.controller('EnrolleeController', 
function ($scope, $timeout, $state, $stateParams, 
            $uibModal, $aside, $localStorage, EnrolleeService, 
            $rootScope, healthNotify, PlaceService, OrganizationService, 
            PlanService, EnrolleeRecordService,MedicalRecordService) {
    var vm = this;

    //Check for tabIndex in our URL
    if ($stateParams.tabIndex != undefined) {
        var index = parseInt($stateParams.tabIndex);
        vm.tabIndex = index;
    } else {
        if ($localStorage.currentUser.data.role.data.name == 'claims') {
            vm.tabIndex = 4;
        } else {
            vm.tabIndex = 0;
        }
    }

    vm.enrollee = {};
    vm.dependents = {};
    vm.editEnrollee = {};

    var user_id = $stateParams.id;
    vm.email = "";
    vm.image_url = "";
    $rootScope.spinner = { active: true };
    $scope.status = false;
    vm.enrollee.status = false;
    
    //Get This enrollee data
    EnrolleeService.getEnrollee(user_id).then(function (res) {
        vm.enrollee = res.enrollee.data;
        console.log(vm.enrollee);
        if (vm.enrollee.status !== $scope.status.toString()) {
            $scope.status = vm.enrollee.status
        }
        vm.email = vm.enrollee.email
        vm.image_url = vm.enrollee.image_url;
        vm.name = vm.enrollee.first_name

        //Set all the enrollee values
        vm.editEnrollee.first_name = vm.enrollee.first_name
        vm.editEnrollee.last_name = vm.enrollee.last_name
        var dob = vm.enrollee.dob.split('-');
        console.log(vm.enrollee.sex)
        vm.editEnrollee.day = parseInt(dob[2]);
        vm.editEnrollee.month = parseInt(dob[1]);
        vm.editEnrollee.year = parseInt(dob[0]);
        vm.editEnrollee.selectedSex = vm.enrollee.sex
        vm.editEnrollee.email = vm.enrollee.email
        vm.editEnrollee.phone = vm.enrollee.phone
        vm.editEnrollee.city = vm.enrollee.city
        vm.editEnrollee.address = vm.enrollee.street
        vm.editEnrollee.country = vm.enrollee.country
        vm.editEnrollee.uid = vm.enrollee.generated_id


        //Get States
        PlaceService.getAllStates().then(function (res) {
            $scope.states = res.state;
            angular.forEach($scope.states, function (state) {
                if (state.state == vm.enrollee.state) {
                    vm.editEnrollee.selectedState = state;
                }
            });

            var id = vm.editEnrollee.selectedState.id;
            PlaceService.getAllLgs(id).then(function (res) {
                $scope.lgs = res.lg;
                angular.forEach($scope.lgs, function (lg) {
                    if (lg.lga == vm.enrollee.lg) {
                        vm.editEnrollee.selectedLg = lg;
                    }
                })
            });
            //Get all Organization for this HMO
            OrganizationService.getAllOrganization().then(function (res) {
                $scope.organizations = res.organizations.data
                angular.forEach($scope.organizations, function (org) {
                    if (org.name == vm.enrollee.organization) {
                        vm.editEnrollee.selectedOrg = org;
                    }
                })
            })

            //Get all Plans for this HMO
            PlanService.getAllPlans().then(function (res) {
                $scope.plans = res.plans.data
                angular.forEach($scope.plans, function (plan) {
                    if (plan.name == vm.enrollee.plan_name) {
                        vm.editEnrollee.plan = plan;
                    }
                })
            })
        });
    });

    //Get this enrollee's dependents (if any)
    EnrolleeService.getEnrolleeDependents(user_id).then(function (res) {
        vm.dependents = res.dependents.data;
    });

    $scope.$on('dependent', function (e, arg) {
        vm.dependents = arg;
    })

    //Image Upload
    $scope.imageChange = function (position, type) {
        $aside.open({
            templateUrl: 'assets/views/hmo/clients-partials/modals/image_upload.html',
            placement: 'right',
            size: 'lg',
            backdrop: true,
            controller: 'ImageUploadModal',
            controllerAs: 'uploadCtrl',
            resolve: {
                data: function () {
                    return { 'id': user_id, 'email': vm.email, 'name': vm.name };
                }
            }
        });
    };

    vm.activateEnrollee = function () {
        if ($scope.status == false) {
            $scope.status = true
            vm.enrollee.status = true;

            var obj = { status: 1 }
            EnrolleeService.updateEnrollee(obj, user_id).then(function (res) {
                if (res.success) {
                    healthNotify.set('This enrollee has being activated', 'success')
                } else {
                    healthNotify.set('Please try again, something wetn wrong', 'error')
                }
            })
        } else {
            $scope.status = false
            vm.enrollee.status = false;
            var obj = { status: 0 }
            EnrolleeService.updateEnrollee(obj, user_id).then(function (res) {
                if (res.success) {
                    healthNotify.set('This enrollee has being deactivated', 'success')
                } else {
                    healthNotify.set('Please try again, something went wrong', 'error')
                }
            })
        }
    }

    vm.checkForNull = function (data) {
        if (data === null) {
            return false;
        } else {
            return true;
        }
    }

    $scope.$on('enrolleeImage', function (e, arg) {
        vm.image_url = arg;
    })

    //Redirect to Enrollee Page
    vm.showEnrollee = function (id) {
        $state.go('partners.clients.enrollee', { id: id });
    };

    //======================================//
    //                                      //
    //       EDIT TAB OF ENROLLEE SECTION   //
    //                                      //
    //======================================//

    $scope.states = [];
    $scope.lgs = [];
    $scope.organizations = [];
    $scope.plans = [];

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

    $scope.getLgs = function () {
        var id = vm.editEnrollee.selectedState.id;
        PlaceService.getAllLgs(id).then(function (res) {
            $scope.lgs = res.lg;
            angular.forEach($scope.lgs, function (lg) {
                if (lg.lga == vm.enrollee.lg) {
                    vm.editEnrollee.selectedLg = lg;
                }
            })
        });
    }

    vm.editAction = function (form) {
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
            healthNotify.set('Please make sure all field are filled', 'error')
        } else {
            var obj = {
                'organization_id': vm.editEnrollee.selectedOrg.organization_id,
                'plan_id': vm.editEnrollee.plan.plan_id,
                'first_name': vm.editEnrollee.first_name,
                'last_name': vm.editEnrollee.last_name,
                'phone': vm.editEnrollee.phone,
                'email': vm.editEnrollee.email,
                'lg': vm.editEnrollee.selectedLg.lga,
                'street_address': vm.editEnrollee.selectedLg.address,
                'city': vm.editEnrollee.city,
                'state': vm.editEnrollee.selectedState.state,
                'sex': vm.editEnrollee.sex,
                'dob': vm.editEnrollee.year + "-" + vm.editEnrollee.month + "-" + vm.editEnrollee.day
            }
            EnrolleeService.updateEnrollee(obj, user_id).then(function (res) {
                if (res.success) {
                    healthNotify.set('This enrollee data was successfully updated', 'success')
                } else {
                    healthNotify.set('Please try again, something went wrong', 'error')
                }
            });
        }
    }


    //======================================//
    //                                      //
    //       Create an Enrollee Depenent    //
    //                                      //
    //======================================//

    $scope.addDependent = function(id){
        $aside.open({
            templateUrl: 'assets/views/hmo/clients-partials/modals/create_dependent.html',
            placement: 'right',
            size: '',
            backdrop: true,
            controller: 'ModalController',
            controllerAs: 'modalCtrl',
            resolve: {
                data: function () {
                    return { 'id': user_id};
                }
            }
        });
    }

    //======================================//
    //                                      //
    //       Claims page Code                 //
    //                                      //
    //======================================//


    //Get Enrollee Medical Record
    vm.enrolleeRecords = {};
    $scope.months = [
        'January',
        'Feburary',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August', 
        'September',
        'October',
        'November',
        'December'
    ];
    //EnrolleeRecordService.getEnrolleeRecord(user_id).then(function(res){
    //    vm.enrolleeRecords = res.records.data
    //});

    //Get Enrollee Claims Records
    MedicalRecordService.getEnrolleeClaims(user_id).then(function(res){
       vm.enrolleeClaimsRecords = res.claims_records.data;
    });

    //Get HealthInfo
    MedicalRecordService.getEnrolleeHealth(user_id).then(function(res){
        vm.enrolleeHealthRecords = res.health_records.data;
    });


    //vm.showFullRecord = function(record_id){
    //    $aside.open({
    //        templateUrl: 'assets/views/hmo/clients-partials/modals/full_record.html',
    //        placement: 'left',
    //        size: 'lg',
    //        backdrop: true,
    //        controller: 'ClaimsModalController',
    //        controllerAs: 'claimsCtrl',
    //        resolve: {
    //            data: function () {
    //                return { 'id': record_id,'type': 'view'};
    //            }
    //        }
    //    });
    //};

    vm.editMedicalRecord = function(record_id){
        $aside.open({
            templateUrl: 'assets/views/hmo/clients-partials/modals/edit_record.html',
            placement: 'left',
            size: '',
            backdrop: true,
            controller: 'ClaimsModalController',
            controllerAs: 'claimsCtrl',
            resolve: {
                data: function () {
                    return { 'id': record_id,'enr_id': user_id};
                }
            }
        });
    }

});