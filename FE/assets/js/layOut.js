let host = "http://localhost:8080/CodeWalkers";
const app = angular.module("app", ["ngRoute",'ngCookies']);
app.config(function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix('');
    $routeProvider
        .when("/home", {
            templateUrl: "page/home.html",
            controller: "LayOutController"
        })
        .when("/product-detail/:productId", {
            templateUrl: "page/detail.html",
            controller: "DetailController"
        })
        .when("/cart", {
            templateUrl: "page/cart-item.html",
            controller: "CartController"
        })
        .when("/payment", {
            templateUrl: "page/payment.html",
            controller: "PaymentController"
        })
        .when("/product", {
            templateUrl: "page/product.html",
            controller: "ProductController"
        })
        .when("/orderOverview", {
            templateUrl: "page/order.html",
            controller: "OrderController"
        })
})
app.controller("LayOutController", function ($scope, $http, $window, $cookies, $anchorScroll) {
    // Logic của controller ở đây
    $anchorScroll("pageContent");
    $scope.items = [];
    $scope.itemsBs = [];
    $scope.currentImageSource = "";
    $scope.loadAllPrBs = function () {
        var url = `${host}/api/product_bs`;
        $http.get(url).then(res => {
            $scope.itemsBs = res.data;
            console.log($scope.currentImageSource);
            console.log("Success", res);
            // Gọi loadDetail sau khi tải dữ liệu thành công
            //  $scope.loadDetail();
            $scope.numVisibleItems = 4;
        }).catch(error => {
            console.log("Error", error);
        });
    }
    var cartId = $cookies.get('cartId');
    $scope.loadAllPrCart = function () {
        var url = `${host}/api/detail`;
        var config = {
            params: { idCart: cartId }
        };
        $http.get(url,config).then(function (res) {
            $scope.items = res.data;
            var badge = document.querySelector(".badge");
            badge.textContent = $scope.items.length;
            // Thay đổi số trên biểu tượng
            console.log("------>ád", $scope.items.length)
        }).catch(function (error) {
            console.log("Lỗi khi tải danh sách sản phẩm trong giỏ hàng", error);
        })
    }

    $scope.getInfoPayment = function () {
        // Lấy toàn bộ URL
        var fullUrl = window.location.href;
        // Tạo một URLSearchParams object từ URL query string
        var urlParams = new URLSearchParams(fullUrl);
        // Lấy giá trị của tham số 'vnp_TransactionStatus'
        var vnp_TransactionStatus = urlParams.get('vnp_TransactionStatus');
        if (vnp_TransactionStatus == "00") {
            $window.location.href = "http://127.0.0.1:5500/FE/layoutUser.html#/orderOverview"
            
        }
        else if (vnp_TransactionStatus == null) {
            // $window.location.href = "http://127.0.0.1:5500/FE/layoutUser.html#/home"
        } else {
            $window.location.href = "http://127.0.0.1:5500/FE/layoutUser.html#/product"
            Swal.fire({
                icon: 'warning',
                title: 'Đang chờ thanh toán!',
                text: 'Vui lòng thanh toán trong vòng 24h'
            }).then(function () {
            });
        }

    }
    $scope.getInfoPayment();
    $scope.loadAllPrCart();
    // Lấy phần tử span có class "badge"
    // Đặt số muốn hiển thị
    $scope.loadAllPrBs();

});
app.filter('vndCurrency', function () {
    return function (input) {
        if (!input) return '';
        return input.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    };
});
app.factory('CookieService', function() {
    return {
        set: function(name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        get: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        delete: function(name) {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    };
});
