/**
 * Created by adebayooluwadamilola on 11/5/16.
 */
/**
 * Created by OluwadamilolaAdebayo on 8/23/16.
 */
app.factory('BandService',['$http','apiConfig','$rootScope', function($http, apiConfig, $rootScope){
    return {
        getAllBand: getAllBand,
    }

    function getAllBand(){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'bands',
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