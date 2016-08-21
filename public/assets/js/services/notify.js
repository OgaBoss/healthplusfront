/**
 * Created by OluwadamilolaAdebayo on 8/21/16.
 */
app.factory('healthNotify', ['ngNotify', function(ngNotify){
    return {
        set : function(msg, type){
            ngNotify.set(msg, {
                theme: 'pure',
                position: 'top',
                duration: '3000',
                type: type,
                sticky: 'false',
                button: 'true',
                html: 'false'
            });
        }
    }
}]);