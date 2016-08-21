/**
 * Created by OluwadamilolaAdebayo on 8/21/16.
 */
app.factory('currentUser', ['$http','apiConfig','$auth', function($http, apiConfig, $auth){
    var url = apiConfig.apiBaseUrl + 'currentAuthUser/?token=' + $auth.getToken();
    return {
        getCurrentUser: function(){
            return $http.get(url).then(handleSuccess, handleError('Error getting all users'))
        }
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(error) {
        return function () {
            return { success: false, message: error };
        };
    }
}])