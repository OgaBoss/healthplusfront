/**
 * Created by adebayooluwadamilola on 10/17/16.
 */
app.factory('HospitalService',['$http','apiConfig','$localStorage', function($http,apiConfig,$localStorage){
    return {
        getAllHospital : getAllHospital
    };

    function getAllHospital(){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'hospitals'
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
