/**
 * Created by adebayooluwadamilola on 10/18/16.
 */
app.controller('ModalInstanceController', function($scope,$uibModalInstance,data,EnrolleeService,healthNotify,$state) {

	$scope.email = data.email;
	$scope.id = data.id
	$scope.enrollee_delete = true;
	$scope.wrong_email = false;
	$scope.empty_input = false
	$scope.delete_email = '';

    $scope.ok = function() {
		$uibModalInstance.close();
	};

	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};

	$scope.deleteEnrollee = function(){
		console.log($scope.id);
		if($scope.delete_email.trim().length < 1){
			$scope.empty_input = true;
		}else{
			if($scope.delete_email != $scope.email ){
				$scope.wrong_email = true;
			}else{
				EnrolleeService.deleteEnrollee($scope.id ).then(function(res){
					console.log(res)
					$scope.message = res
					$uibModalInstance.close();
					if(res.msg){
						$state.go('partners.clients.home');
						healthNotify.set('Enrollee removed from this HMO', 'success');
					}else if(res.error){
						healthNotify.set('This enrollee does not exist', 'error');
					}
				})
			}
		}
	}
});