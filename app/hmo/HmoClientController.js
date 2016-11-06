app.controller('HmoClientController', [
        '$scope','EnrolleeService','$uibModal','$aside','$state',
        '$stateParams', 'OrganizationService','$rootScope',
        'PlaceService','FileUploader','$localStorage',
        'healthNotify','NhisService',
    function($scope, EnrolleeService, $uibModal,
         $aside, $state, $stateParams,
         OrganizationService, $rootScope,
         PlaceService,FileUploader,$localStorage,
         healthNotify,NhisService)
    {
    var vm = this;

    //Check for tabIndex in our URL
    if ($stateParams.tabIndex != undefined) {
        vm.tabIndex = parseInt($stateParams.tabIndex);
    } else {

    }

    vm.enrollees = {};
    vm.organizations = {};
    vm.switchsetting_on = 'true';
    vm.switchsetting_off = 'false';
    vm.nhisEnrollee = {};
    $rootScope.spinner = {active: true};

    $scope.$on('onRepeatLast', function(scope, element, attrs){
        //work your magic
        $rootScope.spinner = {active: false};
    });

    $scope.getClass = function(type){
        if(type == 'new'){
            return 'success'
        }else if(type == 'old'){
            return 'info';
        }else {
            return 'danger';
        }
    }

    NhisService.getAllEnrollee().then(function(res){
        console.log(res);
        vm.nhisEnrollee = res.enrollees.data;
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
    $scope.createEnrollee = function (position, type) {
        $aside.open({
            templateUrl: 'assets/views/hmo/clients-partials/modals/create_enrollee.html',
            placement: 'right',
            size: '',
            backdrop: true,
            controller: 'ModalController',
            controllerAs: 'modalCtrl',
            resolve: {
                data: function(){
                    return {};
                }
            }
        });
    };

    $scope.createOrganization = function (position, type) {
        $aside.open({
            templateUrl: 'assets/views/hmo/clients-partials/modals/create_organization.html',
            placement: 'right',
            size: '',
            backdrop: true,
            controller: 'ModalController',
            controllerAs: 'modalCtrl',
            resolve: {
                data: function(){
                    return {};
                }
            }
        });
    };

    //Modal
    $scope.delete = function(email, id) {
		var modalInstance = $uibModal.open({
			templateUrl : 'myModalContent.html',
			controller : 'ModalInstanceController',
			size : '',
            resolve: {
                data: function(){
                    return {'email':email, 'id': id};
                }
            }
		});
	};

    vm.checkForNull = function (data) {
        if(data === null){
            return false;
        }else{
            return true;
        }
    };

    // CSV File upload
    var uploaderImages = $scope.uploaderImages = new FileUploader({
        url: 'http://projectx-api.dev/api/nhis/',
        alias: 'csv',
        formData: [{'hmo_id' : $localStorage.currentUser.data.hmo.data.hmo_id}]
    });

    // FILTERS
    uploaderImages.filters.push({
        name: 'imageFilter',
        fn: function (item/*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            if('|csv|'.indexOf(type) !== -1 ){
                return true
            }else{
                return healthNotify.set('Please update only png or jpeg files', 'error');
            }
        }
    });

    uploaderImages.onProgressItem = function(item){
        return healthNotify.set('NHIS file processing going oh, this might take a while, you will be notified when it is done', 'success');
    };

    uploaderImages.onSuccessItem =function (fileItem, response, status, headers) {
        if(status == 200){
            var url = '/#/partners/dashboard/clients/home?tabIndex=3';
            return healthNotify.set('NHIS file finished processing,  check <a href="' + url + '"> here</a>', 'success');
        }else{
            return healthNotify.set('Please try again something went wrong', 'error');
        }
    }
}]);