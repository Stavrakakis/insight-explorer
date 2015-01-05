/**
 * Created by tferguson on 26/11/2014.
 */

(function() {

    angular.module('insightExplorer').controller('SideCtrl', ['$scope', '$http', function ($scope, $http) {

        var self = this;
        var selectedLists = [];
        var selected = [];

        $scope.dataFields = [];
        $scope.dataProperties = [];
        $scope.charts = [];
        $scope.selected = [];

        self.dimensions = {};
        self.prop = 0;
        self.numDimensions = 0;

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

        $scope.selectDimension = function(index, dimension, dataField, subProp) {

            if (subProp) {

                $scope.select(index, dimension, subProp);
                self.dimensions[dimension] = dataField; //this needs fixed
                self.numDimensions++;// this too
            } else {

                $scope.select(index, dimension);
                self.dimensions[dimension] = dataField;
                self.numDimensions++;
            }

        };

        $scope.select = function(index, option, subProp) {

//            if($.isEmptyObject(($scope.selected[item]))) {
//
//                selectProperty(item);
//                setProperty(dataField);
//            } else {
//
//                removeProperty(item);
//                deselectProperty(item);
//            }
            if(!selected[index]){
                selected[index] = {};
            }

            if(subProp) {

                selected[index][subProp][option] = selected[index][subProp][option] ? '' : option;
            }else if(option) {

                selected[index][option] = selected[index][option] ? '' : option;
            } else {

                selected[index].index = selected[index].index >= 0 ? -1 : index;
            }
        };

        $scope.listOptions = function(index) {

            selectedLists[index]  =  selectedLists[index] >= 0 ? -1 : index;
        };

        $scope.optionsListed = function(index) {

            return selectedLists[index] === index;
        };


        $scope.isSelected = function(index, option, subProp) {

            if(selected[index]) {

                if (subProp && selected[index][subProp]) {
                    return selected[index][subProp][option] === option;
                } else if (option) {
                    return selected[index][option] === option;
                } else {
                    return selected[index].index === index;
                }
            }
        };

        $scope.enableByChosenProperties = function (value) {

            var filterByNumProperties = value.type === 'SimpleBubbleChart' ? self.numDimensions >= 3 : self.numDimensions >= 2;

            if (filterByNumProperties) {

                var isOrdinal = !Number(self.data[0][self.dimensions.key]);

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

