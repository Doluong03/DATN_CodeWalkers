
app.directive('orderDirective', function () {
    return {
        restrict: 'E',  // E là cho Element
        templateUrl: 'page/order_waitPay.html',
        controller: 'OrderController'
    };
});
app.controller("OrderController", function ($scope, $cookies, $http, $anchorScroll) {

    // Scroll đến phần tử có id "pageContent"
    $anchorScroll("pageContent");
    $scope.selectedTab = 0; // Đặt tab mặc định

    $scope.tabStyles = {};

    $scope.selectedTab = null; // Khởi tạo tab được chọn là null

    $scope.changeTab = function (tab) {
        $scope.loadBillByUs();
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
        $scope.tabStyles[tab] = { 'border-color': '#402dee', 'color': '#402dee' };
    };

    $scope.check = {};
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
            $scope.filteredOrders = res.data;
            // Kiểm tra xem có od nào có status bằng selectedTab hay không
            var hasOrderWithSelectedTab = $scope.filteredOrders.some(od => od.status == $scope.selectedTab);

            // Gán giá trị cho check[selectedTab] tương ứng
            $scope.check[$scope.selectedTab] = hasOrderWithSelectedTab;
            console.log("Danh sách đơn hàng", res.data);
        }).catch(function (error) {
            console.log("Lỗi khi tải danh sách", error);
        });
    }
    $scope.loadBillByUs();

    $scope.searchOrdersByProduct = function () {
        $scope.filteredOrders = $scope.itemsOrder.filter(function (order) {
            return order.listBillDetail.some(function (product) {
                // Thay 'product.name' bằng trường dữ liệu cần so sánh
                return product.productDetail.product.name.toLowerCase().includes($scope.productSearch.toLowerCase());
            });
        });
    };
    $scope.calculateTotalPrice = function (item) {
        // Tính tổng giá trị của sản phẩm (price * quantity)
        return item.price * item.quantity;
    };
});