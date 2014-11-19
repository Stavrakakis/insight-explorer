/**
 * Created by tferguson on 19/11/2014.
 */

angular.module('insightExplorer').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'chartCanvas/main.html',
            controller: 'MainCtrl'
        })
        .when('/canvas', {
            templateUrl: 'chartCanvas/chart-canvas.html',
            controller: 'ChartCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
});