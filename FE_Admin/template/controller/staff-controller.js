
window.StaffController = function ($scope, $http, $window, $timeout) {

  $scope.listStaff = [];
  $scope.roles = [];
  $scope.pageNo = 0;
  $scope.sizePage = 5;
  $scope.lastIndex = 0; // phần tử cuối của mảng
  $scope.isDeleted = false;

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
    // Lấy dữ liệu từ localStorage
    var userDataString = localStorage.getItem('userData');

    // Kiểm tra xem dữ liệu có tồn tại không
    if (userDataString) {
      // Chuyển đổi dữ liệu từ chuỗi JSON sang đối tượng JavaScript
      var userData = JSON.parse(userDataString);

      // Bạn có thể sử dụng userData ở đây
      console.log(userData.token);
      return userData.token;
    } else {
      // Trường hợp không có dữ liệu trong localStorage
      console.log('Không có dữ liệu đăng nhập trong localStorage.');
    }
  }

  $scope.formStaff = {
    name: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    email: "",
    address: "",
    status: "",
    image: ""
    // roles: {id},
  };

  $scope.formStaffUpdate = {
    id: "",
    name: "",
    dateOfBirth: "",
    phoneNumber: "",
    gender: "",
    email: "",
    address: "",
    status: "",
    image: ""
    // roles: {id},
  };

  // phân trang start
  $scope.totalPage = 0;
  $scope.pageCurrent = 0;
  $scope.itemsPerPage = 3; // Số lượng trang bạn muốn hiển thị

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

  // hàm thay đổi số phần tử của trang
  $scope.onSizePageChange = function () {
    // Làm cái gì đó với giá trị mới của sizePage
    console.log("New Size Page: " + $scope.sizePage);
    $scope.hienThi($scope.pageNo, $scope.sizePage);
    // Gọi các hàm khác cần thiết với giá trị mới của sizePage
  };
  // end phân trang


  $scope.hienThi = function (pageNo, sizePage) {
    let apiUrl = apiStaff + "?pageNo=" + pageNo + "&sizePage=" + sizePage;
    $http.get(apiUrl, headers).then(
      function (response) {
        // Xử lý phản hồi thành công
        $scope.listStaff = response.data.staffList;
        $scope.totalPage = response.data.totalPages;
        $scope.lastIndex = $scope.listStaff[$scope.listStaff.length - 1].id;
        $scope.roles = response.data.roleList;
        console.log(response.data);
        console.log(response.data.totalPages);
      },
      function (error) {
        // Xử lý lỗi
        console.log(error);
      }
    );
  };

  $scope.getAll = function () {
    let apiUrl = apiStaff + "?pageNo=" + 0 + "&sizePage=" + 100;
    $http.get(apiUrl, headers).then(
      function (response) {
        // Xử lý phản hồi thành công
        $scope.listAllStaff = response.data.staffList;
        console.log(response.data, 'a');
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
    let staffId = item.id;
    let api = apiURL + "admin/Staff/delete/" + staffId;

    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        // Hành động khi người dùng ấn "Có"
        $http.delete(api, headers).then(function (response) {
          Swal.fire('Xóa thành công!', '', 'success');
          $scope.hienThi($scope.pageCurrent, $scope.sizePage);
          console.log(response);
        })
          .catch(function (error) {
            console.log(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hành động khi người dùng ấn "Không"
        Swal.fire('Hủy bỏ', '', 'error');
      }
    });

  };
  //switch status
  $scope.switchStatus = function (id) {
    let api = apiURL + "admin/Staff/switchStatus/" + id;
    $http.post(api, null).then(function (res) {
      console.log(res.data);
      $scope.hienThi($scope.pageCurrent, $scope.sizePage);
    });
  };
  // add one product
  $scope.formStaff.image = null;
  $scope.openFileInput = function () {
    document.getElementById('fileInput').click();
  };

  $scope.fileChanged = function (element) {
    $scope.$apply(function () {
      var fileInput = document.getElementById('fileInput');
      if (fileInput.files.length > 0) { // Kiểm tra nếu đã chọn tệp
        $scope.formStaff.image = fileInput.files[0].name;
      }
    });
  };
  $scope.convertDateFormat = function (inputDate) {
    // Chuyển đổi chuỗi ngày thành đối tượng Date
    var dateObject = new Date(inputDate);

    // Kiểm tra xem dateObject có hợp lệ không
    if (isNaN(dateObject.getTime())) {
      return "Invalid Date";
    }

    // Lấy ngày, tháng và năm
    var day = dateObject.getDate();
    var month = dateObject.getMonth() + 1; // Tháng bắt đầu từ 0
    var year = dateObject.getFullYear();

    // Định dạng lại ngày thành "DD/MM/YYYY"
    var formattedDate = (day < 10 ? '0' : '') + day + '/' +
      (month < 10 ? '0' : '') + month + '/' +
      year;

    return formattedDate;
  };

  var phoneRegex = /^(03|05|07|08|09)[0-9]{8}$/;
  $scope.isValidDate = function () {
    if (!$scope.formStaff.dateOfBirth) {
      return false; // Date is not set
    }

    var today = new Date();
    var birthDate = new Date($scope.formStaff.dateOfBirth);

    // Calculate age
    var age = today.getFullYear() - birthDate.getFullYear();
    var monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    // Check if age is greater than or equal to 18
    return age >= 18;
  };
  $scope.$watch('formStaff.dateOfBirth', function (newValue, oldValue) {
    $scope.myForm.dateOfBirth.$setValidity('dateTooYoung', $scope.isValidDate());
  });

  $scope.phoneNumberExists = function () {
    if (!$scope.formStaff.phoneNumber) {
      return false; // Phone number is not set, consider it not existing
    }
    return $scope.listAllStaff.some(staff => staff.phoneNumber === $scope.formStaff.phoneNumber);
  };
  $scope.$watch('formStaff.phoneNumber', function (newValue, oldValue) {
    $scope.myForm.phoneNumber.$setValidity('phoneNumberExists', !$scope.phoneNumberExists());
  });

  $scope.$watch('formStaff.email', function (newValue, oldValue) {
    $scope.myForm.email.$setValidity('emailExists', !$scope.emailExists());
  });

  $scope.emailExists = function () {
    if (!$scope.formStaff.email) {
      return false; // Email is not set, consider it not existing
    }
    return $scope.listAllStaff.some(staff => staff.email === $scope.formStaff.email);
  };

  $scope.addStaff = function (event) {
    event.preventDefault();
    // Kiểm tra xem form có hợp lệ không
    if (!$scope.formStaff.name
      || !$scope.formStaff.phoneNumber
      || !$scope.formStaff.gender
      || !$scope.formStaff.email
      || !$scope.formStaff.status
      || !$scope.formStaff.dateOfBirth
    ) {
      // Nếu form không hợp lệ, thông báo lỗi và ngăn chặn việc thực hiện tiếp
      // console.log("Vui lòng điền đầy đủ thông tin cần thiết.");
      $scope.checkAdd = true;
      return;
    }
    console.log($scope.formStaff.dateOfBirth);

    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {

        $http.post(apiAdmin + "Staff" + "/insert", JSON.stringify($scope.formStaff), headers)
          .then(function (response) {
            console.log("Success Response:", response.data); // Assuming the data property contains the relevant information
            Swal.fire({
              icon: 'success',
              title: 'Thêm thành công!',
              text: 'Thông tin nhân viên đã được thêm.'
            }).then(() => {
              $('#exampleModal').modal('hide'); // Đóng modal khi thông báo thành công hiển thị và người dùng ấn OK
              $('.modal-backdrop').hide();
            });
            $scope.hienThi($scope.pageCurrent, $scope.sizePage);
            $scope.formStaff = {};
          })
          .catch(function (error) {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Lỗi!",
              text: "Đã xảy ra lỗi khi thêm nhân viên. Vui lòng thử lại sau."
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Hủy bỏ', '', 'error');
      }
    });
  };


  // show form user and load detail
  $scope.showFormUpdate = false;
  $scope.activeItem = -1;
  $scope.formStaffUpdate = {};

  $scope.toggleFormUpdate = function (event, item) {
    event.preventDefault();
    // Trường hợp ấn dòng khác hoặc form chưa hiển thị, hiển thị và nạp dữ liệu của dòng được chọn
    $scope.showFormUpdate = true;
    $scope.activeItem = item;

    // Nạp dữ liệu của dòng được chọn vào biểu mẫu
    // Nạp dữ liệu của dòng được chọn vào biểu mẫu
    $scope.updateFileInput = function () {
      document.getElementById('updateInput').click();
    };

    $scope.fileChanged = function (element) {
      $scope.$apply(function () {
        var updateInput = document.getElementById('updateInput');
        $scope.formStaffUpdate.image = updateInput.files[0].name;
      });
    };
    $scope.formStaffUpdate = {
      id: item.id,
      name: item.name,
      dateOfBirth: new Date(item.dateOfBirth),
      phoneNumber: item.phoneNumber,
      gender: item.gender,
      email: item.email,
      address: item.address,
      image: item.image,
      status: item.status,
    };
  };

  // update
  $scope.UpdateStaff = function (event) {
    event.preventDefault();
    if (!$scope.formStaffUpdate.name
      || !$scope.formStaffUpdate.phoneNumber
      || !$scope.formStaffUpdate.email) {
      // Nếu form không hợp lệ, thông báo lỗi và ngăn chặn việc thực hiện tiếp
      // console.log("Vui lòng điền đầy đủ thông tin cần thiết.");
      $scope.checkUpdate = true;
      return;
    }
    console.log($scope.formStaffUpdate);

    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        $http.put(apiAdmin + "Staff/update", JSON.stringify($scope.formStaffUpdate), headers)
          .then(function (response) {
            console.log("Success Response:", response.data); // Assuming the data property contains the relevant information
            Swal.fire({
              icon: 'success',
              title: 'Cập nhật thành công!',
              text: 'Thông tin nhân viên đã được cập nhật.'
            }).then(() => {
              $('#modalUpdate').modal('hide'); // Đóng modal khi thông báo thành công hiển thị và người dùng ấn OK
              $('.modal-backdrop').hide();
            });
            $scope.formStaffUpdate = {};
            $scope.hienThi($scope.pageCurrent, $scope.sizePage);
          })
          .catch(function (error) {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Lỗi!",
              text: "Đã xảy ra lỗi khi cập nhật nhân viên. Vui lòng thử lại sau."
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Hủy bỏ', '', 'error');
      }
    });
  };


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
            let staff = {
              name: row.getCell(1).value,
              dateOfBirth: formatDate(row.getCell(2).value),
              phoneNumber: "0" + row.getCell(3).value,
              gender: parseGender(row.getCell(4).value),
              email: row.getCell(5).value,
              address: row.getCell(6).value,
              image: row.getCell(7).value,
              userName: row.getCell(8).value,
              password: row.getCell(9).value,
            };
            $http
              .post(
                apiAdmin + "Staff" + "/insert",
                JSON.stringify(staff),
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
    const tableId = "StaffTable";
    const fileName = "exported_data";

    // Tạo đối tượng jsPDF
    const pdf = new $window.jsPDF("p", "pt", "letter");

    // Thêm bảng vào PDF
    pdf.autoTable({ html: `#${tableId}` });

    // Tải file PDF
    pdf.save(`${fileName}.pdf`);
  };

  $scope.exportToExcel = function () {
    var table = document.getElementById("StaffTable");
    var data = [];
    // Hàm chuyển đổi giá trị từ class sang boolean
    function convertStatusClassToBoolean(statusClass) {
      return statusClass === "fa-2xl fa fa-toggle-on ng-scope";
    }
    // Tạo một hàng tiêu đề với tên các cột
    var headerRow = [];
    for (var k = 1; k < table.rows[0].cells.length - 1; k++) {
      if (k === 8) {
        headerRow.push("Hình ảnh"); // Thêm tên cột hình ảnh vào hàng đầu tiên
      } else {
        headerRow.push(table.rows[0].cells[k].innerText);
      }
    }
    data.push(headerRow);

    for (var i = 1; i < table.rows.length; i++) {
      var rowData = [];

      for (var j = 1; j < table.rows[i].cells.length - 1; j++) {
        if (j === 8) {
          var imgElement = table.rows[i].cells[j].querySelector('img');
          var altText = imgElement ? imgElement.alt : '';
          rowData.push(altText);
        }
        if (i!==0 && j === table.rows[i].cells.length - 3) {
          var statusCell = table.rows[i].cells[j].querySelector("i");
          var statusValue = statusCell ? convertStatusClassToBoolean(statusCell.getAttribute("class")) : false;
          rowData.push(statusValue);
        } else {
          rowData.push(table.rows[i].cells[j].innerText);
        }
      }

      data.push(rowData);
    }

    var ws = XLSX.utils.aoa_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Danh sách Nhân viên");
    XLSX.writeFile(wb, "export_data_staff.xlsx");
  };



  $scope.exportToSVG = function () {
    // Lấy bảng theo ID
    var table = document.getElementById("StaffTable"); // Thay id table bảng của bạn vào đây

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
    angular.forEach($scope.listStaff, function (item) {
      item.isSelected = $scope.selectAllCheckbox;
    });
  };

  $scope.deleteAll = function () {
    var selectedItems = $scope.listStaff.filter(function (item) {
      return item.isSelected;
    });

    if (selectedItems.length === 0) {
      alert("Vui lòng chọn các khách hàng bạn muốn xóa ?");
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
          let userId = element.id;
          let api = apiURL + "admin/Staff/delete/" + userId;
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

  // Lấy tên cột từ bảng HTML
  $scope.selectAll = true; // Đặt giá trị mặc định cho checkbox "Chọn Tất Cả"
  $scope.columns = [];

  // Khai báo biến và khởi tạo giá trị mặc định
  $scope.columnFilters = {};

  // Sử dụng $timeout để đảm bảo rằng DOM đã được tạo trước khi lấy thông tin cột
  $timeout(function () {
    var thElements = document.querySelectorAll('#StaffTable th:not(:last-child)'); // Loại bỏ cột "Action"

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
  $scope.getAll();

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
