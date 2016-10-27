app.controller('ModalController', ['$scope','EnrolleeService','$uibModalInstance','$aside','$state','$stateParams', 'OrganizationService','$rootScope','PlaceService', '$timeout','PlanService','healthNotify',
    function($scope, EnrolleeService, $uibModalInstance, $aside, $state, $stateParams, OrganizationService, $rootScope, PlaceService, $timeout,PlanService,healthNotify){
    var vm = this;

    vm.enrolleeCreation = {};
    $scope.states = [];
    $scope.lgs = [];
    $scope.organizations = [];
    $scope.plans = [];
    $scope.fileToUpload = []
    $rootScope.spinner = {active_modal: false};
    var day_range = [];
    for(var i=1;i<32;i++) {
        day_range.push(i);
    }
    $scope.days = day_range;

    var month_range = []
    for(var i=1;i<12;i++) {
        month_range.push(i);
    }
    $scope.months = month_range;

    var year = new Date().getFullYear();
    var year_range = [];
    year_range.push(year);
    for(var i=0;i<101;i++) {
        year_range.push(year - i);
    }
    $scope.years = year_range;


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
            EnrolleeService.createEnrollee(vm.enrolleeCreation, $scope.files).then(function(res){
                if(res.enrollee){
                    var url = '/#/partners/dashboard/clients/enrollee/' + res.enrollee.id
                   $uibModalInstance.dismiss();
                   healthNotify.set('New enrollee created, view <a href="' + url + '"> here</a>', 'success')
                }else{
                   $uibModalInstance.dismiss();
                   healthNotify.set('Please try again something went wrong', 'error')
                }
            });
        } 
    }
}]);