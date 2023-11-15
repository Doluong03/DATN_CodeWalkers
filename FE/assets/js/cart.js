
app.controller("CartController", function ($scope, $http, $cookies, CookieService, $anchorScroll) {
    // Scroll đến phần tử có id "pageContent"
    $anchorScroll("pageContent");
    // Khởi tạo biến $scope.items là một mảng rỗng
    $scope.items = [];
    $scope.selectedSize = 0;
    // Khởi tạo biến $scope.productId
    $scope.productId = null;
    $scope.cartId = null;
    $scope.idCart = null;
    $scope.bill = {};
    $scope.productSizes = {};
    var dataUser = localStorage.getItem('userData');
    var dataUserJson = JSON.parse(dataUser);
    var dataUserCart = localStorage.getItem('userCartData');
    $scope.showNotice = true;
    // Hàm để tải danh sách kích thước
    $scope.loadSize = function (productId, clId) {
        var url = `${host}/api/getSizeBycolor`;
        var config = {
            params: {
                idPr: productId,
                idColor: clId,
            }
        };

        // Sử dụng $http.get trả về một promise
        return $http.get(url, config).then(function (res) {
            $scope.list = res.data;
            console.log(url, config);

            // Lưu trữ danh sách kích thước vào productSizes
            if (!$scope.productSizes[productId]) {
                $scope.productSizes[productId] = {};
            }
            $scope.productSizes[productId][clId] = $scope.list.map(item => item.size);

            console.log("Danh sách kích thước", $scope.productSizes);
        }).catch(function (error) {
            console.log("Lỗi khi tải danh sách kích thước", error);
        });
    };

    $scope.quantity = 1; // Số lượng sản phẩm mặc định
    // Hàm để tải danh sách sản phẩm trong giỏ hàng
    $scope.totalPrice = 0;

    function getRandomThousand() {
        // Sinh một số ngẫu nhiên từ 0 đến 1
        var randomFraction = Math.random();

        // Làm tròn số ngẫu nhiên lên đến số tròn nghìn gần nhất
        var randomNumber = Math.round(randomFraction * 55 + 15) * 1000;

        return randomNumber;
    }
    $scope.calculateTotalPrice = function (item) {
        // Tính tổng giá trị của sản phẩm (price * quantity)
        return item.productDetail.price * item.quantity;
    };
    $scope.testRd = getRandomThousand();
    $scope.testRd2 = getRandomThousand();
    $scope.promotinalValue = 300000;
    var cartId = $cookies.get('cartId');
    console.log("cook", cartId)
    $scope.idCartFinal = null;
    $scope.idUserFinal = 0;
    $scope.getDataUser2 = function (callback) {
        var url = `${host}/getdata/`;
        if (!dataUserJson) {
            var cartIdCall = $cookies.get('cartId');
            $scope.idCartFinal = cartIdCall;
            $scope.showIcon = false;
            callback(cartIdCall);
        } else {
            $scope.showNotice = false;
            $scope.showIcon = false;
            var username = dataUserJson.username;
            var password = dataUserJson.password;
            var updateData = { password: password };
            console.log(url + username, updateData)
            $http.post(url + username, updateData).then(function (res) {
                var cartIdCall = res.data.cart.id
                $scope.idCartFinal = cartIdCall;
                $scope.idUserFinal = res.data.id;
                callback(cartIdCall);
            }).catch(function (error) {
                console.log("Lỗi khi tải data user", error);
            })
        }
    }

    $scope.loadAllPr = function (cartId) {
        var url = `${host}/api/detail`;
        var config = {
            params: { idCart: cartId }
        };
        $http.get(url, config).then(function (res) {
            $scope.items = res.data;
            var badge = document.querySelector(".badge");
            badge.textContent = $scope.items.length;
            console.log("Danh sách sản phẩm trong giỏ hàng", $scope.items);
            $scope.check = function () {
                $scope.totalPrice = 0;
                $scope.randomValue = 0;
                $scope.randomValue1 = 0;
                $scope.randomValue2 = 0;
                $scope.countItem = $scope.items.length;
                $scope.totalPay = 0;
                // Lặp qua danh sách sản phẩm và tính tổng tiền cho các sản phẩm được tích chọn
                for (var i = 0; i < $scope.items.length; i++) {
                    if (!$scope.items[i].checked) {
                        $scope.idCart = $scope.items[i].cart.id;
                        $scope.totalPrice += $scope.calculateTotalPrice($scope.items[i]);
                        $scope.randomValue1 += $scope.testRd;
                        $scope.randomValue2 = $scope.testRd2;
                        $scope.randomValue = $scope.randomValue1 + $scope.randomValue2;
                        $scope.totalPay = ($scope.totalPrice + $scope.randomValue) - $scope.promotinalValue;
                    }
                }
            };
            $scope.check();
        }).catch(function (error) {
            console.log("Lỗi khi tải danh sách sản phẩm trong giỏ hàng", error);
        });
    }
    $scope.getDataUser2(function (cartIdCall) {
        console.log(cartIdCall, "here");
        $scope.loadAllPr(cartIdCall);
        // $scope.loadAllPrCart(cartIdCall);
    })



    $scope.updateProductId = function (newProductId, id) {
        $scope.productId = newProductId;
        $scope.id = id;
    }
    // Hàm gửi yêu cầu cập nhật đến máy chủ thông qua API
    $scope.updateProductSize = function (newSize, idColor) {
        var url = `${host}/api/updateSize/`;
        var productId = $scope.productId; // Thay thế bằng ID của sản phẩm cần cập nhật
        var id = $scope.id;
        if (!dataUserCart) {
            $scope.cartIdFinal = cartId;
            console.log("Using existing Cart ID:", cartId);
        } else {
            $scope.cartIdFinal = dataUserCart;
            console.log("Using existing Cart ID:", dataUserCart);
        }
        var updateData = { size: newSize, idCart: $scope.cartIdFinal };
        console.log(url + id + "/" + productId + "/" + idColor, updateData, ":::::")
        // Sử dụng $http.put để gửi yêu cầu cập nhật đến API
        $http.put(url + id + "/" + productId + "/" + idColor, updateData)
            .then(function () {
                // Xử lý khi cập nhật thành công
                console.log('Suaw thành công');
                $scope.loadAllPr($scope.idCartFinal);
            })
            .catch(function (error) {
                // Xử lý khi cập nhật thất bại
                console.error('Cập nhật thất bại', error);
            });
    }

    $scope.updateQuantity2 = function (sl) {
        $scope.quantity = sl;
    }
    // Hàm xử lý khi người dùng tăng số lượng
    $scope.increaseQuantity = function (product) {
        product.quantity++;
        // Gọi hàm để cập nhật số lượng trong cơ sở dữ liệu
        $scope.updateProductQuantity(product.id, product.quantity);
    };

    // Hàm xử lý khi người dùng giảm số lượng
    $scope.decreaseQuantity = function (product) {
        if (product.quantity > 1) {
            product.quantity--;
            // Gọi hàm để cập nhật số lượng trong cơ sở dữ liệu
            $scope.updateProductQuantity(product.id, product.quantity);
        }
    };

    $scope.updateProductQuantity = function (idPr, quantity) {
        var url = `${host}/api/updateQuantity/`;
        var updateData = { quantity: quantity };

        // Sử dụng $http.put để gửi yêu cầu cập nhật đến API
        $http.put(url + idPr, updateData)
            .then(function (response) {
                // Xử lý khi cập nhật thành công
                $scope.loadAllPr($scope.idCartFinal);
                console.log('Cập nhật số lượng thành công');
            })
            .catch(function (error) {
                // Xử lý khi cập nhật thất bại
                console.error('Cập nhật số lượng thất bại', error);
            });
        console.log('Giá trị đã thay đổi:', quantity);
    }

    $scope.onInputKeyPress = function (event, idPr, quantity) {
        if (event.keyCode === 13) { // Kiểm tra nếu phím Enter (keyCode=13)
            if (quantity <= 0) {
                quantity = 1;
            }
            $scope.updateProductQuantity(idPr, quantity);
        }
    };

    // Xử lý sự kiện khi trường input mất đi焦点 (người dùng click vào chỗ khác)
    $scope.onInputBlur = function (idPr, quantity) {
        if (quantity <= 0) {
            quantity = 1;
        }
        $scope.updateProductQuantity(idPr, quantity);
    };

    $scope.confirmDelete = function (productId, cartId) {
        var url = `${host}/api/cart/delete/`;
        swal.fire({
            title: "Xác nhận xóa",
            text: "Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3f51b5",
            cancelButtonColor: "#ff4081",
            confirmButtonText: "Có",
            cancelButtonText: "Hủy",
            buttons: {
                cancel: {
                    text: "Hủy",
                    value: null,
                    visible: true,
                    className: "btn btn-danger",
                    closeModal: true,
                },
                confirm: {
                    text: "OK",
                    value: true,
                    visible: true,
                    className: "btn btn-primary",
                    closeModal: true,
                },
            },
        }).then((result) => {
            if (result.value) {
                // Xử lý khi người dùng xác nhận xóa ở đây
                $http.delete(url + productId + "/" + cartId)
                    .then(function () {
                        // Xử lý khi Delete thành công
                        $anchorScroll("pageContent");
                        $scope.getDataUser(function (cartIdCall) {
                            console.log(cartIdCall);
                            $scope.loadAllPr(cartIdCall);
                            // $scope.loadAllPrCart(cartIdCall);
                        })
                        toastr.success('Xóa sản phẩm thành công!', 'Thông báo')
                    })
                    .catch(function (error) {
                        // Xử lý khi Delete thất bại
                        console.error('Delete thất bại', error);
                    });
            } else {
                // Xử lý khi người dùng không xác nhận xóa ở đây
                console.log("Xóa bị hủy bỏ.");
            }
        });
    };

    $scope.idBill = 0;
    $scope.billJson = {};
    $scope.addBill = function () {
        var url = `${host}/api/addBill/${$scope.idUserFinal}`;
        console.log(url, "url");
        return $http.post(url).then(function (res) {
            $scope.bill = res.data; // Gán dữ liệu từ API vào $scope.bill
            $scope.billJson = JSON.stringify($scope.bill);
            console.log("ID: " + $scope.billJson); // Loại bỏ dấu chấm thừa
            // Kiểm tra nếu $scope.billJson là một chuỗi JSON hợp lệ
            if ($scope.billJson) {
                const billData = JSON.parse($scope.billJson);
                console.log("here", billData)
                CookieService.set('billId', billData.id, 1);
                CookieService.set('idUser', billData.users.id, 1);
            }
            return true; // Trả về true để biểu thị rằng việc thêm hóa đơn đã thành công
        }).catch(function (error) {
            console.error('ADD thất bại', error);
            return false; // Trả về false để biểu thị rằng việc thêm hóa đơn đã thất bại
        });
    }
    // Gọi hàm để tải danh sách kích thước và danh sách sản phẩm trong giỏ hàng
});


