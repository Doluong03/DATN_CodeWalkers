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

    $scope.note = ""; // Đặt lại trường nội dung
    var dataUserJson = localStorage.getItem('userIdData');
    var dataUserCart = localStorage.getItem('userCartData');
    // voucher 
    var dataUser = localStorage.getItem('userData');
    var dataJson = JSON.parse(dataUser);
    var url = `${host}/user-voucher?userName=${dataJson.username}`;
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "slideDown",
        "hideMethod": "slideUp"
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
    $scope.isFeeShip = false;
    $scope.feeShip = 0;
    $scope.voucherUser = {
        usageCount: 0,
        voucher: { id: "" },
    }

    $scope.selectVoucher = function (voucherId, usageCount) {
        // Kiểm tra nếu voucher đã được sử dụng thì không thực hiện gì cả
        if ($scope.selectedVoucher === voucherId) {
            $scope.selectedVoucher = null;
            $scope.isVoucher = false;
            $scope.isFeeShip = false;
            $scope.loadAllPr(); //load lại giá sản phẩm khi đổi voucher
            return;
        }


        var urlFindVch = `${host}/find-voucher`;
        var idVoucher = { id: voucherId };
        $scope.selectedVoucher = voucherId;
        console.log("Selected Voucher ID:", voucherId);

        // Thực hiện các hành động khác tùy thuộc vào ID được chọn
        $http.post(urlFindVch, idVoucher).then(function (res) {
            console.log("day la voucher theo id : " + res.data);
            var vouchers = res.data;

            // tính lại tổng tiền
            console.log(vouchers);
            console.log("day la gia san pham :" + $scope.totalPrice);
            console.log("dieu kien:" + vouchers[0].condition);

            if (vouchers[0].useForm === "Đơn Hàng") {
                $scope.isFeeShip = false;
                if ($scope.totalPrice >= vouchers[0].condition) {

                    if (vouchers[0].discountType === "Phần Trăm") {

                        var discount = ($scope.totalPrice * vouchers[0].value * 0.01);

                        if (discount > vouchers[0].maxReduction) {
                            console.log("day la gia giam :" + discount)
                            $scope.reducePrice = (vouchers[0].maxReduction);
                            console.log("dieu kien :" + vouchers[0].maxReduction)
                            $scope.totalPrice2 = ($scope.totalPrice - vouchers[0].maxReduction);
                            $scope.feeAndVoucher($scope.fee, $scope.totalPrice2);
                        } else { // trường hợp tiền giảm < tiền giảm tối đa                       
                            $scope.totalPrice2 = $scope.totalPrice - discount;
                            $scope.reducePrice = discount;
                            $scope.feeAndVoucher($scope.fee, $scope.totalPrice2);
                        }

                    } else {// day la  giảm theo tiền
                        var checkToTalFrice = $scope.totalPrice - (vouchers[0].maxReduction);
                        if (checkToTalFrice > 0) {

                            $scope.totalPrice2 = checkToTalFrice;
                            $scope.reducePrice = (vouchers[0].maxReduction);
                            $scope.feeAndVoucher($scope.fee, $scope.totalPrice2);
                        } else {
                            $scope.isVoucher = false;
                            return;
                        }


                    }

                    $scope.isVoucher = true;
                } else {
                    $scope.isVoucher = false;
                    alert("ban khong du dieu kien");
                }
            }

            if (vouchers[0].useForm === "Phí Vận Chuyển") {
                $scope.isVoucher = false;
                if ($scope.feeShip >= vouchers[0].condition) {

                    if (vouchers[0].discountType === "Phần Trăm") {

                        var discount = ($scope.feeShip * vouchers[0].value * 0.01);

                        if (discount > vouchers[0].maxReduction) {
                            console.log("day la gia giam :" + discount)
                            $scope.reduceFee = (vouchers[0].maxReduction);
                            console.log("dieu kien :" + vouchers[0].maxReduction)
                            $scope.totalFee = ($scope.feeShip - vouchers[0].maxReduction);
                            $scope.feeNew($scope.fee, $scope.totalFee);
                        } else { // trường hợp tiền giảm < tiền giảm tối đa                       
                            $scope.totalFee = $scope.totalFee - discount;
                            $scope.reduceFee = discount;
                            $scope.feeNew($scope.fee, $scope.totalFee);
                        }

                    } else {// day la  giảm theo tiền
                        var checkfee = $scope.feeShip - (vouchers[0].maxReduction);
                        if (checkfee > 0) {
                            $scope.totalFee = $scope.feeShip - (vouchers[0].maxReduction);
                            $scope.reduceFee = (vouchers[0].maxReduction);
                            $scope.feeNew($scope.fee, $scope.totalFee);
                        }
                        else {
                            $scope.isFeeShip = false;
                            toastr.error('Voucher không hợp lệ', 'Thông báo')
                            return;
                        }
                    }

                    $scope.isFeeShip = true;
                } else {
                    $scope.isFeeShip = false;
                    alert("ban khong du dieu kien");
                }
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
    // hàm tính giảm phí vận chuyển
    $scope.feeNew = function (fee, feeNew) {

        console.log($scope.fee, "here")
        var url = `${host}/calculateFee`;
        $http.post(url, JSON.stringify(fee)).then(function (res) {
            console.log("Phi voucher ", res.data);
            $scope.feeShip = res.data;
            $scope.totalPay = ($scope.totalPrice + feeNew);
        }).catch(function (error) {
            console.log("Lỗi khi tải ", error);
        });
    }
    // cap nhật lại số lần sử dụng
    $scope.updateUsageCount = function (userVoucher) {
        $http.patch('http://localhost:8080/CodeWalkers/admin/user-voucher/update', JSON.stringify($scope.voucherUser)).then(function (res) {

        }).catch(function (err) {
            console.log("Lôĩ Update số lần sử dụng")
        });
    };

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

            // var url = `${host}/api/billDt`;
            // var billDt = $cookies.get('billId');
            // if (!billDt) {
            //     return;
            // }
            // if (!dataUserCart) {
            //     $scope.showOption = false;
            //     var config = {
            //         params: { idBill: billDt }
            //     };
            // } else {
            //     $scope.showOption = true;
            //     var config = {
            //         params: { idBill: billDt }
            //     };
            // }
            var url = `${host}/api/detail`;
            var cartId = $cookies.get('cartId');

            // Thiết lập cấu hình cho HTTP GET request
            var config = {
                params: { idCart: dataUserCart || cartId }
            };

            // Thực hiện HTTP GET request để lấy danh sách sản phẩm
            $http.get(url, config).then(function (res) {
                $scope.listBillDt = res.data;
                console.log("Danh sách sản phẩm trong giỏ hàng neeeee", $scope.listBillDt);
                $scope.totalPrice = 0;
                $scope.countItem = $scope.listBillDt.length;
                $scope.totalPay = 0;
                $scope.totalQuantity = 0;
                // Lặp qua danh sách sản phẩm và tính tổng tiền cho các sản phẩm được tích chọn
                // for (var i = 0; i < $scope.listBillDt.length; i++) {
                //     $scope.totalPrice += $scope.calculateTotalPrice($scope.listBillDt[i]);
                //     $scope.totalQuantity += $scope.listBillDt[i].quantity;
                // }
                //     $scope.getFeeUser();
                var activePromotions = [];

                // Bước 1: Lấy thông tin chương trình khuyến mãi đang hoạt động
                var promoUrl = `${host}/api/active_promotions`;
                $http.get(promoUrl).then((promoRes) => {
                    activePromotions = promoRes.data;

                    // Kiểm tra xem có chương trình khuyến mãi hay không
                    if (activePromotions && activePromotions.length > 0) {
                        // Bước 2: Tạo một đối tượng để ánh xạ id sản phẩm với mảng thông tin khuyến mãi
                        var productPromotionsMap = {};

                        // Bước 3: Lặp qua các chương trình khuyến mãi
                        activePromotions.forEach((promo) => {
                            if (
                                promo.promotionDetailsList &&
                                promo.promotionDetailsList.length > 0
                            ) {
                                // Lặp qua từng chi tiết khuyến mãi của chương trình
                                promo.promotionDetailsList.forEach((promoDetail) => {
                                    // Kiểm tra xem có thông tin productDetail và id hay không
                                    if (
                                        promoDetail.productDetail &&
                                        promoDetail.productDetail.id
                                    ) {
                                        // Nếu chưa có thông tin khuyến mãi cho sản phẩm, tạo một mảng để lưu
                                        if (!productPromotionsMap[promoDetail.productDetail.id]) {
                                            productPromotionsMap[promoDetail.productDetail.id] = [];
                                        }

                                        // Thêm thông tin khuyến mãi vào mảng
                                        productPromotionsMap[promoDetail.productDetail.id].push(
                                            promoDetail
                                        );

                                        // Thêm trường promotionId vào chi tiết khuyến mãi
                                        promoDetail.promotionId = promo.id;
                                    }
                                });
                            }
                        });

                        // In ra để kiểm tra
                        console.log(productPromotionsMap, 'hhhhhhhhhhhhhhhh');

                        // Bước 4: Kiểm tra và áp dụng giảm giá cho từng sản phẩm
                        $scope.listBillDt.forEach((item) => {
                            // Tìm thông tin khuyến mãi áp dụng cho sản phẩm
                            var productPromotion = productPromotionsMap[item.productDetail.id];

                            if (productPromotion && productPromotion.length > 0) {
                                // Bước 5: Sắp xếp chi tiết khuyến mãi theo thời gian giảm dần
                                productPromotion.sort((a, b) => b.createdDate - a.createdDate);

                                // Bước 6: Lấy chi tiết khuyến mãi mới nhất
                                var latestPromoDetail = productPromotion[0];

                                // Thêm trường priceWithPromo vào item
                                item.priceWithPromo = latestPromoDetail
                                    ? latestPromoDetail.discount
                                    : item.price;

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
                        $scope.listBillDt.forEach((item) => {
                            // Đánh dấu sản phẩm không có chương trình khuyến mãi
                            item.hasPromotion = false;
                            // Thêm trường priceWithPromo vào item
                            item.priceWithPromo = item.price;
                        });
                    }

                    // Lặp qua danh sách sản phẩm và tính tổng tiền cho các sản phẩm được tích chọn
                    for (var i = 0; i < $scope.listBillDt.length; i++) {
                        // Tính toán giá dựa trên có hoặc không có khuyến mãi
                        if ($scope.listBillDt[i].hasPromotion) {
                            $scope.totalPrice += $scope.listBillDt[i].priceWithPromo * $scope.listBillDt[i].quantity;
                        } else {
                            $scope.totalPrice += $scope.calculateTotalPrice($scope.listBillDt[i]);
                        }
                    
                        $scope.totalQuantity += $scope.listBillDt[i].quantity;
                    
                        // Thêm thông tin sản phẩm vào danh sách
                        $scope.listResPr.push({
                            productDetail: $scope.listBillDt[i].productDetail,
                            quantity: $scope.listBillDt[i].quantity,
                            name: $scope.listBillDt[i].productDetail.product.name,
                            price: $scope.listBillDt[i].productDetail.price
                        });
                    }
                    

                    // Gọi hàm getFeeUser nếu có dữ liệu người dùng JSON, ngược lại sử dụng tổng giá
                    if (dataUserJson) {
                        $scope.getFeeUser();
                    } else {
                        $scope.totalPay = $scope.totalPrice;
                    }
                }).catch((error) => {
                    console.log("Error", error);
                });
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách sản phẩm trong giỏ hàng", error);
            });
        };

        // Gọi hàm loadAllPr ngay sau khi định nghĩa
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
                $scope.getFeeUser();

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

                $('#addressModal').modal('hide');
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
                    if (res.data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Đặt hàng thành công!',
                            text: 'Thông tin đơn hàng đã được thêm.'
                        }).then(function () {
                            $scope.deleteCart();
                            localStorage.removeItem('dataToSend');
                            console.log(res.data);
                            $window.location.href = "http://127.0.0.1:5501/index.html#/orderOverview"
                        });
                        console.log('Suaw thành công');
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Đặt hàng thất bại!',
                            text: 'Thông tin đơn hàng không được cập nhật.'
                        })
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
            var idUser = $cookies.get('idUser');
                var dataToSend = {
                    idBill: billId,
                    address: $scope.selectedAddress.AddressDetail,
                    wardId: $scope.selectedAddress.WardCode,
                    provinceId: $scope.selectedAddress.ProvinceID, // Gửi ID
                    districtId: $scope.selectedAddress.DistrictID,
                    userId: dataUserJson || idUser,
                    fee: $scope.feeShip,
                    optionPay: $scope.CreateOrder.optionPay,
                    totalPay: $scope.totalPay,
                    status: 1,
                    idStaff: 1,
                    userName: $scope.selectedAddress.UserName,
                    userPhone: $scope.selectedAddress.PhoneNumber,
                }
            
            localStorage.setItem('dataToSend', JSON.stringify(dataToSend));
            if( $scope.CreateOrder.optionPay==0){
                $scope.updateBill();
            }else{
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
                    $scope.updateBill();
                    $window.location.href=res.data;
                }).catch(function (error) {
                    console.error('Create thất bại', error);
                });
            }
            
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
            }
            else if (vnp_TransactionStatus == null) {
                $window.location.href = "http://127.0.0.1:5501/index.html#/payment"
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
    }, 300); // 1000 milliseconds = 1 giây
});