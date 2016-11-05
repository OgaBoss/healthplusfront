app.controller('ClaimsModalController', function ($scope, $uibModal, $aside, $localStorage, FileUploader, healthNotify, $rootScope, MedicalRecordService, data) {
    var vm = this;
    vm.record = {}

    // get medical record
    MedicalRecordService.getMedicalRecord(data.id).then(function (res) {
        vm.record = res.record.data

        vm.record.end_date = (res.record.data.end_date) ? end_date : 'Ongoing'
        vm.record.con = (res.record.data.con) ? 'Yes' : 'No'
        vm.record.cf = (res.record.data.cf) ? 'Yes' : 'No'
        vm.record.ir = (res.record.data.ir) ? 'Yes' : 'No'
        vm.record.im = (res.record.data.im) ? 'Yes' : 'No'
        vm.record.ih = (res.record.data.ih) ? 'Yes' : 'No'
        vm.record.rs1 = (res.record.data.rs1) ? 'Yes' : 'No'
        vm.record.is = (res.record.data.is) ? 'Yes' : 'No'
        vm.record.rx2 = (res.record.data.rx2) ? 'Yes' : 'No'
        vm.record.rx3 = (res.record.data.rx3) ? 'Yes' : 'No'
        vm.record.died = (res.record.data.died) ? 'Yes' : 'No'
        vm.record.rec = (res.record.data.rec) ? 'Yes' : 'No'
        vm.record.refill = (res.record.data.refill) ? 'Yes' : 'No'
        vm.record.transfer = (res.record.data.transfer) ? 'Yes' : 'No'
    })
});