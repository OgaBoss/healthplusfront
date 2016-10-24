var app = angular.module('app', ['packet']);
app.run(['$rootScope', '$state', '$stateParams','$location','$localStorage', '$auth','PermRoleStore','PermPermissionStore','RoleService',
function ($rootScope, $state, $stateParams, $location, $localStorage, $auth, PermRoleStore, PermPermissionStore, RoleService) {
    // Check if user is logged in
    // Redirect if not
    // TODO create array of auth needed route


    // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
    FastClick.attach(document.body);

    // Set some reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    if($localStorage.currentUser !== null){
        $rootScope.currentUser = $localStorage.currentUser;
    }

    // GLOBAL APP SCOPE
    // set below basic information
    $rootScope.app = {
        name: 'HealthPlus', // name of your project
        author: 'HealthPlus.ng', // author's name or company name
        description: 'A Platfrom to bring all health practitioners together', // brief description
        version: '1.0', // current version
        year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
        isMobile: (function () {// true if the browser is a mobile device
            var check = false;
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                check = true;
            };
            return check;
        })(),

        defaultLayout: {
            isNavbarFixed: true, //true if you want to initialize the template with fixed header
            isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
            isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
            isFooterFixed: false, // true if you want to initialize the template with fixed footer
            isBoxedPage: false, // true if you want to initialize the template with boxed layout
            theme: 'lyt1-theme-1', // indicate the theme chosen for your project
            logo: 'assets/images/logo2.png', // relative path of the project logo
            logoCollapsed: 'assets/images/logo-collapsed.png',  // relative path of the collapsed logo
            className: ''
        },
        layout: ''
    };


    $rootScope.app.layout = angular.copy($rootScope.app.defaultLayout);

    // $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
    //     if($localStorage.currentUser){
    //         if($localStorage.currentUser.data.entity.data.name !== 'admin'){
    //             $rootScope.app.layout.theme = 'lyt3-theme-1';
    //             $rootScope.app.layout.className = 'lyt-3';
    //         }else{
    //             $rootScope.app.layout.theme = 'lyt1-theme-1';
    //             $rootScope.app.layout.className = '';
    //         }
    //     }
    // });

    //Logout function
    $rootScope.logout = function(){
        $auth.logout();
        $localStorage.$reset();
        $state.go('login');
    };

    // Permissions
    PermRoleStore
        .defineRole('ITADMIN', function (ITADMIN, obj) {
            return RoleService.checkAdminRole();
        });
}]);

app.service('authInterceptor', function($q, $state) {
    var service = this;

    service.responseError = function(response) {
        if (response.status == 401){
            $state.go('login');
        }
        return $q.reject(response);
    };
});

// translate config
app.config(['$translateProvider',
function ($translateProvider) {

    // prefix and suffix information  is required to specify a pattern
    // You can simply use the static-files loader with this pattern:
    $translateProvider.useStaticFilesLoader({
        prefix: 'assets/i18n/',
        suffix: '.json'
    });

    // Since you've now registered more then one translation table, angular-translate has to know which one to use.
    // This is where preferredLanguage(langKey) comes in.
    $translateProvider.preferredLanguage('en');

    // Store the language in the local storage
    $translateProvider.useLocalStorage();

    // Enable sanitize
    $translateProvider.useSanitizeValueStrategy('sanitize');

}]);
// Angular-Loading-Bar
// configuration
app.config(['cfpLoadingBarProvider',
function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;

}]);


