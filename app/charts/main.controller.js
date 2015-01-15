(function() {

    'use strict';

    /**
     * @ngdoc function
     * @name insightExplorer.controller:MainCtrl
     * @description
     * # MainCtrl
     * Controller of the insightExplorer
     */
    angular.module('insightExplorer').controller('MainCtrl', ['$scope', function ($scope) {


        $scope.$on('chartSelected', function (event, args) {

            $('#chart').empty();

            var chart = new insight[args.chartType](args.data, '#chart', args.dimensions.key.name, args.dimensions.value.name, args.dimensions.value.groupingProperty)
                .build();

            chart.draw();

        });
    }]);
})();