app.controller('ImageUploadModal',function(MailService, $scope, $uibModal, $aside, $localStorage, FileUploader,data,healthNotify, $rootScope, apiConfig,$uibModalInstance){
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
            $rootScope.$broadcast('enrolleeImage', response.url);
            return healthNotify.set('Enrollee Image uploaded', 'success');
        }else{
            return healthNotify.set('Please try again something went wrong', 'error');
        }
    }

    $scope.sendLink = function(){
        var obj = {};
        obj.name = data.name;
        obj.email = data.email;
        obj.url = apiConfig.clientBaseUrl+'imageUpload/'+data.email +'/'+data.id

        MailService.sendMailParams(obj).then(function(res){
            if(res.success){
                $uibModalInstance.dismiss();
                return healthNotify.set('Email Sent to Enrollee', 'success');
            }
        });
        console.log(obj);
    }
});