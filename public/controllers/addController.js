angular.module('sevenHillsApp').controller('addController', function($scope, $q, $rootScope, $http, $state, Upload, tagResolve, materialResolve) {
    $scope.materials = materialResolve;
    $scope.tags = tagResolve;
    $scope.category = [];
    $scope.formItems = [];
    if ($rootScope.edit) {
        //Populate add form with data from $rootScope.solutionToEdit;
        var solution = $rootScope.solutionToEdit.solution[0];
        var tags = $rootScope.solutionToEdit.tags;
        var materials = $rootScope.solutionToEdit.material;
        $scope.solName = solution.SolutionName;
        $scope.solDes = solution.Description;
        tags.forEach(function(element, index, array) {
            $scope.category.push(element.TagName);
        })
        materials.forEach(function(element, index, array) {
            $scope.formItems.push({
                select: {
                    MaterialName: element.materialname,
                    Vendor: element.vendor
                },
                quan: element.amount
            })
        })
        $scope.solTime = solution.Time;
        $scope.solDiff = !solution.Difficulty ? "0" : solution.Difficulty.toString();
        $scope.solCost = solution.EstimatedTotalCost;
        $scope.solInst = solution.Instruction;
        $http.post('/api/image', {solutionID: solution.solutionid}).then(
            function(data){
                // console.log("Loaded image successfully");
                var urlData = data.data.map(function(element){
                    var newURL;
                    newURL = "/uploaded/files/" + solution.solutionid.toString() + "/" + element;
                    return newURL;
                })
                $scope.$existFiles = urlData;
            })
    }
    var imageToRemove = [];
    $scope.removeImage = function(fileURL, index){
        $scope.$existFiles.splice(index, 1);
        imageToRemove.push(fileURL);
        // console.log(imageToRemove);
    }
    $scope.refreshResults = function($select) {
        var search = $select.search,
            list = angular.copy($select.items),
            FLAG = -1;
        // remove last user input
        list = list.filter(function(item) {
            return item.materialid !== FLAG;
        });
        if (!search) {
            // console.log("on the list");
            //use the predefined list
            $select.items = list;
            // $scope.Vendor = search.Vendor;
        } else {
            // console.log("not on the list");
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
        var obj = $scope.materials.filter(function(obj) {
            return obj.MaterialName === $item.MaterialName;
        })[0];
        // console.log(obj);
        if (obj == null) {
            $scope.showVendor = 1;
        } else {
            $scope.showVendor = 2;
        }
    }
    $scope.mat = {};
    $scope.addMat = function() {
        var cur = angular.copy($scope.mat);
        $scope.formItems.push(cur);
        $scope.mat = {};
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
        if (index > -1) {
            $scope.formItems.splice(index, 1);
        }
    }
    $scope.addNewTag = function($item) {
        var cur = angular.copy($item);
        $scope.category.push(cur);
    }
    $scope.removeTag = function($item) {
        // console.log($item);
        var index = $scope.category.indexOf($item);
        if (index > -1) {
            $scope.category.splice(index, 1);
        }
    }
    $scope.clearThumbnail = function(index) {
            $scope.$files.splice(index, 1);
        }
        // for multiple files:
    $scope.uploadFiles = function(files) {
        if (files && files.length) {
            Upload.upload({
                url: 'upload/url',
                method: 'POST',
                data: {
                    files: files
                }
            }).then(function(resp) {
                // console.log('Success' + resp.config);
                // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function(resp) {
                // console.log('Error status: ' + resp.status);
            }, function(evt) {
                $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        }
    }
    $scope.packAndSubmit = function(files) {
        var formInfo = {
            Name: $scope.solName,
            Description: $scope.solDes,
            Category: $scope.category,
            Materials: $scope.formItems,
            Time: $scope.solTime,
            Difficulty: parseInt($scope.solDiff),
            Cost: $scope.solCost,
            Instruction: $scope.solInst
        };
        if (!$rootScope.edit) {
            //This could've been handled better.
            $http.post('/api/submit', formInfo).then(function(data) {
                if (files && files.length) {
                    Upload.upload({
                        url: '/upload',
                        method: 'POST',
                        data: {
                            files: files,
                            id: data.data.solutionid
                        }
                    }).then(function(resp) {
                        unSetAdd();
                    }, function(resp) {
                        // console.log('Error status: ' + resp.status);
                    }, function(evt) {
                        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    });
                } else {
                    unSetAdd();
                }
            }, function(data, status) {
                // console.log(status, data);
            });
        } else {
            //If edit mode is true, update.
            formInfo.solutionID = solution.solutionid;
            // console.log(formInfo);
            $q.all([$http.post('/api/update', formInfo),
                    $http({
                        url: '/api/image',
                        method: 'DELETE',
                        data: {
                            solutionID:solution.solutionid, 
                            images:imageToRemove
                        },
                        headers: {'Content-Type': 'application/json;charset=utf-8'}
                    })])
            .then(function(data){
                if (files && files.length) {
                    Upload.upload({
                        url: '/upload',
                        method: 'POST',
                        data: {
                            files: files,
                            id: solution.solutionid
                        }
                    }).then(function(resp) {
                        unSetEdit();
                    }, function(resp) {
                        // console.log('Error status: ' + resp.status);
                    }, function(evt) {
                        $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    });
                } else {
                    // console.log(data);
                    unSetEdit();
                }
            }, function(data, status){
                    // console.log(status, data);
                })
        }
    }
    var unSetEdit = function() {
        $rootScope.edit = false;
        $rootScope.message = "Solution updated successfully!";
        $state.go('home');
    }

    var unSetAdd = function() {
        $rootScope.message = "Added solution successfully!";
        $state.go('home');
    }
})