/**
 * Created by OluwadamilolaAdebayo on 9/11/16.
 */
app.controller('StaffController', ['$scope','$state', '$stateParams', function($scope, $state, $stateParams){

    var vm = this;
    if($stateParams.tabIndex){
        var index = parseInt($stateParams.tabIndex)
        vm.tabIndex = index
    }else{
        vm.tabIndex = 0;
    }

    vm.createStaff = function(){
        $state.go('staff.info', {id:1,tabIndex: 1});
    }

}]);