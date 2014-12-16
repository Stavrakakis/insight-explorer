/**
 * Created by tferguson on 26/11/2014.
 */

(function() {

    'use strict';

    angular.module('insightExplorer').controller('SideCtrl', ['$scope', '$http', function ($scope, $http) {

        var self = this;
        var selectedLists = [];
        var selected = [];

        $scope.dataFields = [];
        $scope.dataProperties = [];
        $scope.charts = [];
        $scope.selected = [];


        self.prop = 0;

        $http.get('sidebar/charts.json')
            .success(function (data) {
                $scope.charts = data;
            });

        var setProperty = function (dataField) {

            $scope.dataProperties.push(dataField);
        };

        var removeProperty = function(item) {

            $scope.dataProperties.splice($scope.selected[item].prop);

        };

        var selectProperty = function(item) {
            $scope.selected[item] = {
                item: item,
                prop: self.prop
            };
            self.prop++;
        };

        var deselectProperty = function(item) {

            $scope.selected.forEach(function(element) {
                if (element.prop > $scope.selected[item].prop) {
                    $scope.selected[element.item] = {};
                    self.prop--;
                }
            });
            $scope.selected[item] = {};
            self.prop--;

        };

        $scope.select = function(index, dataField) {

//            if($.isEmptyObject(($scope.selected[item]))) {
//
//                selectProperty(item);
//                setProperty(dataField);
//            } else {
//
//                removeProperty(item);
//                deselectProperty(item);
//            }

            selected[index] = selected[index] >= 0 ? -1 : index;
        };

        $scope.listOptions = function(index) {

            selectedLists[index]  =  selectedLists[index] >= 0 ? -1 : index;
        };

        $scope.optionsListed = function(index) {

            return selectedLists[index] === index;
        };


        $scope.isSelected = function(index) {

            return selected[index] === index;
        };

        $scope.enableByChosenProperties = function (value) {

            var filterByNumProperties = value.type === 'SimpleBubbleChart' ? $scope.dataProperties.length >= 3 : $scope.dataProperties.length >= 2;

            if (filterByNumProperties) {

                var isOrdinal = !Number(self.data[0][$scope.dataProperties[0]]);

                return isOrdinal ? value.type === 'SimpleLineChart' || value.type === 'SimpleScatterChart' : false;
            }

            return true;
        };

        $scope.selectChart = function (chartType) {

            $scope.$root.$broadcast('chartSelected', {
                chartType: chartType,
                data: self.data,
                dataProperties: $scope.dataProperties
            });
        };

        $scope.$on('dataReceived', function (event, args) {

            self.data = args.data;
            $scope.dataFields = Object.keys(self.data[0]);

        });
    }]);
})();

