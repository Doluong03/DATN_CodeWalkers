let host = "http://localhost:8080/CodeWalkers";
window.orderManage = function ($scope, $http, $window, $timeout, $document) {
    $scope.listOrders = [];
    $scope.pageNo = 0;
    $scope.sizePage = 5;
    $scope.lastIndex = 0; // phần tử cuối của mảng
    $scope.isAcp = false;
    $scope.listRes = [];
    $scope.showModal = true;
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

    $scope.formOrderUpdate = {
        idBill: "",
        address: "",
        wardId: "",
        provinceId: 0, // Gửi ID
        districtId: 0,
        userName: "",
        phone: "",
        fee: 0,
        optionPay: 0,
        totalPay: 0,
    };

    // phân trang start
    $scope.totalPage = 0;
    $scope.pageCurrent = 0;
    $scope.itemsPerPage = 3; // Số lượng trang bạn muốn hiển thị

    $scope.pageRange = function () {
        var startPage = Math.max(
            1,
            $scope.pageCurrent - Math.floor($scope.itemsPerPage / 2)
        );
        var endPage = Math.min(
            $scope.totalPage,
            startPage + $scope.itemsPerPage - 1
        );
        var pages = [];

        if (
            $scope.pageCurrent + Math.floor($scope.itemsPerPage / 2) >
            $scope.totalPage
        ) {
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

    $scope.nextPage = function () {
        if ($scope.pageCurrent < $scope.totalPage - 1) {
            $scope.pageCurrent++;
            $scope.hienThi($scope.pageCurrent, $scope.sizePage);
        }
    };

    $scope.previousPage = function () {
        if ($scope.pageCurrent > 0) {
            $scope.pageCurrent--;
        }
        $scope.hienThi($scope.pageCurrent, $scope.sizePage);
    };

    $scope.hoveredPage = null;

    $scope.onHover = function (index) {
        $scope.hoveredPage = index;
    };

    $scope.onLeave = function () {
        $scope.hoveredPage = null;
    };
    $scope.removeProduct = function (pr) {
        var index = $scope.listRes.indexOf(pr); // Tìm vị trí của phần tử trong mảng
        if (index !== -1) {
            $scope.listRes.splice(index, 1); // Xóa phần tử từ mảng
            console.log("tru r")
        }
    };

    // hàm thay đổi số phần tử của trang
    $scope.onSizePageChange = function () {
        // Làm cái gì đó với giá trị mới của sizePage
        console.log("New Size Page: " + $scope.sizePage);
        $scope.hienThi($scope.pageNo, $scope.sizePage);
        // Gọi các hàm khác cần thiết với giá trị mới của sizePage
    };
    // end phân trang
    $scope.increaseQuantity = function (pr) {
        pr.quantity++; // Tăng số lượng cho sản phẩm cụ thể
        pr.total += pr.price;
        $scope.updateTotalPay();
    };

    $scope.decreaseQuantity = function (pr) {
        if (pr.quantity > 0) {
            pr.quantity--; // Giảm số lượng cho sản phẩm cụ thể nếu lớn hơn 1
            pr.total -= pr.price;
        }
        if (pr.quantity <= 0) {
            $scope.removeProduct(pr);
        }
        $scope.updateTotalPay();
    };

    $scope.onInputKeyPress = function (event, pr) {
        if (event.keyCode === 13) { // Kiểm tra nếu phím Enter (keyCode=13)
            if (pr.quantity <= 0) {
                $scope.removeProduct(pr);
            }
            pr.total = pr.price * pr.quantity;
            $scope.updateTotalPay();
        }
    };

    $scope.onInputBlur = function (pr) {
        if (pr.quantity <= 0) {
            $scope.removeProduct(pr);
        }
        pr.total = pr.price * pr.quantity;
        $scope.updateTotalPay();
    };

    //load address
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
    //end load address
    $scope.getByStatus = function (status) {
        $scope.status = "/" + status;
        $scope.hienThi($scope.pageNo, $scope.sizePage);
    };

    $scope.getBadge = function () {
        apiUrl = apiOrder + "/get-all-bill" + "?pageNo=" + 0 + "&sizePage=" + 10000;
        $scope.listBadge = [];
        $scope.badgeAcp = 0;
        $scope.badgeShip = 0;
        $http.get(apiUrl, headers).then(
            function (response) {
                // Xử lý phản hồi thành công
                $scope.listBadge = response.data;
    
                // Reset counts before recalculating
                $scope.badgeAcp = 0;
                $scope.badgeShip = 0;
    
                for (var i = 0; i < $scope.listBadge.length; i++) {
                    if ($scope.listBadge[i].status == 1) {
                        $scope.badgeAcp += 1;
                    }
                    if ($scope.listBadge[i].status == 2) {
                        $scope.badgeShip += 1;
                    }
                }
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            })
    }
    
    $scope.hienThi = function (pageNo, sizePage) {
        if (!$scope.status) {
            apiUrl = apiOrder + "/get-all-bill" + "?pageNo=" + pageNo + "&sizePage=" + sizePage;
        } else if ($scope.status == '/0') {
            apiUrl = apiOrder + "/get-all-bill" + "?pageNo=" + pageNo + "&sizePage=" + sizePage;
        } else {
            apiUrl = apiOrder + "/get-all-bill" + $scope.status + "?pageNo=" + pageNo + "&sizePage=" + sizePage;
        }
        console.log(apiUrl)
        $http.get(apiUrl, headers).then(
            function (response) {
                // Xử lý phản hồi thành công
                $scope.listOrders = response.data;
                $scope.totalPage = response.data[0].totalPages;
                var lastIndex = $scope.listOrders[$scope.listOrders.length - 1].code;
                $scope.lastIndex = lastIndex.slice(5);
                console.log(response.data);
                $scope.getBadge();
            },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            }
        );
    };

    $scope.PageNo = function (pageNo, sizePage) {
        $scope.pageCurrent = pageNo; // Cập nhật pageCurrent khi chọn trang cụ thể
        $scope.sizePage = sizePage; // Cập nhật sizePage
        $scope.hienThi(pageNo, sizePage);
        $scope.hoveredPage = pageNo; // Truyền giá trị pageNo vào hàm hienThi
    };

    // Gọi hàm hienThi() để lấy dữ liệu ban đầu
    $scope.hienThi($scope.pageNo, $scope.sizePage);

    //delete data

    $scope.removeStaff = function (event, item) {
        event.preventDefault();
        console.log(item);
        let userId = item.id;
        let api = apiURL + "admin/User/delete/" + userId;

        Swal.fire({
            title: "Xác nhận",
            text: "Bạn có chắc chắn muốn thực hiện hành động này?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Có",
            cancelButtonText: "Không",
        }).then((result) => {
            if (result.isConfirmed) {
                // Hành động khi người dùng ấn "Có"
                $http
                    .delete(api, headers)
                    .then(function (response) {
                        Swal.fire("Xóa thành công!", "", "success");
                        $scope.hienThi($scope.pageCurrent, $scope.sizePage);
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hành động khi người dùng ấn "Không"
                Swal.fire("Hủy bỏ", "", "error");
            }
        });
    };

    // show form add
    $scope.showForm = false; // Mặc định ẩn form
    $scope.toggleForm = function () {
        if ($scope.showFormUpdate) {
            // Nếu form cập nhật đang mở, đóng nó trước khi mở form thêm mới
            $scope.showFormUpdate = false;
        }
        $scope.showForm = !$scope.showForm; // Khi click, đảo ngược trạng thái của form thêm mới
        // Tìm và thêm lớp overlay
        var overlay = document.getElementById('overlay');
        overlay.style.display = $scope.showForm ? 'flex' : 'none';
        $scope.formUser = {};
    };

    // show form user and load detail
    $scope.showFormUpdate = false;
    $scope.activeItem = -1;
    $scope.formOrderUpdate = {};
    $scope.calculateTotalPrice = function (item) {
        // Tính tổng giá trị của sản phẩm (price * quantity)
        return item.productDetail.price * item.quantity;
    };
    $scope.toggleFormUpdate = function (event, item) {
        $scope.loadProvince();
        $scope.loadDistrict(item.province);
        $scope.loadWard(item.district);
        event.preventDefault();
        if (item) {
            $scope.formOrderUpdate = {};
            // Trường hợp ấn dòng khác hoặc form chưa hiển thị, hiển thị và nạp dữ liệu của dòng được chọn
            $scope.showFormUpdate = true;
            $scope.activeItem = item;
            $scope.totalPrices = [];
            $scope.listRes = [];
            // Nạp dữ liệu của dòng được chọn vào biểu mẫu
            // item.fee = item.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
            for (var i = 0; i < item.listBillDetail.length; i++) {
                $scope.listRes.push({
                    productDetail: item.listBillDetail[i].productDetail,
                    quantity: item.listBillDetail[i].quantity,
                    name: item.listBillDetail[i].productDetail.product.name,
                    price: item.listBillDetail[i].productDetail.price,
                    total: item.listBillDetail[i].productDetail.price * item.listBillDetail[i].quantity
                });
            }
            $scope.formNotEdit = item;
            $scope.formOrderUpdate = {
                idBill: item.id,
                address: item.address,
                wardId: item.ward,
                provinceId: item.province, // Gửi ID
                districtId: item.district,
                userName: item.users[0].name,
                phone: item.users[0].phoneNumber,
                fee: item.fee,
                optionPay: item.paymentOptions,
                totalPay: item.totalPay,
            };
        } else {
            // Trường hợp không có đối tượng được chọn, đóng form và xóa dữ liệu
            $scope.showFormUpdate = false;
            $scope.activeItem = null;
            $scope.formOrderUpdate = {};
        }
    };
    $scope.updateTotalPay = function () {
        $scope.formOrderUpdate.totalPay = 0;
        for (var i = 0; i < $scope.listRes.length; i++) {
            $scope.formOrderUpdate.totalPay += $scope.listRes[i].total;
        }
        $scope.getFee();
    }
    $scope.getFee = function () {
        $scope.totalQuantity = 0;
        for (var i = 0; i < $scope.listRes.length; i++) {
            $scope.totalQuantity += $scope.listRes[i].quantity;
        }
        $scope.fee = {
            quantity: $scope.totalQuantity,
            wardId: $scope.formOrderUpdate.wardId,
            districtId: $scope.formOrderUpdate.districtId
        };
        console.log($scope.fee, "hereeee")
        var url = `${host}/calculateFee`;
        $http.post(url, JSON.stringify($scope.fee)).then(function (res) {
            console.log("Phi ", res.data);
            $scope.formOrderUpdate.fee = res.data;
            $scope.formOrderUpdate.totalPay = Number($scope.formOrderUpdate.totalPay) + Number($scope.formOrderUpdate.fee);
        }).catch(function (error) {
            console.log("Lỗi khi tải ", error);
        });
    }
    $scope.closeModal = function () {
        document.getElementById('userUpdateModal').style.display = 'none';
        $('body').removeClass('modal-open'); // Loại bỏ class 'modal-open' khỏi body
        $('.modal-backdrop').remove(); // Loại bỏ backdrop (phần nền khi modal đang mở)
        $scope.hienThi($scope.pageCurrent, $scope.sizePage);
    }

    // update
    $scope.UpdateBillEdit = function (event) {
        event.preventDefault();
        if (!$scope.formOrderUpdate.userName ||
            !$scope.formOrderUpdate.provinceId ||
            !$scope.formOrderUpdate.districtId ||
            !$scope.formOrderUpdate.wardId ||
            !$scope.formOrderUpdate.address ||
            !$scope.formOrderUpdate.fee ||
            !$scope.formOrderUpdate.totalPay) {
            // Hiển thị thông báo lỗi
            $scope.checkAddress = true;
            return; // Dừng việc thực hiện lưu nếu thông tin không hợp lệ
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
                $http
                    .put(
                        `${host}/bill/updateBill`, $scope.formOrderUpdate,
                        headers
                    )
                    .then(function (response) {
                        $scope.pay($scope.formOrderUpdate.idBill);
                        $scope.closeModal();
                        Swal.fire({
                            icon: "success",
                            title: "Cập nhật thành công!",
                            text: "Thông tin đơn hàng đã được cập nhật.",
                        });
                        $scope.formOrderUpdate = {};
                    })
                    .catch(function (error) {
                        console.error("Error:", error);
                        Swal.fire({
                            icon: "error",
                            title: "Lỗi!",
                            text: "Đã xảy ra lỗi khi cập nhật đơn hàng. Vui lòng thử lại sau.",
                        });
                    });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Hủy bỏ", "", "error");
            }
        });
    };

    // update detail bill
    $scope.pay = function (idBill) {
        var dataToSend = [];
        var url = `${host}/api/bill/updateBillDt/`;

        for (var i = 0; i < $scope.listRes.length; i++) {
            dataToSend.push({
                prDetailId: parseInt($scope.listRes[i].productDetail.id), // Chuyển đổi sang integer nếu cần
                quantity: parseInt($scope.listRes[i].quantity), // Chuyển đổi sang integer nếu cần
                price: parseFloat($scope.listRes[i].price), // Chuyển đổi sang float nếu cần
                idBill: parseInt(idBill), // Chuyển đổi sang integer nếu cần
            });
        }
        console.log(dataToSend, "<---");
        $http.put(url + idBill, dataToSend)
            .then(function () {
                console.log('ADD thành công');
            })
            .catch(function (error) {
                console.error('ADD thất bại', error);
            });
        $scope.hienThi($scope.pageCurrent, $scope.sizePage);
    };

    // Create Order 
    $scope.createOrder = function (item) {
        $scope.listResPr = [];
        $scope.showLoading = true;
        $scope.quantity = 0;
        var url = `${host}/bill/createOrder`;
        for (var i = 0; i < item.listBillDetail.length; i++) {
            $scope.quantity += item.listBillDetail[i].quantity;
            $scope.listResPr.push({
                productDetail: item.listBillDetail[i].productDetail,
                quantity: item.listBillDetail[i].quantity,
                name: item.listBillDetail[i].productDetail.product.name,
                price: item.listBillDetail[i].productDetail.price
            });
        }
        var dataToSend = {
            toName: item.users[0].name,
            toPhone: item.users[0].phoneNumber,
            toAddress: item.address,
            districtId: item.district,
            wardId: item.ward,
            listItems: $scope.listResPr,
            quantity: $scope.quantity,
            optionsPay: item.paymentOptions,
            totalPay: item.totalPay,
        }
        console.log(dataToSend, "<---")
        $http.post(url, dataToSend).then(function (res) {
            console.log("order ", res.data);
            $scope.updateBill(item.id, res.data);
        }).catch(function (error) {
            console.log("Lỗi khi tải ", error);
        });
    }

    $scope.updateBill = function (idBill, data) {
        $scope.showLoading = true;
        var url = `${host}/bill/updateBillAdmin`;
        var dataToSend = {
            billId: idBill,
            code: data.order_code,
            shipDate: data.expected_delivery_time
        }
        console.log("here-data", dataToSend)

        // Hiển thị loading spinner
        // Sử dụng $http.put để gửi yêu cầu cập nhật đến API
        $http.put(url, dataToSend)
            .then(function (res) {
                // Xử lý khi cập nhật thành công
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

    // import exel

    $scope.importing = false; // Biến để theo dõi trạng thái của animation
    $scope.importInProgress = false; // Flag để kiểm soát quá trình import
    $scope.errorShown = false; // Flag để kiểm soát việc hiển thị lỗi

    $scope.import = function (files) {
        // Check if an import is already in progress
        if ($scope.importInProgress) {
            return;
        }

        $scope.importInProgress = true; // Set the flag to true

        $scope.importing = true; // Bắt đầu animation
        $scope.errorShown = false; // Reset the error flag

        var reader = new FileReader();
        reader.onloadend = async () => {
            try {
                var workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(reader.result);
                const worksheet = workbook.getWorksheet("Sheet1");
                worksheet.eachRow((row, index) => {
                    if (index > 1) {
                        let user = {
                            name: row.getCell(1).value,
                            dateOfBirth: formatDate(row.getCell(2).value),
                            phoneNumber: "0" + row.getCell(3).value,
                            gender: parseGender(row.getCell(4).value),
                            email: row.getCell(5).value,
                            address: row.getCell(6).value,
                            image: row.getCell(7).value,
                        };
                        $http
                            .post(
                                apiAdmin + "User" + "/insert",
                                JSON.stringify(user),
                                headers
                            )
                            .then(function (response) {
                                if (!$scope.errorShown) {
                                    Swal.fire({
                                        icon: "success",
                                        title: "Ok",
                                        text: "Đã import thành công",
                                    });
                                }
                            })
                            .catch(function (error) {
                                if (!$scope.errorShown) {
                                    Swal.fire({
                                        icon: "error",
                                        title: "Oops...",
                                        text: "Đã xảy ra lỗi!",
                                    });
                                    console.log(error);
                                    $scope.errorShown = true; // Set the error flag
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
                    console.error("Error reading file:", error);
                    $scope.errorShown = true; // Set the error flag
                }
            } finally {
                $scope.importing = false; // Kết thúc animation
                $scope.importInProgress = false; // Reset the flag
                $scope.$apply(); // Cập nhật scope
                // Xóa file sau khi đã xử lý xong
                document.getElementById("input-file").value = "";
            }
        };
        reader.readAsArrayBuffer(files[0]);
        $scope.hienThi($scope.pageNo);
    };
    $scope.loadAllPrBs = function () {
        var url = `${host}/api/product_bs`;
        $http.get(url).then(res => {
            $scope.itemsBs = res.data;
            // Gọi loadDetail sau khi tải dữ liệu thành công
            //  $scope.loadDetail();
            $scope.filteredItems = $scope.itemsBs;
            $scope.numVisibleItems = 4;
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadAllPrBs();
    $scope.filteredItems = $scope.itemsBs;

    $scope.filterProducts = function () {
        var searchText = $scope.productInput.toLowerCase();
        $scope.filteredItems = $scope.itemsBs.filter(function (pr) {
            return pr.product.name.toLowerCase().includes(searchText);
        });
    };

    $scope.selectProduct = function (pr) {
        // Your selection logic here
        $scope.check = true;
        for (var i = 0; i < $scope.listRes.length; i++) {
            if (pr.id == $scope.listRes[i].productDetail.id) {
                $scope.listRes[i].quantity += 1;
                $scope.check = false;
                $scope.listRes[i].total += $scope.listRes[i].price;
            }
        }
        if ($scope.check) {
            $scope.listRes.push({
                productDetail: pr,
                quantity: 1,
                name: pr.product.name,
                price: pr.price,
                total: pr.price * 1
            });
        }
        toastr.success('Thêm thành công!', 'Thông báo');
        $scope.updateTotalPay();
    };
    function formatDate(date) {
        // Giả sử ngày đang trong định dạng ISO 8601
        const isoDate = new Date(date);
        const formattedDate = isoDate.toLocaleDateString("en-GB");
        return formattedDate;
    }

    function parseGender(genderValue) {
        // Giả sử giá trị của genderValue là một giá trị boolean trong Excel (đúng hoặc sai)
        return genderValue === true;
    }

    // sort column
    $scope.sortColumn = "";
    $scope.reverseSort = false;

    $scope.sortData = function (column) {
        $scope.reverseSort =
            $scope.sortColumn === column ? !$scope.reverseSort : false;
        $scope.sortColumn = column;
    };

    $scope.getSortClass = function (column) {
        if ($scope.sortColumn === column) {
            return $scope.reverseSort ? "sort-down" : "sort-up";
        }
        return "sort-none";
    };

    // export pdf
    $scope.exportToPDF = function () {
        const tableId = "UserTable";
        const fileName = "exported_data";

        // Tạo đối tượng jsPDF
        const pdf = new $window.jsPDF("p", "pt", "letter");

        // Thêm bảng vào PDF
        pdf.autoTable({ html: `#${tableId}` });

        // Tải file PDF
        pdf.save(`${fileName}.pdf`);
    };

    $scope.exportToExcel = function () {
        // Lấy bảng theo ID
        var table = document.getElementById("UserTable"); // Thay id table bảng của bạn vào đây

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
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        // Xuất file Excel
        XLSX.writeFile(wb, "exported_data.xlsx");
    };

    $scope.exportToSVG = function () {
        // Lấy bảng theo ID
        var table = document.getElementById("UserTable"); // Thay id table bảng của bạn vào đây

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
        var blob = new Blob([svgString], { type: "image/svg+xml" });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "exported_svg.svg";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    $scope.selectAllChanged = function () {
        console.log("Trạng thái của selectAllCheckbox:", $scope.selectAllCheckbox);
        angular.forEach($scope.listOrders, function (item) {
            item.isSelected = $scope.selectAllCheckbox;
        });
    };
    $scope.activeTab = 'all'; // Default to the 'all' tab

    $scope.showTab = function (tabId) {
        $scope.getBadge();
        $scope.activeTab = tabId;
        var tab = new bootstrap.Tab(document.getElementById(tabId));
        tab.show();
    };
    
    $scope.UpdateStatusAll = function (status) {
        var selectedItems = $scope.listOrders.filter(function (item) {
            return item.isSelected;
        });

        if (selectedItems.length === 0) {
            alert("Vui lòng chọn các đơn hàng bạn muốn thao tác ?");
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
                    if (status == 2) {
                        $scope.createOrder(element);
                    }
                    let billId = element.id;
                    let api = apiAdmin + "Bill/updateStatus/" + billId + "?status=" + status;
                    console.log(element, "here item")
                    $http.put(api, headers).then(function (response) {
                        $scope.getByStatus(status);
                        $scope.hienThi($scope.pageCurrent, $scope.sizePage);
                        console.log(response);
                        isAcp = true;

                        // Switch to the tab with the updated status
                        switch (status) {
                            case 0:
                                // Tất cả
                                $scope.showTab('all');
                                break;
                            case 1:
                                // Chờ xác nhận
                                $scope.showTab('wait_acp');
                                break;
                            case 2:
                                // Chờ giao hàng
                                $scope.showTab('wait_ship');
                                break;
                            case 3:
                                // Chờ giao hàng
                                $scope.showTab('shipping');
                                break;
                            case 4:
                                // Chờ giao hàng
                                $scope.showTab('done');
                                break;
                            case 5:
                                // Chờ giao hàng
                                $scope.showTab('cancel');
                                break;
                            // Add cases for other status values as needed
                        }
                    })
                        .catch(function (error) {
                            console.log(error);
                        });
                    if (isAcp) {
                        toastr.success('Xác nhận thành công!', 'Thông báo');
                    }
                });
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                // Hành động khi người dùng ấn "Không"
                Swal.fire("Hủy bỏ", "", "error");
            }
        });
        // Thực hiện xử lý xóa tất cả ở đây với mảng selectedItems
    };

    // Lấy tên cột từ bảng HTML
    $scope.selectAll = true; // Đặt giá trị mặc định cho checkbox "Chọn Tất Cả"
    $scope.columns = [];

    // Khai báo biến và khởi tạo giá trị mặc định
    $scope.columnFilters = {};

    // Sử dụng $timeout để đảm bảo rằng DOM đã được tạo trước khi lấy thông tin cột
    $timeout(function () {
        var thElements = document.querySelectorAll('#UserTable th:not(:last-child)'); // Loại bỏ cột "Action"

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

    $scope.reLoad = function () {

        $scope.hienThi(0, 5);
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

};
