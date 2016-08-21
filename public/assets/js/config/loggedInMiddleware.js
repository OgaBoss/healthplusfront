/**
 * Created by OluwadamilolaAdebayo on 8/21/16.
 */

var skipIfLoggedIn = function($q, $auth) {
    var deferred = $q.defer();
    if ($auth.isAuthenticated()) {
        deferred.reject();
    } else {
        deferred.resolve();
    }
    return deferred.promise;
};

