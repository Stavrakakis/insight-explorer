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

        scope.select(1, 'name');
        expect(scope.dataProperties).toEqual(['name']);

        scope.select(0, 'age');
        expect(scope.dataProperties).toEqual(['name', 'age']);

        scope.select(3, 'nationality');
        expect(scope.dataProperties).toEqual(['name', 'age', 'nationality']);
    });

    it('should forget the last property selected by the user if clicked again', function() {

        //Properties are initially selected
        scope.select(1, 'name');
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        //Property is deselected by re-clicking
        scope.select(3, 'nationality');

        expect(scope.dataProperties).toEqual(['name', 'age']);
    });

    it('should keep track of properties that have been chosen after deselection', function() {

        //Properties are initially selected
        scope.select(1, 'name');
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        //Property is deselected by re-clicking
        scope.select(3, 'nationality');

        //Property is re-selected by clicking
        scope.select(3, 'nationality');

        expect(scope.dataProperties).toEqual(['name', 'age', 'nationality']);

        //Properties are deselected by re-clicking
        scope.select(3, 'nationality');
        scope.select(0, 'age');

        //New properties are selected by clicking
        scope.select(2, 'salary');
        scope.select(4, 'occupation');

        expect(scope.dataProperties).toEqual(['name', 'salary', 'occupation']);

    });

    it('should forget all subsequent chosen properties if a selection is clicked again', function() {

        //Properties are initially selected
        scope.select(1, 'name');
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        //Property is deselected by re-clicking
        scope.select(0, 'age');

        expect(scope.dataProperties).toEqual(['name']);

        //Properties are reselected
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        //Property is deselected by re-clicking
        scope.select(1, 'name');

        expect(scope.dataProperties).toEqual([]);
    });

    it('should highlight the chosen key property', function() {

        scope.select(1, 'name');

        expect(scope.isSelected(1, 0)).toBe(true);
    });

    it('should highlight the chosen value property and keep the key property highlighted', function() {

        scope.select(1, 'name');
        scope.select(0, 'age');

        expect(scope.isSelected(1, 0)).toBe(true);
        expect(scope.isSelected(0, 1)).toBe(true);
    });

    it('should highlight the chosen radius property and keep the key and value properties highlighted', function() {

        scope.select(1, 'name');
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        expect(scope.isSelected(1, 0)).toBe(true);
        expect(scope.isSelected(0, 1)).toBe(true);
        expect(scope.isSelected(3, 2)).toBe(true);
    });

    it('should deselect the radius property and only the radius property when clicked again', function() {

        //Properties are initially selected
        scope.select(1, 'name');
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        //Property is deselected by re-clicking
        scope.select(3, 'nationality');

        expect(scope.isSelected(1, 0)).toBe(true);
        expect(scope.isSelected(0, 1)).toBe(true);
        expect(scope.isSelected(3, 2)).toBe(false);
    });

    it('should re-highlight the radius property if the same one is selected again', function() {

        //Properties are initially selected
        scope.select(1, 'name');
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        //Property is deselected by re-clicking
        scope.select(3, 'nationality');

        //Property is reselected by clicking again
        scope.select(3, 'nationality');

        expect(scope.isSelected(1, 0)).toBe(true);
        expect(scope.isSelected(0, 1)).toBe(true);
        expect(scope.isSelected(3, 2)).toBe(true);
    });

    it('should highlight a new radius Property if selection is made after a deselection', function() {

        //Properties are initially selected
        scope.select(1, 'name');
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        //Property is deselected by re-clicking
        scope.select(3, 'nationality');

        //Property is reselected by clicking again
        scope.select(2, 'salary');

        expect(scope.isSelected(1, 0)).toBe(true);
        expect(scope.isSelected(0, 1)).toBe(true);
        expect(scope.isSelected(2, 2)).toBe(true);
    });

    it('should deselect the radius and value properties if the selected value property is clicked', function() {

        //Properties are initially selected
        scope.select(1, 'name');
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        //Property is deselected by re-clicking
        scope.select(0, 'age');

        expect(scope.isSelected(1, 0)).toBe(true);
        expect(scope.isSelected(0, 1)).toBe(false);
        expect(scope.isSelected(3, 2)).toBe(false);

    });

    it('should deselect the radius, value and key properties if the selected key property is clicked', function() {

        //Properties are initially selected
        scope.select(1, 'name');
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        //Property is deselected by re-clicking
        scope.select(1, 'name');

        expect(scope.isSelected(1, 0)).toBe(false);
        expect(scope.isSelected(0, 1)).toBe(false);
        expect(scope.isSelected(3, 2)).toBe(false);

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
