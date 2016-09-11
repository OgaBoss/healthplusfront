/**
 * Created by OluwadamilolaAdebayo on 8/24/16.
 */
app.factory('Entity', ['$http','apiConfig','$auth', function($http, apiConfig, $auth){
    return {
        create: createEntity,
        attach: attachUser
    }

    // Create a new Entity
    function createEntity(type, data){
        var request = $http({
            method: "post",
            url: apiConfig.apiBaseUrl + type,
            params: {
                name: data.name,
                country: 'Nigeria',
                creator: data.creator,
                general_email: data.email,
                lg: data.lg.lga,
                phone_mobile: data.phone_mobile,
                phone_office: data.phone_office,
                state: data.state.state,
                city: data.city,
                street: data.street
            }
        });

        return request.then(getSuccessResponse).catch(getErrorResponse);
    }

    // Attach User to Entity
    function attachUser(entity_id, data, entity_type_id){
        var request = $http({
            method: 'POST',
            url: apiConfig.apiBaseUrl +'user',
            params: {
                role_id: 2,
                entity_type_id: entity_type_id,
                entity_name: data.entity,
                email: data.user_email,
                password: data.user_email,
                first_name: data.first_name,
                last_name: data.last_name,
                entity_id: entity_id,
            }
        });

        return request.then(getSuccessResponse).catch(getErrorResponse);
    }

    function getSuccessResponse(response){
        return response.data.success;
    }

    function getErrorResponse(error){
        return error;
    }

    //TODO sort ids
}])