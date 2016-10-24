/**
 * Created by adebayooluwadamilola on 10/18/16.
 */
app.controller('ModalInstanceController', function($scope,$uibModalInstance) {

    $scope.ok = function() {
		$uibModalInstance.close();
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
});