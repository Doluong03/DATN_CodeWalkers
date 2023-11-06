app.controller("OrderController", function ($scope, $cookies, $http, $anchorScroll) {
    // Scroll đến phần tử có id "pageContent"
    $anchorScroll("pageContent");
    $scope.selectedTab = 0; // Đặt tab mặc định

    $scope.tabStyles = {};

    $scope.selectedTab = null; // Khởi tạo tab được chọn là null

    $scope.changeTab = function (tab) {
        if (tab === 0) {
        $scope.allTabSelected = true;
    } else {
        $scope.allTabSelected = false;
    }
        // Xóa CSS style của tab được chọn trước đó
        if ($scope.selectedTab !== null) {
            $scope.tabStyles[$scope.selectedTab] = {};
        }
        // Đặt tab mới là tab được chọn và cập nhật CSS style
        $scope.selectedTab = tab;
        $scope.tabStyles[tab] = { 'border-color':'#402dee', 'color':'#402dee' };
    };
    

    var dataUserCart = localStorage.getItem('userCartData');
    $scope.loadBillByUs = function () {
        var url = `${host}/api/getBill`;
        if (!dataUserCart) {
            var cartId = $cookies.get('cartId');
        } else {
            var cartId = dataUserCart;
        }
        var config = {
            params: { idCart: cartId }
        };
        $http.get(url, config).then(function (res) {
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