/**
 * Created by adebayooluwadamilola on 12/17/16.
 */

app.factory('HospitalEnrolleeService',['$http','apiConfig', function($http, apiConfig){
    return {
        getEnrolleeCount : getEnrolleeCount
    };

    function getEnrolleeCount(id){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'hospital/' +id+ '/enrolleeCount'
        });
        return (request.then(handleSuccess, handleError));
    }

    // private functions
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res;
    }

}]);
