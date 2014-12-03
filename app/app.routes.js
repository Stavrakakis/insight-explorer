/**
 * Created by tferguson on 20/11/2014.
 */
(function() {

    'use strict';

    angular.module('insightExplorer')
        .config(function ($routeProvider) {

            $routeProvider
                .when('/', {
                    templateUrl: 'charts/chart.html',
                    controller: 'MainCtrl'
                })
                .when('/import', {
                    templateUrl: 'charts/chart.html',
                    controller: 'MainCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
            });
})();
