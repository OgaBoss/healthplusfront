/**
 * Created by OluwadamilolaAdebayo on 9/8/16.
 */
app.controller('HealthPlanController', ['$scope','$state','$stateParams', function($scope, $state, $stateParams){
    var vm = this;

    if($stateParams.pageName){
        $scope.pageName = $stateParams.pageName
    }else{
        $scope.pageName = 'Gold';
    }

    if($stateParams.tabIndex){
        var index = parseInt($stateParams.tabIndex)
        vm.tabIndex = index
    }else{
        vm.tabIndex = 0;
    }

    vm.createPlan = function(){
        $state.go('healthPlan.plan', {id:1,tabIndex: 2});
    }
}])