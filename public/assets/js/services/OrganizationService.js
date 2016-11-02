/**
 * Created by adebayooluwadamilola on 10/20/16.
 */
app.factory('OrganizationService', ['$http', 'apiConfig', '$localStorage', function ($http, apiConfig, $localStorage) {
    return {
        getAllOrganization: getAllOrganization,
        getOrganization: getOrganization,
        getOrganizationEnrollees: getOrganizationEnrollees,
        getOrganizationPlans: getOrganizationPlans,
        createOrganization: createOrganization
    };

    function getAllOrganization() {
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'organizations'
        });
        return (request.then(handleSuccess, handleError));
    }

    function getOrganization(id) {
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'organizations/' + id
        });
        return (request.then(handleSuccess, handleError));
    }

    function getOrganizationEnrollees(id) {
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'organizations/' + id + '/enrollees'
        });
        return (request.then(handleSuccess, handleError));
    }

    function getOrganizationPlans(id) {
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'organizations/' + id + '/plans'
        });
        return (request.then(handleSuccess, handleError));
    }

    function createOrganization(formData) {
        var plan_id = [];
        angular.forEach(formData.outPutPlan, function (value, key) {
            console.log(value);
            plan_id.push(value.plan_id);
        })   
        console.log(plan_id);    
         var request = $http({
            method: "post",
            url: apiConfig.apiBaseUrl + 'organizations',
            params: {
                'hmo_id': $localStorage.currentUser.data.hmo.data.hmo_id,
                'city': formData.city,
                'email': formData.email,
                'name': formData.name,
                'phone': formData.phone,
                'state': formData.selectedState.state,
                'lg': formData.selectedLg.lga,
                'address': formData.address,
                'plan': plan_id.toString()
            }
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