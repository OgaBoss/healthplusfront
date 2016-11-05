
/**
 * Created by adebayooluwadamilola on 10/17/16.
 */
app.factory('MedicalRecordService', ['$http', 'apiConfig', '$localStorage', function ($http, apiConfig, $localStorage) {
    return {
        createMedicalRecord: createMedicalRecord,
        getMedicalRecord: getMedicalRecord
    };

    function createMedicalRecord (obj){
        var request = $http({
            method: "post",
            params : obj,
            url: apiConfig.apiBaseUrl + 'medical-records'
        });
        return (request.then(handleSuccess, handleError));
    }

    function getMedicalRecord (id){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'medical-records/' + id
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


