'use strict';

/**
 * @ngdoc function
 * @name insightExplorer.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the insightExplorer
 */
angular.module('insightExplorer')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
