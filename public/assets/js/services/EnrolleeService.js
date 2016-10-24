/**
 * Created by adebayooluwadamilola on 10/17/16.
 */
app.factory('EnrolleeService',['$http','apiConfig', function($http,apiConfig){
    return {
        getAllEnrollees: getAllEnrollees,
        getEnrollee: getEnrollee,
        getEnrolleeDependents: getEnrolleeDependents,
        createEnrollee: createEnrollee
    };

    function getAllEnrollees(){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollees'
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function getEnrollee(id){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollees/' +id
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function getEnrolleeDependents(id){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollee/getChildren/' + id
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function createEnrollee(formData){
        var request = $http({
            method: "post",
            url: apiConfig.apiBaseUrl + 'enrollees',
            params : {}
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
