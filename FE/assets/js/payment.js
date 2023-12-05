app.controller("PaymentController", function ($scope, $window, $cookies, $http, $anchorScroll, CookieService) {
    // Store original pushState
    $anchorScroll("pageContent");
    $scope.listBillDt = [];
    $scope.totalPrices = [];
    $scope.idBillIP = 0;
    $scope.showSelects = "";
    $scope.idProvince = 0;
    $scope.idDistrict = 0;
    $scope.idWard = 0;
    $scope.feeShip = 0;
    $scope.fee = {};
    $scope.optionPay = "0";
    $scope.showOption = false;
    $scope.selectedAddress = null;

    function tokenAuthen() {
        // Lấy dữ liệu từ localStorage
        var userDataString = localStorage.getItem("userData");

        // Kiểm tra xem dữ liệu có tồn tại không
        if (userDataString) {
            // Chuyển đổi dữ liệu từ chuỗi JSON sang đối tượng JavaScript
            var userData = JSON.parse(userDataString);

            // Bạn có thể sử dụng userData ở đây
            console.log(userData.token);
            return userData.token;
        } else {
            // Trường hợp không có dữ liệu trong localStorage
            console.log("Không có dữ liệu đăng nhập trong localStorage.");
        }
    }
    $scope.note = ""; // Đặt lại trường nội dung
    var dataUserJson = localStorage.getItem('userIdData');
    var dataUserCart = localStorage.getItem('userCartData');
    // voucher 
    var dataUser = localStorage.getItem('userData');
    var dataJson = JSON.parse(dataUser);
    if (!dataJson) {
        var url = `${host}/user-voucher?username=0`;

    } else {
        var url = `${host}/user-voucher?username=${dataJson.username}`;
    }
    //get voucher
    $http.get(url).then(function (res) {
        $scope.listVouchers = res.data;
        console.log(" khi tải voucher: " + $scope.listVouchers);

    }).catch(function (err) {
        console.log("Lỗi khi tải voucher: " + err);
    });

    $scope.showFormVoucher = function () {
        $('#exampleModalVoucher').modal('show');
    }
    $scope.selectedVoucher = null;
    $scope.isVoucher = false;
    $scope.reducePrice = 0;



    $scope.selectVoucher = function (voucherId) {
        // Kiểm tra nếu voucher đã được sử dụng thì không thực hiện gì cả
        if ($scope.isVoucher && $scope.selectedVoucher === voucherId) {
            $scope.selectedVoucher = null;
            $scope.isVoucher = false;
            $scope.loadAllPr(); //load lại giá sản phẩm khi đổi voucher
            return;
        }

        //   $scope.loadAllPr(); //load lại giá sản phẩm khi đổi voucher

        var urlFindVch = `${host}/find-voucher`;
        var idVoucher = { id: voucherId };
        $scope.selectedVoucher = voucherId;
        console.log("Selected Voucher ID:", voucherId);

        // Thực hiện các hành động khác tùy thuộc vào ID được chọn
        $http.post(urlFindVch, idVoucher).then(function (res) {
            console.log("day la voucher theo id : " + res.data);
            var vouchers = res.data;

            // tính lại tổng tiền
            console.log("day la gia san pham :" + $scope.totalPrice);
            console.log("dieu kien:" + vouchers[0].condition);

            if ($scope.totalPrice >= vouchers[0].condition) {
                var discount = ($scope.totalPrice * vouchers[0].value * 0.01);

                if (discount > vouchers[0].maxReduction * 1000) {
                    console.log("day la gia giam :" + discount)
                    $scope.reducePrice = (vouchers[0].maxReduction * 1000);
                    console.log("dieu kien :" + vouchers[0].maxReduction * 1000)
                    $scope.totalPrice2 = ($scope.totalPrice - vouchers[0].maxReduction * 1000);
                    $scope.feeAndVoucher($scope.fee, $scope.totalPrice2);

                } else {
                    $scope.totalPrice2 = $scope.totalPrice - ($scope.totalPrice * vouchers[0].value * 0.01);
                    $scope.reducePrice = ($scope.totalPrice * vouchers[0].value * 0.01);
                    $scope.feeAndVoucher($scope.fee, $scope.totalPrice2);
                }

                $scope.isVoucher = true;
            } else {
                $scope.isVoucher = false;
                alert("ban khong du dieu kien");
            }
        }).catch(function (err) {
            console.log("Lỗi khi tìm voucher" + err);
        });
    };
    // hàm cập nhật lại tổng tiền khi có voucher
    $scope.feeAndVoucher = function (fee, frice) {

        console.log($scope.fee, "here")
        var url = `${host}/calculateFee`;
        $http.post(url, JSON.stringify(fee)).then(function (res) {
            console.log("Phi voucher ", res.data);
            $scope.feeShip = res.data;
            $scope.totalPay = (frice + $scope.feeShip);
        }).catch(function (error) {
            console.log("Lỗi khi tải ", error);
        });
    }

    // end voucher
    setTimeout(function () {
        $scope.calculateTotalPrice = function (item) {
            // Tính tổng giá trị của sản phẩm (price * quantity)
            return item.productDetail.price * item.quantity;
        };
        $scope.cancelAddr = function () {
            history.back();
        }
        $scope.showFormAddress = function () {
            $scope.formAddress = {
                addressDetail: "",
                ward: '',
                province: '',
                district: '',
                userName: "",
                phoneNumber: "",
                email: ""
            };
            $('#addressModal').modal('show');
        }

        $scope.loadAllPr = function () {

            var url = `${host}/api/billDt`;
            var billDt = $cookies.get('billId');
            if (!billDt) {
                return;
            }
            if (!dataUserCart) {
                $scope.showOption = false;
                var config = {
                    params: { idBill: billDt }
                };
            } else {
                $scope.showOption = true;
                var config = {
                    params: { idBill: billDt }
                };
            }
            $http.get(url, config).then(function (res) {
                $scope.listBillDt = res.data;
                console.log("Danh sách sản phẩm trong giỏ hàng", $scope.listBillDt);
                $scope.totalPrice = 0;
                $scope.countItem = $scope.listBillDt.length;
                $scope.totalPay = 0;
                $scope.totalQuantity = 0;
                // Lặp qua danh sách sản phẩm và tính tổng tiền cho các sản phẩm được tích chọn
                for (var i = 0; i < $scope.listBillDt.length; i++) {
                    $scope.totalPrice += $scope.calculateTotalPrice($scope.listBillDt[i]);
                    $scope.totalQuantity += $scope.listBillDt[i].quantity;
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
            $http.get(url + province).then(function (res) {
                $scope.districts = res.data;
                console.log("Danh sách Quận huyện ", res.data);
                return res.data;
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách kích thước", error);
            });
        }
        $scope.loadWard = function (district) {
            var url = `${host}/get-Ward/`;
            var idDistrict = district.DistrictID;
            $http.get(url + district).then(function (res) {
                $scope.wards = res.data;
                console.log("Danh sách Phường xã ", res.data);
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
            var idUser;
            if (!dataUserJson) {
                idUser = $cookies.get('idUser');
            } else {
                idUser = dataUserJson;
            }
            if (!idUser) {
                window.location.href = "http://127.0.0.1:5501/index.html#/home";
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
                    $scope.idAddressUser = $scope.selectedAddress.Id;
                    $scope.getFeeUser();
                }
            }).catch(function (error) {
                console.log("Lỗi khi tải Danh sách địa chỉ", error);
            });
        }
        $scope.selectAddress = function (address) {
            $scope.selectedAddress = address;
            $scope.idAddressUser = address.Id;
            $scope.getFeeUser();
        };
        $scope.getAddressUser();
        $scope.getFeeUser = function () {
            $scope.fee = {};
            $scope.feeShip = 0;
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
                ward: '',
                province: '',
                district: '',
                userName: $scope.selectedAddress.UserName,
                phoneNumber: $scope.selectedAddress.PhoneNumber,
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
            $scope.fee = {};
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
                ward: $scope.formAddress.ward,
                province: $scope.formAddress.province, // Gửi ID
                district: $scope.formAddress.district,
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
        $scope.checkAction = false;
        $scope.nameAction = "Thêm mới";

        $scope.getUpdate = function (item) {
            $scope.checkAction = true;
            $scope.nameAction = "Cập nhật";
            $scope.loadDistrict(item.ProvinceID);
            $scope.loadWard(item.DistrictID);
            $scope.formAddress = {
                id: item.Id,
                addressDetail: item.AddressDetail,
                ward: item.WardCode,
                province: item.ProvinceID,
                district: item.DistrictID,
                userName: item.UserName,
                phoneNumber: item.PhoneNumber,
            }
            console.log($scope.formAddress, "here")
        }

        $scope.updateAddress = function () {
            var url = `${host}/update-address`;
            var dataToSend = {
                id: $scope.formAddress.id,
                addressDetail: $scope.formAddress.addressDetail,
                ward: $scope.formAddress.ward,
                province: $scope.formAddress.province, // Gửi ID
                district: $scope.formAddress.district,
                userName: $scope.formAddress.userName,
                phoneNumber: $scope.formAddress.phoneNumber,
            };
            return $http.post(url, JSON.stringify(dataToSend)).then(function (res) {
                $('#addressModal').modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm thành công!',
                    text: 'Thông tin địa chỉ đã được thêm.'
                }).then(function () {
                    $scope.getAddressUser();
                    $('#exampleAddress').modal('show');
                });
                return true;
            }).catch(function (error) {
                console.error('update adr thất bại', error);
                return false;
            });
        }


        $scope.getFee = function (fee) {
            $scope.feeShip = 0;
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
            var dataToSend = localStorage.getItem('dataToSend');

            // Sử dụng $http.put để gửi yêu cầu cập nhật đến API
            console.log(dataToSend, "here");
            $http.put(url, dataToSend)
                .then(function (res) {
                    // Xử lý khi cập nhật thành công
                    if (res) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Đặt hàng thành công!',
                            text: 'Thông tin đơn hàng đã được thêm.'
                        }).then(function () {
                            $scope.deleteCart();
                            localStorage.removeItem('dataToSend');
                            console.log(res.data);
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
            var url = `${host}/api/cart/delete/`;
            if (!dataUserJson) {
                var cartId = $cookies.get('cartId');
            } else {
                var cartId = dataUserCart;
            }
            // Gửi yêu cầu xóa đến server hoặc thực hiện xóa trên giao diện
            for (var i = 0; i < $scope.listBillDt.length; i++) {
                $http.delete(url + $scope.listBillDt[i].productDetail.id + "/" + cartId)
                    .then(function () {
                        // Xử lý khi Delete thành công
                        console.log('Delete thành công');
                        CookieService.delete('billId');
                    })
                    .catch(function (error) {
                        // Xử lý khi Delete thất bại
                        console.error('Delete thất bại', error);
                    });
            }
        }
   
        $scope.createPay = function (totalPay) {
            var billId = $cookies.get('billId');
            if (!dataUserJson) {
                var idUser = $cookies.get('idUser');
                var dataToSend = {
                    idBill: billId,
                    address: $scope.formAddress.addressDetail,
                    wardId: $scope.formAddress.ward.WardCode,
                    provinceId: $scope.formAddress.province.ProvinceID, // Gửi ID
                    districtId: $scope.formAddress.district.DistrictID,
                    userId: idUser,
                    fee: $scope.feeShip,
                    optionPay: $scope.CreateOrder.optionPay,
                    totalPay: $scope.totalPay,
                    status: 1,
                    idStaff: 1,
                    userName: $scope.formAddress.userName,
                    userPhone: $scope.formAddress.phoneNumber,
                }
            } else {
                var dataToSend = {
                    idBill: billId,
                    address: $scope.selectedAddress.AddressDetail,
                    wardId: $scope.selectedAddress.WardCode,
                    provinceId: $scope.selectedAddress.ProvinceID, // Gửi ID
                    districtId: $scope.selectedAddress.DistrictID,
                    userId: dataUserJson,
                    fee: $scope.feeShip,
                    optionPay: $scope.CreateOrder.optionPay,
                    totalPay: $scope.totalPay,
                    status: 1,
                    idStaff: 1,
                    userName: $scope.selectedAddress.UserName,
                    userPhone: $scope.selectedAddress.PhoneNumber,
                }
            }
            localStorage.setItem('dataToSend', JSON.stringify(dataToSend));

            // Sử dụng $http.put để gửi yêu cầu cập nhật đến API
            console.log(dataToSend, "here");
            // Hiển thị loading spinner
            var url = `${host}/createPay`;
            var config = {
                params: {
                    totalPay: totalPay,
                }
            };
            $http.get(url, config).then(function (res) {
                console.log('Create thành công');
                $window.location.href=res.data;
            }).catch(function (error) {
                console.error('Create thất bại', error);
            });
        }
        $scope.getInfoPayment = function () {
            // Lấy toàn bộ URL
            var fullUrl = window.location.href;
            // Tạo một URLSearchParams object từ URL query string
            var urlParams = new URLSearchParams(fullUrl);
            // Lấy giá trị của tham số 'vnp_TransactionStatus'
            var vnp_TransactionStatus = urlParams.get('vnp_TransactionStatus');
            if (vnp_TransactionStatus == "00") {
                $scope.updateBill();
                $window.location.href = "http://127.0.0.1:5501/index.html#/orderOverview"
            }
            else if (vnp_TransactionStatus == null) {

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Giao dịch thất bại!',
                    text: 'Vui lòng thanh toán đơn hàng'
                })
                $window.location.href = "http://127.0.0.1:5501/index.html#/payment"
            }

        }
        $scope.getInfoPayment();
    }, 100); // 1000 milliseconds = 1 giây
});