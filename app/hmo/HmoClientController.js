app.controller('HmoClientController', ['$scope', function($scope){
    // Handle Filter Buttons here
    var vm = this;

    // On page load only major filters will be on
    vm.buttonFilter = {};
    $scope.showSubFilters = false;
    vm.buttonFilter.allIsDisabled = true;
    vm.buttonFilter.orgIsDisabled = false;
    vm.buttonFilter.enrIsDisabled = false;
    vm.buttonFilter.enrEnabled = false
    vm.buttonFilter.orgEnabled = false
    // Handle on click of any major filter
    vm.majorFilter = function(type){
        if(type == 'org'){
            // Re-Oder the Major Filters
            vm.buttonFilter.allIsDisabled = false;
            vm.buttonFilter.orgIsDisabled = true;
            vm.buttonFilter.enrIsDisabled = false

            // Re-Order the Sub Filters
            $scope.showSubFilters = true;
            vm.buttonFilter.enrEnabled = true;


        } else if(type  == 'enr'){
            vm.buttonFilter.allIsDisabled = false;
            vm.buttonFilter.orgIsDisabled = false;
            vm.buttonFilter.enrIsDisabled = true
        } else if(type == 'all'){
            vm.buttonFilter.allIsDisabled = true;
            vm.buttonFilter.orgIsDisabled = false;
            vm.buttonFilter.enrIsDisabled = false
        }
    }


    // Filter Button Data
    vm.buttonFilter.status = 'Gold'
    console.log(vm.buttonFilter.status);

}]);