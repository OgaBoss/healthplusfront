/**
 * Created by OluwadamilolaAdebayo on 9/6/16.
 */
app.controller('EnrolleeController', function($scope){
    $scope.max = 200;

    $scope.random = function() {
        var value = Math.floor((Math.random() * 100) + 1);
        var type, text;

        if (value < 25) {
            type = 'success';
            text = value + '%';
        } else if (value < 50) {
            type = 'info';
            text = value + '%';
        } else if (value < 75) {
            type = 'warning';
            text = value + '%';
        } else {
            type = 'danger';
            text = value + '%';
        }

        $scope.showWarning = (type === 'danger' || type === 'warning');

        $scope.dynamic = value;
        $scope.type = type;
        $scope.text = text;
    };
    $scope.random();
});