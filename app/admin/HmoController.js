/**
 * Created by OluwadamilolaAdebayo on 8/27/16.
 */
'use strict';

/**
 * controllers used for the dashboard
 */

app.controller('HmoController', ['$scope','$auth','$state','$localStorage','country','healthNotify', 'Entity','FileUploader',
    function($scope, $auth, $state, $localStorage, country, healthNotify, Entity, FileUploader) {
        //$scope.currentUser = $localStorage.currentUser;

        var vm = this;
        vm.hmoForm = {};
        vm.hmoForm.creator = $localStorage.currentUser.data.name;

        //Admin Form (HMO)
        vm.hmoAdminForm = {};
        vm.hmoAdminForm.role = 'Admin';
        vm.hmoAdminForm.entity = 'HMO';

        //To disable select fields
        $scope.lgs = [];
        $scope.states = [];
        $scope.lgIsDisabled = true;
        $scope.hideEntityForm = false;
        $scope.hideAdminForm = true;
        $scope.hmoCreated = [];

        //Phone number pattern
        $scope.mobileNumber = /^\+?\d{3}[- ]?\d{3}[- ]?\d{4}[- ]?\d{3}$/;
        $scope.mobileOffice = /^\d{2}[- ]?\d{3}[- ]?\d{4}$/;

        //Get the states for the dropdown
        $scope.states = [];
        country.getAllStates().then(function(res){
            $scope.states = res.state;
        });
        vm.getStates = function(){

        }

        //Get LGs when a state is selected
        vm.getLgs = function(){
            $scope.lgs = [];
            var selectedState = vm.hmoForm.state;
            $scope.lgIsDisabled = false;
            country.getAllLgs(selectedState.id).then(function(res){
                console.log(res.lgs);
                $scope.lgs = res.lgs;
            });
        }

        vm.create = function(form){
            var firstError = null;
            if (form.$invalid) {
                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }

                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }

                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                healthNotify.set('The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!"', 'error');
            } else {
                //your code for submit
                console.log(vm.hmoForm);
                Entity.create('hmo', vm.hmoForm).then(function(response){
                    console.log(response);
                    if(response.status > 200){
                        healthNotify.set('Something went wrong with the submission', 'error');

                    }else{
                        $scope.hmoCreated = response;
                        console.log($scope.hmoCreated);
                        $scope.hideEntityForm = true;
                        $scope.hideAdminForm = false;
                        healthNotify.set('To complete this process please attach an administrator to this HMO', 'warn');
                    }
                });
            }
        }

        vm.attach = function(form){
            if (form.$invalid) {
                var field = null, firstError = null;
                for (field in form) {
                    if (field[0] != '$') {
                        if (firstError === null && !form[field].$valid) {
                            firstError = form[field].$name;
                        }

                        if (form[field].$pristine) {
                            form[field].$dirty = true;
                        }
                    }
                }
                angular.element('.ng-invalid[name=' + firstError + ']').focus();
                healthNotify.set('The form cannot be submitted because it contains validation errors!", "Errors are marked with a red, dashed border!"', 'error');
            }else{
                console.log($scope.hmoCreated);
                var hmoCreated = $scope.hmoCreated;
                Entity.attach(hmoCreated.id, vm.hmoAdminForm, 1).then(function(response){
                    if(response == 'User Attached'){
                        healthNotify.set('New HMO Created and user attached!"', 'success');
                    }else{
                        healthNotify.set('User was not attached for that HMO', 'error');

                    }
                });
            }
        }


        // FileUploader
        var uploaderImages = $scope.uploaderImages = new FileUploader({
            url: 'http://healthplusapi.app/api/v1/parseCsv',
            alias: 'csv'
        });

        // FILTERS
        uploaderImages.filters.push({
            name: 'imageFilter',
            fn: function (item/*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                if('|csv|'.indexOf(type) !== -1){
                    return true
                }else{
                   return healthNotify.set('Please update only CSV files', 'error');
                }
            }
        });

        uploaderImages.onSuccessItem =function (fileItem, response, status, headers) {
            if(status == 200){
                return healthNotify.set('File has being uploaded. You can check the progress of on the view page', 'success');
            }else{
                return healthNotify.set('Please try again something went wrong', 'error');
            }
        }
    }
]);
