/**
 * Created by tferguson on 20/11/2014.
 */

angular.module('insightExplorer')
    .config(function ($routeProvider) {

        'use strict';

        $routeProvider
            .when('#', {
                templateUrl: '',
                controller: ''
            })
            .when('#/about', {
                templateUrl: '',
                controller: ''
            })
            .when('#/contact', {
                templateUrl: '',
                controller: ''
            })
            .otherwise({
                redirectTo: '#'
            });
    });

