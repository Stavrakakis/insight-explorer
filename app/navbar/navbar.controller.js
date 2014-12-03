/**
 * Created by tferguson on 24/11/2014.
 */
/*globals Dropbox*/

(function() {

    'use strict';

    angular.module('insightExplorer').controller('NavCtrl', ['$scope', '$http', '$location' , function ($scope, $http, $location) {

        var options = {
            success: function (files) {
                $scope.submitUrl(files[0].link);
            },
            linkType: 'direct',
            extensions: ['.json']
        };

        var button = Dropbox.createChooseButton(options);
        document.getElementById('dropbox-button').appendChild(button);

        $scope.submitUrl = function (url) {

            url = url ? url : $scope.url;

            $http.get(url)
                .success(function (data) {
                    $scope.$root.$broadcast('dataReceived', {
                        data: data
                    });
                });
        };


        $scope.isActive = function (location) {

            return location === $location.path();
        };


    }]);
})();