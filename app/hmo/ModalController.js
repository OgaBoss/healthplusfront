app.controller('ModalController', ['$scope','EnrolleeService','$uibModal','$aside','$state','$stateParams', 'OrganizationService','$rootScope','PlaceService', '$timeout','PlanService',
    function($scope, EnrolleeService, $uibModal, $aside, $state, $stateParams, OrganizationService, $rootScope, PlaceService, $timeout,PlanService){
    var vm = this;

    vm.enrolleCreation = {};
    $scope.states = [];
    $scope.lgs = [];
    $scope.organizations = [];
    $scope.plans = [];
     $scope.fileToUpload = []
    $rootScope.spinner = {active_modal: false};

    //Get States
    PlaceService.getAllStates().then(function(res){
        $scope.states = res.state;
    })

    //Get all Organization for this HMO
    OrganizationService.getAllOrganization().then(function(res){
        $scope.organizations = res.organizations.data
    })

    //Get all Plans for this HMO
    PlanService.getAllPlans().then(function(res){
        console.log(res);
        $scope.plans = res.plans.data
    })

    $scope.getLgs = function(){
        var id = vm.enrolleeCreation.selectedState.id;
        PlaceService.getAllLgs(id).then(function(res){
            $scope.lgs = res.lg;
        });
    }

    $scope.uploadedFile = function(element) {
        $scope.$apply(function($scope) {
            vm.enrolleCreation.files = element.files;  
        });  
    }

    vm.createEnrollee = function(form){
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
            EnrolleeService.createEnrollee(vm.enrolleCreation, $scope.files).then(function(res){
                return res;
            });
        } 
    }
}]);