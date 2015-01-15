/**
 * Created by tferguson on 26/11/2014.
 */

'use strict';

(function () {

    angular.module('insightExplorer').controller('SideCtrl', ['$scope', '$http', '$q', function ($scope, $http, $q) {

        var self = this;
        var selectedLists = [];
        var selected = [];

        $scope.dataFields = [];
        $scope.charts = [];
        $scope.selected = [];

        self.dimensions = {
            key: {},
            value: {},
            radius: {}
        };
        self.numDimensions = 0;

        $q.all([
            $http.get('sidebar/charts.json'),
            $http.get('sidebar/groupingProperties.json'),
            $http.get('sidebar/dimensions.json')
        ]).then(function (results) {
            $scope.charts = results[0].data;
            $scope.subProps = results[1].data;
            $scope.dimensions = results[2].data;
        });

        $scope.selectDimension = function (index, dimension, dataField, subProp) {
            var deselectDimension = function () {
                var indexOfDimension = $.inArray(self.dimensions[dimension].name, $scope.dataFields);
                var dimensionGroupingProp = self.dimensions[dimension].groupingProperty;

                // dimension was on a grouping property
                if (selected[indexOfDimension][dimensionGroupingProp]) {
                    //deselect previous dimension
                    selected[indexOfDimension][dimensionGroupingProp][dimension] = '';
                // dimension was on a dataField
                } else {
                    //deselect previous dimension
                    selected[indexOfDimension][dimension] = '';
                }
            };

            var selectNewDimension = function (subProp) {
                if (subProp) {
                    selected[index][subProp][dimension] = dimension;
                } else {
                    selected[index][dimension] = dimension;
                }
                self.dimensions[dimension].name = dataField;
                self.dimensions[dimension].groupingProperty = subProp;
            };

            //Case where subProp is already selected
            if (subProp && selected[index][subProp][dimension]) {
                selected[index][subProp][dimension] = '';
                self.dimensions[dimension] = {};
                self.numDimensions--;
            //Case where dataField already selected
            } else if (selected[index][dimension]) {
                selected[index][dimension] = '';
                self.dimensions[dimension] = {};
                self.numDimensions--;
            //Case where dimension has been chosen elsewhere
            } else if (!$.isEmptyObject(self.dimensions[dimension])) {
                deselectDimension();
                selectNewDimension(subProp);
            //Case where dimension is a first time selection
            } else {
                selectNewDimension(subProp);
                self.numDimensions++;
            }
        };

        $scope.selectProperty = function (index, subProp) {
            if (!selected[index]) {
                selected[index] = {};
            }

            if (subProp) {
                selected[index][subProp] = $.isEmptyObject(selected[index][subProp]) ? {name: subProp} : {};
            } else {
                selected[index].index = selected[index].index >= 0 ? -1 : index;
            }
        };

        $scope.listOptions = function (index, event) {
            event.stopPropagation();
            selectedLists[index] = selectedLists[index] >= 0 ? -1 : index;
        };

        $scope.optionsListed = function (index) {
            return selectedLists[index] === index;
        };

        $scope.isSelectedProperty = function (index, subProp) {
            if (!$.isEmptyObject(selected[index])) {
                if (subProp) {
                    if (!$.isEmptyObject(selected[index][subProp])) {
                        return selected[index][subProp].name === subProp;
                    }
                } else {
                    return selected[index].index === index;
                }
            }
        };

        $scope.isSelectedDimension = function (index, dimension, subProp) {
            if (selected[index]) {
                if (subProp) {
                    if (!$.isEmptyObject(selected[index][subProp])) {
                        return selected[index][subProp][dimension] === dimension ? dimension : false;
                    }
                } else {
                    return selected[index][dimension] === dimension ? dimension : false;
                }
            }
        };

        $scope.enableByChosenProperties = function (value) {
            var filterByNumProperties = value.type === 'SimpleBubbleChart' ? self.numDimensions >= 3 : self.numDimensions >= 2;

            if (filterByNumProperties) {
                var isOrdinal = !Number(self.data[0][self.dimensions.key.name]);

                return isOrdinal ? value.type === 'SimpleLineChart' || value.type === 'SimpleScatterChart' : false;
            }

            return true;
        };

        $scope.selectChart = function (chartType) {
            $scope.$root.$broadcast('chartSelected', {
                chartType: chartType,
                data: self.data,
                dimensions: self.dimensions
            });
        };

        $scope.$on('dataReceived', function (event, args) {
            self.data = args.data;
            $scope.dataFields = Object.keys(self.data[0]);

        });
    }]);
})();

