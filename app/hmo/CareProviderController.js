/**
 * Created by OluwadamilolaAdebayo on 9/9/16.
 */
app.controller('CareProviderController', ['$scope','HospitalService','$state','$rootScope','$aside', function($scope,HospitalService,$state,$rootScope,$aside){
    var vm = this

    vm.hospitals = {};
    $rootScope.spinner = { active: true };


    HospitalService.getAllHospital().then(function(res){
        console.log(res);
        vm.hospitals = res.hospitals.data;
    })

    $scope.$on('onRepeatLast', function(scope, element, attrs){
        //work your magic
        $rootScope.spinner = {active: false};
    });

    vm.showHospital = function (id){
        $state.go('partners.care-providers.hospital', { id: id });
    }

    $scope.openCreateView = function (){
        $aside.open({
            templateUrl: 'assets/views/hmo/clients-partials/modals/create_hospital.html',
            placement: 'right',
            size: '',
            backdrop: true,
            controller: 'ModalController',
            controllerAs: 'modalCtrl',
            resolve: {
                data: function () {
                    return {};
                }
            }
        });
    }
}])