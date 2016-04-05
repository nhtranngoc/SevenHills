angular.module('sevenHillsApp')
.controller('addController', function($scope) {
    $scope.tables = [{
        id: 1,
        description: "Cup Holder",
        vendor: "Amarok Technologies"
    }, {
        id: 2,
        description: "iPhone",
        vendor: "Apple"
    }]
    $scope.category = [];
    $scope.tags = ['Mobility', 'High Tech', 'Low Tech', 'Awesome Tech'];
    $scope.refreshResults = function($select) {
        var search = $select.search,
            list = angular.copy($select.items),
            FLAG = -1;
        // remove last user input
        list = list.filter(function(item) {
            return item.id !== FLAG;
        });
        if (!search) {
            console.log("on the list");
            //use the predefined list
            $select.items = list;
            // $scope.vendor = search.vendor;
        } else {
            console.log("not on the list");
            //manually add user input and set selection
            var userInputItem = {
                id: FLAG,
                description: search,
                vendor: "Third Party"
            };
            $select.items = [userInputItem].concat(list);
            $select.selected = userInputItem;
        }
    }
    $scope.showVendor = 3;
    $scope.onSelectCallback = function($item) {
        var obj = $scope.tables.filter(function ( obj ) {
            return obj.vendor === $item.vendor;
        })[0];
        console.log(obj);
        if (obj == null){
           $scope.showVendor = 1;
        } else {
            $scope.showVendor = 2;
        }
    }
    $scope.mat = {};
    $scope.formItems = [];
    $scope.addMat = function() {
        var cur = angular.copy($scope.mat);
        $scope.formItems.push(cur);
        console.log($scope.formItems);
    }
    $scope.clear = function($event, $select) {
        //stops click event bubbling
        $event.stopPropagation();
        //to allow empty field, in order to force a selection remove the following line
        $select.selected = undefined;
        //reset search query
        $select.search = undefined;
        //focus and open dropdown
        $select.activate();
    }
    $scope.clearRow = function($event, x) {
        $event.stopPropagation();
        // console.log(x);
        var index = $scope.formItems.indexOf(x);
        if (index > -1){
            $scope.formItems.splice(index, 1);
        }
    }
})