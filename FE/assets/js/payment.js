app.controller("PaymentController", function ($scope, $window, $cookies, $http, $anchorScroll) {
    // Scroll đến phần tử có id "pageContent"
    $anchorScroll("pageContent");

    $scope.listBillDt = [];
    $scope.totalPrices = [];
    $scope.idBillIP = 0;
    $scope.showSelects = "";
    $scope.idProvince = 0;
    $scope.idDistrict = 0;
    $scope.idWard = 0;
    $scope.feeShip = 0;
    $scope.optionPay = "0";
    setTimeout(function () {
        $scope.testRd = getRandomThousand();
        $scope.testRd2 = getRandomThousand();
        $scope.calculateTotalPrice = function (item) {
            // Tính tổng giá trị của sản phẩm (price * quantity)
            return item.productDetail.price * item.quantity;
        };
        function getRandomThousand() {
            // Sinh một số ngẫu nhiên từ 0 đến 1
            var randomFraction = Math.random();

            // Làm tròn số ngẫu nhiên lên đến số tròn nghìn gần nhất
            var randomNumber = Math.round(randomFraction * 55 + 15) * 1000;

            return randomNumber;
        }
        $scope.loadAllPr = function () {
            var url = `${host}/api/detail`;
            var cartId = $cookies.get('cartId');
            var config = {
                params: { idCart: cartId }
            };
            $http.get(url,config).then(function (res) {
                $scope.listBillDt = res.data;
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
                        $scope.listResPr.push({
                            productDetail: $scope.listBillDt[i].productDetail,
                            quantity: $scope.listBillDt[i].quantity,
                            name: $scope.listBillDt[i].productDetail.product.name,
                            price: $scope.listBillDt[i].productDetail.price
                        });
                        var Price = $scope.calculateTotalPrice($scope.listBillDt[i]);
                        $scope.totalPrice += $scope.calculateTotalPrice($scope.listBillDt[i]);
                        $scope.totalPrices.push(Price);
                        $scope.totalQuantity += $scope.listBillDt[i].quantity;
                        $scope.totalPay = ($scope.totalPrice + $scope.feeShip);
                    }
                };
                $scope.check();
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách sản phẩm trong giỏ hàng", error);
            });
        }
        $scope.loadAllPr();
        $scope.totalQuantity = 0;
        // Hàm này sẽ thực hiện sau 1 giây
        $scope.idResUser = 0;
        // Tạo một hàm trả về một Promise để lấy idBillIP từ API


        // Sử dụng Promise để lấy idBillIP và sau đó gọi hàm loadBillDt

        // Các dòng code sau đây sẽ thực hiện trước khi có kết quả từ Promise
        console.log("Chờ ID Bill IP...");
        console.log('Hàm này được gọi sau 1 giây');

        $scope.loadProvince = function () {
            var url = `${host}/get-province`;
            $http.get(url).then(function (res) {
                $scope.provinces = res.data;
                console.log("Danh sách Thành phố", res.data);
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách kích thước", error);
            });
        }
        $scope.loadDistrict = function (province) {
            var url = `${host}/get-district/`;
            var idProvince = province.ProvinceID;
            $http.get(url + idProvince).then(function (res) {
                $scope.districts = res.data;
                console.log("Danh sách Quận huyện ", res.data);
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách kích thước", error);
            });
        }
        $scope.loadWard = function (district) {
            var url = `${host}/get-Ward/`;
            var idDistrict = district.DistrictID;
            $http.get(url + idDistrict).then(function (res) {
                $scope.wards = res.data;
                console.log("Danh sách Phường xã ", res.data);
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách kích thước", error);
            });
        }
        $scope.getIdAddress = function (idPr, idDt, idWa) {
            $scope.idProvince = idPr;
            $scope.idDistrict = idDt;
            $scope.idWard = idWa;
            console.log($scope.idProvince);
            console.log($scope.idDistrict);
            console.log($scope.idWard);
        }

        $scope.formAddress = {
            addressDetail: "",
            ward: {},
            province: {},
            district: {},
            userName: "",
            phoneNumber: "",
            email: ""
        }

        $scope.resetModalContent = function () {
            $scope.formAddress = {
                addressDetail: "",
                ward: "",
                province: "",
                district: "",
                userName: "",
                phoneNumber: "",
                email: ""
            };
            $scope.note = ""; // Đặt lại trường nội dung
        }
        $scope.AddBillRequest = {
            userId: "",
            id: "",
            provinceId: "",
            districtId: "",
            wardId: "",
            address: "",
            note: "",
            quantity: "",
            fee: "",
            optionPay: "",
            totalPay: "",
            shipDate: ""
        }
        $scope.CreateOrder = {
            note: "",
            toName: "",
            toPhone: "",
            toAddress: "",
            districtId: "",
            wardId: "",
            weight: "",
            listItems: "",
            avgVolume: "",
            quantity: "",
            optionPay: "0",
            totalPay: "",
        }
        $scope.listResPr = [
        ];
        $scope.urlPay = "";
        console.log($scope.listResPr, "asd")
        $scope.showAddress = false;
        // Gửi dữ liệu về máy chủ với ID
        $scope.saveAddress = function (id) {
            var url = `${host}/save-address`;
            $scope.fee = {
                quantity: $scope.totalQuantity,
                wardId: $scope.formAddress.ward.WardCode,
                districtId: $scope.formAddress.district.DistrictID
            };
            // Lấy ID tỉnh/thành phố từ đối tượng
            var cartId = $cookies.get('cartId');

            var config = {
                params: {
                    idUser: id,
                    idCart: cartId
                }
            };

            var dataToSend = {
                addressDetail: $scope.formAddress.addressDetail,
                ward: $scope.formAddress.ward.WardCode,
                province: $scope.formAddress.province.ProvinceID, // Gửi ID
                district: $scope.formAddress.district.DistrictID,
                userName: $scope.formAddress.userName,
                phoneNumber: $scope.formAddress.phoneNumber,
                email: $scope.formAddress.email
            };
            console.log(dataToSend);
            console.log($scope.formAddress);
            console.log(config, 'hjfdhg');
            // Bây giờ bạn có thể sử dụng $scope.formAddress.province.name để hiển thị tên tỉnh/thành phố trên giao diện người dùng.

            return $http.post(url, JSON.stringify(dataToSend), config).then(function (res) {
                $scope.getFee($scope.fee);
                $('#exampleModal').modal('hide');
                console.log($scope.fee, "1---");
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm thành công!',
                    text: 'Thông tin địa chỉ đã được thêm.'
                }).then(function () {
                });
                $scope.showAddress = true;
                console.log($scope.showAddress);
                return true;
            }).catch(function (error) {
                console.error('ADD thất bại', error);
                return false;
            });
        };
        $scope.getFee = function (fee) {
            var url = `${host}/calculateFee`;
            $http.post(url, JSON.stringify(fee)).then(function (res) {
                console.log("Phi ", res.data);
                $scope.feeShip = res.data;
                $scope.totalPay = ($scope.totalPrice + $scope.feeShip);
            }).catch(function (error) {
                console.log("Lỗi khi tải ", error);
            });
        }

        $scope.createOrder = function () {
            var url = `${host}/bill/createOrder`;
            var dataToSend = {
                toName: $scope.formAddress.userName,
                toPhone: $scope.formAddress.phoneNumber,
                toAddress: $scope.formAddress.addressDetail,
                districtId: $scope.formAddress.district.DistrictID,
                wardId: $scope.formAddress.ward.WardCode,
                listItems: $scope.listResPr,
                quantity: $scope.totalQuantity,
                optionsPay: $scope.CreateOrder.optionsPay,
                totalPay: $scope.totalPay,
            };
            console.log(dataToSend, "<---")
            $http.post(url, dataToSend).then(function (res) {
                console.log("order ", res.data);
                $scope.updateBill(res.data)
            }).catch(function (error) {
                console.log("Lỗi khi tải ", error);
            });
        }

        $scope.updateBill = function (data) {
            var url = `${host}/bill/updateBill`;
            var billId = $cookies.get('billId');
            var dataToSend = {
                idBill: billId,
                address: $scope.formAddress.addressDetail,
                wardId: $scope.formAddress.ward.WardCode,
                provinceId: $scope.formAddress.province.ProvinceID, // Gửi ID
                districtId: $scope.formAddress.district.DistrictID,
                userName: $scope.formAddress.userName,
                phone: $scope.formAddress.phoneNumber,
                fee: data.total_fee,
                note: data.order_code,
                optionPay: $scope.CreateOrder.optionPay,
                totalPay: $scope.totalPay,
                shipDate: data.expected_delivery_time
            };
            console.log(dataToSend, "<---2")
            // Sử dụng $http.put để gửi yêu cầu cập nhật đến API
            $http.put(url, dataToSend)
                .then(function (res) {
                    // Xử lý khi cập nhật thành công
                    Swal.fire({
                        icon: 'success',
                        title: 'Đặt hàng thành công!',
                        text: 'Thông tin đơn hàng đã được thêm.'
                    }).then(function () {
                        $scope.deleteCart();
                        $window.location.href = res.data;
                    });
                    console.log('Suaw thành công');
                })
                .catch(function (error) {
                    // Xử lý khi cập nhật thất bại
                    console.error('Cập nhật thất bại', error);
                });
        }
        $scope.deleteCart = function () {
            var url = `${host}/api/cart/deleteCart/`;
            var cartId = $cookies.get('cartId');
            // Gửi yêu cầu xóa đến server hoặc thực hiện xóa trên giao diện
            $http.delete(url + cartId)
                .then(function () {
                    // Xử lý khi Delete thành công
                    $scope.loadAllPr();
                    $scope.loadAllPrCart();
                    $anchorScroll("pageContent");
                    console.log('Delete thành công');
                })
                .catch(function (error) {
                    // Xử lý khi Delete thất bại
                    console.error('Delete thất bại', error);
                });
        }
        $scope.loadProvince();
        (function ($) {
            showSwal = function (type) {
                "use strict";
                if (type === "basic") {
                    swal({
                        text: "Any fool can use a computer",
                        button: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btn btn-primary",
                        },
                    });
                } else if (type === "title-and-text") {
                    swal({
                        title: "Read the alert!",
                        text: "Click OK to close this alert",
                        button: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btn btn-primary",
                        },
                    });
                } else if (type === "success-message") {
                    swal({
                        title: "Congratulations!",
                        text: "You entered the correct answer",
                        icon: "success",
                        button: {
                            text: "Continue",
                            value: true,
                            visible: true,
                            className: "btn btn-primary",
                        },
                    });
                } else if (type === "auto-close") {
                    swal({
                        title: "Auto close alert!",
                        text: "I will close in 2 seconds.",
                        timer: 2000,
                        button: false,
                    }).then(
                        function () { },
                        // handling the promise rejection
                        function (dismiss) {
                            if (dismiss === "timer") {
                                console.log("I was closed by the timer");
                            }
                        }
                    );
                } else if (type === "warning-message-and-cancel") {
                    swal({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3f51b5",
                        cancelButtonColor: "#ff4081",
                        confirmButtonText: "Great ",
                        buttons: {
                            cancel: {
                                text: "Cancel",
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
                    });
                } else if (type === "custom-html") {
                    swal({
                        content: {
                            element: "input",
                            attributes: {
                                placeholder: "Type your password",
                                type: "password",
                                class: "form-control",
                            },
                        },
                        button: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btn btn-primary",
                        },
                    });
                }
            };
        })(jQuery);
    }, 50); // 1000 milliseconds = 1 giây
});