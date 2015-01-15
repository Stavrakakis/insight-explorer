/**
 * Created by tferguson on 01/12/2014.
 */

/* globals xit */


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

        scope.dataFields = ['name', 'age', 'nationality'];
    });

    afterEach(function() {});

    it('should highlight a property and show its dimension selectors when clicked', function() {

        expect(scope.isSelectedProperty(1)).toBeFalsy();
        expect(scope.isSelectedProperty(3)).toBeFalsy();

        scope.selectProperty(1);
        scope.selectProperty(3);
        expect(scope.isSelectedProperty(1)).toBe(true);
        expect(scope.isSelectedProperty(3)).toBe(true);
        expect(scope.isSelectedProperty(0)).toBeFalsy();

        scope.selectProperty(0);
        expect(scope.isSelectedProperty(0)).toBe(true);


    });

    it('should highlight a dimension if and only if it is clicked', function() {

        scope.selectProperty(1);
        expect(scope.isSelectedDimension(1, 'value')).toBe(false);

        scope.selectDimension(1, 'value', 'name');
        expect(scope.isSelectedDimension(1, 'value')).toBe('value');

        scope.selectProperty(0);
        scope.selectDimension(0, 'key', 'age');
        expect(scope.isSelectedDimension(1, 'value')).toBe('value');
        expect(scope.isSelectedDimension(0, 'key')).toBe('key');

        scope.selectProperty(3);
        scope.selectDimension(3, 'radius', 'nationality');
        expect(scope.isSelectedDimension(1, 'value')).toBe('value');
        expect(scope.isSelectedDimension(0, 'key')).toBe('key');
        expect(scope.isSelectedDimension(3, 'radius')).toBe('radius');
    });

    it('should keep track of dimensions selected by the user for charting', function() {

        //Show dimension selectors
        scope.selectProperty(1);
        scope.selectProperty(0);
        scope.selectProperty(3);

        scope.selectDimension(1, 'key', 'name');
        expect(ctrl.dimensions.key.name).toEqual('name');

        scope.selectDimension(0, 'value', 'age');
        expect(ctrl.dimensions).toEqual({
            key: {
                name: 'name',
                groupingProperty: undefined
            },
            value: {
                name: 'age',
                groupingProperty: undefined
            },
            radius: {}
        });

        scope.selectDimension(3, 'radius', 'nationality');
        expect(ctrl.dimensions).toEqual({
            key: {
                name: 'name',
                groupingProperty: undefined
            },
            value: {
                name: 'age',
                groupingProperty: undefined
            },
            radius: {
                name: 'nationality',
                groupingProperty: undefined
            }
        });
    });

    it('should deselect an old dimension when the same dimension is chosen on a different dataField', function() {

        //Select a dimension on a data field
        scope.selectProperty(1);
        scope.selectDimension(1, 'key', 'age');

        //Selected the same dimension on a different data field
        scope.selectProperty(2);
        scope.selectDimension(2, 'key', 'nationality');

        //correct dataField added to dimensions object
        expect(ctrl.dimensions.key).toEqual({name: 'nationality', groupingProperty: undefined});
        //correct selection class applied
        expect(scope.isSelectedDimension(2, 'key')).toBe('key');
        //old selection no longer selected
        expect(scope.isSelectedDimension(1, 'key')).toBe(false);
    });

    it('should deselect an old dimension when the same dimension is chosen on a different subProp', function() {

        //Select a dimension on a subProp of a dataField
        scope.selectProperty(1);
        scope.selectProperty(1, 'count');
        scope.selectDimension(1, 'key', 'age', 'count');

        //Selected the same dimension on a different subProp of a data field
        scope.selectProperty(2);
        scope.selectProperty(2, 'count');
        scope.selectDimension(2, 'key', 'nationality', 'count');

        //correct dataField and subProp added to dimensions object
        expect(ctrl.dimensions.key).toEqual({name: 'nationality', groupingProperty: 'count'});
        //correct selection class applied
        expect(scope.isSelectedDimension(2, 'key', 'count')).toBe('key');
        //old selection no longer selected
        expect(scope.isSelectedDimension(1, 'key', 'count')).toBe(false);
    });

    xit('should forget the last property selected by the user if clicked again', function() {

        //Properties are initially selected
        scope.select(1, 'name');
        scope.select(0, 'age');
        scope.select(3, 'nationality');

        //Property is deselected by re-clicking
        scope.select(3, 'nationality');

        expect(scope.dataProperties).toEqual(['name', 'age']);
    });

    xit('should keep track of properties that have been chosen after deselection', function() {

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

    xit('should forget all subsequent chosen properties if a selection is clicked again', function() {

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

    xit('should deselect the radius property and only the radius property when clicked again', function() {

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

    xit('should re-highlight the radius property if the same one is selected again', function() {

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

    xit('should highlight a new radius Property if selection is made after a deselection', function() {

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

    xit('should deselect the radius and value properties if the selected value property is clicked', function() {

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

    xit('should deselect the radius, value and key properties if the selected key property is clicked', function() {

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
            dimensions: ctrl.dimensions
        });
    });
});
