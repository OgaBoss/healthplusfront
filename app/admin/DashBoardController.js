'use strict';
/**
 * controllers used for the dashboard
 */

app.controller('DashBoardController', ['$scope', "$state", "$interval",
    "$stateParams", 'EnrolleeService', 'healthNotify', 'HospitalService',
    'AilmentService','$localStorage','MedicalRecordService','CodeService',
    function ($scope, $state, $interval, $stateParams, EnrolleeService,
              healthNotify, HospitalService, AilmentService,
              $localStorage, MedicalRecordService,CodeService) {
    var vm = this;
    vm.enrollee = {};
    vm.result = {};
    vm.codeSearch = {};
    vm.codes = {};
    $scope.ailments = {};
    $scope.show = false;
    $scope.show_result = false;
    $scope.show_claims = false;

    //Get HMOs Hospital 
    HospitalService.getAllHospital().then(function (res) {
        $scope.hospitals = res.hospitals.data
    });

    CodeService.getReferralCode().then(function(res){
        vm.codes = res.codes.data;
    });

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

    var d = new Date();
    vm.current_month = $scope.months[d.getMonth()];

    //Get Ailment
    // $scope.getAilment = function (data) {
    //     var data_array = [];
    //     data_array.push(data.keyword);
    //     if (data.keyword.length > 3) {
    //         console.log(data_array)
    //         if (data.keyword !== data_array[data_array.indexOf(data) - 1]) {
    //             AilmentService.searchAilment(data.keyword).then(function (res) {
    //                 $scope.ailments = res.ailments.data
    //             })
    //         }
    //     }
    // }

    AilmentService.getAllAilment().then(function (res) {
        $scope.ailments = res.ailments.data
    });

    vm.searchForEnrollee = function (form) {
        console.log(vm.email)
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
            EnrolleeService.searchForEnrollee(vm.email).then(function (res) {
                if (res.enrollee) {
                    $scope.show = true;
                    vm.enrollee = res.enrollee.data;
                    vm.enrollee.name = vm.enrollee.first_name + ", " + vm.enrollee.last_name
                } else {
                    healthNotify.set('Please try again something went wrong', 'error')
                }
            });
        }
    };


    vm.createCode = function(){
        console.log(vm.enrollee);
        //build Object to create new medical record

        var obj = {
            'hmo_id' : $localStorage.currentUser.data.hmo.data.hmo_id,
            'enrollee_id' : vm.enrollee.enrollee_id,
            'hospital_id' : vm.enrollee.selectedHospital.hospital_id
        };

        CodeService.createReferralCode(obj).then(function(res){
            console.log(res);
            vm.result = res.code.data
            $scope.show_result = true;

        })
    }

    vm.getClaimsRecord =  function(form){
        console.log(vm.codeSearch)
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
            MedicalRecordService.getClaimswithCode(vm.codeSearch.referral_code).then(function(res){
                vm.claimsRecord = res.claims.data;
                $scope.show_claims = true;

            });
        }
    }
}]);

