/**
 * Created by adebayooluwadamilola on 10/20/16.
 */
app.factory('OrganizationService',['$http','apiConfig', function($http,apiConfig){
    return {
        getAllOrganization : getAllOrganization
    };

    function getAllOrganization(){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'organizations'
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