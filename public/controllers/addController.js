angular.module('sevenHillsApp')
.directive('component', function() {
  var link = function(scope, element, attrs) {
    var render = function() {
      var t = scope.type;
      if (t === 'outList') {
        element.html('<input class="form-control" type="text">');
      }
      else if (t == null) {
        element.html('<label class="control-label">N/A</label>');
      }
      else {
        element.html('<label class="control-label">'+ t +'</label>');
      }
    };
    //key point here to watch for changes of the type property
    scope.$watch('type', function(newValue, oldValue) {
      render();
    });

    render();
  };
  return {
    restrict : 'E',
    link : link
  }
})
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
    $scope.formItems = [];
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
    $scope.onSelectCallback = function($item) {
        console.log($scope.vendor);
        $scope.type = 'inList';
        if ($item.vendor == "Third Party"){
            $scope.type = 'outList';
        } else {
            $scope.type = $item.vendor;
        }
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
})