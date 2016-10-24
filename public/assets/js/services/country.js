/**
 * Created by OluwadamilolaAdebayo on 8/23/16.
 */
app.factory('PlaceService',['$http','apiConfig','$rootScope', function($http, apiConfig, $rootScope){
    return {
        getCountry: getCountry,
        getAllStates : getCountryStates,
        getAllLgs : getStateLg
    }

    function getCountry(){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'country',
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function getCountryStates(){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'state',
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function getStateLg(state){
        var request = $http({
            method: "GET",
            url: apiConfig.apiBaseUrl + 'lg',
            params: {
                state: state
            }
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