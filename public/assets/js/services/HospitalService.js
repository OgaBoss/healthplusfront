/**
 * Created by adebayooluwadamilola on 10/17/16.
 */
app.factory('HospitalService', ['$http', 'apiConfig', '$localStorage', function ($http, apiConfig, $localStorage) {
    return {
        getAllHospital: getAllHospital,
        getHospital: getHospital,
        deleteHospital: deleteHospital,
        updateHospital: updateHospital,
        createHospital: createHospital,
        getHospitalClaims : getHospitalClaims
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

    function deleteHospital(id){
         var request = $http({
            method: "delete",
            url: apiConfig.apiBaseUrl + 'hospitals/' + id
        });
        return (request.then(handleSuccess, handleError));   
    }

    function updateHospital(obj,id){
        var request = $http({
            method: "patch",
            params: obj,
            url: apiConfig.apiBaseUrl + 'hospitals/' + id
        });
        return (request.then(handleSuccess, handleError)); 
    }

    function getHospitalClaims(hospital_id){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'hospital/' + hospital_id + '/claims'
        });
        return (request.then(handleSuccess, handleError));
    }

    function createHospital(formData){
        var request = $http({
            method: "post",
            params: {
                'name' :formData.name,
                'phone' : formData.phone,
                'email' : formData.email,
                'street_address' : formData.address,
                'account_number' :  formData.account,
                'bank' : formData.bank,
                'state' : formData.selectedState.state,
                'lg' : formData.selectedLg.lga,
                'band_id' : formData.selectedBand.id,
                'city' : formData.city,
                'country' : 'Nigeria'
            },
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
