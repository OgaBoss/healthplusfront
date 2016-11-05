'use strict';
/**
 * controllers used for the dashboard
 */

app.controller('DashBoardController', ['$scope', "$state", "$interval", "$stateParams", 'EnrolleeService', 'healthNotify', 'HospitalService', 'AilmentService','$localStorage','MedicalRecordService', function ($scope, $state, $interval, $stateParams, EnrolleeService, healthNotify, HospitalService, AilmentService, $localStorage, MedicalRecordService) {
    var vm = this;
    vm.enrollee = {};
    vm.result = {};
    $scope.ailments = {};
    $scope.show = false;
    $scope.show_result = false;

    //Get HMOs Hospital 
    HospitalService.getAllHospital().then(function (res) {
        $scope.hospitals = res.hospitals.data
    })

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
    })

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
    }


    vm.createCode = function(){
        console.log(vm.enrollee);
        //build Object to create new medical record
        var d_array = [];
        var c_array = []
        angular.forEach(vm.enrollee.outPutPlan, function(value, key){
             d_array.push(value.short_description);
             c_array.push(value.code);
        })
        var obj = {
            'hmo_id' : $localStorage.currentUser.data.hmo.data.hmo_id,
            'enrollee_id' : vm.enrollee.enrollee_id,
            'hospital_id' : vm.enrollee.selectedHospital.hospital_id,
            'disease' : d_array.join(','),
            'description' : vm.enrollee.description,
            'code': c_array.join('/')
        }

        MedicalRecordService.createMedicalRecord(obj).then(function(res){
            console.log(res);
            vm.result = res.record.data
            $scope.show_result = true;

        })
    }
}]);

