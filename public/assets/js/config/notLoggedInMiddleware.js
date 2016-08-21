/**
 * Created by OluwadamilolaAdebayo on 8/21/16.
 */
var loginRequired = function($q, $location, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
        deferred.resolve();
    } else {
        $location.path('/login');
    }
    return deferred.promise;
};