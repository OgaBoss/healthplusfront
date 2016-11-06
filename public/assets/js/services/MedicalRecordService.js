
/**
 * Created by adebayooluwadamilola on 10/17/16.
 */
app.factory('MedicalRecordService', ['$http', 'apiConfig', '$localStorage', function ($http, apiConfig, $localStorage) {
    return {
        getEnrolleeClaims : getEnrolleeClaims,
        getEnrolleeHealth : getEnrolleeHealth,
        getClaimswithCode : getClaimswithCode,
        getSingleHealthInfo : getSingleHealthInfo,
        updateHealthInfo : updateHealthInfo,
    };

    function getEnrolleeClaims (id){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollee/' + id + '/claims'
        });
        return (request.then(handleSuccess, handleError));
    }

    function getEnrolleeHealth (id){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollee/' + id + '/healths'
        });
        return (request.then(handleSuccess, handleError));
    }

    function getClaimswithCode (code){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'codes/' + code + '/search'
        });
        return (request.then(handleSuccess, handleError));
    }

    function getSingleHealthInfo (enr_id, health_id){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollee/' + enr_id + '/healths/' + health_id
        });
        return (request.then(handleSuccess, handleError));
    }

    function updateHealthInfo(enr_id, health_id, obj){
        var request = $http({
            method: "PATCH",
            params: obj,
            url: apiConfig.apiBaseUrl + 'enrollee/' + enr_id + '/healths/' + health_id
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


