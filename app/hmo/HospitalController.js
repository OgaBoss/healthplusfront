/**
 * Created by OluwadamilolaAdebayo on 9/9/16.
 */
app.controller('HospitalController', ['$scope','HospitalService','$state','$stateParams','PlaceService', 'healthNotify','HospitalEnrolleeService', function($scope,HospitalService,$state,$stateParams,PlaceService,healthNotify,HospitalEnrolleeService){
    var vm = this
    var hospital_id = $stateParams.id;
    vm.hospitalClaims = {};
    vm.hospital = {};
    vm.editHospital = {};

    HospitalService.getHospital($stateParams.id).then(function(res){
        vm.hospital = res.hospital.data;
        console.log(vm.hospital);

        //Get States
        PlaceService.getAllStates().then(function (res) {
            $scope.states = res.state;
            angular.forEach($scope.states, function (state) {
                if (state.state == vm.hospital.state) {
                    vm.hospital.selectedState = state;
                }
            });

            var id = vm.hospital.selectedState.id;
            PlaceService.getAllLgs(id).then(function (res) {
                $scope.lgs = res.lg;
                angular.forEach($scope.lgs, function (lg) {
                    if (lg.lga == vm.hospital.lg) {
                        vm.hospital.selectedLg = lg;
                    }
                })
            });
        });
    });

    HospitalEnrolleeService.getEnrolleeCount(hospital_id).then(function(res){
        vm.enrolleeCount  = res.count
    });

    HospitalService.getHospitalClaims($stateParams.id).then(function(res){
        vm.hospitalClaims = res.claim_records.data;
        console.log(vm.hospitalClaims);
    });

    vm.showEnrolleeClaim = function(id){
        $state.go('partners.clients.enrollee', { id: id, tabIndex:2 })
    };


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
            console.log(vm.hospital);
            var obj = {
                'account_number' : vm.hospital.account,
                'bank' : vm.hospital.bank,
                'name' : vm.hospital.name,
                'phone' : vm.hospital.phone,
                'email' : vm.hospital.email,
                'street_address' : vm.hospital.street,
                'city' : vm.hospital.city,
                'lg' : vm.hospital.lg,
                'state': vm.hospital.state,
                'country' : vm.hospital.country
            };
            HospitalService.updateHospital(obj, hospital_id).then(function (res) {
                if (res.success) {
                    healthNotify.set('This hospital data was successfully updated', 'success')
                } else {
                    healthNotify.set('Please try again, something went wrong', 'error')
                }
            });
        }
    };

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

    var currentMonth = new Date();
    $scope.currentMonthClaims = $scope.months[currentMonth.getMonth()];
}]);