'use strict';

/**
 * Config for the router
 */
app.config(['$authProvider','$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', '$httpProvider','JS_REQUIRES',
function ($authProvider, $stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider,$httpProvider,jsRequires) {

    app.controller = $controllerProvider.register;
    app.directive = $compileProvider.directive;
    app.filter = $filterProvider.register;
    app.factory = $provide.factory;
    app.service = $provide.service;
    app.constant = $provide.constant;
    app.value = $provide.value;

    if(location.host == 'localhost:5000' ){
        app.value('apiConfig',{
            apiBaseUrl: 'http://projectx-api.dev/api/'
        });
        $authProvider.loginUrl = 'http://projectx-api.dev/api/authenticate';
    }else{
        app.value('apiConfig',{
            apiBaseUrl: 'https://backboneapi.herokuapp.com/api/'
        });
        $authProvider.loginUrl = 'https://backboneapi.herokuapp.com/api/authenticate';

    }

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if ($localStorage.satellizer_token) {
                    config.headers.Authorization = 'Bearer ' + $localStorage.satellizer_token;
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
                    $location.path('/login');
                }
                return $q.reject(response);
            }
        };
    }]);

    // LAZY MODULES

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
        modules: jsRequires.modules
    });


    // Register Login Url

    // APPLICATION ROUTES
    // -----------------------------------
    // For any unmatched url, redirect to /app/dashboard
    $urlRouterProvider.otherwise("/login");
    // Set up the states
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'assets/views/auth/login.html',
        controller: 'LoginController',
        controllerAs: 'login',
        resolve: loadSequence('healthNotify', 'ngNotify', 'LoginService'),
    })

    // Admin Route
    .state('app', {
        url: "/admin",
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('ngNotify', 'countTo'),
        abstract: true,
        controller: 'DashBoardController',
        controllerAs: 'dashboard'
    }).state('app.admin', {
        url: "/dashboard/home",
        templateUrl: "assets/views/admin/home.html",
        resolve: loadSequence('ngNotify', 'countTo'),
        title: 'Dashboard',
        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    }).state('app.hmo', {
        url: '/dashboard/hmo',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'HMOs',
        ncyBreadcrumb: {
            label: 'HMOs'
        }
    }).state('app.hmo.create', {
        url: '/create-hmo',
        templateUrl: "assets/views/admin/hmo/create-hmo.html",
        controller: 'HmoController',
        controllerAs: 'hmo',
        title: 'Create',
        resolve: loadSequence('angularFileUpload'),
        ncyBreadcrumb: {
            label: 'Create'
        }
    }).state('app.hmo.view', {
        url: '/create-view',
        templateUrl: "assets/views/admin/hmo/view-hmo.html",
        controller: 'HmoController',
        controllerAs: 'hmo',
        title: 'View',
        ncyBreadcrumb: {
            label: 'View'
        }
    })

    // HMO Route
    .state('partners', {
        url: "/partners",
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('ngNotify'),
        abstract: true,
        controller: 'DashBoardController',
        controllerAs: 'dashboard'
    }).state('partners.home', {
        url: "/dashboard/home",
        templateUrl: "assets/views/hmo/home.html",
        title: 'Dashboard',
        resolve: loadSequence('ngNotify', 'countTo', 'chartjs', 'chart.js', 'InboxController'),
        ncyBreadcrumb: {
            label: 'Dashboard'
        }
    }).state('partners.home.inbox', {
        url: "/messages/:id",
        resolve: loadSequence('ngNotify', 'countTo'),
        title: 'InBox Messages',
        ncyBreadcrumb: {
            label: 'InBox Messages'
        }
    }).state('partners.clients', {
        url: '/dashboard/clients',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'Clients Page',
        ncyBreadcrumb: {
            label: 'Clients'
        }
    }).state('partners.clients.home', {
        url: '/home',
        templateUrl: 'assets/views/hmo/clients.html',
        controller: 'HmoClientController',
        controllerAs: 'hmoClient',
        title: 'Clients Page',
        ncyBreadcrumb: {
            label: 'Home'
        }
    }).state('partners.clients.organization', {
        url: '/organization/:id',
        templateUrl: 'assets/views/hmo/organization.html',
        title: 'Organization Profile',
        controller:'OrganizationController',
        controllerAs: 'orgCtrl',
        resolve: loadSequence('healthNotify','ngNotify','chartjs', 'chart.js'),
        ncyBreadcrumb: {
            label: 'Organization Profile'
        }
    }).state('partners.clients.enrollee', {
        url: '/enrollee/:id?tabIndex',
        templateUrl: 'assets/views/hmo/enrollee.html',
        title: 'Enrollee Profile',
        controller:'EnrolleeController',
        resolve: loadSequence('chartjs', 'chart.js'),
        controllerAs: 'enrolleeCtrl',
        ncyBreadcrumb: {
            label: 'Enrollee Profile'
        }
    }).state('partners.care-providers', {
        url: '/dashboard/care-providers',
        template: '<div ui-view class="fade-in-up"></div>',
        title: 'DashBoard',
        ncyBreadcrumb: {
            label: 'DashBoard'
        }
    }).state('partners.care-providers.home', {
        url: '/home',
        templateUrl: 'assets/views/hmo/care-providers.html',
        controller:'CareProviderController',
        controllerAs: 'careCtrl',
        title: 'Care Providers',
        ncyBreadcrumb: {
            label: 'Care Providers'
        }
    }).state('partners.care-providers.hospital', {
        url: '/hospital/:id?tabIndex',
        templateUrl: 'assets/views/hmo/hospital.html',
        title: 'Hospital',
        controller:'HospitalController',
        controllerAs: 'hospitalCtrl',
        resolve: loadSequence('chartjs', 'chart.js'),
        ncyBreadcrumb: {
        label: 'Hospital'
        }
    }).state('partners.care-providers.pharmacy', {
        url: '/pharmacy/:id',
        templateUrl: 'assets/views/hmo/pharmacy.html',
        title: 'Pharmacy',
            controller:'PharmacyController',
            controllerAs: 'pharmacyCtrl',
            resolve: loadSequence('chartjs', 'chart.js'),

            ncyBreadcrumb: {
            label: 'Pharmacy'
        }
    })

    // Hmo Health Plans Route
    .state('healthPlan', {
        url: "/health-plan",
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('ngNotify'),
        abstract: true,
        controller: 'HealthPlanController',
        controllerAs: 'healthPlanCtrl',
        ncyBreadcrumb: {
            label: 'HealthPlans'
        }
    }).state('healthPlan.home', {
        url: "/home",
        templateUrl: "assets/views/hmo/health-plan.html",
        resolve: loadSequence('chartjs', 'chart.js'),
        controller: 'HealthPlanController',
        controllerAs: 'healthPlanCtrl',
        ncyBreadcrumb: {
            label: 'Home'
        }
    }).state('healthPlan.plan', {
        url: "/plan/:id?tabIndex",
        templateUrl: "assets/views/hmo/plan.html",
        resolve: loadSequence('ngNotify'),
        controller: 'HealthPlanController',
        controllerAs: 'healthPlanCtrl',
        ncyBreadcrumb: {
            label: 'Plan'
        }
    })

    //Staff Route
    .state('staff', {
        url: "/staff",
        abstract: true,
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('ngNotify'),
        controller: 'StaffController',
        controllerAs: 'staffCtrl',
        ncyBreadcrumb: {
            label: 'Staff'
        }
    }).state('staff.home', {
        url: "/home",
        templateUrl: "assets/views/hmo/staff.html",
        resolve: loadSequence('ngNotify'),
        controller: 'StaffController',
        controllerAs: 'staffCtrl',
        ncyBreadcrumb: {
            label: 'Home'
        }
    }).state('staff.info', {
        url: "/info/:id?tabIndex&pageName",
        templateUrl: "assets/views/hmo/staff-info.html",
        resolve: loadSequence('ngNotify'),
        controller: 'StaffController',
        controllerAs: 'staffCtrl',
        ncyBreadcrumb: {
            label: 'Overview'
        }
    })

    //Settings Route
    .state('settings', {
        url: "/dashboard/settings",
        abstract: true,
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('ngNotify'),
        controller: 'SettingsController',
        controllerAs: 'settingsCtrl',
        ncyBreadcrumb: {
            label: 'Settings'
        }
    }).state('settings.home', {
        url: "/home",
        templateUrl: "assets/views/hmo/settings.html",
        resolve: loadSequence('ngTable','ngNotify'),
        controller: 'SettingsController',
        controllerAs: 'settingsCtrl',
        ncyBreadcrumb: {
            label: 'Settings'
        }
    })

    //Reports Route
    .state('reports', {
        url: "/dashboard/reports",
        abstract: true,
        templateUrl: "assets/views/app.html",
        resolve: loadSequence('chartjs', 'chart.js'),
        controller: 'ReportController',
        controllerAs: 'reportCtrl',
        ncyBreadcrumb: {
            label: 'Report'
        }
    }).state('reports.home', {
        url: "/home",
        templateUrl: "assets/views/hmo/report.html",
        resolve: loadSequence('chartjs', 'chart.js'),
        controller: 'ReportController',
        controllerAs: 'reportCtrl',
        ncyBreadcrumb: {
            label: 'Home'
        }
    }).state('reports.hospitals', {
        url: "/hospitals",
        templateUrl: "assets/views/hmo/reports-hospitals.html",
        resolve: loadSequence('chartjs', 'chart.js'),
        controller: 'ReportController',
        controllerAs: 'reportCtrl',
        ncyBreadcrumb: {
            label: 'Hospitals'
        }
    }).state('reports.enrollee', {
        url: "/enrollee",
        templateUrl: "assets/views/hmo/reports-enrollee.html",
        resolve: loadSequence('chartjs', 'chart.js'),
        controller: 'ReportController',
        controllerAs: 'reportCtrl',
        ncyBreadcrumb: {
            label: 'Enrollee'
        }
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