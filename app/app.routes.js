/**
 * Created by tferguson on 20/11/2014.
 */

angular.module('insightExplorer')
    .config(function ($routeProvider) {

        'use strict';

        $routeProvider
            .when('/', {
                templateUrl: 'charts/main.html',
                controller: 'MainCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });

