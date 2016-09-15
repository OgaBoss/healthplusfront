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

    vm.clientsDisplay = {};
    vm.clientsDisplay.enrollee = true;
    vm.clientsDisplay.organization = true;



    // Handle on click of any major filter
    vm.majorFilter = function(type){
        if(type == 'org'){
            // Show Organization
            vm.clientsDisplay.enrollee = false;
            vm.clientsDisplay.organization = true;

            // Re-Oder the Major Filters
            vm.buttonFilter.allIsDisabled = false;
            vm.buttonFilter.orgIsDisabled = true;
            vm.buttonFilter.enrIsDisabled = false

            // Re-Order the Sub Filters
            $scope.showSubFilters = true;
            vm.buttonFilter.enrEnabled = false;
            vm.buttonFilter.orgEnabled = true;


        } else if(type  == 'enr'){
            // Show Enrollee
            vm.clientsDisplay.enrollee = true;
            vm.clientsDisplay.organization = false;

            vm.buttonFilter.allIsDisabled = false;
            vm.buttonFilter.orgIsDisabled = false;
            vm.buttonFilter.enrIsDisabled = true

            // Re-Order the Sub Filters
            $scope.showSubFilters = true;
            vm.buttonFilter.enrEnabled = true;
            vm.buttonFilter.orgEnabled = false;
        } else if(type == 'all'){
            vm.buttonFilter.allIsDisabled = true;
            vm.buttonFilter.orgIsDisabled = false;
            vm.buttonFilter.enrIsDisabled = false

            $scope.showSubFilters = false;

        }
    }


    // Filter Button Data
    vm.buttonFilter.status = 'Gold'
    console.log(vm.buttonFilter.status);

}]);