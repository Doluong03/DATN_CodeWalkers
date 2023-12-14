app.controller(
    "ProfileController",
    function ($scope, $timeout, $http, $anchorScroll) {
        // Scroll đến phần tử có id "pageContent"
        $anchorScroll("pageContent");
        var dataUserJson = localStorage.getItem('userIdData');
        var dataUserCart = localStorage.getItem('userCartData');
        // Retrieve the data from local storage and parse it
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
            }
        }

        var profileUser = JSON.parse(localStorage.getItem('userProfile'));
        $scope.info = {
            userName: "",
            fullName: "",
            email: "",
            phone: "",
            gender: false,
            dateOfBirth: "",
            image: "",
            rank : "",
            points : null
        };
        $scope.selectedImage = null;
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

        $scope.getProfile = function () {
            if (profileUser) {
                $scope.info = {
                    userName: profileUser.userName,
                    fullName: profileUser.name,
                    email: profileUser.email,
                    phone: profileUser.phoneNumber,
                    gender: profileUser.gender,
                    dateOfBirth: new Date(profileUser.dateOfBirth),
                    image: profileUser.image,
                    rank : profileUser.rank.name,
                    points : profileUser.points
                };
                console.log($scope.info, $scope.dateFormat($scope.info.dateOfBirth));
            }
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

        $scope.getAddressUser = function () {
            var url = `${host}/get-address/`;
            var idUser = dataUserJson;

            $http.get(url + idUser).then(function (res) {
                $scope.addressUser = res.data;
                if($scope.addressUser.length === 0){
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
