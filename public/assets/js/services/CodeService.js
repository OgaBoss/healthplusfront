
/**
 * Created by adebayooluwadamilola on 10/17/16.
 */
app.factory('CodeService', ['$http', 'apiConfig', '$localStorage', function ($http, apiConfig, $localStorage) {
    return {
        createReferralCode: createReferralCode
    };

    function createReferralCode (obj){
        var request = $http({
            method: "post",
            params : obj,
            url: apiConfig.apiBaseUrl + 'codes'
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


