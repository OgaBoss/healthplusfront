/**
 * Created by adebayooluwadamilola on 10/17/16.
 */
app.factory('HospitalService', ['$http', 'apiConfig', '$localStorage', function ($http, apiConfig, $localStorage) {
    return {
        getAllHospital: getAllHospital,
        getHospital: getHospital,
        deleteHospital: deleteHospital,
        updateHospital: updateHospital,
        createHospital: createHospital
    };

    function getAllHospital() {
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'hospitals'
        });
        return (request.then(handleSuccess, handleError));
    }

    function getHospital(id) {
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'hospitals/' + id
        });
        return (request.then(handleSuccess, handleError));
    }

    function deleteHospital(){
         var request = $http({
            method: "delete",
            url: apiConfig.apiBaseUrl + 'hospitals/' + id
        });
        return (request.then(handleSuccess, handleError));   
    }

    function updateHospital(){
        var request = $http({
            method: "patch",
            url: apiConfig.apiBaseUrl + 'hospitals/' + id
        });
        return (request.then(handleSuccess, handleError)); 
    }

    function createHospital(formData){
        var request = $http({
            method: "post",
            url: apiConfig.apiBaseUrl + 'hospitals'
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
