/**
 * Created by OluwadamilolaAdebayo on 8/23/16.
 */
app.factory('MailService',['$http','apiConfig','FileUploader', function($http, apiConfig, FileUploader){
    return {
        sendMailParams :  sendMailParams
    }

    function sendMailParams(params){
         var request = $http({
            method: "post",
            params: {
                'name' :  params.name,
                'email' : params.email,
                'url' : params.url
            },
            url: apiConfig.apiBaseUrl + 'hospitals'
        });
        return (request.then(handleSuccess, handleError)); 
    }
    /**
     * Private Method
     */
    function handleSuccess(res) {
        return res.data;
    }

    function handleError(res) {
        return res;
    }
}]);