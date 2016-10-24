app.controller('HmoClientController', ['$scope','EnrolleeService','$uibModal','$aside','$state','$stateParams', 'OrganizationService','$rootScope','PlaceService',
    function($scope, EnrolleeService, $uibModal, $aside, $state, $stateParams, OrganizationService, $rootScope,PlaceService){
    var vm = this;
    vm.enrollees = {};
    vm.organizations = {};
    vm.switchsetting_on = 'true';
    vm.switchsetting_off = 'false';
    $rootScope.spinner = {active: true};

    $scope.$on('onRepeatLast', function(scope, element, attrs){
        //work your magic
        $rootScope.spinner = {active: false};
    });


    //Get all Enrollees
    EnrolleeService.getAllEnrollees().then(function(res){
        vm.enrollees = res.enrollees.data;
    });

    //Get all Organization
    OrganizationService.getAllOrganization().then(function(res){
        vm.organizations = res.organizations.data;
        console.log(vm.organizations);
    });

    //Redirect to Enrollee Page
    vm.showEnrollee = function(id){
        $state.go('partners.clients.enrollee', {id: id});
    };

    //Redirect to Organization Page
    vm.showOrganization = function(id){
        $state.go('partners.clients.organization', {id: id});
    };

    //Modal
    $scope.open = function (position, type) {
        $aside.open({
            templateUrl: 'assets/views/hmo/clients-partials/modals/create_enrollee.html',
            placement: 'right',
            size: '',
            backdrop: true,
            controller: 'ModalController',
            controllerAs: 'modalCtrl'
        });
    };

    //Modal
    $scope.delete = function(size) {
		var modalInstance = $uibModal.open({
			templateUrl : 'myModalContent.html',
			controller : 'ModalInstanceController',
			size : '',
		});
	};


}]);