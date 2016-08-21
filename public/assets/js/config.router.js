'use strict';

/**
 * Config for the router
 */
app.config(['$authProvider','$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', 'JS_REQUIRES',
function ($authProvider, $stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    app.value('apiConfig',{
       apiBaseUrl: 'http://healthplusapi.app/api/v1/'
    });



    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });

    $authProvider.loginUrl = 'http://healthplusapi.app/api/v1/authenticate';
    $authProvider.httpInterceptor = false;

    // Register Login Url

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    $urlRouterProvider.otherwise("/login");
    // Set up the states
    $stateProvider.state('dashboard', {
        url: "/dashboard",
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('chartjs', 'chart.js', 'chatCtrl', 'loginRequired'),
        abstract: true
    }).state('dashboard.home', {
        url: "/home",
        templateUrl: "assets/views/admin/home.html",
        resolve: loadSequence('d3', 'ui.knob', 'countTo', 'dashboardCtrl'),
        title: 'Dashboard',
        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    }).state('dashboard.hmo', {
        url: '/hmo',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'HMOs',
        ncyBreadcrumb: {
            label: 'HMOs'
        }
    }).state('dashboard.hmo.create', {
        url: '/create-hmo',
        templateUrl: "assets/views/admin/create-hmo.html",
        title: 'Create',
        ncyBreadcrumb: {
            label: 'Create'
        }
    }).state('login', {
        url: '/login',
        templateUrl: 'assets/views/auth/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        resolve: loadSequence('healthNotify', 'ngNotify'),

    })
    // Generates a resolve object previously configured in constant.JS_REQUIRES (config.constant.js)
    function loadSequence() {
        var _args = arguments;
        return {
            deps: ['$ocLazyLoad', '$q',
			function ($ocLL, $q) {
			    var promise = $q.when(1);
			    for (var i = 0, len = _args.length; i < len; i++) {
			        promise = promiseThen(_args[i]);
			    }
			    return promise;

			    function promiseThen(_arg) {
			        if (typeof _arg == 'function')
			            return promise.then(_arg);
			        else
			            return promise.then(function () {
			                var nowLoad = requiredData(_arg);
			                if (!nowLoad)
			                    return $.error('Route resolve: Bad resource name [' + _arg + ']');
			                return $ocLL.load(nowLoad);
			            });
			    }

			    function requiredData(name) {
			        if (jsRequires.modules)
			            for (var m in jsRequires.modules)
			                if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
			                    return jsRequires.modules[m];
			        return jsRequires.scripts && jsRequires.scripts[name];
			    }
			}]
        };
    }
}]);