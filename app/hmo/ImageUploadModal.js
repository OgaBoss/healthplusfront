app.controller('ImageUploadModal',function($scope, $uibModal, $aside, $localStorage, FileUploader,data,healthNotify, $rootScope){
    var vm = this;
    // FileUploader
    var uploaderImages = $scope.uploaderImages = new FileUploader({
        url: 'http://projectx-api.dev/api/uploadImage/'+ data.id,
        alias: 'image',
        formData: [{email: data.email}]
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
            $rootScope.$broadcast('enrolleeImage', response.url);
            return healthNotify.set('Enrollee Image uploaded', 'success');
        }else{
            return healthNotify.set('Please try again something went wrong', 'error');
        }
    }

});