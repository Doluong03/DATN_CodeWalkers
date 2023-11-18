let host = "http://localhost:8080/CodeWalkers";
const app = angular.module("app", ["ngRoute", 'ngCookies']);
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
        .otherwise({
            redirectTo: "/home",
        });

})
app.controller("LayOutController", function ($scope, $http, $window, $cookies, $anchorScroll) {
    // Logic của controller ở đây
    $anchorScroll("pageContent");
    $scope.items = [];
    $scope.itemsBs = [];
    $scope.currentImageSource = "";
    $scope.showIcon = false;
    $scope.imgProfile = "";
    var dataUser = localStorage.getItem('userData');
    var dataUserJson = JSON.parse(dataUser);

    $scope.loadAllPrBs = function () {
        var url = `${host}/api/product_bs`;
        $http.get(url).then(res => {
            $scope.itemsBs = res.data;
            // Gọi loadDetail sau khi tải dữ liệu thành công
            //  $scope.loadDetail();
            $scope.numVisibleItems = 4;
        }).catch(error => {
            console.log("Error", error);
        });
    }
    var cartId = $cookies.get('cartId');
    console.log("hereCook", cartId)

    $scope.updateCartByUser = function (idUser) {
        var url = `${host}/api/UpdateCartByUser/`;
        return $http.post(url + idUser).then(function (response) {
            $scope.idCart = response.data.id;
            console.log(response.data);
            return response.data; // Trả về dữ liệu cho promise
        }).catch(function (error) {
            console.error('Lỗi: ', error);
            return $q.reject(error); // Trả về lỗi cho promise
        });
    };
    $scope.getDataUser = function (callback) {
        var url = `${host}/getdata/`;
        if (!dataUserJson) {
            var cartIdCall = $cookies.get('cartId');
            $scope.showIcon = false;
            callback(cartIdCall);
        } else {
            $scope.showIcon = true;
            $scope.username = dataUserJson.username;
            var username = dataUserJson.username;
            var password = dataUserJson.password;
            var updateData = { password: password };
            console.log(url + username, updateData)
            $http.post(url + username, updateData).then(function (res) {
                $scope.imgProfile = res.data.image;
                localStorage.setItem('userIdData', res.data.id);
                if (!res.data.cart) {
                    $scope.updateCartByUser(res.data.id)
                    localStorage.setItem('userCartData', $scope.idCart);
                    var cartIdCall = $scope.idCart;
                } else {
                    localStorage.setItem('userCartData', res.data.cart.id);
                    var cartIdCall = res.data.cart.id
                }
                callback(cartIdCall);
            }).catch(function (error) {
                console.log("Lỗi khi tải data user", error);
            })
        }
    }

    $scope.loadAllPrCart = function (id) {
        var url = `${host}/api/detail`;
        var config = {
            params: { idCart: id }
        };

        $http.get(url, config).then(function (res) {
            $scope.items = res.data;
            console.log("------>ád", $scope.items.length)
            var badge = document.querySelector(".badge");
            badge.textContent = $scope.items.length;
            // Thay đổi số trên biểu tượng
            console.log("------>ád", $scope.items.length)
        }).catch(function (error) {
            console.log("Lỗi khi tải danh sách sản phẩm trong giỏ hàng", error);
        })
    }
    $scope.sendDetailUpdateRequest = function (list, idCart) {
        var data = list; // Sử dụng danh sách trực tiếp
        var url = `${host}/api/updateCart`;
        var config = {
            params: { idCart: idCart }
        };
        console.log("Sending request to:", url);
        $http.put(url, data, config)
            .then(function (response) {
                console.log('Cập nhật thành công');
                // Mở modal (nếu cần)
                // $scope.deleteCart(cartId);
                $scope.loadAllPrCart(idCart);
            })
            .catch(function (error) {
                console.error('Cập nhật thất bại:', error);
            });
    }

    $scope.loadAllPr = function (cartId) {
        var cartIdReq = $cookies.get('cartId');
        var url = `${host}/api/cart`;
        var config = {
            params: { idCart: cartIdReq }
        };
        $http.get(url, config).then(function (res) {
            var badge = document.querySelector(".badge");
            badge.textContent = res.data.length;
            console.log("Danh sách sản phẩm trong giỏ hàng", res.data);
            // Lặp qua danh sách sản phẩm và tính tổng tiền cho các sản phẩm được tích chọn
            $scope.sendDetailUpdateRequest(res.data, cartId);
        }).catch(function (error) {
            console.log("Lỗi khi tải danh sách sản phẩm trong giỏ hàng", error);
        });
    }


    $scope.getDataUser(function (cartIdCall) {
        console.log("cart here", cartIdCall);
        $scope.loadAllPr(cartIdCall);
    })
    $scope.loadAllPrCart($scope.count);

    var data = localStorage.getItem('userData');
    var accessToken = JSON.parse(data);

    $scope.logOut = function logout() {
        console.log("yes")
        // Call the server-side logout endpoint
        fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getAccessToken(),
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    // Clear the JWT from local storage or cookies
                    clearToken();
                    // Redirect or perform other actions after successful logout
                    window.location.href = "http://127.0.0.1:5501/login.html";
                } else {
                    console.error('Logout failed:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    }

    function getAccessToken() {
        return accessToken.token;
    }

    function clearToken() {
        // Implement this function to clear the JWT from local storage or cookies
        // For example, if stored in local storage:
        localStorage.removeItem('userData');
        localStorage.removeItem('userCartData');
        localStorage.removeItem('userIdData');

    }
    $scope.getInfoPayment = function () {
        // Lấy toàn bộ URL
        var fullUrl = window.location.href;
        // Tạo một URLSearchParams object từ URL query string
        var urlParams = new URLSearchParams(fullUrl);
        // Lấy giá trị của tham số 'vnp_TransactionStatus'
        var vnp_TransactionStatus = urlParams.get('vnp_TransactionStatus');
        if (vnp_TransactionStatus == "00") {
            $window.location.href = "http://127.0.0.1:5501/layoutUser.html#/orderOverview"

        }
        else if (vnp_TransactionStatus == null) {
            // $window.location.href = "http://127.0.0.1:5501/FE/layoutUser.html#/home"
        } else {
            $window.location.href = "http://127.0.0.1:5501/layoutUser.html#/product"
            Swal.fire({
                icon: 'warning',
                title: 'Đang chờ thanh toán!',
                text: 'Vui lòng thanh toán trong vòng 24h'
            }).then(function () {
            });
        }

    }
    $scope.addCart = function () {
        Swal.fire({
            icon: 'warning',
            title: 'Đang chờ thanh toán!',
            text: 'Vui lòng thanh toán trong vòng 24h'
        }).then(function () {
        });
    }
    $scope.getInfoPayment();
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
app.factory('CookieService', function () {
    return {
        set: function (name, value, days) {
            var expires = "";
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toUTCString();
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },
        get: function (name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },
        delete: function (name) {
            document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    };
});
app.factory('AuthService', function () {
    var authService = {};

    var data = localStorage.getItem('userData');
    var accessToken = JSON.parse(data);

    authService.logOut = function logout() {
        // Call the server-side logout endpoint
        fetch('http://localhost:8080/api/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getAccessToken(),
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                if (response.ok) {
                    // Clear the JWT from local storage or cookies
                    clearToken();
                    // Redirect or perform other actions after successful logout
                    window.location.href = "/template/login.html";
                } else {
                    console.error('Logout failed:', response.statusText);
                }
            })
            .catch(error => {
                console.error('Error during logout:', error);
            });
    }

    function getAccessToken() {
        return accessToken.token;
    }

    function clearToken() {
        // Implement this function to clear the JWT from local storage or cookies
        // For example, if stored in local storage:
        localStorage.removeItem('userData');
    }


    return authService;
});
app.filter('findProvinceNameById', function () {
    return function (provinces, id) {
        var matchedProvince = provinces.find(function (province) {
            return province.ProvinceID === id;
        });

        return matchedProvince ? matchedProvince.ProvinceName : 'Không tìm thấy';
    };
});

app.filter('findDistrictNameById', function () {
    return function (districts, id) {
        if (districts) {
            var matchedDistrict = districts.find(function (dt) {
                return dt.DistrictID === id;
            });
            return matchedDistrict ? matchedDistrict.DistrictName : 'Không tìm thấy';
        }
        return 'Không tìm thấy';
    };
});



app.filter('findWardNameById', function () {
    return function (wards, id) {
        if (!wards) {
            return 'Không tìm thấy';
        }
        var matchedProvince = wards.find(function (wards) {

            return wards.WardCode === id;
        });

        return matchedProvince ? matchedProvince.WardName : 'Không tìm thấy';
    };
});

