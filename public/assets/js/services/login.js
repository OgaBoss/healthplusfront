/**
 * Created by OluwadamilolaAdebayo on 8/27/16.
 */
app.factory('LoginService',['$state','healthNotify', '$localStorage','$rootScope', function($state, healthNotify, $localStorage, $rootScope){
   return {
       loginSort: function(userData){
           if(userData.data.entity.data.name == 'admin'){
               $state.go('app.admin');
               healthNotify.set('Hey Administrator you just got logged in', 'success');
               $rootScope.currentUser = userData;
               return;
           }else if(userData.data.entity.data.name !== 'admin'){
               $state.go('partners.home');
               healthNotify.set('Hey Administrator you just got logged in', 'success');
               $rootScope.currentUser = userData;
           }
       }
   }
}]);