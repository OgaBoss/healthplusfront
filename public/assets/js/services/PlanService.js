/**
 * Created by adebayooluwadamilola on 10/20/16.
 */
app.factory('PlanService',['$http','apiConfig', function($http,apiConfig){
    return {
        getAllPlans : getAllPlans,
        createPlan: createPlan
    };

    function getAllPlans(){
        var request = $http({
            method: "get",
            //url: apiConfig.apiBaseUrl + 'plans'
            url: '/users'
        });
        return( request.then( handleSuccess, handleError ) );
    }

    function createPlan(obj){
        var request = $http({
            method: "post",
            params: obj,
            url: apiConfig.apiBaseUrl + 'plans'
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