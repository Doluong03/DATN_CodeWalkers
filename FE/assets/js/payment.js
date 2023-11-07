<<<<<<< HEAD
app.controller("PaymentController", function ($scope, $window, $cookies, $http, $anchorScroll, $filter) {
=======
app.controller("PaymentController", function ($scope, $routeParams, $http, $anchorScroll) {
>>>>>>> origin/thaovpph27640
    // Scroll đến phần tử có id "pageContent"
    $anchorScroll("pageContent");

    $scope.listBillDt = [];
    $scope.totalPrices = [];
    $scope.idBillIP = 0;
<<<<<<< HEAD
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
                    
                }else{
                    $scope.totalPay= $scope.totalPrice;
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
=======
    setTimeout(function () {
        $scope.testRd = getRandomThousand();
        $scope.testRd2 = getRandomThousand();
        $scope.calculateTotalPrice = function (item) {
            // Tính tổng giá trị của sản phẩm (price * quantity)
            return item.price * item.quantity;
        };
        function getRandomThousand() {
            // Sinh một số ngẫu nhiên từ 0 đến 1
            var randomFraction = Math.random();

            // Làm tròn số ngẫu nhiên lên đến số tròn nghìn gần nhất
            var randomNumber = Math.round(randomFraction * 55 + 15) * 1000;

            return randomNumber;
        }
        // Hàm này sẽ thực hiện sau 1 giây
        $scope.loadBillDt = function (id) {
            var url = `${host}/api/billDt`;
            // Sử dụng params để truyền tham số id vào yêu cầu GET
            var config = {
                params: { idBill: id }
            };
            $http.get(url, config).then(res => {
                $scope.listBillDt = res.data;
                console.log(res.data);
                console.log("Success ->>>>>>", res);
                $scope.totalPrice = 0;
                $scope.totalPrice = 0;
                $scope.randomValue = 0;
                $scope.randomValue1 = 0;
                $scope.randomValue2 = 0;
                $scope.countItem = $scope.items.length;
                $scope.totalPay = 0;
                for (var i = 0; i < $scope.listBillDt.length; i++) {
                    var Price = $scope.calculateTotalPrice($scope.listBillDt[i]);
                    $scope.totalPrice += $scope.calculateTotalPrice($scope.listBillDt[i]);
                    $scope.totalPrices.push(Price);
                    $scope.randomValue1 += $scope.testRd;
                    $scope.randomValue2 = $scope.testRd2;
                    $scope.randomValue = $scope.randomValue1 + $scope.randomValue2;
                    $scope.totalPay = ($scope.totalPrice + $scope.randomValue);
                }
            }).catch(error => {
                console.log("Error", error);
            });
        }

        $scope.idBillIP = 0;
        // Tạo một hàm trả về một Promise để lấy idBillIP từ API
        function getIdBillIP() {
            return new Promise(function (resolve, reject) {
                var url = `${host}/api/getBill`;
                $http.get(url).then(function (res) {
                    $scope.items = res.data;
                    var idBillIP = $scope.items[$scope.items.length - 1].id;
                    resolve(idBillIP);
                }).catch(function (error) {
                    reject(error);
                });
            });
        }

        // Sử dụng Promise để lấy idBillIP và sau đó gọi hàm loadBillDt
        getIdBillIP().then(function (idBillIP) {
            console.log("ID Bill IP: " + idBillIP);
            $scope.loadBillDt(idBillIP);
        }).catch(function (error) {
            console.log("Lỗi khi lấy ID Bill IP", error);
        });
>>>>>>> origin/thaovpph27640

        // Các dòng code sau đây sẽ thực hiện trước khi có kết quả từ Promise
        console.log("Chờ ID Bill IP...");
        console.log('Hàm này được gọi sau 1 giây');
<<<<<<< HEAD

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
            $http.get(url + idUser).then(function (res) {
                $scope.addressUser = res.data;
                // $scope.loadDistrictUser(res.data[0].ProvinceID);
                if (!$scope.selectedAddress) {
                    $scope.selectedAddress = $scope.addressUser[0];
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
            var url = `${host}/save-address`;
            $scope.fee = {
                quantity: $scope.totalQuantity,
                wardId: $scope.formAddress.ward.WardCode,
                districtId: $scope.formAddress.district.DistrictID
            };
            // Lấy ID tỉnh/thành phố từ đối tượng
            var cartId = $cookies.get('cartId');
            var idUser = $cookies.get('idUser');
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
            $scope.showLoading = true;
            var url = `${host}/bill/createOrder`;
            if (!dataUserJson) {
                var cartId = $cookies.get('cartId');
                var dataToSend = {
                    toName: $scope.formAddress.userName,
                    toPhone: $scope.formAddress.phoneNumber,
                    toAddress: $scope.formAddress.addressDetail,
                    districtId: $scope.formAddress.district.DistrictID,
                    wardId: $scope.formAddress.ward.WardCode,
                    listItems: $scope.listResPr,
                    quantity: $scope.totalQuantity,
                    optionsPay: $scope.CreateOrder.optionPay,
                    totalPay: $scope.totalPay,
                };
            } else {
                var cartId = dataUserCart;
                var dataToSend = {
                    toName: $scope.selectedAddress.UserName,
                    toPhone: $scope.selectedAddress.PhoneNumber,
                    toAddress: $scope.selectedAddress.AddressDetail,
                    districtId: $scope.selectedAddress.DistrictID,
                    wardId: $scope.selectedAddress.WardCode,
                    listItems: $scope.listResPr,
                    quantity: $scope.totalQuantity,
                    optionsPay: $scope.CreateOrder.optionPay,
                    totalPay: $scope.totalPay,
                };
            }
            console.log(dataToSend, "<---")
            $http.post(url, dataToSend).then(function (res) {
                console.log("order ", res.data);
                $scope.pay(cartId);
                $scope.updateBill(res.data)
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
        $scope.updateBill = function (data) {
            $scope.showLoading = true;
            var url = `${host}/bill/updateBill`;
            var billId = $cookies.get('billId');
            if (!dataUserJson) {
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
                }
            } else {
                var dataToSend = {
                    idBill: billId,
                    address: $scope.selectedAddress.AddressDetail,
                    wardId: $scope.selectedAddress.WardCode,
                    provinceId: $scope.selectedAddress.ProvinceID, // Gửi ID
                    districtId: $scope.selectedAddress.DistrictID,
                    userName: $scope.selectedAddress.UserName,
                    phone: $scope.selectedAddress.PhoneNumber,
                    fee: data.total_fee,
                    note: data.order_code,
                    optionPay: $scope.CreateOrder.optionPay,
                    totalPay: $scope.totalPay,
                    shipDate: data.expected_delivery_time
                }
            }
            console.log("here-data", dataToSend)

            // Hiển thị loading spinner
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
=======
    }, 50); // 1000 milliseconds = 1 giây



>>>>>>> origin/thaovpph27640
});