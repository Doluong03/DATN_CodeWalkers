app.controller("PaymentController", function ($scope, $window, $cookies, $http, $anchorScroll, $filter) {
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
    $scope.showOption = false;
    $scope.selectedAddress = null;
    var dataUserJson = localStorage.getItem('userIdData');
    var dataUserCart = localStorage.getItem('userCartData');
    setTimeout(function () {
        $scope.calculateTotalPrice = function (item) {
            // Tính tổng giá trị của sản phẩm (price * quantity)
            return item.productDetail.price * item.quantity;
        };

        $scope.showFormAddress = function () {
            $('#exampleModal').modal('show');
        }

        $scope.loadAllPr = function () {
            var url = `${host}/api/detail`;
            var cartId = $cookies.get('cartId');
            if (!dataUserCart) {
                $scope.showOption = false;
                var config = {
                    params: { idCart: cartId }
                };
            } else {
                $scope.showOption = true;
                var config = {
                    params: { idCart: dataUserCart }
                };
            }
            $http.get(url, config).then(function (res) {
                $scope.listBillDt = res.data;
                console.log("Danh sách sản phẩm trong giỏ hàng", $scope.listBillDt);
                $scope.totalPrice = 0;
                $scope.countItem = $scope.listBillDt.length;
                $scope.totalPay = 0;
                // Lặp qua danh sách sản phẩm và tính tổng tiền cho các sản phẩm được tích chọn
                for (var i = 0; i < $scope.listBillDt.length; i++) {
                    $scope.totalPrice += $scope.calculateTotalPrice($scope.listBillDt[i]);
                    $scope.totalQuantity += $scope.listBillDt[i].quantity;

                    $scope.listResPr.push({
                        productDetail: $scope.listBillDt[i].productDetail,
                        quantity: $scope.listBillDt[i].quantity,
                        name: $scope.listBillDt[i].productDetail.product.name,
                        price: $scope.listBillDt[i].productDetail.price
                    });
                }
                if (dataUserJson) {
                    $scope.getFeeUser();
                } else {
                    $scope.totalPay = $scope.totalPrice;
                }
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách sản phẩm trong giỏ hàng", error);
            });
        }
        $scope.loadAllPr();

        $scope.totalQuantity = 0;
        // Hàm này sẽ thực hiện sau 1 giây
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
        $scope.loadProvince();



        $scope.findProvince = function (idProvince) {
            console.log("idProvince:", idProvince);
            var province = $scope.provinces.find(function (p) {
                return p.ProvinceID === idProvince;
            });

            if (province) {
                $scope.provinceName = province;
                console.log("provinceName:", $scope.provinceName);
            }
        };

        $scope.loadDistrict = function (province) {
            var url = `${host}/get-district/`;
            var idProvince = province.ProvinceID;
            $http.get(url + idProvince).then(function (res) {
                $scope.districts = res.data;
                console.log("Danh sách Quận huyện ", res.data);
                return res.data;
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách kích thước", error);
            });
        }
        $scope.districtsByProvince = {};
        $scope.loadDistrictUser = function (id) {
            var url = `${host}/get-district/`;
            $http.get(url + id).then(function (res) {
                $scope.districtsByProvince[id] = res.data;
                return res.data;
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách kích thước", error);
            });
        }

        $scope.wardsByProvince = {};
        $scope.loadWardUser = function (id) {
            var url = `${host}/get-Ward/`;
            $http.get(url + id).then(function (res) {
                $scope.wardsByProvince[id] = res.data;
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

        $scope.initializeData = function (add) {
            $scope.districts = loadDistrict(add.district);
            $scope.wards = loadWard(add.ward);
        };
        $scope.formAddress = {
            addressDetail: "",
            ward: {},
            province: {},
            district: {},
            userName: "",
            phoneNumber: "",
            email: ""
        }

        $scope.getAddressUser = function () {
            var url = `${host}/get-address/`;
            var idUser = dataUserJson;
            if (!dataUserJson) {
                $scope.showFormAddress();
            }
            $http.get(url + idUser).then(function (res) {
                $scope.addressUser = res.data;
                console.log($scope.addressUser, "")
                if ($scope.addressUser.length == 0) {
                    $scope.showFormAddress();
                }
                // $scope.loadDistrictUser(res.data[0].ProvinceID);
                if (!$scope.selectedAddress) {
                    $scope.selectedAddress = $scope.addressUser[$scope.addressUser.length - 1];
                    $scope.getFeeUser();
                }
            }).catch(function (error) {
                console.log("Lỗi khi tải Danh sách địa chỉ", error);
            });
        }
        $scope.selectAddress = function (address) {
            $scope.selectedAddress = address;
            $scope.getFeeUser();
        };
        $scope.getAddressUser();
        $scope.getFeeUser = function () {
            $scope.fee = {
                quantity: $scope.totalQuantity,
                wardId: $scope.selectedAddress.WardCode,
                districtId: $scope.selectedAddress.DistrictID
            };
            console.log("here", $scope.fee)
            var url = `${host}/calculateFee`;
            $http.post(url, JSON.stringify($scope.fee)).then(function (res) {
                console.log("Phi ", res.data);
                $scope.feeShip = res.data;
                $scope.totalPay = ($scope.totalPrice + $scope.feeShip);
            }).catch(function (error) {
                console.log("Lỗi khi tải ", error);
            });
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
        $scope.saveAddress = function () {
            if (
                !$scope.formAddress.userName ||
                !$scope.formAddress.phoneNumber ||
                !$scope.formAddress.addressDetail ||
                !$scope.formAddress.ward ||
                !$scope.formAddress.province ||
                !$scope.formAddress.district
            ) {
                $scope.checkAddress = true;
                return; // Dừng việc thực hiện lưu nếu thông tin không hợp lệ
            }
            $scope.checkAddress = false;
            var url = `${host}/save-address`;
            $scope.fee = {
                quantity: $scope.totalQuantity,
                wardId: $scope.formAddress.ward.WardCode,
                districtId: $scope.formAddress.district.DistrictID
            };
            // Lấy ID tỉnh/thành phố từ đối tượng
            if (!dataUserJson) {
                var idUser = $cookies.get('idUser');
                var cartId = $cookies.get('cartId');
            } else {
                var idUser = dataUserJson;
                var cartId = dataUserCart;
            }
            var config = {
                params: {
                    idUser: idUser,
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

            // Bây giờ bạn có thể sử dụng $scope.formAddress.province.name để hiển thị tên tỉnh/thành phố trên giao diện người dùng.
            console.log(url, JSON.stringify(dataToSend), config)
            return $http.post(url, JSON.stringify(dataToSend), config).then(function (res) {
                $scope.getFee($scope.fee);
                $scope.getAddressUser();

                $('#exampleModal').modal('hide');
                console.log($scope.fee, "1---");
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm thành công!',
                    text: 'Thông tin địa chỉ đã được thêm.'
                }).then(function () {
                    console.log($scope.addressUser[$scope.addressUser.length - 1], "day ")
                    $scope.selectAddress($scope.addressUser[$scope.addressUser.length - 1]);
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


        $scope.pay = function (idCart) {
            var url = `${host}/api/addBillDt/`;
            var idBill = $cookies.get('billId');
            $http.post(url + idBill + "/" + idCart).then(function () {
                console.log('ADD thành công');
            }).catch(function (error) {
                console.error('ADD thất bại', error);
            });
        }

        $scope.updateBill = function () {
            $scope.showLoading = true;
            var url = `${host}/bill/updateBill`;
            var billId = $cookies.get('billId');
            if (!dataUserJson) {
                var cartId = $cookies.get('cartId');
                var idUser = $cookies.get('idUser');
                var dataToSend = {
                    idBill: billId,
                    address: $scope.formAddress.addressDetail,
                    wardId: $scope.formAddress.ward.WardCode,
                    provinceId: $scope.formAddress.province.ProvinceID, // Gửi ID
                    districtId: $scope.formAddress.district.DistrictID,
                    userName: idUser,
                    fee: $scope.feeShip,
                    optionPay: $scope.CreateOrder.optionPay,
                    totalPay: $scope.totalPay,
                }
            } else {
                var cartId = dataUserCart;
                var dataToSend = {
                    idBill: billId,
                    address: $scope.selectedAddress.AddressDetail,
                    wardId: $scope.selectedAddress.WardCode,
                    provinceId: $scope.selectedAddress.ProvinceID, // Gửi ID
                    districtId: $scope.selectedAddress.DistrictID,
                    userName: dataUserJson,
                    fee: $scope.feeShip,
                    optionPay: $scope.CreateOrder.optionPay,
                    totalPay: $scope.totalPay,
                }
            }
            $scope.pay(cartId);
            console.log("here-data", dataToSend)

            // Hiển thị loading spinner
            // Sử dụng $http.put để gửi yêu cầu cập nhật đến API
            $http.put(url, dataToSend)
                .then(function (res) {
                    // Xử lý khi cập nhật thành công
                    if(res){
                    Swal.fire({
                        icon: 'success',
                        title: 'Đặt hàng thành công!',
                        text: 'Thông tin đơn hàng đã được thêm.'
                    }).then(function () {
                        $scope.deleteCart();
                        $window.location.href = res.data;
                    });
                    console.log('Suaw thành công');
                }
                })
                .catch(function (error) {
                    // Xử lý khi cập nhật thất bại
                    console.error('Cập nhật thất bại', error);
                }).finally(function () {
                    // Ẩn loading spinner sau khi kết thúc
                    $scope.showLoading = false;
                });
        }
        $scope.deleteCart = function () {
            var url = `${host}/api/cart/deleteCart/`;
            if (!dataUserJson) {
                var cartId = $cookies.get('cartId');
            } else {
                var cartId = dataUserCart;
            }
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
    }, 50); // 1000 milliseconds = 1 giây
});