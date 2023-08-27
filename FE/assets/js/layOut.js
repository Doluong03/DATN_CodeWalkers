let host = "http://localhost:8080/CodeWalkers";
const app = angular.module("app", ["ngRoute"]);
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/", {
            templateUrl: "page/home.html",
            controller: "LayOutController"
        })
        .when("/product-detail/:productId", {
            templateUrl: "page/detail.html",
            controller: "LayOutController"
        })
})
app.controller("LayOutController", function ($scope, $http, $routeParams, $location) {
    // Logic của controller ở đây
    $scope.items = [];

    $scope.itemDetail = [];
    $scope.loadDetail = function () {
        $scope.productId = $routeParams.productId;
        console.log($scope.productId);
        var url = `${host}/api/product/${$scope.productId}`;
        $http.get(url).then(res => {
            $scope.itemDetail = res.data;
            console.log(res.data);
            console.log("Success", res);
        }).catch(error => {
            console.log("Error", error);
        });
    }
    
    $scope.loadAllPr = function () {
        var url = `${host}/api/product`;
        $http.get(url).then(res => {
            $scope.items = res.data;
            console.log(res.data);
            console.log("Success", res);
            // Gọi loadDetail sau khi tải dữ liệu thành công
            $scope.loadDetail();
            $scope.numVisibleItems = 4;
        }).catch(error => {
            console.log("Error", error);
        });
    }
  
    $scope.loadAllPr();
});
app.filter('vndCurrency', function() {
    return function(input) {
        if (!input) return '';
        return input.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
});
