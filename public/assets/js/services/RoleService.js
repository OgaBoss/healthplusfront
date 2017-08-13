/**
 * Created by adebayooluwadamilola on 10/15/16.
 */

app.factory('RoleService',['$http','$localStorage', function($http,$localStorage){
    return {
        checkAdminRole: checkAdminRole
    };

    function checkAdminRole(){
        var role = getRole();
        if(role == 'admin'){
            return true;
        }
    }

    function getRole(){
        return $localStorage.currentUser.data.role.data.name;
    }
}]);