// Angular-breadcrumb
// configuration
app.config(function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        template: '<ul class="breadcrumb"><li><a ui-sref="dashboard.home"><i class="fa fa-home margin-right-5 text-large text-dark"></i>Home</a></li><li ng-repeat="step in steps">{{step.ncyBreadcrumbLabel}}</li></ul>'
    });
});
// ng-storage
//set a prefix to avoid overwriting any local storage variables
//app.config(['$localStorageProvider',
//    function ($localStorageProvider) {
//        $localStorageProvider.setKeyPrefix('PacketLtr1');
//    }]);
//filter to convert html to plain text
app.filter('htmlToPlaintext', function () {
      return function (text) {
          return String(text).replace(/<[^>]+>/gm, '');
      };
  }
);
//Custom UI Bootstrap Calendar Popup Template
app.run(["$templateCache", function ($templateCache) {
    $templateCache.put("uib/template/datepickerPopup/popup.html",
        "<div>\n" +
	    "  <ul class=\"uib-datepicker-popup clip-datepicker dropdown-menu\" dropdown-nested ng-if=\"isOpen\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\" ng-click=\"$event.stopPropagation()\">\n" +
	    "    <li ng-transclude></li>\n" +
	    "    <li ng-if=\"showButtonBar\" class=\"uib-button-bar\">\n" +
	    "    <span class=\"btn-group pull-left\">\n" +
	    "      <button type=\"button\" class=\"btn btn-sm btn-primary btn-o uib-datepicker-current\" ng-click=\"select('today', $event)\" ng-disabled=\"isDisabled('today')\">{{ getText('current') }}</button>\n" +
	    "      <button type=\"button\" class=\"btn btn-sm btn-primary btn-o uib-clear\" ng-click=\"select(null, $event)\">{{ getText('clear') }}</button>\n" +
	    "    </span>\n" +
	    "      <button type=\"button\" class=\"btn btn-sm btn-primary pull-right uib-close\" ng-click=\"close($event)\">{{ getText('close') }}</button>\n" +
	    "    </li>\n" +
	    "  </ul>\n" +
	    "</div>\n" +
	    "");
	$templateCache.put("uib/template/datepicker/year.html",
	    "<table class=\"uib-yearpicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
	    "  <thead>\n" +
	    "    <tr>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
	    "      <th colspan=\"{{::columns - 2}}\"><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
	    "    </tr>\n" +
	    "  </thead>\n" +
	    "  <tbody>\n" +
	    "    <tr class=\"uib-years\" ng-repeat=\"row in rows track by $index\">\n" +
	    "      <td ng-repeat=\"dt in row\" class=\"uib-year text-center\" role=\"gridcell\"\n" +
	    "        id=\"{{::dt.uid}}\"\n" +
	    "        ng-class=\"::dt.customClass\">\n" +
	    "        <button type=\"button\" class=\"btn btn-default\"\n" +
	    "          uib-is-class=\"\n" +
	    "            'btn-current' for selectedDt,\n" +
	    "            'active' for activeDt\n" +
	    "            on dt\"\n" +
	    "          ng-click=\"select(dt.date)\"\n" +
	    "          ng-disabled=\"::dt.disabled\"\n" +
	    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
	    "      </td>\n" +
	    "    </tr>\n" +
	    "  </tbody>\n" +
	    "</table>\n" +
	    "");
    $templateCache.put("uib/template/datepicker/month.html",
	    "<table class=\"uib-monthpicker\" role=\"grid\" aria-labelledby=\"{{::uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
	    "  <thead>\n" +
	    "    <tr>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left uib-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
	    "      <th><button id=\"{{::uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm uib-title\" ng-click=\"toggleMode()\" ng-disabled=\"datepickerMode === maxMode\" tabindex=\"-1\"><strong>{{title}}</strong></button></th>\n" +
	    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right uib-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
	    "    </tr>\n" +
	    "  </thead>\n" +
	    "  <tbody>\n" +
	    "    <tr class=\"uib-months\" ng-repeat=\"row in rows track by $index\">\n" +
	    "      <td ng-repeat=\"dt in row\" class=\"uib-month text-center\" role=\"gridcell\"\n" +
	    "        id=\"{{::dt.uid}}\"\n" +
	    "        ng-class=\"::dt.customClass\">\n" +
	    "        <button type=\"button\" class=\"btn btn-default\"\n" +
	    "          uib-is-class=\"\n" +
	    "            'btn-current' for selectedDt,\n" +
	    "            'active' for activeDt\n" +
	    "            on dt\"\n" +
	    "          ng-click=\"select(dt.date)\"\n" +
	    "          ng-disabled=\"::dt.disabled\"\n" +
	    "          tabindex=\"-1\"><span ng-class=\"::{'text-info': dt.current}\">{{::dt.label}}</span></button>\n" +
	    "      </td>\n" +
	    "    </tr>\n" +
	    "  </tbody>\n" +
	    "</table>\n" +
	    "");    
}]);