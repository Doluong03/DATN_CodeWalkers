app.controller("CartController", function ($scope, $http, $routeParams, $location, $anchorScroll) {
    $anchorScroll("pageContent");
    $scope.items = [];
    $scope.selectedSize = 40 ;
    $scope.loadSize = function () {
        var url = `${host}/api/detail/size`;
        $http.get(url).then(res => {
            $scope.sizes = res.data;
            console.log(res.data);
            console.log("Success", res);
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadAllPr = function () {
        var url = `${host}/api/cart`;
        $http.get(url).then(res => {
            $scope.items = res.data;
            $scope.selectedSize = res.data.id.productDetail.size.name;
            console.log($scope.selectedSize); // Sử dụng $scope.selectedSize thay vì selectedSize
            console.log(res.data);
            console.log("Success21312", res);
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.$watch('selectedSize', function(newSize, oldSize) {
        if (newSize !== oldSize) {
          // Gửi yêu cầu đến API backend để cập nhật kích thước trong cơ sở dữ liệu
          $http.post('/api/updateSize', { newSize: newSize, productId: $scope.productId })
          .then(function(response) {
            console.log('Kích thước đã được cập nhật thành công');
          })
            .catch(function(error) {
              console.error('Lỗi khi cập nhật kích thước:', error);
            });
        }
    })


    $scope.loadAllPr();
    $scope.loadSize();
})