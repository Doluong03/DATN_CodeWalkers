app.controller("OrderController", function ($scope, $cookies, $http, $anchorScroll) {
    // Scroll đến phần tử có id "pageContent"
    $anchorScroll("pageContent");

    $scope.loadBillByUs = function(){
        var url = `${host}/api/getBill`;
        var cartId = $cookies.get('cartId');
        var config = {
            params: { idCart: cartId }
        };
        $http.get(url , config).then(function (res) {
            $scope.itemsOrder = res.data;
            console.log("Danh sách đơn hàng", res.data);
        }).catch(function (error) {
            console.log("Lỗi khi tải danh sách", error);
        });
    }
    $scope.loadBillByUs();
    $scope.calculateTotalPrice = function (item) {
        // Tính tổng giá trị của sản phẩm (price * quantity)
        return item.price * item.quantity;
    };
});