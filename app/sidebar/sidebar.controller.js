/**
 * Created by tferguson on 26/11/2014.
 */

angular.module('insightExplorer').controller('SideCtrl', ['$scope', '$http', function ($scope, $http) {

    'use strict';

    var self = this;

    $scope.dataFields = [];
    $scope.dataProperties = [];
    $scope.charts = [];

    $http.get('sidebar/charts.json')
        .success(function(data) {
            $scope.charts = data;
        });

    $http.get('./data.json')
        .success(function(data) {
            self.data = data;

            $scope.dataFields = Object.keys(data[0]);
        });

    $scope.setProperty = function(dataField) {

        $scope.dataProperties.push(dataField);
    };

    $scope.filterByDataProperties = function(value) {

        return !(value === $scope.dataProperties[0] || value === $scope.dataProperties[1]);
    };

    $scope.filterByChosenProperties = function(value) {

        var filterByNumProperties = value.type === 'SimpleBubbleChart' ? $scope.dataProperties.length >= 3 : $scope.dataProperties.length >= 2;

        if (filterByNumProperties) {

            var isOrdinal = !Number(self.data[0][$scope.dataProperties[0]]);

            return isOrdinal ? !(value.type === 'SimpleLineChart' || value.type === 'SimpleScatterChart') : true;
        }

        return false;
    };

    $scope.selectChart = function(chartType) {

        $scope.$root.$broadcast('chartSelected', {
            chartType: chartType,
            data: self.data,
            dataProperties: $scope.dataProperties
        });
       console.log('binding success!');
    };
}]);

