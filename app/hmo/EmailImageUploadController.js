/**
 * Created by OluwadamilolaAdebayo on 9/9/16.
 */
app.controller('EmailImageUploadController', ['$scope','$state','FileUploader','$stateParams', 'healthNotify','apiConfig', function($scope,$state,FileUploader,$stateParams,healthNotify,apiConfig){
    var vm = this;

    var uploaderImages = $scope.uploaderImages = new FileUploader({
        url: apiConfig.apiBaseUrl +'/uploadImage/'+$stateParams.id,
        alias: 'image',
        formData: [{email: $stateParams.email}]
    });

    // FILTERS
    uploaderImages.filters.push({
        name: 'imageFilter',
        fn: function (item/*{File|FileLikeObject}*/, options) {
            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
            if('|png|'.indexOf(type) !== -1 || '|jpeg|'.indexOf(type) !== -1 || '|jpg|'.indexOf(type) !== -1){
                return true
            }else{
               return healthNotify.set('Please update only png or jpeg files', 'error');
            }
        }
    });

    uploaderImages.onSuccessItem =function (fileItem, response, status, headers) {
        if(status == 200){
            console.log(response);
            return healthNotify.set('Enrollee Image uploaded', 'success');
        }else{
            return healthNotify.set('Please try again something went wrong', 'error');
        }
    }

}])