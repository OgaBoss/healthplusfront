/**
 * Created by adebayooluwadamilola on 10/17/16.
 */
app.factory('EnrolleeRecordService', ['$http', 'apiConfig', '$localStorage', function ($http, apiConfig, $localStorage) {
    return {
        getEnrolleeRecord: getEnrolleeRecord,
    };

    function getEnrolleeRecord (id){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollee/' + id + '/record' 
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