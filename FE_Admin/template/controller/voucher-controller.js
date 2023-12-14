
window.VoucherController = function ($scope, $http, $window, $timeout, $filter, $location, VoucherService) {
    $scope.listVoucher = [];
    $scope.pageNo = 1;
    $scope.sizePage = 5;
    $scope.lastIndex = 0; // phần tử cuối của mảng
    $scope.totalPage = 0;
    $scope.pageCurrent = 1;
    $scope.itemsPerPage = 3; // Số lượng trang bạn muốn hiển thị
    $scope.hoveredPage = null;
    $scope.importing = false; // Biến để theo dõi trạng thái của animation
    $scope.importInProgress = false; // Flag để kiểm soát quá trình import
    $scope.errorShown = false; // Flag để kiểm soát việc hiển thị lỗi
    $scope.sortColumn = '';
    $scope.reverseSort = false;
    $scope.selectAll = true; // Đặt giá trị mặc định cho checkbox "Chọn Tất Cả"
    $scope.columns = [];
    $scope.listUSers = [];
    $scope.pageNoUser = 1;
    $scope.sizePageUser = 5;
    $scope.totalPageUser = 0;
    $scope.pageCurrentUser = 1;
    $scope.itemsPerPageUser = 3;
    $scope.listAllUser = [];
    // Khai báo biến và khởi tạo giá trị mặc định
    $scope.columnFilters = {};
    $scope.listAllUserOld = [];
    $scope.listAllUserNew = [];
    $scope.listAllUserSliver = [];
    $scope.listAllUserGold = [];
    $scope.listAllUserDiamond = [];

    // Tạo một biến để lưu trữ giá trị selectedStatus
    $scope.selectedStatus = [];
    $scope.formattedEndDate2 = '';
    $scope.datePickerFormat = 'dd/MM/yyyy';
    $scope.altInputFormats = ['d!/M!/yyyy'];
    $scope.datePickerOpened = false;


    $scope.formVoucher = {
        code: "",
        name: "",
        description: "",
        value: 0.0,
        endDate: null,
        status: true,
        image: "",
        condition: 0.0,
        maxReduction: 0.0,
        quantity: 0,
        useForm: "Đơn Hàng",
        discountType: "Phần Trăm",
        status: false,
        exchangeAllowed: false

    }
    $scope.formUpdateVoucher = {
        id: "",
        code: "",
        name: "",
        description: "",
        value: 0.0,
        endDate: new Date(),
        status: false,
        image: "",
        condition: 0.0,
        maxReduction: 0.0,
        quantity: 0,
        useForm: "Đơn Hàng",
        discountType: "Phần Trăm",
        status: false,
        customType: 0,
        exchangeAllowed: false
    }
    $scope.voucherUser = {
        usageCount: 0,
        users: { id: "" },
        voucher: { id: "" },
        status: true,
        customType: 0
    }
    $scope.voucherUserUpdate = {
        id: "",
        usageCount: 0,
        voucher: { id: "" },
        status: true,
        customType: 0
    }
    //config headers
    var headers = {
        headers: {
            'Authorization': 'Bearer ' + tokenAuthen(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // Các header khác nếu cần
        }
    };
    //token authen
    function tokenAuthen() {
        var userDataString = localStorage.getItem('userData');
        if (userDataString) {
            var userData = JSON.parse(userDataString);
            return userData.token;
        } else {
            console.log('Không có dữ liệu đăng nhập trong localStorage.');
        }
    }
    // get listVoucher
    $scope.hienThi = function (pageNo, sizePage) {
        let apiUrl = apiVoucher + "?pageNo=" + pageNo + "&sizePage=" + sizePage;
        $http.get(apiUrl, headers).then(
            function (response) {
                // Xử lý phản hồi thành công
                $scope.listVoucher = response.data.vouchersList;
                $scope.totalPage = response.data.totalPages;
                console.log("voucher:" + $scope.listVoucher);
                console.log(response.data.totalPages);
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            }
        );
    };
    // Mảng dữ liệu trạng thái
    $scope.statusOptions = [
        { id: '', value: 'Tất cả' },
        { id: '1', value: 'Khách hàng cũ' },
        { id: '2', value: 'Khách hàng mới' },
        { id: '3', value: 'Hạng bạc' },
        { id: '4', value: 'Hạng vàng' },
        { id: '5', value: 'Hạng kim cương' }
    ];

    $scope.selectedStatus = [$scope.statusOptions[0]];

    $timeout(function () {
        var selectStatus = $('#selectStatus');

        selectStatus.select2().on('change', function (e) {
            $scope.$apply(function () {
                // Lấy giá trị mới từ Select2
                var selectedValues = selectStatus.val();

                // Kiểm tra xem selectedValues có tồn tại và không phải là mảng rỗng không
                if (Array.isArray(selectedValues) && selectedValues.length > 0) {
                    // Lọc và gán giá trị vào $scope
                    $scope.selectedStatus = $scope.statusOptions.filter(function (option) {
                        return selectedValues.includes(option.id);
                    });

                    // Log giá trị mới ra console
                    console.log("Selected status values:", $scope.selectedStatus);
                } else {
                    // Xử lý trường hợp giá trị không xác định
                    console.error("Selected values are undefined or empty.");
                }
            });
        });
    });

    $scope.toggleStatus2 = function (status) {
        if (status === 'off') {
            $scope.formUpdateVoucher.status = true;
        } else if (status === 'on') {
            $scope.formUpdateVoucher.status = false;
        }
    };
    $scope.toggleStatus1 = function (status) {
        if (status === 'off') {
            $scope.formVoucher.status = true;
        } else if (status === 'on') {
            $scope.formVoucher.status = false;
        }
    };


    $scope.toggleStatus3 = function (status) {
        if (status === 'off') {
            $scope.formVoucher.exchangeAllowed = true;

        } else if (status === 'on') {
            $scope.formVoucher.exchangeAllowed = false;

        }
    };

    $scope.toggleStatus3('on');


    $scope.toggleStatus4 = function (status) {
        if (status === 'off') {
            $scope.formUpdateVoucher.exchangeAllowed = true;
            $scope.isSelectStatusDisabled2 = function () {
                return true;
            };
        } else if (status === 'on') {
            $scope.formUpdateVoucher.exchangeAllowed = false;
            $scope.isSelectStatusDisabled2 = function () {
                return false;
            };
        }
    };



    //phan trang
    $scope.pageRange = function () {
        var startPage = Math.max(1, $scope.pageCurrent - Math.floor($scope.itemsPerPage / 2));
        var endPage = Math.min($scope.totalPage, startPage + $scope.itemsPerPage - 1);
        var pages = [];

        if ($scope.pageCurrent + Math.floor($scope.itemsPerPage / 2) > $scope.totalPage) {
            startPage = Math.max(1, $scope.totalPage - $scope.itemsPerPage + 1);
            endPage = $scope.totalPage;
        }

        // Bắt đầu từ trang đầu tiên nếu trang hiện tại là quá giữa danh sách
        if (startPage > 1) {
            startPage = Math.max(1, startPage - 1);
        }

        for (var i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };
    $scope.pageRangeUser = function () {
        var startPage = Math.max(1, $scope.pageCurrentUser - Math.floor($scope.itemsPerPageUser / 2));
        var endPage = Math.min($scope.totalPageUser, startPage + $scope.itemsPerPageUser - 1);
        var pages = [];

        if ($scope.pageCurrentUser + Math.floor($scope.itemsPerPageUser / 2) > $scope.totalPageUser) {
            startPage = Math.max(1, $scope.totalPageUser - $scope.itemsPerPageUser + 1);
            endPage = $scope.totalPageUser;
        }

        // Bắt đầu từ trang đầu tiên nếu trang hiện tại là quá giữa danh sách
        if (startPage > 1) {
            startPage = Math.max(1, startPage - 1);
        }

        for (var i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    $scope.nextPage = function () {
        if ($scope.pageCurrent < $scope.totalPage) {
            $scope.pageCurrent++;
            $scope.hienThi($scope.pageCurrent, $scope.sizePage);
        }
    };

    $scope.previousPage = function () {
        if ($scope.pageCurrent > 1) {
            $scope.pageCurrent--;
        }
        $scope.hienThi($scope.pageCurrent, $scope.sizePage);
    };

    $scope.onHover = function (index) {
        $scope.hoveredPage = index;
    };

    $scope.onLeave = function () {
        $scope.hoveredPage = null;
    };

    //user
    $scope.nextPageUser = function () {
        if ($scope.pageCurrentUser < $scope.totalPageUser) {
            $scope.pageCurrentUser++;
            $scope.hienThiUser($scope.pageCurrentUser, $scope.sizePageUser);
        }
    };

    $scope.previousPageUser = function () {
        if ($scope.pageCurrentUser > 1) {
            $scope.pageCurrentUser--;
        }
        $scope.hienThiUser($scope.pageCurrentUser, $scope.sizePage);
    };

    $scope.onHoverUser = function (index) {
        $scope.hoveredPageUser = index;
    };

    $scope.onLeaveUser = function () {
        $scope.hoveredPageUser = null;
    };
    // hàm thay đổi số phần tử của trang
    $scope.onSizePageChange = function () {
        console.log("New Size Page: " + $scope.sizePage);
        $scope.hienThi($scope.pageNo, $scope.sizePage);
    };
    $scope.onSizePageChangeUser = function () {
        console.log("New Size Page: " + $scope.sizePageUser);
        $scope.hienThiUser($scope.pageNoUser, $scope.sizePageUser);
    };

    // end phân trang
    $scope.PageNo = function (pageNo, sizePage) {
        $scope.pageCurrent = pageNo; // Cập nhật pageCurrent khi chọn trang cụ thể
        $scope.sizePage = sizePage; // Cập nhật sizePage
        $scope.hienThi(pageNo, sizePage);
        $scope.hoveredPage = pageNo; // Truyền giá trị pageNo vào hàm hienThi
    };
    $scope.PageNoUser = function (pageNo, sizePage) {
        $scope.pageCurrentUser = pageNo; // Cập nhật pageCurrent khi chọn trang cụ thể
        $scope.sizePageUser = sizePage; // Cập nhật sizePage
        $scope.hienThiUser(pageNo, sizePage);
        $scope.hoveredPageUser = pageNo; // Truyền giá trị pageNo vào hàm hienThi
    };

    //goi ham
    $scope.hienThi($scope.pageNo, $scope.sizePage);
    //xóa voucher
    $scope.removeVoucher = async function (event, item) {
        event.preventDefault();

        const VcId = item.id;
        const api = `${apiURL}admin/voucher/delete/${VcId}`;

        const confirmResult = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        });

        if (confirmResult.isConfirmed) {
            try {
                const response = await $http.delete(api, headers);
                Swal.fire('Xóa thành công!', '', 'success');
                $scope.hienThi($scope.pageCurrent, $scope.sizePage);
                console.log(response);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Lỗi!",
                    text: "Đã xảy ra lỗi khi xóa voucher. Vui lòng thử lại sau."
                });
            }
        } else if (confirmResult.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Hủy bỏ', '', 'error');
        }
    };
    //save 
    $scope.addVoucher = async function (event) {
        event.preventDefault();
        console.log($scope.formVoucher)

        try {
            const confirmResult = await Swal.fire({
                title: 'Xác nhận',
                text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Có',
                cancelButtonText: 'Không'
            });

            if (!confirmResult.isConfirmed) {
                Swal.fire('Hủy bỏ', '', 'error');
                return;
            }

            if ($scope.selectedStatus.length === 0) {
                $scope.formVoucher.customType = 0;
            } else {
                for (const status of $scope.selectedStatus) {
                    const selectedId = status.id;

                    // Set customType based on the selectedStatus id
                    switch (selectedId) {
                        case '':
                            $scope.voucherUser.customType = 0;
                            break;
                        case '1':
                            $scope.voucherUser.customType = 1;
                            break;
                        case '2':
                            $scope.voucherUser.customType = 2;
                            break;
                        case '3':
                            $scope.voucherUser.customType = 3;
                            break;
                        case '4':
                            $scope.voucherUser.customType = 4;
                            break;
                        case '5':
                            $scope.voucherUser.customType = 5;
                            break;
                        default:
                            // Handle other cases if needed
                            break;
                    }

                    const response = await $http.post(apiVoucher + "/save", JSON.stringify($scope.formVoucher), headers);
                    console.log("Success Response:", response.data);

                    const idVoucher = response.data.data.id;

                    if (!$scope.formVoucher.exchangeAllowed) {
                        // Add voucher users based on the selectedStatus id
                        const voucherUsersList = getVoucherUsersList(selectedId);
                        await $scope.addVoucherUsers(idVoucher, voucherUsersList);
                    }

                    // Display success message after voucher users have been added
                    Swal.fire({
                        icon: 'success',
                        title: 'Tạo Voucher thành công!',
                        text: 'Thông tin Voucher đã được thêm.',
                    });
                }
            }
        } catch (error) {
            console.error("Error:", error);

            // If there was an error, delete the voucher if it was added
            if (idVoucher) {
                await $http.delete(apiVoucher + "/delete/" + idVoucher, headers);
            }

            Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: "Đã xảy ra lỗi khi thêm voucher. Vui lòng thử lại sau."
            });
        } finally {
            // Ensure that the loading flag is set to false regardless of success or failure
            $scope.loading = false;
        }
    };

    // Function to get voucher users list based on the selected status id
    function getVoucherUsersList(selectedStatusId) {
        switch (selectedStatusId) {
            case '':
                return $scope.listAllUser;
            case '1':
                return $scope.listAllUserOld;
            case '2':
                return $scope.listAllUserNew;
            case '3':
                return $scope.listAllUserSliver;
            case '4':
                return $scope.listAllUserGold;
            case '5':
                return $scope.listAllUserDiamond;
            default:
                // Handle other cases if needed
                return [];
        }
    }


   
    // Function to add voucher users
    $scope.addVoucherUsers = async function (idVoucher, listUser) {
        // Create a promise for each userVoucher
        const promises = listUser.map(async function (user) {
            var newVoucherUser = angular.copy($scope.voucherUser);
            newVoucherUser.voucher.id = idVoucher;
            newVoucherUser.users.id = user.id;

            try {
                // Return a promise from each request
                return await $http.post('http://localhost:8080/CodeWalkers/admin/voucher/save-voucherUser', newVoucherUser, headers);
            } catch (error) {
                console.error("Error adding userVoucher:", error);
                // If there is an error, return a promise resolved with the error value
                return Promise.reject(error);
            }
        });

        // Wait for all promises to complete
        await Promise.all(promises);
    };
    $scope.toggleFormUpdate = function (event, item) {
        event.preventDefault();
        console.log("Toggle form update clicked. Item:", item);

        // Navigate to the "update-voucher" page
        $location.path("/update-voucher");

        // Load data of the selected row into the update form
        VoucherService.setFormUpdateVoucher({
            id: item.id,
            code: item.code,
            name: item.name,
            description: item.description,
            value: item.value,
            endDate: item.endDate,
            status: item.status,
            image: item.image,
            condition: item.condition,
            maxReduction: item.maxReduction,
            quantity: item.quantity,
            useForm: item.useForm,
            discountType: item.discountType,
            exchangeAllowed: item.exchangeAllowed,

        });
        // After setting the form data, call dataUsegate and setSelctedtatus2
        $scope.dataUsegate();
        $scope.setSelctedtatus2();
    };
    $scope.formUpdateVoucher = VoucherService.getFormUpdateVoucher();

    $scope.dataUsegate = function () {
        var id = $scope.formUpdateVoucher.id;
        if (id) {
            var url = 'http://localhost:8080/CodeWalkers/admin/user-voucher/getOne?id=' + id;
            $http.get(url, headers).then(function (res) {
                console.log("use geate", res.data);
                $scope.voucherUser.usageCount = res.data[0].useCount;
                $scope.voucherUserUpdate.customType = res.data[0].customType;
                $scope.voucherUserUpdate.id = res.data[0].id;

            }).catch(function (err) {
                console.log("loi lay user voucher:" + err);
            });
        } else {
            console.log("ID is not available. Unable to call dataUsegate.");
        }
    };

    $scope.setSelctedtatus2 = function () {
        console.log($scope.voucherUserUpdate.customType + " hihiiii");
        var customType = $scope.voucherUserUpdate.customType;
        console.log(customType);
        if (customType === 0) {
            $scope.selectedStatus = [$scope.statusOptions[0]];
        } else if (customType === 1) {
            $scope.selectedStatus = [$scope.statusOptions[1]];
        } else if (customType === 2) {
            $scope.selectedStatus = [$scope.statusOptions[2]];
        }
    };

    // Call dataUsegate and setSelctedtatus initially when the controller loads
    $scope.dataUsegate();
    $scope.setSelctedtatus2();


    $scope.$on('$locationChangeStart', function () {
        // Check if the current path is not "/update-voucher"
        if ($location.path() !== '/update-voucher') {
            // Reset the formUpdateVoucher data when leaving the "update-voucher" page
            VoucherService.setFormUpdateVoucher({});
        }
    });

    $scope.openDatePicker = function () {
        $scope.datePickerOpened = !$scope.datePickerOpened;
    };

    // xem lai logic 

    $scope.updateVoucher = async function (event) {
        event.preventDefault();
        var formattedEndDate2 = $filter('date')($scope.formUpdateVoucher.endDate, 'yyyy-MM-dd');
        $scope.formUpdateVoucher.endDate = formattedEndDate2;

        console.log($scope.formUpdateVoucher, 'nnnnnnnn');

        const confirmResult = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        });

        if (confirmResult.isConfirmed) {
            try {
                const selectedIds = $scope.selectedStatus.map(status => status.id);

                for (const selectedId of selectedIds) {
                    let customType = 0;

                    if (selectedId !== '') {
                        // Thiết lập customType dựa trên ID của selectedStatus
                        switch (selectedId) {
                            case '1':
                                customType = 1;
                                break;
                            case '2':
                                customType = 2;
                                break;
                            case '3':
                                customType = 3;
                                break;
                            case '4':
                                customType = 4;
                                break;
                            case '5':
                                customType = 5;
                                break;
                            default:
                                // Xử lý các trường hợp khác nếu cần
                                break;
                        }
                    }

                    // Thiết lập customType cho voucherUserUpdate
                    $scope.voucherUserUpdate.customType = customType;

                    const response = await $http.put(apiVoucher + "/update", JSON.stringify($scope.formUpdateVoucher), headers);
                    console.log("Success Response:", response.data);

                    const voucherId = $scope.formUpdateVoucher.id;

                    if (!$scope.formVoucher.exchangeAllowed) {

                        // Xử lý thêm, cập nhật hoặc xóa voucher users dựa trên ID của selectedStatus
                        await $scope.deleteVoucherUsers(voucherId);
                        const userList = $scope.getListAllUserByStatus(selectedId);
                        await $scope.addVoucherUsers(voucherId, userList);
                        await $scope.UpdateVoucherUsers(voucherId);
                    }

                }

                Swal.fire({
                    icon: 'success',
                    title: 'Cập nhật thành công!',
                    text: 'Thông tin voucher đã được cập nhật.'
                });
                window.location.href = 'http://127.0.0.1:5500/template/index.html#/voucher';

            } catch (error) {
                console.error("Error:", error);

                Swal.fire({
                    icon: "error",
                    title: "Lỗi!",
                    text: "Đã xảy ra lỗi khi cập nhật voucher. Vui lòng thử lại sau."
                });
            }
        } else if (confirmResult.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Hủy bỏ', '', 'error');
        }
    };


    // Function to get the list of users based on selected status
    $scope.getListAllUserByStatus = function (statusId) {
        switch (statusId) {
            case '1':
                return $scope.listAllUserOld;
            case '2':
                return $scope.listAllUserNew;
            case '3':
                return $scope.listAllUserSliver;
            case '4':
                return $scope.listAllUserGold;
            case '5':
                return $scope.listAllUserDiamond;
            default:
                return $scope.listAllUser;
        }
    };


    $scope.UpdateVoucherUsers = async function (idVoucher) {
        $scope.voucherUserUpdate.voucher.id = idVoucher;
        $scope.voucherUserUpdate.status = $scope.formUpdateVoucher.status;
        $scope.voucherUserUpdate.usageCount = $scope.voucherUser.usageCount;
        try {
            return await $http.put('http://localhost:8080/CodeWalkers/admin/user-voucher/update/all', JSON.stringify($scope.voucherUserUpdate), headers);
        } catch (error) {
            console.error("Error updating userVoucher:", error);
            return Promise.reject(error);
        }
    };
    $scope.deleteVoucherUsers = async function (idVoucher) {
        $scope.voucherUser.voucher.id = idVoucher;
        try {
            return await $http.delete('http://localhost:8080/CodeWalkers/admin/user-voucher/delete/' + idVoucher, headers);
        } catch (error) {
            console.error("Error deleting userVoucher:", error);
            return Promise.reject(error);
        }
    };

    $scope.getCustomTypes = function (idVoucher) {
        var url = 'http://localhost:8080/CodeWalkers/vouchers/getCustomType?idVch=' + idVoucher;

        $http.get(url)
            .then(function (response) {
                // Xử lý dữ liệu trả về nếu cần
                $scope.customTypes = response.data;
                // Lặp qua danh sách customTypes
                for (var i = 0; i < $scope.customTypes.length; i++) {
                    var customType = $scope.customTypes[i];

                    // Tìm kiếm giá trị tương ứng trong statusOptions dựa trên customType.id
                    var matchingStatusOption = $scope.statusOptions.find(function (option) {
                        return option.id === customType.id;
                    });

                    // Nếu tìm thấy, thêm vào selectedStatus
                    if (matchingStatusOption) {
                        $scope.selectedStatus.push(matchingStatusOption);
                    }
                }

                // In ra kết quả trong console
                console.log("Selected setSelctedtatus2: ", $scope.selectedStatus);

            })
            .catch(function (error) {
                // Xử lý lỗi nếu có
                console.error('Lỗi khi gọi API:', error);
            });
    };

    if($scope.formUpdateVoucher.id){
        $scope.getCustomTypes($scope.formUpdateVoucher.id);

    };


    //import exel
    $scope.import = function (files) {
        if ($scope.importInProgress) return;

        $scope.importInProgress = true;
        $scope.importing = true;
        $scope.errorShown = false;

        const reader = new FileReader();

        reader.onloadend = async () => {
            try {
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(reader.result);
                const worksheet = workbook.getWorksheet('Sheet1');

                worksheet.eachRow((row, index) => {
                    if (index > 1) {
                        const voucher = {
                            name: row.getCell(1).value,
                            dateOfBirth: formatDate(row.getCell(2).value),
                            phoneNumber: '0' + row.getCell(3).value,
                            gender: parseGender(row.getCell(4).value),
                            email: row.getCell(5).value,
                            address: row.getCell(6).value,
                            image: row.getCell(7).value
                        };

                        $http.post(apiVoucher + "/save", JSON.stringify(voucher))
                            .then(() => {
                                if (!$scope.errorShown) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Ok",
                                        text: "Đã import thành công",
                                    });
                                }
                            })
                            .catch((error) => {
                                if (!$scope.errorShown) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Đã xảy ra lỗi!",
                                    });
                                    console.error(error);
                                    $scope.errorShown = true;
                                }
                            });
                    }
                });
            } catch (error) {
                if (!$scope.errorShown) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Đã xảy ra lỗi!",
                    });
                    console.error('Error reading file:', error);
                    $scope.errorShown = true;
                }
            } finally {
                $scope.importing = false;
                $scope.importInProgress = false;
                $scope.$apply();
                document.getElementById('input-file').value = '';
            }
        };

        reader.readAsArrayBuffer(files[0]);
        $scope.hienThi($scope.pageNo);
    };
    // export pdf
    $scope.exportToPDF = function () {
        const tableId = 'VoucherTable';
        const fileName = 'Voucher_Exported_data';

        // Tạo đối tượng jsPDF
        const pdf = new $window.jsPDF('p', 'pt', 'letter');

        // Thêm bảng vào PDF
        pdf.autoTable({ html: `#${tableId}` });

        // Tải file PDF
        pdf.save(`${fileName}.pdf`);
    };

    $scope.exportToExcel = function () {
        // Lấy bảng theo ID
        var table = document.getElementById('VoucherTable'); // Thay id table bảng của bạn vào đây

        // Lấy dữ liệu từ bảng
        var data = [];
        for (var i = 0; i < table.rows.length; i++) {
            var rowData = [];
            for (var j = 0; j < table.rows[i].cells.length; j++) {
                rowData.push(table.rows[i].cells[j].innerText);
            }
            data.push(rowData);
        }

        // Tạo một workbook và một worksheet
        var ws = XLSX.utils.aoa_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        // Xuất file Excel
        XLSX.writeFile(wb, 'voucher_data.xlsx');
    };

    $scope.exportToSVG = function () {
        // Lấy bảng theo ID
        var table = document.getElementById('VoucherTable'); // Thay id table bảng của bạn vào đây

        // Tạo một đối tượng SVG
        var svg = SVG().size(2000, 1500); // Kích thước SVG

        // Lấy số cột của bảng
        var numColumns = table.rows.length > 0 ? table.rows[0].cells.length : 0;

        // Xác định chiều rộng của cột rộng nhất
        var maxWidth = 0;
        for (var i = 0; i < table.rows.length; i++) {
            var cellWidth = table.rows[i].cells[0].offsetWidth;
            maxWidth = Math.max(maxWidth, cellWidth);
        }

        // Thêm các đối tượng SVG từ các cột của bảng
        for (var i = 0; i < table.rows.length; i++) {
            for (var j = 0; j < table.rows[i].cells.length; j++) {
                // Tính toán vị trí dựa trên chỉ số của cột
                var xPosition = 10 + j * (maxWidth + 180); // 10 là khoảng cách giữa các cột
                var yPosition = 30 * i + 40;

                // Thêm văn bản từ cột của bảng vào SVG
                svg.text(table.rows[i].cells[j].innerText).move(xPosition, yPosition);
            }
        }

        // Xuất nội dung SVG dưới dạng chuỗi
        var svgString = svg.svg();

        // Xuất file SVG
        var blob = new Blob([svgString], { type: 'image/svg+xml' });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'exported_svg.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    // lấy dữ liệu selected
    $scope.selectAllChanged = function () {
        console.log("Trạng thái của selectAllCheckbox:", $scope.selectAllCheckbox);
        angular.forEach($scope.listVoucher, function (item) {
            item.isSelected = $scope.selectAllCheckbox;
        });
    };

    $scope.selectAllChangedUser = function () {
        console.log("Trạng thái của selectAllCheckbox:", $scope.selectAllCheckboxUser);
        angular.forEach($scope.listUSers, function (item) {
            item.isSelected = $scope.selectAllCheckboxUser;
        });
    };

    $scope.deleteAll = function () {
        var selectedItems = $scope.listVoucher.filter(function (item) {
            return item.isSelected;
        });

        if (selectedItems.length === 0) {
            Swal.fire("Vui lòng chọn các voucher bạn muốn xóa ?", "", "error");
            return false;
        }

        Swal.fire({
            title: "Xác nhận",
            text: "Bạn có chắc chắn muốn thực hiện hành động này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có",
            cancelButtonText: "Không",
        }).then((result) => {
            if (result.isConfirmed) {


                selectedItems.forEach(element => {
                    const VcId = element.id;
                    const api = `${apiURL}admin/voucher/delete/${VcId}`;
                    console.log(api)
                    $http.delete(api, headers).then(function (response) {

                        $scope.hienThi($scope.pageCurrent, $scope.sizePage);
                        console.log(response);
                        isDeleted = true;
                    })
                        .catch(function (error) {
                            console.log(error);
                        });
                });

                if (isDeleted) {
                    Swal.fire("Xóa thành công!", "", "success");
                    $scope.selectAllCheckbox = false;

                }

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hành động khi người dùng ấn "Không"
                Swal.fire("Hủy bỏ", "", "error");
            }
        });
        // Thực hiện xử lý xóa tất cả ở đây với mảng selectedItems
    };

    // Sử dụng $timeout để đảm bảo rằng DOM đã được tạo trước khi lấy thông tin cột
    $timeout(function () {
        var thElements = document.querySelectorAll('#VoucherTable th:not(:last-child)'); // Loại bỏ cột "Action"

        angular.forEach(thElements, function (thElement) {
            var columnName = thElement.innerText.trim();
            $scope.columns.push({ name: columnName, selected: true }); // Chọn tất cả mặc định
            $scope.columnFilters[columnName] = ''; // Khởi tạo filter cho mỗi cột
        });

        // Kiểm tra xem tất cả các cột có được chọn không và cập nhật trạng thái của checkbox "Chọn Tất Cả"
        $scope.selectAll = $scope.columns.every(function (column) {
            return column.selected;
        });
    });

    $scope.toggleAll = function () {
        angular.forEach($scope.columns, function (column) {
            column.selected = $scope.selectAll;
        });
    };

    $scope.toggleColumn = function (column) {
        if (!column.selected) {
            $scope.selectAll = $scope.columns.some(function (column) {
                return column.selected;
            });
        } else {
            $scope.selectAll = $scope.columns.every(function (column) {
                return column.selected;
            });
        }
    };

    $scope.sortData = function (column) {
        $scope.reverseSort = ($scope.sortColumn === column) ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    };

    $scope.getSortClass = function (column) {
        if ($scope.sortColumn === column) {
            return $scope.reverseSort ? 'sort-down' : 'sort-up';
        }
        return 'sort-none';
    };

    $scope.openCategoryAddModal = function () {
        // Use JavaScript to trigger the modal opening
        $('#categoryAddModal').modal('show');

    };
    $scope.hienThiUser = function (pageNoUser, sizePageUser) {
        let apiUrl = apiUser + "?pageNo=" + pageNoUser + "&sizePage=" + sizePageUser;
        $http.get(apiUrl, headers).then(
            function (response) {
                // Xử lý phản hồi thành công
                $scope.listUSers = response.data.usersList;
                $scope.totalPageUser = response.data.totalPages;
                $scope.lastIndex = $scope.listUSers[$scope.listUSers.length - 1].id;
                console.log("data user day ne:" + response.data.usersList);
                console.log(response.data.totalPages);
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            }
        );
    };

    $scope.hienThiUser($scope.pageNoUser, $scope.sizePageUser);

    $scope.toggleStatus = function (item) {
        if (item.status) {
            $scope.turnOff(item.id);
        } else {
            $scope.turnOn(item.id);
        }
        // Gọi hàm hiển thị sau khi cập nhật trạng thái
        $scope.hienThi($scope.pageCurrent, $scope.sizePage);
    };

    $scope.turnOn = function (id) {
        let api = apiVoucher + "/turn-on/" + id;
        $http.post(api, null).then(function (res) {
            console.log(res.data);
        });

    };

    $scope.turnOff = function (id) {
        let api = apiVoucher + "/turn-off/" + id;
        $http.post(api, null).then(function (res) {
            console.log(res.data);
        });
    };

    $scope.getSelectedUseFormValue = function () {
        var selectedValue = $scope.formVoucher.useForm;
        console.log("Selected Use Form Value:", selectedValue);

    };
    // Function to load data based on the selected value
    $scope.loadUseForm = function () {
        // Implement your logic for loading data based on the selected value
        // For example:
        // if ($scope.formVoucher.useForm === 0) {
        //     // Load data for Đơn Hàng
        // } else if ($scope.formVoucher.useForm === 1) {
        //     // Load data for Phí Vận Chuyển
        // }

        // Call the function to get the selected value
        $scope.getSelectedUseFormValue();
    };

    // Khởi tạo giá trị cho maxReduction
    $scope.formVoucher.maxReduction = 0;

    $scope.updateMaxReduction = function () {
        // Chỉ cập nhật maxReduction nếu discountType là 'VND'
        if ($scope.formVoucher.discountType === 'VND') {
            $scope.formVoucher.maxReduction = $scope.formVoucher.value;
        } else {
            $scope.formVoucher.maxReduction = 0;
            $scope.formVoucher.maxReduction = $scope.formVoucher.maxReduction;
        }
    };

    $scope.updateMaxReduction2 = function () {
        // Chỉ cập nhật maxReduction nếu discountType là 'VND'
        if ($scope.formUpdateVoucher.discountType === 'VND') {
            $scope.formUpdateVoucher.maxReduction = $scope.formUpdateVoucher.value;
        } else {
            $scope.formUpdateVoucher.maxReduction = 0;
            $scope.formUpdateVoucher.maxReduction = $scope.formUpdateVoucher.maxReduction;
        }
    };

    // hien thi tat ca user
    $scope.getAllUser = function () {
        let apiUrl = 'http://localhost:8080/CodeWalkers/user/getAll';
        $http.get(apiUrl, headers).then(
            function (response) {
                // Xử lý phản hồi thành công
                $scope.listAllUser = response.data;
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            }
        );
    };

    $scope.getAllUserOld = function () {
        let apiUrl = 'http://localhost:8080/CodeWalkers/user/getUserOld';
        $http.get(apiUrl, headers).then(
            function (response) {
                // Xử lý phản hồi thành công
                $scope.listAllUserOld = response.data;
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            }
        );
    };
    $scope.getAllUserNew = function () {
        let apiUrl = 'http://localhost:8080/CodeWalkers/user/getUserNew';
        $http.get(apiUrl, headers).then(
            function (response) {
                // Xử lý phản hồi thành công
                $scope.listAllUserNew = response.data;
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            }
        );
    };
    $scope.getAllUserSliver = function () {
        let apiUrl = 'http://localhost:8080/CodeWalkers/user/getUserSliver';
        $http.get(apiUrl, headers).then(
            function (response) {
                // Xử lý phản hồi thành công
                $scope.listAllUserSliver = response.data;
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            }
        );
    };
    $scope.getAllUserGold = function () {
        let apiUrl = 'http://localhost:8080/CodeWalkers/user/getUserGold';
        $http.get(apiUrl, headers).then(
            function (response) {
                // Xử lý phản hồi thành công
                $scope.listAllUserGold = response.data;
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            }
        );
    };
    $scope.getAllUserDiamond = function () {
        let apiUrl = 'http://localhost:8080/CodeWalkers/user/getUserDiamond';
        $http.get(apiUrl, headers).then(
            function (response) {
                // Xử lý phản hồi thành công
                $scope.listAllUserDiamond = response.data;
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            }
        );
    };
    $scope.getAllUserOld();
    $scope.getAllUserNew();
    $scope.getAllUserSliver();
    $scope.getAllUserGold();
    $scope.getAllUserDiamond();
    // Hàm để lấy ngày hiện tại
    function getDefaultStartDate() {
        var today = new Date();

        // Lấy ngày, tháng và năm hiện tại
        var day = String(today.getDate()).padStart(2, '0');
        var month = String(today.getMonth() + 1).padStart(2, '0');
        var year = today.getFullYear();

        // Tạo chuỗi 'YYYY-MM-DD'
        var isoString = year + '-' + month + '-' + day;

        return isoString;
    }
    $scope.getAllUser();
    // Hàm getterSetter để định dạng giá trị ngày
    $scope.updateEndDateDisplay = function () {
        if ($scope.formattedEndDate) {
            $scope.formVoucher.endDate = $filter('date')(new Date($scope.formattedEndDate), 'yyyy-MM-dd');
        } else {
            $scope.formVoucher.endDate = null; // Đặt lại thành null nếu người dùng xóa giá trị
        }
    };

    $scope.setFile = function (element) {
        $scope.$apply(function () {
            $scope.formVoucher.image = element.files[0].name;
        });
    };
    $scope.updateFile = function (element) {
        $scope.formUpdateVoucher.image = element.files[0];
        $scope.formUpdateVoucher.image = element.files[0].name;
        $scope.$apply();  // Force AngularJS to update the view
    };

    // thu vien jQuery không đụng vào
    (function ($) {
        "use strict";
        $(function () {
            $('[data-toggle="offcanvas"]').on("click", function () {
                $(".sidebar-offcanvas").toggleClass("active");
            });
        });
    })(jQuery);

    (function ($) {
        "use strict";
        $(function () {
            var body = $("body");
            var contentWrapper = $(".content-wrapper");
            var scroller = $(".container-scroller");
            var footer = $(".footer");
            var sidebar = $(".sidebar");

            //Add active class to nav-link based on url dynamically
            //Active class can be hard coded directly in html file also as required

            function addActiveClass(element) {
                if (current === "") {
                    //for root url
                    if (element.attr("href").indexOf("index.html") !== -1) {
                        element.parents(".nav-item").last().addClass("active");
                        if (element.parents(".sub-menu").length) {
                            element.closest(".collapse").addClass("show");
                            element.addClass("active");
                        }
                    }
                } else {
                    //for other url
                    if (element.attr("href").indexOf(current) !== -1) {
                        element.parents(".nav-item").last().addClass("active");
                        if (element.parents(".sub-menu").length) {
                            element.closest(".collapse").addClass("show");
                            element.addClass("active");
                        }
                        if (element.parents(".submenu-item").length) {
                            element.addClass("active");
                        }
                    }
                }
            }

            $(".horizontal-menu .nav li a").each(function () {
                var $this = $(this);
                addActiveClass($this);
            });

            //Close other submenu in sidebar on opening any

            sidebar.on("show.bs.collapse", ".collapse", function () {
                sidebar.find(".collapse.show").collapse("hide");
            });

            //Change sidebar and content-wrapper height
            applyStyles();

            function applyStyles() {
                //Applying perfect scrollbar
                if (!body.hasClass("rtl")) {
                    if (
                        $(".settings-panel .tab-content .tab-pane.scroll-wrapper").length
                    ) {
                        const settingsPanelScroll = new PerfectScrollbar(
                            ".settings-panel .tab-content .tab-pane.scroll-wrapper"
                        );
                    }
                    if ($(".chats").length) {
                        const chatsScroll = new PerfectScrollbar(".chats");
                    }
                    if (body.hasClass("sidebar-fixed")) {
                        if ($("#sidebar").length) {
                            var fixedSidebarScroll = new PerfectScrollbar("#sidebar .nav");
                        }
                    }
                }
            }

            $('[data-toggle="minimize"]').on("click", function () {
                if (
                    body.hasClass("sidebar-toggle-display") ||
                    body.hasClass("sidebar-absolute")
                ) {
                    body.toggleClass("sidebar-hidden");
                } else {
                    body.toggleClass("sidebar-icon-only");
                }
            });

            //checkbox and radios
            $(".form-check label,.form-radio label").append(
                '<i class="input-helper"></i>'
            );

            //Horizontal menu in mobile
            $('[data-toggle="horizontal-menu-toggle"]').on("click", function () {
                $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
            });
            // Horizontal menu navigation in mobile menu on click
            var navItemClicked = $(".horizontal-menu .page-navigation >.nav-item");
            navItemClicked.on("click", function (event) {
                if (window.matchMedia("(max-width: 991px)").matches) {
                    if (!$(this).hasClass("show-submenu")) {
                        navItemClicked.removeClass("show-submenu");
                    }
                    $(this).toggleClass("show-submenu");
                }
            });

            $(window).scroll(function () {
                if (window.matchMedia("(min-width: 992px)").matches) {
                    var header = $(".horizontal-menu");
                    if ($(window).scrollTop() >= 70) {
                        $(header).addClass("fixed-on-scroll");
                    } else {
                        $(header).removeClass("fixed-on-scroll");
                    }
                }
            });
        });

        // focus input when clicking on search icon
        $("#navbar-search-icon").click(function () {
            $("#navbar-search-input").focus();
        });
    })(jQuery);

    (function ($) {
        "use strict";
        $(function () {
            $(".nav-settings").on("click", function () {
                $("#right-sidebar").toggleClass("open");
            });
            $(".settings-close").on("click", function () {
                $("#right-sidebar,#theme-settings").removeClass("open");
            });

            $("#settings-trigger").on("click", function () {
                $("#theme-settings").toggleClass("open");
            });

            //background constants
            var navbar_classes =
                "navbar-danger navbar-success navbar-warning navbar-dark navbar-light navbar-primary navbar-info navbar-pink";
            var sidebar_classes = "sidebar-light sidebar-dark";
            var $body = $("body");

            //sidebar backgrounds
            $("#sidebar-light-theme").on("click", function () {
                $body.removeClass(sidebar_classes);
                $body.addClass("sidebar-light");
                $(".sidebar-bg-options").removeClass("selected");
                $(this).addClass("selected");
            });
            $("#sidebar-dark-theme").on("click", function () {
                $body.removeClass(sidebar_classes);
                $body.addClass("sidebar-dark");
                $(".sidebar-bg-options").removeClass("selected");
                $(this).addClass("selected");
            });

            //Navbar Backgrounds
            $(".tiles.primary").on("click", function () {
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").addClass("navbar-primary");
                $(".tiles").removeClass("selected");
                $(this).addClass("selected");
            });
            $(".tiles.success").on("click", function () {
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").addClass("navbar-success");
                $(".tiles").removeClass("selected");
                $(this).addClass("selected");
            });
            $(".tiles.warning").on("click", function () {
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").addClass("navbar-warning");
                $(".tiles").removeClass("selected");
                $(this).addClass("selected");
            });
            $(".tiles.danger").on("click", function () {
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").addClass("navbar-danger");
                $(".tiles").removeClass("selected");
                $(this).addClass("selected");
            });
            $(".tiles.light").on("click", function () {
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").addClass("navbar-light");
                $(".tiles").removeClass("selected");
                $(this).addClass("selected");
            });
            $(".tiles.info").on("click", function () {
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").addClass("navbar-info");
                $(".tiles").removeClass("selected");
                $(this).addClass("selected");
            });
            $(".tiles.dark").on("click", function () {
                $(".navbar").removeClass(navbar_classes);
                $(".navbar").addClass("navbar-dark");
                $(".tiles").removeClass("selected");
                $(this).addClass("selected");
            });
            $(".tiles.default").on("click", function () {
                $(".navbar").removeClass(navbar_classes);
                $(".tiles").removeClass("selected");
                $(this).addClass("selected");
            });
        });
    })(jQuery);

    (function ($) {
        "use strict";
        //Open submenu on hover in compact sidebar mode and horizontal menu mode
        $(document).on(
            "mouseenter mouseleave",
            ".sidebar .nav-item",
            function (ev) {
                var body = $("body");
                var sidebarIconOnly = body.hasClass("sidebar-icon-only");
                var sidebarFixed = body.hasClass("sidebar-fixed");
                if (!("ontouchstart" in document.documentElement)) {
                    if (sidebarIconOnly) {
                        if (sidebarFixed) {
                            if (ev.type === "mouseenter") {
                                body.removeClass("sidebar-icon-only");
                            }
                        } else {
                            var $menuItem = $(this);
                            if (ev.type === "mouseenter") {
                                $menuItem.addClass("hover-open");
                            } else {
                                $menuItem.removeClass("hover-open");
                            }
                        }
                    }
                }
            }
        );
    })(jQuery);

    (function ($) {
        "use strict";
        if ($(".grid").length) {
            var colcade = new Colcade(".grid", {
                columns: ".grid-col",
                items: ".grid-item",
            });
        }
    })(jQuery);

    (function ($) {
        "use strict";
        //Open submenu on hover in compact sidebar mode and horizontal menu mode
        $(document).on(
            "mouseenter mouseleave",
            ".sidebar .nav-item",
            function (ev) {
                var body = $("body");
                var sidebarIconOnly = body.hasClass("sidebar-icon-only");
                var sidebarFixed = body.hasClass("sidebar-fixed");
                if (!("ontouchstart" in document.documentElement)) {
                    if (sidebarIconOnly) {
                        if (sidebarFixed) {
                            if (ev.type === "mouseenter") {
                                body.removeClass("sidebar-icon-only");
                            }
                        } else {
                            var $menuItem = $(this);
                            if (ev.type === "mouseenter") {
                                $menuItem.addClass("hover-open");
                            } else {
                                $menuItem.removeClass("hover-open");
                            }
                        }
                    }
                }
            }
        );
    })(jQuery);





}

