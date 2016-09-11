/**
 * Created by OluwadamilolaAdebayo on 9/6/16.
 */
app.controller('OrganizationController', function($scope, healthNotify){

    var vm = this;

    $scope.hoverIn = function(e){
        var elm_class = $(e.target).data('id');
        console.log(elm_class);
        angular.element(document.querySelector(".plan2")).addClass("featured");
    }

    $scope.hoverOut = function(e){
        angular.element(document.querySelector(".plan2")).removeClass("featured");
    }

    $scope.update = function(){
        healthNotify.set('Data Updated successfully', 'success');
    }
    vm.overview = 0;

    vm.activeEnrollees = true
    vm.inActiveEnrollees = true
    vm.allEnrollees = true

    vm.allBtn = true
    vm.activeBtn = false
    vm.inActiveBtn = false

    vm.setTabIndex = function(index, type, plan){
        vm.overview = index;
        if(type == 'active'){
            vm.inActiveEnrollees = false;
        }
    }

    vm.enrolleeFilter = function(type){
        if(type == 'active'){
            vm.activeBtn = true
            vm.inActiveBtn = false
            vm.allBtn = false

            vm.activeEnrollees = true
            vm.inActiveEnrollees = false
        }else if(type == 'inactive'){
            vm.activeBtn = false
            vm.inActiveBtn = true
            vm.allBtn = false

            vm.activeEnrollees = false
            vm.inActiveEnrollees = true
        }else{
            vm.activeBtn = false
            vm.inActiveBtn = false
            vm.allBtn = true

            vm.activeEnrollees = true
            vm.inActiveEnrollees = true
        }
    }
})