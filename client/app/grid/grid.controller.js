'use strict';

angular.module('fullGridApp')
  .controller('GridCtrl', function ($scope, $http) {

 $scope.columnDefs = [
        {headerName: "Athlete", field: "athlete", width: 150, editable: true},
        {headerName: "Age", field: "age", width: 90},
        {headerName: "Country", field: "country", width: 120},
        {headerName: "Year", field: "year", width: 90},
        {headerName: "Date", field: "date", width: 110},
        {headerName: "Sport", field: "sport", width: 110},
        {headerName: "Gold", field: "gold", width: 100},
        {headerName: "Silver", field: "silver", width: 100},
        {headerName: "Bronze", field: "bronze", width: 100},
        {headerName: "Total", field: "total", width: 100}
    ];

    var newDegs = [
        {headerName: "Foo", field: "Foo", width: 150, editable: true},
        {headerName: "Age", field: "age", width: 90},
        {headerName: "Country", field: "country", width: 120},
        {headerName: "Year", field: "year", width: 90},
        {headerName: "Date", field: "date", width: 110},
        {headerName: "Sport", field: "sport", width: 110},
        {headerName: "Gold", field: "gold", width: 100},
        {headerName: "Silver", field: "silver", width: 100},
        {headerName: "Bronze", field: "bronze", width: 100},
        {headerName: "Total", field: "total", width: 100}
        ];

    $scope.gridOptions = {
        columnDefs: $scope.columnDefs,
        rowData: null,
        enableSorting: true,
        enableFilter: true,
        enableColResize: true,
        rowSelection: 'multiple',
        checkbox: true,
        groupUseEntireRow: true,
        groupKeys: ['athlete'],
        showToolPanel: true,
        ready: function() {
            $scope.gridOptions.api.sizeColumnsToFit()
        }


    };

    $scope.reloadDefs = function() {
      $scope.columnDefs = newDegs;
      $scope.gridOptions.api.onNewCols();
    };

    $http.get('olym.json')
        .success(function(data){
            $scope.gridOptions.rowData = data.rows;
            $scope.columnDefs = data.settings;
            $scope.gridOptions.api.onNewRows();
            console.log(data);
        });


  });
