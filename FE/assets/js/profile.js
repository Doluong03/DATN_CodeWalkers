app.controller(
    "ProfileController",
    function ($scope, $timeout, $http, $anchorScroll, $routeParams) {
        // Scroll đến phần tử có id "pageContent"
        $anchorScroll("pageContent");
        var dataUserJson = localStorage.getItem('userIdData');
        var dataUserCart = localStorage.getItem('userCartData');
        // Retrieve the data from local storage and parse it
        var dataUser = localStorage.getItem('userData');
        var dataJson = JSON.parse(dataUser);
        console.log(dataJson, '5')
        //config headers
        var headers = {
            headers: {
                Authorization: "Bearer " + tokenAuthen(),
                Accept: "application/json",
                "Content-Type": "application/json",
                // Các header khác nếu cần
            },
        };

        //token authen
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
                window.location.href = "http://127.0.0.1:5501/index.html#home";
            }
        }

        $scope.getDataByUserName = function (username) {
            var url = `${host}/profile/${username}`;
            $http.get(url).then(function (res) {
                // Lưu giá trị vào localStorage
                localStorage.setItem('profileUserData', JSON.stringify(res.data));

                // Cập nhật giá trị trong $scope
                $scope.profileUser = res.data;
                console.log(profileUser, 'a')
            }).catch(function (err) {
                console.log("Lỗi khi tải voucher: " + err);
            });
        }
        $scope.getDataByUserName(dataJson.username);

        var profileUser = JSON.parse(localStorage.getItem('profileUserData'));
        $scope.info = {
            userName: "",
            fullName: "",
            email: "",
            phone: "",
            gender: false,
            dateOfBirth: "",
            image: "",
            rank: "",
            points: null
        };
        $scope.selectedImage = null;
        $scope.getProfile = function () {
            $scope.getDataByUserName(dataJson.username);
            if (profileUser) {
                console.log(profileUser);
                $scope.info = {
                    userName: profileUser.userName,
                    fullName: profileUser.name,
                    email: profileUser.email,
                    phone: profileUser.phoneNumber,
                    gender: profileUser.gender,
                    dateOfBirth: new Date(profileUser.dateOfBirth),
                    image: profileUser.rank.id,
                    rank: profileUser.rank.name,
                    points: profileUser.points
                };
            }
        }
        $scope.selectTab = function () {
            // Check if brandName is provided in the URL
            var selectedTabFromUrl = $routeParams.selectedTab;
            if (selectedTabFromUrl) {
                handleTabClick(selectedTabFromUrl);
            }
            $scope.getProfile();
        }
        $scope.selectTab();
        function handleTabClick(tabId) {
            $scope.getProfile();

            // Deactivate all tabs
            var tabs = document.querySelectorAll('.nav-pills li');
            tabs.forEach(function (tab) {
                tab.classList.remove('active');
            });

            // Activate the clicked tab
            var clickedTab = document.getElementById(tabId + '-tab');
            clickedTab.classList.add('active');

            // Show/hide tab content based on the clicked tab
            var tabContent = document.querySelectorAll('.tab-content .tab-pane');
            tabContent.forEach(function (tabPane) {
                tabPane.classList.remove('show', 'active');
            });
            $scope.getProfile();
            var clickedTabContent = document.getElementById(tabId);
            clickedTabContent.classList.add('show', 'active');
        }
        $scope.dateFormat = function (input) {
            if (input) {
                var date = new Date(input);
                var day = date.getDate();
                var month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
                var year = date.getFullYear();

                // Hàm để thêm số 0 ở đầu nếu cần
                function pad(number) {
                    if (number < 10) {
                        return "0" + number;
                    }
                    return number;
                }

                return year + '-' + pad(month) + '-' + pad(day);
            }
            return "";
        }


        $scope.getProfile();


        $scope.loadProvince = function () {
            var url = `${host}/get-province`;
            $http.get(url).then(function (res) {
                $scope.provinces = res.data;
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách kích thước", error);
            });
        }
        $scope.loadProvince();
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
        $scope.wardsByProvince = {};
        $scope.loadWardUser = function (id) {
            var url = `${host}/get-Ward/`;
            $http.get(url + id).then(function (res) {
                $scope.wardsByProvince[id] = res.data;
            }).catch(function (error) {
                console.log("Lỗi khi tải danh sách kích thước", error);
            });
        }
        $scope.formAddress = {
            addressDetail: "",
            ward: "",
            province: "",
            district: "",
            userName: "",
            phoneNumber: "",
            email: ""
        }


        $scope.formAddress = {
            addressDetail: "",
            ward: "",
            province: "",
            district: "",
            userName: "",
            phoneNumber: "",
            email: ""
        }

        $scope.getAddressUser = function () {
            var url = `${host}/get-address/`;
            var idUser = dataUserJson;

            $http.get(url + idUser).then(function (res) {
                $scope.addressUser = res.data;
                if ($scope.addressUser.length === 0) {
                    return;
                }
                console.log($scope.addressUser, 'dc');
                if (!$scope.selectedAddress) {
                    $scope.selectedAddress = $scope.addressUser[$scope.addressUser.length - 1];
                    $scope.idAddressUser = $scope.selectedAddress.Id;
                }

            }).catch(function (error) {
                console.log("Lỗi khi tải Danh sách địa chỉ", error);
            });
        }
        $scope.selectAddress = function (address) {
            $scope.selectedAddress = address;
            $scope.idAddressUser = address.Id;
        };
        $scope.getAddressUser();


        $scope.uploadImage = function (file, event) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định

            if (file) {
                var formData = new FormData();
                formData.append('file', file);
                $http.post('http://localhost:8080/api/upload', formData, {
                    headers: { 'Content-Type': undefined }
                })
                // Gửi yêu cầu AngularJS đến Spring Boot server

            } else {
                alert('Vui lòng chọn ảnh trước.');
            }
        };

        $scope.selectImage = function (event) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định

            // Kích hoạt sự kiện click cho input file
            document.getElementById('imageInput').click();
        };
        //update
        $scope.UpdateUser = function () {
            $scope.formUserUpdate = {
                id: dataUserJson,
                userName: $scope.info.userName,
                name: $scope.info.fullName,
                dateOfBirth: $scope.info.dateOfBirth,
                phoneNumber: $scope.info.phone,
                gender: $scope.info.gender,
                email: $scope.info.email,
                image: $scope.info.image,
            };
            console.log($scope.formUserUpdate, 'here')
            Swal.fire({
                title: "Xác nhận",
                text: "Bạn có chắc chắn muốn thực hiện hành động này?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Có",
                cancelButtonText: "Không",
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = `${host}/admin/User/update`;
                    $http
                        .put(
                            url,
                            JSON.stringify($scope.formUserUpdate),
                            headers
                        )
                        .then(function (response) {
                            console.log("Success Response:", response.data); // Assuming the data property contains the relevant information
                            Swal.fire({
                                icon: "success",
                                title: "Cập nhật thành công!",
                                text: "Thông tin người dùng đã được cập nhật.",
                            });
                        })
                        .catch(function (error) {
                            console.error("Error:", error);
                            Swal.fire({
                                icon: "error",
                                title: "Lỗi!",
                                text: "Đã xảy ra lỗi khi cập nhật người dùng. Vui lòng thử lại sau.",
                            });
                        });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Hủy bỏ", "", "error");
                }
            });
        };

        $scope.resetModalContent = function () {
            $scope.checkAction = false;
            $scope.nameAction = "Thêm mới";
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

        //Address
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
                $scope.getAddressUser();
                $('#addressModal').modal('hide');
                Swal.fire({
                    icon: 'success',
                    title: 'Thêm thành công!',
                    text: 'Thông tin địa chỉ đã được thêm.'
                }).then(function () {
                    $scope.getAddressUser();
                });
                return true;
            }).catch(function (error) {
                console.error('ADD thất bại', error);
                return false;
            });
        };
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
                });
                return true;
            }).catch(function (error) {
                console.error('update adr thất bại', error);
                return false;
            });
        }

        $scope.deleteAdr = function (item) {
            var idAdr = item.Id;
            Swal.fire({
                title: "Xác nhận",
                text: "Bạn có chắc chắn muốn thực hiện hành động này?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Có",
                cancelButtonText: "Không",
            }).then((result) => {
                if (result.isConfirmed) {
                    var url = `${host}/delete-address-by-id/`;
                    $http.delete(url + idAdr).then(function (response) {
                        $scope.getAddressUser();
                        toastr.success('Xóa thành công!', 'Thông báo');
                    }).catch(function (error) {
                        console.error('update adr thất bại', error);
                        return false;
                    });
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('Hủy bỏ', '', 'error');
                }
            })
        }

        // Định nghĩa hàm để lấy danh sách voucher có số lượng lớn hơn 0
        function loadAllVouchers2() {
            var url = `${host}/vouchers/getAll`;
            $http.get(url)
                .then(function (res) {
                    // Lọc danh sách voucher có số lượng lớn hơn 0
                    $scope.listAllVouchers = res.data.filter(vch => vch.quantity > 0 && new Date(vch.endDate) >= new Date());

                    console.log("Danh sách voucher khi tải: " + JSON.stringify(res.data));
                })
                .catch(function (err) {
                    console.log("Lỗi khi tải danh sách voucher: " + err);
                });
        }
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
        $scope.loadVoucherUser();
        // Gọi hàm để tải danh sách voucher khi cần
        loadAllVouchers2();
        $scope.voucherUser = {
            usageCount: 0,
            users: { id: "" },
            voucher: { id: "" },
            status: true,
            customType: 0
        }
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
            var usageCount = $scope.voucherUser.usageCount;
            console.log($scope.voucherUser.usageCount, 'a', userPoint)
            if ($scope.voucherUser.usageCount <= 0 || ($scope.voucherUser.usageCount * exChangePoint) > userPoint) {
                toastr.error('Vui lòng nhập số lượng muốn đổi hoặc xem lại số điểm bạn hiện có', 'Lỗi!');
                return;
            } else if ($scope.voucherUser.usageCount > quantity) {
                toastr.error('Vui lòng nhập số lượng muốn đổi <= số lượng phiếu hiện có', 'Lỗi!');
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
                                    customType: 0,
                                    usageCount: usageCount
                                };

                                if (userPoint > exChangePoint) {
                                    // Update quantity first
                                    console.log(usageCount, 'a', quantity1)

                                    return $scope.updateQuantity(id, quantity1 - usageCount)
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

        $scope.updateUsageCount2 = function (idUser, usageCount, idUser_Vch) {

            $http.patch(`http://localhost:8080/CodeWalkers/admin/user-voucher/update?UsageCount=${usageCount}&id=${idUser_Vch}&idUser=` + idUser)
                .then(function (res) {
                    // Xử lý kết quả thành công
                })
                .catch(function (err) {
                    console.log("Lỗi Update số lần sử dụng", err);
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

    });
app.directive('fileInput', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.on('change', function (event) {
                event.preventDefault(); // Ngăn chặn hành vi mặc định
                var files = event.target.files;
                ngModelCtrl.$setViewValue(files[0].name);
                // scope.uploadImage(files[0], event);
            });
        }
    };
}]);
