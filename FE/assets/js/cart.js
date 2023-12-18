
app.controller("CartController", function ($scope, $http, $cookies, CookieService, $anchorScroll, $interval) {
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
    $scope.listBillDt = [];
    var dataUser = localStorage.getItem('userData');
    var dataUserJson = JSON.parse(dataUser);
    var dataUserCart = localStorage.getItem('userCartData');
    $scope.itemSelected = [];
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
            // Lưu trữ danh sách kích thước vào productSizes
            if (!$scope.productSizes[productId]) {
                $scope.productSizes[productId] = {};
            }
            $scope.productSizes[productId][clId] = $scope.list.map(item => item.size);

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
    $scope.calculateTotalPriceWithPromo = function (items) {
        // Check if items is an array
        if (!Array.isArray(items)) {
            console.error('Input is not an array');
            return 0; // or handle the error in a way that makes sense for your application
        }

        var totalPriceWithPromo = 0;
        var totalPriceWithoutPromo = 0;

        items.forEach((item) => {
            if (item.hasPromotion) {
                totalPriceWithPromo += item.priceWithPromo * item.quantity;
            } else {
                // Ensure that the price is a valid number before adding to the total
                var priceWithoutPromo = Number(item.productDetail.price);
                if (!isNaN(priceWithoutPromo)) {
                    totalPriceWithoutPromo += priceWithoutPromo * item.quantity;
                }
            }
        });

        // Log values for verification
        console.log('Total Price With Promo:', totalPriceWithPromo);
        console.log('Total Price Without Promo:', totalPriceWithoutPromo);

        return totalPriceWithPromo + totalPriceWithoutPromo;
    };


    var remainingItems = [];
    $scope.loadAllPrSelected = function () {
        var url = `${host}/api/billDt`;
        var billDt = $cookies.get('billId');
        var config = {
            params: { idBill: billDt }
        };
        if (!billDt) {
            return
        }
        $http.get(url, config).then(function (res) {
            $scope.listBillDt = res.data;
            for (var i = 0; i < $scope.listBillDt.length; i++) {
                remainingItems = $scope.listBillDt.filter(listItem => {
                    // Kiểm tra xem có phần tử trong $scope.items có cùng productDetail.id hay không
                    var matchingItem = $scope.items.find(item => item.productDetail.id === listItem.productDetail.id && item.status === 0);
                    if (matchingItem) {
                        matchingItem.checked = true; // or any other condition to set the 'checked' property
                    }
                    // Nếu không có phần tử nào thỏa mãn điều kiện, trả về true để giữ lại phần tử này
                    return !matchingItem;
                });
            }

            $scope.check();
        });
    }
    $scope.loadAllPrSelected();

    $scope.loadAllPrByCart = function (cartId) {
        var url = `${host}/api/detail`;
        var config = {
            params: { idCart: cartId }
        };

        $scope.calculatePricesAndPromotions = function (items) {
            // Bước 1: Lấy thông tin chương trình khuyến mãi đang hoạt động
            var promoUrl = `${host}/api/active_promotions`;

            return $http.get(promoUrl)
                .then((promoRes) => {
                    var activePromotions = promoRes.data;

                    // Kiểm tra xem có chương trình khuyến mãi hay không
                    if (activePromotions && activePromotions.length > 0) {
                        // Bước 2: Tạo một đối tượng để ánh xạ id sản phẩm với mảng thông tin khuyến mãi
                        var productPromotionsMap = {};

                        // Bước 3: Lặp qua các chương trình khuyến mãi
                        activePromotions.forEach((promo) => {
                            if (promo.promotionDetailsList && promo.promotionDetailsList.length > 0) {
                                // Lặp qua từng chi tiết khuyến mãi của chương trình
                                promo.promotionDetailsList.forEach((promoDetail) => {
                                    // Kiểm tra xem có thông tin productDetail và id hay không
                                    if (promoDetail.productDetail && promoDetail.productDetail.id) {
                                        // Nếu chưa có thông tin khuyến mãi cho sản phẩm, tạo một mảng để lưu
                                        if (!productPromotionsMap[promoDetail.productDetail.id]) {
                                            productPromotionsMap[promoDetail.productDetail.id] = [];
                                        }

                                        // Thêm thông tin khuyến mãi vào mảng
                                        productPromotionsMap[promoDetail.productDetail.id].push(promoDetail);
                                    }
                                });
                            }
                        });

                        // Bước 4: Kiểm tra và áp dụng giảm giá cho từng sản phẩm
                        items.forEach((item) => {
                            // Tìm thông tin khuyến mãi áp dụng cho sản phẩm
                            var productPromotion = productPromotionsMap[item.productDetail.id];

                            if (productPromotion && productPromotion.length > 0) {
                                // Bước 5: Sắp xếp chi tiết khuyến mãi theo thời gian giảm dần
                                productPromotion.sort((a, b) => b.createdDate - a.createdDate);

                                // Bước 6: Lấy chi tiết khuyến mãi mới nhất
                                var latestPromoDetail = productPromotion[0];

                                // Thêm trường priceWithPromo vào item
                                item.priceWithPromo = latestPromoDetail ? latestPromoDetail.discount : item.price;

                                // Thêm trường promotionId vào item
                                item.promotionId = latestPromoDetail ? latestPromoDetail.promotionId : null;

                                // Đánh dấu sản phẩm có chương trình khuyến mãi
                                item.hasPromotion = true;
                            } else {
                                // Nếu không có chương trình khuyến mãi, giá giữ nguyên
                                // Đánh dấu sản phẩm không có chương trình khuyến mãi
                                item.hasPromotion = false;

                                // Thêm trường priceWithPromo vào item
                                item.priceWithPromo = item.price;
                            }
                        });
                    } else {
                        // Nếu không có chương trình khuyến mãi, giá giữ nguyên cho tất cả sản phẩm
                        items.forEach((item) => {
                            // Đánh dấu sản phẩm không có chương trình khuyến mãi
                            item.hasPromotion = false;

                            // Thêm trường priceWithPromo vào item
                            item.priceWithPromo = item.price;
                        });
                    }
                })
                .catch((error) => {
                    console.log("Error", error);
                });
        }



        $scope.calculateTotalAndPay = function (items) {
            $scope.totalPrice = $scope.calculateTotalPriceWithPromo(items);
            console.log($scope.totalPrice, "jjsjajsaj")
        }

        $http.get(url, config).then((res) => {
            $scope.items = res.data.reverse();
            var badge = document.querySelector(".badge");
            badge.textContent = $scope.items.length;
            $scope.check();
            console.log($scope.items, 'cart')
            $scope.selectAllChecked = false;
            return $scope.calculatePricesAndPromotions($scope.items);
        }).then(() => {
            // Tiếp tục tính toán tổng giá và thanh toán
            $scope.loadAllPrSelected();

            // $scope.calculateTotalAndPay($scope.items);
        }).catch((error) => {
            console.log("Lỗi khi tải danh sách sản phẩm trong giỏ hàng", error);
        });
    };



    $scope.checkAll = function () {
        var newState = $scope.selectAllChecked; // Toggle the state
        for (var i = 0; i < $scope.items.length; i++) {
            if ($scope.items[i].status === 0) {
                $scope.items[i].checked = newState;
            }
        }
        $scope.check();
    }

    $scope.check = function () {
        $scope.itemSelected = [];
        $scope.itemSelected2 = [];
        $scope.totalPrice = 0;
        $scope.countItem = 0;
        var currentItem = [];
        for (var i = 0; i < $scope.items.length; i++) {
            currentItem = $scope.items[i];
            console.log(currentItem.hasPromotion, 'aaa');
            // Update countItem and select items based on the checked status
            if (currentItem.checked) {
                $scope.countItem++;

                // Add the selected item to itemSelected array
                $scope.itemSelected.push({
                    id: currentItem.id,
                    cart: currentItem.cart,
                    productDetail: currentItem.productDetail,
                    quantity: currentItem.quantity,
                    description: currentItem.description,
                    status: currentItem.status,
                    hasPromotion: currentItem.hasPromotion,
                    priceWithPromo: currentItem.priceWithPromo
                });

                // Update total price by calling calculateTotalAndPay function
                $scope.totalPrice = $scope.calculateTotalAndPay($scope.itemSelected);
                console.log('Total Price:', $scope.calculateTotalAndPay($scope.itemSelected));

            }

        }

        // Log the selected items and their total price
        console.log('Selected items:', $scope.itemSelected);
    };

    $scope.getDataUser2(function (cartIdCall) {
        console.log(cartIdCall, "here");
        $scope.loadAllPrByCart(cartIdCall);
        // $scope.loadAllPrCart(cartIdCall);
    })
    function autoCheckQuantity() {
        // $scope.getDataUser2(function (cartIdCall) {
        //     console.log(cartIdCall, "here");
        //     $scope.loadAllPrByCart(cartIdCall);
        //     // $scope.loadAllPrCart(cartIdCall);
        // })

        console.log(remainingItems[0], 'remain');
        if (remainingItems[0]) {
            $scope.deleteBillDt(remainingItems[0].id);
        }
    }
    var intervalPromise = $interval(autoCheckQuantity, 5000);

    // Nếu bạn muốn ngừng chạy tự động sau khi rời khỏi trang
    $scope.$on('$destroy', function () {
        $interval.cancel(intervalPromise);
    });
    $scope.deleteItems = function () {
        if ($scope.itemSelected.length == 0) {
            toastr.warning('Vui lòng chọn sản phẩm muốn xóa!', 'Thông báo')
            return;
        }
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
                for (var i = 0; i < $scope.itemSelected.length; i++) {
                    $scope.selectAllChecked = false;
                    $scope.delete($scope.itemSelected[i].productDetail.id, $scope.itemSelected[i].cart.id)
                }
            } else {
                // Xử lý khi người dùng không xác nhận xóa ở đây
                console.log("Xóa bị hủy bỏ.");
            }
        });

    }

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
                $scope.loadAllPrByCart($scope.idCartFinal);
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
    $scope.loadAllPrKm = function () {
        var url = `${host}/api/product`;
        $http.get(url).then(res => {
            $scope.itemsPromotion = res.data;
            console.log(res.data);
            console.log("Success", res);
            $scope.numVisibleItems = 4;
            $scope.slides = $scope.splitIntoSlides($scope.itemsPromotion, $scope.numVisibleItems);
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadAllPrKm();
    $scope.updateProductQuantity = function (idPr, quantity) {
        var url = `${host}/api/updateQuantity/`;
        var updateData = { quantity: quantity };

        // Sử dụng $http.put để gửi yêu cầu cập nhật đến API
        $http.put(url + idPr, updateData)
            .then(function (response) {
                // Xử lý khi cập nhật thành công
                $scope.loadAllPrByCart($scope.idCartFinal);
                $scope.check();
                console.log('Cập nhật số lượng thành công', $scope.idCartFinal);
            })
            .catch(function (error) {
                // Xử lý khi cập nhật thất bại
                console.error('Cập nhật số lượng thất bại', error);
            });
        console.log('Giá trị đã thay đổi:', quantity);
    }

    $scope.onInputKeyPress = function (event, pr) {
        if (event.keyCode === 13) { // Kiểm tra nếu phím Enter (keyCode=13)
            if (pr.quantity <= 0) {
                pr.quantity = 1;
            }
            $scope.updateProductQuantity(pr.id, pr.quantity);
        }
    };

    // Xử lý sự kiện khi trường input mất đi焦点 (người dùng click vào chỗ khác)
    $scope.onInputBlur = function (pr) {
        if (pr.quantity <= 0) {
            pr.quantity = 1;
        }
        $scope.updateProductQuantity(pr.id, pr.quantity);
    };

    $scope.confirmDelete = function (productId, cartId) {
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
                $scope.delete(productId, cartId);
            } else {
                // Xử lý khi người dùng không xác nhận xóa ở đây
                console.log("Xóa bị hủy bỏ.");
            }
        });
    };
    $scope.delete = function (productId, cartId) {
        var url = `${host}/api/cart/delete/`;
        $http.delete(url + productId + "/" + cartId)
            .then(function () {
                // Xử lý khi Delete thành công
                $anchorScroll("pageContent");
                $scope.loadAllPrByCart(cartId);
                toastr.success('Xóa sản phẩm thành công!', 'Thông báo')
            })
            .catch(function (error) {
                // Xử lý khi Delete thất bại
                console.error('Delete thất bại', error);
            });
    }

    $scope.idBill = 0;
    $scope.billJson = {};
    var idBill = $cookies.get('billId');
    console.log(idBill, 'bill')
    $scope.addBill = function () {
        var url = `${host}/api/addBill/${$scope.idUserFinal}`;
        console.log(url, "url");
        var idBill = $cookies.get('billId');
        console.log(idBill, 'bill')
        if (!idBill) {
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
                    $scope.pay();
                }
                return true; // Trả về true để biểu thị rằng việc thêm hóa đơn đã thành công
            }).catch(function (error) {
                console.error('ADD thất bại', error);
                return false; // Trả về false để biểu thị rằng việc thêm hóa đơn đã thất bại
            });
        }
        $scope.pay();
    };


    $scope.pay = function () {
        var idBill = $cookies.get('billId');
        var url = `${host}/api/addBillDtSl/`;
        $scope.itemSelected2 = $scope.itemSelected.map(function (item) {
            // Create a new object without the specified properties
            var newItem = {
                id: item.id,
                cart: item.cart,
                productDetail: item.productDetail,
                quantity: item.quantity,
                description: item.description,
                status: item.status
                // omitting hasPromotion and priceWithPromo
            };

            return newItem;
        });
        $http.post(url + idBill, $scope.itemSelected2).then(function () {
            console.log('ADD thành công');
        }).catch(function (error) {
            console.error('ADD thất bại', error);
        });
    }
    // Gọi hàm để tải danh sách sản phẩm trong giỏ hàng


    // Hàm để thay đổi chỉ mục slide
    $scope.splitIntoSlides = function (itemsPromotion, numItemsPerSlide) {
        var slides = [];
        for (var i = 0; i < itemsPromotion.length - numItemsPerSlide + 1; i++) {
            slides.push(itemsPromotion.slice(i, i + numItemsPerSlide));
        }
        return slides;
    };
    $scope.activeSlideIndex = 0;

    $scope.nextSlide = function () {
        if ($scope.activeSlideIndex < $scope.slides.length - 1) {
            $scope.activeSlideIndex++;
        } else {
            $scope.activeSlideIndex = 0;
        }
    };

    $scope.prevSlide = function () {
        if ($scope.activeSlideIndex > 0) {
            $scope.activeSlideIndex--;
        } else {
            $scope.activeSlideIndex = $scope.slides.length - 1;
        }
    };
    function startAutoSlide() {
        autoSlideInterval = $interval(function () {
            $scope.nextSlide();
        }, 2000); // Đặt khoảng thời gian ở đây, ví dụ 3000ms (3 giây)
    }

    function stopAutoSlide() {
        if (angular.isDefined(autoSlideInterval)) {
            $interval.cancel(autoSlideInterval);
            autoSlideInterval = undefined;
        }
    }


    $scope.deleteBillDt = function (billdt) {
        var url = `${host}/api/cart/deleteBillDt/`;
        $http.delete(url + billdt)
            .then(function () {
                toastr.success('Xóa sản phẩm thành công!', 'Thông báo')
            })
            .catch(function (error) {
                console.error('Delete thất bại', error);
            });
    }

    // Bắt đầu chạy tự động khi controller được khởi tạo
    startAutoSlide();


    // Ngừng chạy tự động khi controller bị hủy
    $scope.$on('$destroy', function () {
        stopAutoSlide();
    });
});


