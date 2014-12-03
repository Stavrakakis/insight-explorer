/**
 * Created by tferguson on 01/12/2014.
 */


'use strict';

describe('Controller: SideCtrl', function () {

    var scope, rootScope, ctrl;

    beforeEach(function() {

        module('insightExplorer');

        inject(function($rootScope, $controller) {
            rootScope = $rootScope;
            scope = rootScope.$new();
            ctrl = $controller('SideCtrl', {$scope: scope});
        });
    });

    afterEach(function() {});

    it('should keep track of properties selected by the user for charting', function() {

        scope.setProperty('name');
        scope.setProperty('age');
        scope.setProperty('nationality');

        expect(scope.dataProperties).toEqual(['name', 'age', 'nationality']);
    });


    it('should broadcast the event chartSelected with the relevant information when selectChart is called', function() {

        spyOn(rootScope, '$broadcast');

        scope.selectChart('MockChart');

        expect(rootScope.$broadcast).toHaveBeenCalledWith('chartSelected', {
            chartType: 'MockChart',
            data: ctrl.data,
            dataProperties: scope.dataProperties
        });
    });
});
