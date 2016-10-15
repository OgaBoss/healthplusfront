/**
 * Created by OluwadamilolaAdebayo on 8/18/16.
 */

app.controller('LoginController',
    function LoginController($scope, $location, $auth, $state, healthNotify, $localStorage, currentUser, $rootScope, LoginService) {
        //Set Env
        var vm = this;
        vm.user = {};
        $scope.loading = false;
        $scope.currentUser = {};

        vm.submit = function(){
            if(vm.user.email == undefined || vm.user.password == undefined){
                var msg = 'Please make sure that both inputs are filled out, Thanks.'
                healthNotify.set(msg, 'warn');
                return false;
            }
            $auth.login({
                email: vm.user.email,
                password: vm.user.password
            }).then(function() {
                $scope.loading = true;
                currentUser.getCurrentUser().then(function(response){
                    $localStorage.currentUser = response.user_data;
                    LoginService.loginSort(response.user_data);
                });

                // If login is successful, redirect to the users state
            }).catch(function(response){
                var msg = response.data.error;
                healthNotify.set(msg, 'error');
                $scope.loading = true;
            })
        }
    }
);