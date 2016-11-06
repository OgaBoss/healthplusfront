app.controller('ClaimsModalController', function ($scope, $uibModal, $aside, $localStorage, FileUploader, healthNotify, $rootScope, MedicalRecordService, data,AilmentService, $uibModalInstance) {
    var vm = this;
    vm.record = {}
    console.log(data);

    AilmentService.getAllAilment().then(function (res) {
        $scope.ailments = res.ailments.data
    });

    // get medical record
    MedicalRecordService.getSingleHealthInfo(data.enr_id, data.id).then(function (res) {
        console.log(res);
        vm.record = res.health_record.data;

        vm.record.end_date = (res.health_record.data.end_date) ? end_date : 'Ongoing'
        vm.record.con = (res.health_record.data.con) ? true : false
        vm.record.cf = (res.health_record.data.cf) ? true : false
        vm.record.ir = (res.health_record.data.ir) ? true : false
        vm.record.im = (res.health_record.data.im) ? true : false
        vm.record.ih = (res.health_record.data.ih) ? true : false
        vm.record.rs1 = (res.health_record.data.rs1) ? true : false
        vm.record.is = (res.health_record.data.is) ? true : false
        vm.record.rx2 = (res.health_record.data.rx2) ? true : false
        vm.record.rx3 = (res.health_record.data.rx3) ? true : false
        vm.record.died = (res.health_record.data.died) ? true : false
        vm.record.rec = (res.health_record.data.rec) ? true : false
        vm.record.refill = (res.health_record.data.refill) ? true : false
        vm.record.transfer = (res.health_record.data.transfer) ? true : false
    })

    vm.editHealthInfo = function(){
        console.log(vm.record);

        var diseases = vm.record.disease.split(',');

        angular.forEach(vm.record.outPutPlan, function(value, key){
            diseases.push(value.short_description);
        });

        vm.record.disease = diseases.join(',')

        console.log(diseases);

        var obj = {
            'disease' : diseases.join(','),
            'con' :   vm.record.con == true ? 1 : 0,
            'cf' :   vm.record.cf == true ? 1 : 0,
            'ir' :   vm.record.ir == true ? 1 : 0,
            'im' :   vm.record.im == true ? 1 : 0,
            'ih' :   vm.record.ih == true ? 1 : 0,
            'rs1' :   vm.record.rs1 == true ? 1 : 0,
            'is' :   vm.record.is == true ? 1 : 0,
            'rx2' :   vm.record.rx2 == true ? 1 : 0,
            'rx3' :   vm.record.rx3 == true ? 1 : 0,
            'died' :   vm.record.died == true ? 1 : 0,
            'rec' :   vm.record.rec == true ? 1 : 0,
            'refill' :   vm.record.refill == true ? 1 : 0,
            'transfer' :   vm.record.transfer == true ? 1 : 0
        }

        MedicalRecordService.updateHealthInfo(data.enr_id, data.id, obj).then(function(res){
           console.log(res);

            if(res.success){
                $uibModalInstance.dismiss();
                return healthNotify.set('Health Info successfully updated', 'success');
            }else{
                $uibModalInstance.dismiss();
                return healthNotify.set('Something went wrong, please try again', 'error');

            }
        });
    }
});