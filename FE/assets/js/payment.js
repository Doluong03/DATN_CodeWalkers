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
    $scope.districts = [];
    $scope.wards = [];
    $scope.nameAction = "Thêm mới";
    $scope.listAllVouchers = [];
    $scope.filtedVch = [];
    $scope.note = ""; // Đặt lại trường nội dung
    var dataUserJson = localStorage.getItem('userIdData');
    var dataUserCart = localStorage.getItem('userCartData');
    // voucher 
    var dataUser = localStorage.getItem('userData');
    var dataJson = JSON.parse(dataUser);
    console.log(dataJson, 'aa')
    $scope.loadVoucherUser = function () {
        var url = `${host}/user-voucher?userName=${dataJson.username}`;
        $http.get(url).then(function (res) {
            console.log(new Date(res.data[0].endDate), 'a', new Date())
            $scope.listVouchers = res.data.filter(vch => {
                const dateParts = vch.endDate.split('.');
                const formattedEndDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

                return vch.usageCount > 0 && formattedEndDate > new Date();
            });
            $scope.filtedVch = $scope.listVouchers;

            console.log(" khi tải voucher: " + JSON.stringify(res.data));

        }).catch(function (err) {
            console.log("Lỗi khi tải voucher: " + err);
        });
    }
    if (dataJson) {
        $scope.loadVoucherUser();

    }
    var profileUser1 = JSON.parse(localStorage.getItem('userProfile'));

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
    $scope.listCheck = [];
    $scope.voucherUser = {
        usageCount: 0,
        users: { id: "" },
        voucher: { id: "" },
        status: true,
        customType: 0
    }

    // Định nghĩa hàm để lấy danh sách voucher có số lượng lớn hơn 0
    function loadAllVouchers2() {
        var url = `${host}/vouchers/getAll`;
        $http.get(url)
            .then(function (res) {
                // Lọc danh sách voucher có số lượng lớn hơn 0
                $scope.listAllVouchers = res.data.filter(vch => vch.quantity > 0);

                console.log("Danh sách voucher khi tải: " + JSON.stringify(res.data));
            })
            .catch(function (err) {
                console.log("Lỗi khi tải danh sách voucher: " + err);
            });
    }

    // Gọi hàm để tải danh sách voucher khi cần
    loadAllVouchers2();

    // de tam o day

    $scope.getDataByUserName = function (username) {
        var url = `${host}/profile/${username}`;
        $http.get(url).then(function (res) {
            // Lưu giá trị vào localStorage
            localStorage.setItem('profileUserData', JSON.stringify(res.data));

            // Cập nhật giá trị trong $scope
            $scope.profileUser = res.data;

        }).catch(function (err) {
            console.log("Lỗi khi tải voucher: " + err);
        });
    }

    $scope.doidiem = function (id, exChangePoint, quantity) {
        $scope.getDataByUserName(dataJson.username);
        var profileUser = JSON.parse(localStorage.getItem('profileUserData'));
        console.log(profileUser.id)

        var userPoint = profileUser.points;
        var newPoitUser = 0;
        var quantity1 = quantity;

        if ($scope.voucherUser.usageCount <= 0 || ($scope.voucherUser.usageCount * exChangePoint) > userPoint) {
            toastr.error('Lỗi!', 'Vui lòng nhập số lượng muốn đổi');
            return;
        } else if ($scope.voucherUser.usageCount > quantity) {
            toastr.error('Lỗi!', 'Vui lòng nhập số lượng muốn đổi <= số lượng phiếu hiện có');
            return;
        }

        $scope.checkExists(id, dataJson.username)
            .then(function (result) {
                $scope.listCheck = result;

                // Calculate newPoitn after updating quantity
                if (userPoint > (exChangePoint * $scope.voucherUser.usageCount)) {
                    newPoitUser = userPoint - (exChangePoint * $scope.voucherUser.usageCount);
                    if (newPoitUser > 0) {
                        if ($scope.listCheck.length > 0) {
                            console.log($scope.listCheck[0].usageCount);

                            if (userPoint > exChangePoint) {
                                var usageCountNew = $scope.voucherUser.usageCount + $scope.listCheck[0].usageCount;
                                console.log(profileUser.id);

                                // Update quantity first
                                if ($scope.listCheck[0].quantity > 0) {
                                    return $scope.updateQuantity(id, quantity1 - $scope.voucherUser.usageCount)
                                        .then(function () {
                                            // After updating quantity, update usage count
                                            toastr.success('Thành công!', 'Tiêu đề thông báo');
                                            loadAllVouchers2();
                                            return $scope.updateUsageCount2(profileUser.id, usageCountNew, id);
                                        });
                                } else {
                                    toastr.error('Lỗi!', 'Số Lượng đổi lớn hơn số voucher yêu cầu');

                                }

                            }

                        } else {
                            $scope.voucherUser = {
                                users: { id: profileUser.id },
                                voucher: { id: id },
                                status: true,
                                customType: 0
                            };

                            if (userPoint > exChangePoint) {
                                // Update quantity first
                                return $scope.updateQuantity(id, quantity1 - $scope.voucherUser.usageCount)
                                    .then(function () {
                                        // After updating quantity, save voucher user
                                        toastr.success('Thành công!', 'Tiêu đề thông báo');
                                        loadAllVouchers2();
                                        return $scope.saveVoucherUser($scope.voucherUser);
                                    });
                            }

                        }
                    } else {
                        // If newPoitUser is not greater than 0, reject the Promise to prevent further execution
                        return Promise.reject("Invalid quantity or points");
                    }
                } else {
                    toastr.error('Lỗi!', 'Tiêu đề thông báo');
                }


            })
            .then(function () {
                // After all the updates, check if newPoitUser is still greater than 0 and then update the points
                if (newPoitUser > 0) {
                    $scope.voucherUser.usageCount = 0;
                    return $scope.updatePoitn(newPoitUser);
                }
            })
            .catch(function (error) {
                console.error("Có lỗi xảy ra khi kiểm tra sự tồn tại: ", error);
            });
    };


    $scope.checkExists = function (id, userName) {
        let url = 'http://localhost:8080/CodeWalkers/vouchers/ckeck-exsits?' + 'id=' + id + '&userName=' + userName;

        return $http.get(url)
            .then(function (res) {
                console.log("Khi tải voucher: " + JSON.stringify(res.data));
                return res.data; // Trả về dữ liệu từ response
            })
            .catch(function (err) {
                console.log("Lỗi khi tải voucher: " + err);
                // Có thể xử lý lỗi hoặc ném lỗi để bên ngoài xử lý
                throw err;
            });
    };

    $scope.saveVoucherUser = function (data) {
        var url = 'http://localhost:8080/CodeWalkers/admin/voucher/save-voucherUser';
        $http.post(url, data).then(function (res) {
            console.log("update thanh cong", res.data);

        }).catch(function (err) {
            console.log(err);
        });
    };

    // // cap nhật lại số lần sử dụng
    // $scope.updateUsageCount = function (idUser, usageCount, idUser_Vch) {

    //     $http.patch(`http://localhost:8080/CodeWalkers/admin/user-voucher/update?UsageCount=${usageCount}&id=${idUser_Vch}&` + idUser)
    //         .then(function (res) {
    //             // Xử lý kết quả thành công
    //         })
    //         .catch(function (err) {
    //             console.log("Lỗi Update số lần sử dụng", err);
    //         });

    // };


    $scope.updateUsageCount2 = function (idUser_Vch, usageCount,idUser ) {

        $http.patch(`http://localhost:8080/CodeWalkers/admin/user-voucher/update?UsageCount=${usageCount}&id=${idUser_Vch}&idUser=` + idUser)
            .then(function (res) {
                console.log( `http://localhost:8080/CodeWalkers/admin/user-voucher/update?UsageCount=${usageCount}&id=${idUser_Vch}&idUser=` + idUser,'hêre')
                // Xử lý kết quả thành công
            })
            .catch(function (err) {
                console.log("Lỗi Update số lần sử dụng", err);
            });

    };

    $scope.updateQuantity = function (idVch, quantity) {
        var url = 'http://localhost:8080/CodeWalkers/voucher/update/quantity-voucher/' + idVch + '/' + quantity;

        return $http.put(url)
            .then(function (response) {
                console.log("Update Quantity Response:", response.data);
                // Handle the response data as needed
                return response.data;
            })
            .catch(function (error) {
                console.error("Error updating quantity:", error);
                // Handle the error appropriately
                throw error; // Rethrow the error to propagate it
            });
    };


    $scope.updatePoitn = function (point1) {
        var data = {
            userName: dataJson.username,
            point: point1
        };
        console.log(data);

        // Trả về promise từ $http.put
        return $http.put('http://localhost:8080/CodeWalkers/admin/User/update/point-rank', JSON.stringify(data))
            .then(function (response) {
                // Khi hàm $http.put hoàn thành, bạn có thể xử lý kết quả tại đây
                console.log('update thành công ne', response.data);
                return response.data; // Trả về dữ liệu từ response để có thể xử lý tiếp theo nếu cần
            })
            .catch(function (error) {
                // Xử lý lỗi nếu có
                console.error('Create thất bại', error);
                throw error; // Ném lỗi để có thể xử lý tiếp theo nếu cần
            });
    }

    $scope.showFormVoucher = function () {
        $('#exampleModalVoucher').modal('show');
    }
    $scope.selectedVoucher = null;
    $scope.isVoucher = false;
    $scope.isFeeShip = false;
    $scope.feeShip = 0;
    $scope.usageCount = 0;
    $scope.idUser_Vch = 0;
    $scope.voucherId = 0;
    $scope.selectVoucher = function (voucherId, usageCount, idUser_Vch) {
        // Kiểm tra nếu voucher đã được sử dụng thì không thực hiện gì cả
        if ($scope.selectedVoucher === voucherId) {
            $scope.selectedVoucher = null;
            $scope.isVoucher = false;
            $scope.isFeeShip = false;
            $scope.loadAllPr(); //load lại giá sản phẩm khi đổi voucher
            return;
        }

        if (usageCount > 0) {
            $scope.usageCount = usageCount - 1;
        }
        $scope.idUser_Vch = idUser_Vch;
        $scope.voucherId = voucherId;


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
                $scope.reduceFee = '0';
            }

            if (vouchers[0].useForm === "Phí Vận Chuyển") {
                $scope.isVoucher = false;
                if ($scope.totalPrice >= vouchers[0].condition) {

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
                        if (checkfee) {
                            if ($scope.feeShip - (vouchers[0].maxReduction) < 0) {
                                $scope.totalFee = 0;
                            } else {
                                $scope.totalFee = $scope.feeShip - (vouchers[0].maxReduction);
                            }
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
                    alert("ban khong du dieu kien pvc");
                }
                $scope.reducePrice = '0';
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

        console.log($scope.fee, feeNew, "here")
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
    $scope.updateUsageCount = function () {
        var UsageCount = $scope.usageCount - 1;
        var idUser_Vch = $scope.idUser_Vch;
        $http.patch(`http://localhost:8080/CodeWalkers/admin/user-voucher/update?UsageCount=${UsageCount}&id=${idUser_Vch}`)
            .then(function (res) {
                console.log(`http://localhost:8080/CodeWalkers/admin/user-voucher/update?UsageCount=${UsageCount}&id=${idUser_Vch}`)
                console.log(res, 'aa')
                // Xử lý kết quả thành công
            })
            .catch(function (err) {
                console.log("Lỗi Update số lần sử dụng", err);
            });

    };

    $scope.search = function () {
        if ($scope.searchVc === "") {
            $scope.loadVoucherUser();
            return;
        }
        $scope.filtedVch = $scope.listVouchers.filter(vch => vch.code.includes($scope.searchVc));
    }


    // end voucher
    setTimeout(function () {
        $scope.calculateTotalPrice = function (item) {
            // Tính tổng giá trị của sản phẩm (price * quantity)
            return item.productDetail.price * item.quantity;
        };
        $scope.cancelAddr = function () {
            if ($scope.addressUser.length == 0) {
                history.back();
            }
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
                        // console.log(productPromotionsMap, 'hhhhhhhhhhhhhhhh');

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
                            price: $scope.listBillDt[i].priceWithPromo
                        });
                        console.log($scope.listResPr, 'list')
                        $scope.getFeeUser();
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



        $scope.loadDistrict = function (province) {
            var url = `${host}/get-district/`;
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
                if (dataJson) {
                    $scope.formAddress.email = dataJson.email;
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
            $scope.checkAction = false;
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
        $scope.getAll = function () {
            let apiUrl = `${host}/user/getAll`;
            $http.get(apiUrl).then(
                function (response) {
                    var idUser;
                    if (!dataUserJson) {
                        idUser = $cookies.get('idUser');
                    } else {
                        idUser = dataUserJson;
                    }
                    // Xử lý phản hồi thành công
                    var indexToRemove = response.data.findIndex(user => user.id === Number(idUser));
                    if (indexToRemove !== -1) {
                        $scope.listAllUSers = [];
                        response.data.splice(indexToRemove, 1);
                        console.log(response.data, '1');
                        $scope.listAllUSers = response.data.filter(user => user.userName); // Assign the modified array back to $scope.listAllUsers
                        console.log($scope.listAllUSers, 'a'); // Corrected variable name
                    }

                    console.log(Number(idUser), 'a', indexToRemove)
                },
                function (error) {
                    // Xử lý lỗi
                    console.log(error);
                }
            );
        };
        $scope.getAll();
        $scope.phoneNumberExists = function () {

            if (!$scope.formAddress.phoneNumber) {
                return false; // Phone number is not set, consider it not existing
            }
            return $scope.listAllUSers.some(staff => staff.phoneNumber === $scope.formAddress.phoneNumber);
        };
        $scope.$watch('formAddress.phoneNumber', function (newValue, oldValue) {
            $scope.myForm.phoneNumber.$setValidity('phoneNumberExists', !$scope.phoneNumberExists());
        });

        $scope.$watch('formAddress.email', function (newValue, oldValue) {
            $scope.myForm.email.$setValidity('emailExists', !$scope.emailExists());
        });
        console.log($scope.listAllUSers, 'aa')

        $scope.emailExists = function () {
            if (!$scope.formAddress.email) {
                return false; // Email is not set, consider it not existing
            }
            return $scope.listAllUSers.some(staff => staff.email === $scope.formAddress.email);
        };
        // Gửi dữ liệu về máy chủ với ID
        $scope.saveAddress = function () {

            if (dataUserJson) {
                $scope.checkData = true;
            }
            $scope.fee = {};
            if (
                !$scope.formAddress.userName ||
                !$scope.formAddress.phoneNumber ||
                !$scope.formAddress.addressDetail ||
                !$scope.formAddress.ward ||
                !$scope.formAddress.province ||
                !$scope.formAddress.district ||
                (!$scope.formAddress.email && !dataUserJson)
                || $scope.myForm.email.$error.emailExists
                || $scope.myForm.phoneNumber.$error.phoneNumberExists
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
                console.log(res.data)
                CookieService.set('idUser', res.data, 1);
                $('#addressModal').modal('hide');
                console.log($scope.fee, "1---");
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm thành công!',
                    text: 'Thông tin địa chỉ đã được thêm.'
                }).then(function () {
                    $scope.getFee($scope.fee);
                    $scope.getAddressUser();
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
                email: item.Email || dataJson.email || ""
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
                    $scope.selectAddress($scope.addressUser[$scope.addressUser.length - 1]);
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

        $scope.updateBill = function () {
            $scope.showLoading = true;
            var url = `${host}/bill/updateBill`;
            var dataToSend = localStorage.getItem('dataToSend');
            var formDataAdr = localStorage.getItem('dataAdr');
            var listPr = localStorage.getItem('listpr');
            var totaypayyLak = JSON.parse(dataToSend).totalPay;
            var profileUser = JSON.parse(localStorage.getItem('profileUserData'));
            var billId = $cookies.get('billId');

            // Sử dụng $http.put để gửi yêu cầu cập nhật đến API
            console.log(dataToSend, "here");
            // $scope.updateUsageCount2( $scope.idUser_Vch,$scope.usageCount, profileUser.id);
            // return;
            $http.put(url, dataToSend)
                .then(function (res) {
                    // Xử lý khi cập nhật thành công
                    if (res.data) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Đặt hàng thành công!',
                            text: 'Thông tin đơn hàng đã được gửi về mail của bạn.'
                        }).then(function () {
                            if ($scope.idUser_Vch) {
                                $scope.updateUsageCount2($scope.usageCount, $scope.idUser_Vch, profileUser.id);
                                $scope.updatePointRank(totaypayyLak);
                                $scope.updateBillIdPhieu(billId, $scope.voucherId);
                            }
                            $scope.generatePDF(dataToSend, formDataAdr, listPr);
                            $scope.deleteCart();
                            console.log(res.data);
                            localStorage.removeItem('dataToSend');
                            localStorage.removeItem('dataAdr');
                            localStorage.removeItem('listpr');
                            $window.location.href = "http://127.0.0.1:5501/index.html#/portfolio/order"
                        });
                        console.log('Suaw thành công');
                    } else {
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

        // update id phieu vao bill

        $scope.updateBillIdPhieu = function (billId, idVch) {

            var url = 'http://localhost:8080/CodeWalkers/bill/updateIdPhieu/' + billId + "/" + idVch;
            $http.put(url).then(function (res) {
                console.log(res.data);
            }).catch(function (err) {
                console.log("loi khi update id phieu vao bill", err);
            })

        };

        $scope.createPay = async function (totalPay) {
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

            tab = JSON.parse(JSON.stringify(dataToSend));
            var formDataAdr = {
                provinceName: $scope.getSelectedProvinceName(tab.provinceId) || 'None',
                districtName: $scope.getSelectedDistrictName(tab.districtId, tab.provinceId) || 'None',
                wardName: $scope.getSelectedWardName(tab.wardId, tab.districtId) || 'None',
                addressName: tab.address || 'None',
                reduceFee: $scope.reduceFee,
                reducePrice: $scope.reducePrice,
                email: $scope.formAddress.email
            }

            localStorage.setItem('dataToSend', JSON.stringify(dataToSend));
            localStorage.setItem('dataAdr', JSON.stringify(formDataAdr));
            localStorage.setItem('listpr', JSON.stringify($scope.listResPr));
            console.log(formDataAdr, "aa")
            if ($scope.CreateOrder.optionPay == 0) {
                $scope.updateBill();
            } else {
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
                    $window.location.href = res.data;
                }).catch(function (error) {
                    console.error('Create thất bại', error);
                });
            }

        }
        // send invoice
        $scope.getSelectedProvinceName = function (id) {
            if (id && $scope.provinces) {
                const selectedProvince = $scope.provinces.find(province => province.ProvinceID === id);
                return selectedProvince ? selectedProvince.ProvinceName : '';
            } else {
                return '';
            }
        };

        $scope.getSelectedDistrictName = function (id, idProvince) {
            if (id && $scope.districts) {
                const selectedDistrict = $scope.districtsByProvince[idProvince].find(district => district.DistrictID === id);
                return selectedDistrict ? selectedDistrict.DistrictName : '';
            } else {
                return '';
            }
        };

        $scope.getSelectedWardName = function (id, idDistrict) {
            if (id && $scope.wards) {
                const selectedWard = $scope.wardsByProvince[idDistrict].find(ward => ward.WardCode === id);
                return selectedWard ? selectedWard.WardName : '';
            } else {
                return '';
            }
        };


        $scope.generatePDF = function (tab, dataAdr, listPr) {
            tab = JSON.parse(tab);
            dataAdr = JSON.parse(dataAdr);
            listPr = JSON.parse(listPr);
            console.log(tab.userName, "tab");
            console.log(listPr, "tab");
            // Tạo nội dung PDF
            // Khai báo biến totalAmount để lưu tổng tiền sản phẩm
            var totalAmount = 0;

            // Thêm dòng cho mỗi sản phẩm
            var tableBody = listPr.map((product, index) => {
                // Tính giá trị cho cột "Thành tiền" của sản phẩm
                var productTotal = product.quantity * product.price;

                // Thêm vào tổng tiền sản phẩm
                totalAmount += productTotal;

                // Trả về mảng mô tả hàng của bảng
                return [
                    index + 1,
                    product.productDetail.product.name + ' [' + product.productDetail.size.name + ' - ' + product.productDetail.color.name + ']',
                    product.quantity,
                    product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
                    productTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                ];
            });
            // Thêm dòng tổng tiền sản phẩm vào cuối mảng
            tableBody.push([
                '', '', '', 'Tổng tiền:',
                totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
            ]);

            var documentDefinition = {
                content: [
                    { text: 'CodeWalkers', style: 'header' },
                    { text: 'Số điện thoại: 0865683753', style: 'subheader' },
                    { text: 'Email: CodeWalkers2003@gmail.com', style: 'subheader' },
                    { text: 'Địa chỉ: Phú Đô, Nam Từ Liêm, Hà Nội', style: 'subheader' },
                    { text: 'HÓA ĐƠN BÁN HÀNG', style: 'title' },
                    { text: tab.code, style: 'subtitle' },
                    { text: 'Ngày mua: ' + (moment(new Date()).format('DD/MM/yyyy   hh:mm')), style: 'subtext' },
                    { text: 'Khách hàng: ' + (tab.userName || 'Khách lẻ'), style: 'subtext' },
                    getAddressString(dataAdr),
                    { text: 'Số điện thoại: ' + (tab.userPhone || 'None'), style: 'subtext' },
                    { text: 'Danh sách sản phẩm', style: 'tableHeader', },
                    {
                        table: {
                            headerRows: 1,
                            widths: [30, '*', 65, 65, 80],
                            body: [
                                ['STT', 'Sản Phẩm', 'Số Lượng', 'Đơn giá', 'Thành tiền'],
                                // Thêm dòng cho mỗi sản phẩm
                                ...tableBody
                            ]
                        },
                        layout: 'lightHorizontalLines'
                    },
                    {
                        table: {
                            headerRows: 1,
                            widths: [220, 280], // Có thể điều chỉnh chiều rộng cột theo nhu cầu
                            body: [
                                tab.fee !== undefined && tab.fee !== '0'
                                    ? ['Phí vận chuyển:', { text: tab.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), alignment: 'right', margin: [0, 0, 10, 0], bold: true }]
                                    : ['', { text: '' }],
                                dataAdr.reduceFee !== undefined && dataAdr.reduceFee !== '0'
                                    ? ['Giảm giá phí vận chuyển:', { text: "-" + dataAdr.reduceFee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), alignment: 'right', margin: [0, 0, 10, 0], bold: true }]
                                    : ['', { text: '' }],
                                dataAdr.reducePrice !== undefined && dataAdr.reducePrice !== '0'
                                    ? ['Giảm giá đơn hàng:', { text: "-" + dataAdr.reducePrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), alignment: 'right', margin: [0, 0, 10, 0], bold: true }]
                                    : ['', { text: '' }],
                                ['Tổng tiền phải thanh toán:', { text: (parseFloat(tab.totalPay) || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), alignment: 'right', margin: [0, 0, 10, 0], bold: true }],
                                ['Phương thức thanh toán:', { text: tab.optionPay == '0' ? "Thanh toán khi nhận hàng" : "Thanh toán qua VnPay" || 'None', alignment: 'right', margin: [0, 0, 10, 0], bold: true }]
                            ]
                        },
                        margin: [0, 10, 0, 0],
                        layout: 'noBorders' // Xóa đường biên để tránh đường biên trắng xung quanh bảng
                    },
                    { text: '---- Cảm ơn quý khách ----', margin: [0, 20, 0, 5], alignment: 'center', italics: true },

                ],
                styles: {
                    header: {
                        fontSize: 20,
                        alignment: 'center',
                        margin: [0, 0, 0, 10]
                    },
                    subheader: {
                        fontSize: 12,
                        alignment: 'center',
                        margin: [0, 0, 0, 5]
                    },
                    subtext: {
                        fontSize: 12,
                        margin: [0, 0, 0, 5]
                    },
                    title: {
                        fontSize: 16,
                        bold: true,
                        alignment: 'center',
                        margin: [0, 20, 0, 5]
                    },
                    subtitle: {
                        fontSize: 12,
                        alignment: 'center',
                        margin: [0, 0, 0, 10]
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        alignment: 'center',
                        margin: [0, 10, 0, 15],
                        color: 'black'
                    }
                }
            };

            function getAddressString(dataAdr) {
                const fullAddress = `${dataAdr.addressName}, ${dataAdr.wardName}, ${dataAdr.districtName}, ${dataAdr.provinceName}`;
                // Kiểm tra xem có dữ liệu nào không
                if (fullAddress !== 'None, None, None, None') {
                    return { text: 'Địa chỉ: ' + fullAddress, style: 'subtext' };
                }
                // Nếu không có dữ liệu, trả về một mảng trống
                return [];

            }
            // pdfMake.createPdf(documentDefinition).download('invoice_' + tab.code + '.pdf');

            // --Auto Print --
            var pdfDoc = pdfMake.createPdf(documentDefinition);
            pdfDoc.getBlob((blob) => {
                var file = new File([blob], 'document.pdf', { type: 'application/pdf' });
                $scope.sendEmail(JSON.stringify(dataAdr.email), tab.userName, file);
            })
            // $scope.pdfDoc.getBuffer((buffer) => {
            //     var blob = new Blob([buffer], { type: 'application/pdf' });
            //     var url = URL.createObjectURL(blob);

            //     var iframe = document.createElement('iframe');
            //     iframe.style.display = 'none';
            //     iframe.src = url;

            //     document.body.appendChild(iframe);
            //     iframe.contentWindow.print();
            // });       
        };

        $scope.sendEmail = function (email, userName, pdfFile) {
            var url = `${host}/send-with-pdf`;
            // Create a FormData object to send files
            var formData = new FormData();
            formData.append('email', email);
            formData.append('pdfFile', pdfFile);
            formData.append('textContent', userName);
            console.log(formData, 'a')
            console.log(typeof pdfFile);  // Check the type of pdfFile
            console.log(pdfFile);  //
            $http.post(url, formData, {
                transformRequest: angular.identity, // Use FormData to send files
                headers: { 'Content-Type': undefined } // Let the browser set the content type
            }).then(function (res) {
                console.log(res.data);
                if (!res.data) {
                    toastr.error("Fail", "Notice");
                }
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
            }
            else if (vnp_TransactionStatus == null) {
                // $window.location.href = "http://127.0.0.1:5501/index.html#/payment"
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

        var profileUser = JSON.parse(localStorage.getItem('userProfile'));
        var point1 = 0;

        $scope.updatePointRank = function (totalPay) {
            console.log(totalPay, 'neeeeeee');
            console.log(profileUser.points)
            if (profileUser) {
                if (!isNaN(totalPay)) {
                    if (totalPay >= 5000000) {
                        point1 = profileUser.points + 150;
                    } else if (totalPay >= 1000000) {
                        point1 = profileUser.points + 50;
                    } else {
                        point1 = profileUser.points + 20;
                    }
                } else {
                    console.error('totalPay không phải là số.', totalPay);
                    return Promise.reject('totalPay không phải là số.'); // Trả về promise bị từ chối nếu totalPay không phải là số
                }

                var data = {
                    userName: dataJson.username,
                    point: point1
                };
                console.log(data);

                // Trả về promise từ $http.put
                return $http.put('http://localhost:8080/CodeWalkers/admin/User/update/point-rank', JSON.stringify(data))
                    .then(function (response) {
                        // Khi hàm $http.put hoàn thành, bạn có thể xử lý kết quả tại đây
                        console.log('update thành công ne', response.data);
                        return response.data; // Trả về dữ liệu từ response để có thể xử lý tiếp theo nếu cần
                    })
                    .catch(function (error) {
                        // Xử lý lỗi nếu có
                        console.error('Create thất bại', error);
                        throw error; // Ném lỗi để có thể xử lý tiếp theo nếu cần
                    });
            }
        };




    }, 300); // 1000 milliseconds = 1 giây

});


app.filter('dateFormat', function () {
    return function (input) {
        var date = new Date(input);
        var day = date.getDate();
        var month = date.getMonth() + 1; // Tháng bắt đầu từ 0
        var year = date.getFullYear();

        // Định dạng lại thành chuỗi "dd.mm.yyyy"
        return (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + year;
    };
});