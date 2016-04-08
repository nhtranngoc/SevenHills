angular.module('sevenHillsApp')
.controller('addController', function($scope, $http) {
    $scope.materials = [];
    $scope.$on('$stateChangeSuccess', function () {
        $http.get('/tags').then(
            function (data){
                $scope.tags = data.data.map(function(item){
                    return item['TagName'];
                })
                console.log($scope.tags);
            },
            function (data, status) {
                console.log(status, data)
            })
        $http.get('/materials').then(
            function(data){
                console.log(data.data);
                //data.data is an array of objects, containing material info.
                $scope.materials = data.data;
            },
            function(data, status){
                console.log(status, data);
            })
    });
    $scope.category = [];
    $scope.refreshResults = function($select) {
        var search = $select.search,
            list = angular.copy($select.items),
            FLAG = -1;
        // remove last user input
        list = list.filter(function(item) {
            return item.materialid !== FLAG;
        });
        if (!search) {
            console.log("on the list");
            //use the predefined list
            $select.items = list;
            // $scope.Vendor = search.Vendor;
        } else {
            console.log("not on the list");
            //manually add user input and set selection
            var userInputItem = {
                materialid: FLAG,
                MaterialName: search,
                Vendor: "Third Party"
            };
            $select.items = [userInputItem].concat(list);
            $select.selected = userInputItem;
        }
    }
    $scope.showVendor = 3;
    $scope.onSelectCallback = function($item) {
        var obj = $scope.materials.filter(function ( obj ) {
            return obj.Vendor === $item.Vendor;
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
        $scope.mat = {};
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
    $scope.addNewTag = function($item){
        var cur = angular.copy($item);
        $scope.category.push(cur);
    }
    $scope.removeTag = function($item){
        console.log($item);
        var index = $scope.category.indexOf($item);
        if (index > -1){
            $scope.category.splice(index, 1);
        }
    }
    $scope.refreshDiff = function(){
        console.log($scope.solDiff);
    }
    $scope.packAndSubmit = function(){
        var formInfo = {
            Name:$scope.solName,
            Description:$scope.solDes,
            Category:$scope.category,
            Materials:$scope.formItems,
            Time:$scope.solTime,
            Difficulty: parseInt($scope.solDiff),
            Cost: $scope.solCost,
            Instruction:$scope.solInst
        };
        $http.post('/submit', formInfo).then(
            function(data){
                console.log(data);
                $scope.addSolForm.$setPristine();
                $scope.solName = "";
                $scope.category = [];
                $scope.formItems = [];
                $scope.solTime = {};
                $scope.solDiff = "";
                $scope.solCost = {};
                $scope.solInst = "";
                alert('Form submitted successfully! Thanks Abby!');
            },
            function(data, status){
                console.log(status, data);
            });
    }
})