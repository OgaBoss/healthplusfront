/**
 * Created by adebayooluwadamilola on 11/5/16.
 */
/**
 * Created by OluwadamilolaAdebayo on 8/23/16.
 */
app.factory('NhisService',['$http','apiConfig','$rootScope', function($http, apiConfig, $rootScope){
    return {
        getAllEnrollee: getAllEnrollee
    };



    function getAllEnrollee(){
        var request = $http({
            method: "GET",
            url: apiConfig.apiBaseUrl + 'nhis',
        });

        return( request.then( handleSuccess, handleError ) );
    }

    // private functions

    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res;
    }

}]);