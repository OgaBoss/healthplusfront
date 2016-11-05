/**
 * Created by adebayooluwadamilola on 11/4/16.
 */
app.controller('PlansModalController', function ($scope, $uibModal, $aside, $localStorage, FileUploader, healthNotify, $rootScope, AilmentService, PlanService,$uibModalInstance,data) {
    var vm = this;
    vm.ailments = {};
    vm.plan = {};
    //get all the ailment
    AilmentService.getAllAilment().then(function(res){
        $scope.ailments = res.ailments.data;
    });

    var ailment_name = [];
    $scope.createPlan = function(){
        angular.forEach(vm.plan.outPutPlan, function(value, key){
            ailment_name.push(value.short_description);
        });
        var obj = {
            'name' : vm.plan.name,
            'cover_limit' : vm.plan.cover,
            'premium' : vm.plan.premium,
            'hmo_id' : $localStorage.currentUser.data.hmo.data.hmo_id,
            'ailment' : ailment_name.join(',')
        };
        console.log(obj);
        PlanService.createPlan(obj).then(function(res){
            console.log(res);
            data.plan.push(res.plan.data);
            $uibModalInstance.close();
            if(res.plan.data){
                healthNotify.set('New Plan Created', 'success');
            }else if(res.error){
                healthNotify.set('Something went wrong please try again', 'error');
            }
        })

    }

});