/**
 * Created by OluwadamilolaAdebayo on 9/14/16.
 */
app.directive(
    'ngMorphingModal', function() {
        var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        var uniqid = randLetter + Date.now();

        return {

            replace: true,
            restrict: 'AE',
            scope: {
                contentSelector: '@'
            },
            link: function (scope, element, attributes) {
                var MorphingModalObj = new MorphingModal({
                    selectorId: '[data-type="modal-trigger"]',
                    selectorObj: $('[data-type="modal-trigger"]'),
                    contentSelector: scope.contentSelector,
                    onAfterClose: null,
                    onAfterOpen: function(){}
                });

            },
            templateUrl: 'td-modal.html'

        }
    });