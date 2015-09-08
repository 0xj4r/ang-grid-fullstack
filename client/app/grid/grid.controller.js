'use strict';

angular.module('fullGridApp')
    .controller('GridCtrl', function ($scope, $http) {
        $scope.updateRows = [];
        $scope.columnDefs = [
            { headerName: "SelectRow", field: "SelectRow", width: 100, hide: true },
            { headerName: "NpiID", field: "NpiId", width: 100, checkboxSelection: true },
            { headerName: "DieName", field: "DieName", width: 150 },
            { headerName: "DieNameID", field: "DieNameID", width: 100 },
            { headerName: "ProcessID", field: "ProcessID", width: 100, editable: true, cellValueChanged: cellUpdatedHandler },
            { headerName: "DotProcessID", field: "DotProcessID", width: 100 },
            { headerName: "Revision", field: "Revision", width: 100 },
            { headerName: "Stepping", field: "Stepping", width: 100 },
            { headerName: "DieArchitecture", field: "DieArchitecture", width: 100 },
            { headerName: "DotProcessName", field: "DotProcessName", width: 100 },
            { headerName: "LrpOrgName", field: "LrpOrgName", width: 100 },
            { headerName: "LrpIngredientName", field: "LrpIngredientName", width: 100 },
            { headerName: "DemandGroup", field: "DemandGroup", width: 100 },
            { headerName: "LRPFab", field: "LRPFab", width: 100 },
            { headerName: "DieSize", field: "DieSize", width: 100 },
            { headerName: "Cache", field: "Cache", width: 100 },
            { headerName: "Cores", field: "Cores", width: 100 },
            { headerName: "Package", field: "Package", width: 100 },
            { headerName: "ITO Status", field: "ITO Status", width: 100 },
            { headerName: "NpiGroupID", field: "NpiGroupID", width: 100, editable: true, cellValueChanged: cellUpdatedHandler },
            { headerName: "ProductStatusID", field: "ProductStatusID", width: 100 },
            { headerName: "NpiID2", field: "NpiID2", width: 100 },
            { headerName: "NpiFabID", field: "NpiFabID", width: 100 },
            { headerName: "FabID", field: "FabID", width: 100 },
            { headerName: "NpiID3", field: "NpiID3", width: 100 },
            { headerName: "Seats", field: "Seats", width: 100 },
            { headerName: "SramCpuHours", field: "SramCpuHours", width: 100 },
            { headerName: "SramDieSize", field: "SramDieSize", width: 100 },
            { headerName: "EVariable", field: "EVariable", width: 100 },
            { headerName: "AreaOfDatabase", field: "AreaOfDatabase", width: 100 },
            { headerName: "DiskSpaceForecast", field: "DiskSpaceForecast", width: 100 },
            { headerName: "DiskSpaceActual", field: "DiskSpaceActual", width: 100 },
            { headerName: "DistComputeForecastFE", field: "DistComputeForecastFE", width: 100 },
            { headerName: "DistComputeForecastBE", field: "DistComputeForecastBE", width: 100 },
            { headerName: "DistComputeActualFE", field: "DistComputeActualFE", width: 100 },
            { headerName: "DistComputeActualBE", field: "DistComputeActualBE", width: 100 },
            { headerName: "TrendTapeOut", field: "TrendTapeOut", width: 100 },
            { headerName: "ImoQueueTime", field: "ImoQueueTime", width: 100 },
            { headerName: "ImoStartDate", field: "ImoStartDate", width: 100 },
            { headerName: "StartingEndingLayers", field: "StartingEndingLayers", width: 100 },
            { headerName: "NpiTypeID", field: "NpiTypeID", width: 100 },
            { headerName: "FabStartDate", field: "FabStartDate", width: 100 },
            { headerName: "ReticleReorder", field: "ReticleReorder", width: 100 },
            { headerName: "C4SiteID", field: "C4SiteID", width: 100 },
            { headerName: "FabComplexityID", field: "FabComplexityID", width: 100 },
            { headerName: "FabNppWWID", field: "FabNppWWID", width: 100 },
            { headerName: "FabPeWWID", field: "FabPeWWID", width: 100 },
            { headerName: "FabComment", field: "FabComment", width: 100 },
            { headerName: "SortSiteID", field: "SortSiteID", width: 100 },
            { headerName: "SortSiuNeedDate", field: "SortSiuNeedDate", width: 100 },
            { headerName: "SortStartDate", field: "SortStartDate", width: 100 },
            { headerName: "SortNppWWID", field: "SortNppWWID", width: 100 },
            { headerName: "SortPeWWID", field: "SortPeWWID", width: 100 },
            { headerName: "SiuName", field: "SiuName", width: 100 },
            { headerName: "DivisionSiuWWID", field: "DivisionSiuWWID", width: 100 },
            { headerName: "SortPlatform", field: "SortPlatform", width: 100 },
            { headerName: "SortComment", field: "SortComment", width: 100 },
            { headerName: "CdpSiteID", field: "CdpSiteID", width: 100},
            { headerName: "CdpStartDate", field: "CdpStartDate", width: 100},
            { headerName: "CdpNppWWID", field: "CdpNppWWID", width: 100 },
            { headerName: "CdpComment", field: "CdpComment", width: 100 },
            { headerName: "SortStartDateOverride", field: "SortStartDateOverride", width: 100 },
            { headerName: "FabStartDateOverride", field: "FabStartDateOverride", width: 100 },
            { headerName: "TrendTapeOutOverride", field: "TrendTapeOutOverride", width: 100 },
            { headerName: "CdpStartDateOverride", field: "CdpStartDateOverride", width: 100 },
            { headerName: "RawEstDpw", field: "RawEstDpw", width: 100 }];

        $scope.secondaryDefs = [
            { headerName: "NpiID", field: "NpiID", width: 100, filter: 'set', filterParams: { values: ['1704'], newRowsAction: 'keep' } },
            { headerName: "NpiDieLevelID", field: "NpiDieLevelID", width: 100 },
            { headerName: "DieName", field: "DieName", width: 100 },
            { headerName: "Revision", field: "Revision", width: 100 },
            { headerName: "Stepping", field: "Stepping", width: 100 },
            { headerName: "EPP", field: "EPP", width: 100 },
            { headerName: "AKA", field: "AKA", width: 100 },
            { headerName: "Classification", field: "Classification", width: 100 },
            { headerName: "DieLevelID", field: "DieLevelID", width: 100 },
            { headerName: "FabDevice", field: "FabDevice", width: 100 },
            { headerName: "SortDevice", field: "SortDevice", width: 100 },
            { headerName: "TapeInFeTrend", field: "TapeInFeTrend", width: 100 },
            { headerName: "TapeInBeTrend", field: "TapeInBeTrend", width: 100 },
            { headerName: "TapeInFePor", field: "TapeInFePor", width: 100 },
            { headerName: "TapeInBePor", field: "TapeInBePor", width: 100 },
            { headerName: "WaferRequest", field: "WaferRequest", width: 100 },
            { headerName: "Platform", field: "Platform", width: 100 },
            { headerName: "FirstPrq", field: "FirstPrq", width: 100 },
            { headerName: "NpiJustification", field: "NpiJustification", width: 100 },
            { headerName: "SteppingReason", field: "SteppingReason", width: 100 },
            { headerName: "TapeInDateChangeReason", field: "TapeInDateChangeReason", width: 100 },
            { headerName: "FirstAssySiteID", field: "FirstAssySiteID", width: 100 },
            { headerName: "AssyInDate", field: "AssyInDate", width: 100 },
            { headerName: "DivisionNppWWID", field: "DivisionNppWWID", width: 100 },
            { headerName: "PdtChairWWID", field: "PdtChairWWID", width: 100 },
            { headerName: "AssyInDateOverride", field: "AssyInDateOverride", width: 100 },
            { headerName: "DotProcessID", field: "DotProcessID", width: 100 }];

        $scope.gridOptions = {
            columnDefs: $scope.columnDefs,
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            rowSelection: 'multiple',
            rowDeselection: true,
            rowSelected: rowSelectedFunc,
            groupUseEntireRow: true,
            groupKeys: [],
            pinnedColumnCount: 7,
            showToolPanel: true
        };
    
        // Adds rows that have been updated to an array for saving
        function cellUpdatedHandler(params) {
            var index = $scope.updateRows.indexOf(params.rowIndex);
            if (params.oldValue != params.newValue && index < 0) {
                $scope.updateRows.push(params.rowIndex);
            }
            else {
                $scope.updateRows.splice(index, 1);
            }
        };
      
     
        // Secondary Grid Options
        $scope.secOptions = {
            columnDefs: $scope.secondaryDefs,
            rowData: null,
            enableSorting: true,
            enableFilter: true,
            enableColResize: true,
            checkbox: true,
            groupUseEntireRow: true
        };

        $scope.filterModel = [];

        function rowSelectedFunc(row) {
            //console.log($scope.gridOptions.selectedRows);
        }; 

        // Fetch grid data from server.
        $http.get('api/sql')
            .success(function (data) {
                $scope.gridOptions.rowData = data[0];
                $scope.secOptions.rowData = data[1];
                $scope.gridOptions.api.onNewRows();
                $scope.secOptions.api.onNewRows();
            })
            .error(function (data) {
                alert("Unsuccesful fetching data for NPI tab." + JSON.stringify(data));
            });
        
        // Hides and shows the tool panel
        $scope.toggleToolPanel = function () {
            $scope.gridOptions.api.showToolPanel(!$scope.gridOptions.showToolPanel);
            $scope.gridOptions.showToolPanel = !$scope.gridOptions.showToolPanel;
        }
        
        //Refresh the data
        $scope.updateGridData = function () {
            console.log('update');
            $http.get('api/sql')
                .success(function (data) {
                    $scope.gridOptions.rowData = data[0];
                    $scope.secOptions.rowData = data[1];
                    $scope.gridOptions.api.onNewRows();
                    $scope.secOptions.api.onNewRows();
                })
                .error(function (data) {
                    alert("Unsuccesful fetching data for NPI tab." + JSON.stringify(data));
                });
        }
         
        // Update rows in server.      
        $scope.saveGridData = function () {
            var updateRows = $scope.getItemRows();
            //console.log(updateRows);
            if (updateRows.length > 0) {
                updateRows[0].CdpStartDate = new Date(updateRows[0].CdpStartDate);
                                updateRows[0].TrendTapeOut = new Date(updateRows[0].TrendTapeOut);
                                                updateRows[0].FabStartDate = new Date(updateRows[0].FabStartDate);
                console.log("sending request for save");
                console.log(JSON.stringify(updateRows));
                $http.post('api/sql/save', {
                    rows: updateRows
                })
                    .success(function (data) {
                        console.log("success");
                       // console.log(JSON.stringify(data));
                    })
                    .error(function (data) {
                        console.log("error :("); 
                        console.log(JSON.stringify(data));
                    });
            }
            else {
                alert("Nothing to save, yet.");
            }
        };

        $scope.getItemRows = function () {
            var rows = $scope.updateRows.map(function (index) {
                return $scope.gridOptions.rowData[index]
            });
            return rows;
        };

    });
