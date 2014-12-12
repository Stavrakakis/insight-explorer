
'use strict';

describe('Controller: MainCtrl', function () {

    var scope, rootScope, ctrl, element, mockChart;

    beforeEach(function() {

        module('insightExplorer');

        inject(function($rootScope, $controller) {
            rootScope = $rootScope;
            scope = rootScope.$new();
            ctrl = $controller('MainCtrl', {$scope: scope});
        });

        element = document.createElement('div');
        element.id = 'chart';
        element.innerHTML = 'I am not empty!';
        document.body.appendChild(element);

        mockChart = jasmine.createSpyObj('chart', ['build', 'draw']);
        mockChart.build.and.returnValue(mockChart);
        insight.MockChart = jasmine.createSpy().and.callFake(function() {
            return mockChart;
        });
    });

    afterEach(function() {

        $(element).remove();
    });

    it('should clear out the contents of the #chart div if and only if it hears the event "chartSelected"', function() {

        rootScope.$broadcast('someEvent', {
            chartType: 'MockChart',
            data: [],
            dataProperties: []
        });

        expect($(element).is(':empty')).toBe(false);

        rootScope.$broadcast('chartSelected', {
            chartType: 'MockChart',
            data: [],
            dataProperties: []
        });

        expect($(element).is(':empty')).toBe(true);
    });


    it('should draw a chart in the #chart div with arguments received if and only if it hears the event "chartSelected"', function() {

        var data = [
            {
                name: 'Sam',
                age: 24,
                job: 'hacker'
            },
            {
                name: 'Jack',
                age: 45,
                job: 'plumber'
            }
        ];

        rootScope.$broadcast('someEvent', {
            chartType: 'MockChart',
            data: [],
            dataProperties: []
        });

        expect(mockChart.draw).not.toHaveBeenCalled();

        rootScope.$broadcast('chartSelected', {
            chartType: 'MockChart',
            data: data,
            dataProperties: ['name', 'age']
        });

        expect(insight.MockChart).toHaveBeenCalledWith(data, '#chart', 'name', 'age');
        expect(mockChart.build).toHaveBeenCalled();
        expect(mockChart.draw).toHaveBeenCalled();
    });
});
