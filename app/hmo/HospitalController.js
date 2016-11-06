/**
 * Created by OluwadamilolaAdebayo on 9/9/16.
 */
app.controller('HospitalController', ['$scope','HospitalService','$state','$stateParams', function($scope,HospitalService,$state,$stateParams){
    var vm = this

    vm.hospitalClaims = {}

    HospitalService.getHospitalClaims($stateParams.id).then(function(res){
        vm.hospitalClaims = res.claim_records.data;

        console.log(vm.hospitalClaims);

    });

    vm.showEnrolleeClaim =function(id){
        $state.go('partners.clients.enrollee', { id: id, tabIndex:2 })
    }

}]);