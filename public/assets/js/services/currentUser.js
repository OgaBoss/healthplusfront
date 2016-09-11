/**
 * Created by OluwadamilolaAdebayo on 8/21/16.
 */
app.factory('currentUser', ['$http','$auth','apiConfig', function($http, $auth, apiConfig){
    return {
        getCurrentUser: function(){
            return $http.get(apiConfig.apiBaseUrl + 'currentAuthUser/').then(handleSuccess, handleError);
        }
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res;
    }
}])