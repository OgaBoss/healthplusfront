/**
 * Created by adebayooluwadamilola on 10/17/16.
 */
app.factory('EnrolleeService', ['$http', 'apiConfig', '$localStorage', function ($http, apiConfig, $localStorage) {
    return {
        getAllEnrollees: getAllEnrollees,
        getEnrollee: getEnrollee,
        getEnrolleeDependents: getEnrolleeDependents,
        createEnrollee: createEnrollee,
        deleteEnrollee: deleteEnrollee,
        updateEnrollee: updateEnrollee,
        addDependent: addDependent,
        searchForEnrollee: searchForEnrollee
    };

    function getAllEnrollees() {
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollees'
        });
        return (request.then(handleSuccess, handleError));
    }

    function getEnrollee(id) {
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollees/' + id
        });
        return (request.then(handleSuccess, handleError));
    }

    function getEnrolleeDependents(id) {
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollee/getChildren/' + id
        });
        return (request.then(handleSuccess, handleError));
    }

    function createEnrollee(formData) {
        console.log(formData);
        var request = $http({
            method: "post",
            url: apiConfig.apiBaseUrl + 'enrollees',
            params: {
                'hmo_id': $localStorage.currentUser.data.hmo.data.hmo_id,
                'organization_id': formData.selectedOrg.organization_id,
                'organization_name': formData.selectedOrg.name,
                'dependents_id': null,
                'plan_id': formData.plan.plan_id,
                'first_name': formData.first_name,
                'last_name': formData.last_name,
                'email': formData.email,
                'phone': formData.phone,
                'lg': formData.selectedLg.lga,
                'street_address': formData.address,
                'city': formData.city,
                'state': formData.selectedState.state,
                'country': 'Nigeria',
                'dob': formData.day + "-" + formData.month + "-" + formData.year,
                'status': 0,
                'enrollee_type': 'parent',
                'image_url': null,
                'sex': formData.selectedSex,
                'hospital_id': formData.selectedHospital.hospital_id
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function deleteEnrollee(id) {
        var request = $http({
            method: "delete",
            url: apiConfig.apiBaseUrl + 'enrollees/' + id,
        });
        return (request.then(handleSuccess, handleError));
    }

    function updateEnrollee(obj, user_id) {
        var request = $http({
            method: "patch",
            url: apiConfig.apiBaseUrl + 'enrollees/' + user_id,
            params: obj
        });
        return (request.then(handleSuccess, handleError));
    }

    function addDependent(formData, parent_id) {
        var request = $http({
            method: "post",
            url: apiConfig.apiBaseUrl + 'enrollees',
            params: {
                'hmo_id': $localStorage.currentUser.data.hmo.data.hmo_id,
                'organization_id': formData.selectedOrg.organization_id,
                'organization_name': formData.selectedOrg.name,
                'dependent_id': parent_id,
                'plan_id': formData.plan.plan_id,
                'first_name': formData.first_name,
                'last_name': formData.last_name,
                'email': formData.email,
                'phone': formData.phone,
                'lg': formData.selectedLg.lga,
                'street_address': formData.address,
                'city': formData.city,
                'state': formData.selectedState.state,
                'country': 'Nigeria',
                'dob': formData.day + "-" + formData.month + "-" + formData.year,
                'status': 0,
                'enrollee_type': 'child',
                'image_url': null,
                'sex': formData.selectedSex,
                'hospital_id': formData.selectedHospital.hospital_id,
            }
        });
        return (request.then(handleSuccess, handleError));
    }

    function searchForEnrollee(email){
        var request = $http({
            method: "get",
            url: apiConfig.apiBaseUrl + 'enrollee/search/' + email
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
