/**
 * Created by adebayooluwadamilola on 10/17/16.
 */
app.factory('AilmentService', ['$http', 'apiConfig', '$localStorage', function ($http, apiConfig, $localStorage) {
    return {
        getAllAilment: getAllAilment,
        searchAilment: searchAilment
    };

    function getAllAilment (){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'ailments'
        });
        return (request.then(handleSuccess, handleError));
    }

    function searchAilment(text){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'ailment/search/' + text
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
