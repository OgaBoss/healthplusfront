/**
 * Created by OluwadamilolaAdebayo on 9/9/16.
 */
app.controller('CareProviderController', ['$scope','HospitalService', function($scope,HospitalService){
    var vm = this

    vm.hospitals = {};

    HospitalService.getAllHospital().then(function(res){
        console.log(res);
        vm.hospitals = res.hospitals.data;
    })
}])