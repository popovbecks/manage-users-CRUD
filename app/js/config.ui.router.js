export default (ngModule) => {
    ngModule
      .run(['$rootScope', '$state', '$stateParams',
        function($rootScope, $state, $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;
        }
      ])
        .config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
            $ocLazyLoadProvider.config({
                debug: true
            });
        }])
        .config(['$locationProvider', function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }])
        .config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider) {

                $httpProvider.defaults.withCredentials = true;
                $urlRouterProvider.when('', '/user-list');
                $urlRouterProvider.when('/', '/user-list');
                $urlRouterProvider.otherwise(function ($injector, $location) {
                     var state = $injector.get('$state');
                     state.go('app.error', {errorStatus: 404});
                     return $location.path();
                 });

                $stateProvider
                    .state('app', {
                        abstract: true,
                        template: require('../tpl/app.html'),
                        controller: 'AppCtrl as appCtrl'
                    })
                    .state('app.user-list', {
                        url: '/user-list',
                        template: require('../tpl/userList.html'),
                        controller: 'UserListCtrl as userList'
                    })
                    //Error
                    .state('app.error', {
                        url: '/error/:errorStatus',
                        template:require('../tpl/error.html'),
                        params: {errorObj: null},
                        controller: 'ErrorCtr as error'
                    })
            }
        ]);
}
