/**
 * Created by tferguson on 24/11/2014.
 */

angular.module('insightExplorer').controller('NavCtrl', ['$scope', '$location' , function($scope, $location) {

    $scope.isActive = function(location) {

        return location === $location.path();
    }
}]);
