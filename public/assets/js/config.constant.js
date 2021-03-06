'use strict';

/**
 * Config constant
 */
app.constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
app.constant('JS_REQUIRES', {
    //*** Scripts
    scripts: {
        //*** Javascript Plugins
        'd3': 'lib/d3/d3.min.js',

        //*** jQuery Plugins
        'chartjs': 'lib/chartjs/Chart.min.js',
        'ckeditor-plugin': 'lib/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['lib/jquery-nestable/jquery.nestable.js'],
        'touchspin-plugin': ['lib/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js', 'lib/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
        'jquery-appear-plugin': ['lib/jquery-appear/build/jquery.appear.min.js'],
        'spectrum-plugin': ['lib/spectrum/spectrum.js', 'lib/spectrum/spectrum.css'],
		'jcrop-plugin': ['lib/Jcrop/js/jquery.Jcrop.min.js', 'lib/Jcrop/css/jquery.Jcrop.min.css'],

        //*** Services
        'healthNotify': 'assets/js/services/notify.js',
        'currentUser': 'assets/js/services/currentUser.js',
        'LoginService': 'assets/js/services/login.js',
        'skipIfLoggedIn': 'assets/js/config/loggedInMiddleware.js',
        'loginRequired': 'assets/js/config/notLoggedInMiddleware.js',


        //*** Controllers
        'InboxController': 'hmo/InboxController.js',
        'ModalInstanceController' : 'assets/js/custom/ModalInstanceController.js'
    },
    //*** angularJS Modules
    modules: [{
        name: 'toaster',
        files: ['lib/AngularJS-Toaster/toaster.js', 'lib/AngularJS-Toaster/toaster.css']
    }, {
        name: 'angularBootstrapNavTree',
        files: ['lib/angular-bootstrap-nav-tree/dist/abn_tree_directive.js', 'lib/angular-bootstrap-nav-tree/dist/abn_tree.css']
    }, {
        name: 'ngTable',
        files: ['lib/ng-table/dist/ng-table.min.js', 'lib/ng-table/dist/ng-table.min.css']
    }, {
        name: 'ui.mask',
        files: ['lib/angular-ui-utils/mask.min.js']
    }, {
        name: 'ngImgCrop',
        files: ['lib/ngImgCrop/compile/minified/ng-img-crop.js', 'lib/ngImgCrop/compile/minified/ng-img-crop.css']
    }, {
        name: 'angularFileUpload',
        files: ['lib/angular-file-upload/dist/angular-file-upload.min.js']
    }, {
        name: 'monospaced.elastic',
        files: ['lib/angular-elastic/elastic.js']
    }, {
        name: 'ngMap',
        files: ['lib/ngmap/build/scripts/ng-map.min.js']
    }, {
        name: 'chart.js',
        files: ['lib/angular-chart.js/dist/angular-chart.min.js', 'lib/angular-chart.js/dist/angular-chart.min.css']
    }, {
        name: 'flow',
        files: ['lib/ng-flow/dist/ng-flow-standalone.min.js']
    }, {
        name: 'ckeditor',
        files: ['lib/angular-ckeditor/angular-ckeditor.min.js']
    }, {
        name: 'mwl.calendar',
        files: ['lib/angular-bootstrap-calendar/dist/js/angular-bootstrap-calendar-tpls.js', 'lib/angular-bootstrap-calendar/dist/css/angular-bootstrap-calendar.min.css', 'assets/js/config/config-calendar.js']
    }, {
        name: 'ng-nestable',
        files: ['lib/ng-nestable/src/angular-nestable.js']
    }, {
        name: 'ngNotify',
        files: ['lib/ng-notify/dist/ng-notify.min.js', 'lib/ng-notify/dist/ng-notify.min.css']
    }, {
        name: 'xeditable',
        files: ['lib/angular-xeditable/dist/js/xeditable.min.js', 'lib/angular-xeditable/dist/css/xeditable.css', 'assets/js/config/config-xeditable.js']
    }, {
        name: 'checklist-model',
        files: ['lib/checklist-model/checklist-model.js']
    }, {
        name: 'ui.knob',
        files: ['lib/ng-knob/dist/ng-knob.min.js']
    }, {
        name: 'ngAppear',
        files: ['lib/angular-appear/build/angular-appear.min.js']
    }, {
        name: 'countTo',
        files: ['lib/angular-count-to-0.1.1/dist/angular-filter-count-to.min.js']
    }, {
        name: 'angularSpectrumColorpicker',
        files: ['lib/angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js']
    },{
        name: 'permission',
        files: ['lib/angular-permission/dist/angular-permission.min.js']
    },{
        name: 'permission.ui',
        files: ['lib/angular-permission/dist/angular-permission-ui.min.js']
    },{
        name: 'ui.select',
        files: ['lib/angular-ui-select/dist/select.min.js']
    }]
});