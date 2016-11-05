/**
 * Created by OluwadamilolaAdebayo on 9/8/16.
 */
app.controller('HealthPlanController', ['$scope','$state','$stateParams','PlanService','$aside','$uibModal', function($scope, $state, $stateParams,PlanService,$aside,$uibModal){
    var vm = this;

    vm.plans = {};

    // get all hmos plans
    PlanService.getAllPlans().then(function(res){
        vm.plans = res.plans.data;
    });

    //$scope.createPlan = function(){
    //    $aside.open({
    //        templateUrl: 'assets/views/hmo/clients-partials/modals/create_plan.html',
    //        placement: 'right',
    //        size: 'lg',
    //        backdrop: true,
    //        controller: 'PlansModalController',
    //        controllerAs: 'planCtrl',
    //        resolve: {
    //            data: function () {
    //                return {};
    //            }
    //        }
    //    });
    //}

    $scope.openCreateView = function() {
        var modalInstance = $uibModal.open({
            templateUrl : 'myModalContent.html',
            controller : 'PlansModalController',
            controllerAs: 'planCtrl',
            size : 'lg',
            resolve: {
                data: function(){
                    return {'plan' : vm.plans};
                }
            }
        });
    }
}]);