window.ProductController = function ($scope, $http, $window, $timeout) {
  $scope.listProduct = [];
  $scope.pageNo = 0;
  $scope.sizePage = 5;
  $scope.lastIndex = 0; // phần tử cuối của mảng
  $scope.isDeleted = false;
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

  $scope.formproduct = {
    id: "",
    name: "",
    mainImg: "",
    description: "",
    brands: { id: "" },
    category: { id: "" },
    status: "",
  };

  $scope.formProductUpdate = {
    id: "",
    name: "",
    mainImg: "",
    description: "",
    brands: { id: "" },
    category: { id: "" },
    status: true,
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

  // hàm thay đổi số phần tử của trang
  $scope.onSizePageChange = function () {
    // Làm cái gì đó với giá trị mới của sizePage
    console.log("New Size Page: " + $scope.sizePage);
    $scope.hienThi($scope.pageNo, $scope.sizePage);
    // Gọi các hàm khác cần thiết với giá trị mới của sizePage
  };
  // end phân trang

  $scope.hienThi = function (pageNo, sizePage) {
    let apiUrl = apiProduct + "?pageNo=" + pageNo + "&sizePage=" + sizePage;

    $http.get(apiUrl, headers).then(
      function (response) {
        // Xử lý phản hồi thành công
        $scope.listProduct = response.data.productList;
        $scope.totalPage = response.data.totalPages;
        console.log($scope.listProduct)
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

  //hiển thị brands
  $scope.brands = [];
  $scope.hienThi1 = function () {
    var url = apiBrands;
    $http.get(url).then(res => {
      $scope.brands = res.data;
      console.log("Success", res);
    }).catch(error => {
      console.log("Error", error);
    });
  }

  //hiển thị category
  $scope.category = [];
  $scope.hienThi2 = function () {
    var url = `${host}/api/product/category`;
    $http.get(url).then(res => {
      $scope.category = res.data;
      console.log("Success", res);
    }).catch(error => {
      console.log("Error", error);
    });
  }


  // hienthi 
  $scope.hienThi1();
  $scope.hienThi2();


  //delete data

  $scope.removeProduct = function (event, item) {
    event.preventDefault();

    console.log(item);
    let productId = item.id;
    let api = apiURL + "admin/Product/delete/" + productId;

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
        $scope.UpdateImageNull(productId);
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

  // show form add
  $scope.showForm = false; // Mặc định ẩn form
  $scope.toggleForm = function () {
    if ($scope.showFormUpdate) {
      // Nếu form cập nhật đang mở, đóng nó trước khi mở form thêm mới
      $scope.showFormUpdate = false;
    }
    $scope.showForm = !$scope.showForm; // Khi click, đảo ngược trạng thái của form thêm mới
    $scope.formSize = {};
  };


  //switch status
  $scope.switchStatus = function (id) {
    let api = apiURL + "admin/Product/switchStatus/" + id;
    $http.post(api, null).then(function (res) {
      console.log(res.data);
      $scope.hienThi($scope.pageCurrent, $scope.sizePage);
    });
  };
  $scope.closeModal = function (id) {
    document.getElementById(id).style.display = ('none')
    $('body').removeClass('modal-open'); // Loại bỏ class 'modal-open' khỏi body
    $('.modal-backdrop').remove();
  };
  // add one product

  $scope.addProduct = function (event) {
    event.preventDefault();
    console.log($scope.formproduct);
    if (!$scope.formproduct.name
      || !$scope.formproduct.mainImg
      || !$scope.formproduct.description
      || !$scope.formproduct.brands
      || !$scope.formproduct.category
      || !$scope.formproduct.status
    ) {
      // Hiển thị thông báo lỗi
      $scope.checkAddress = true;
      return; // Dừng việc thực hiện lưu nếu thông tin không hợp lệ
    }
    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        $http.post(apiAdmin + "Product" + "/insert", JSON.stringify($scope.formproduct), headers)
          .then(function (response) {
            console.log("Success Response:", response.data.data.id); // Assuming the data property contains the relevant information
            $scope.selectedImages.forEach(element => {
              let imageId = element.id;
              $scope.UpdateImage(imageId, response.data.data.id);
              isDeleted = true;
            });
            $scope.hienThi($scope.pageCurrent, $scope.sizePage);
            $scope.closeModal('productAddModal');
            $scope.selectedImages = [];
            $scope.formproduct = {};
          })
          .catch(function (error) {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Lỗi!",
              text: "Đã xảy ra lỗi khi thêm kích cỡ. Vui lòng thử lại sau."
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
  $scope.formProductUpdate = {};
  $scope.changeImg = function () {
    // Create a new array to store selected items
    const selectedItems = [];

    $scope.selectedImages.forEach(element => {
      $scope.listCheckBox.push(element);
      // Use map instead of filter to create a new array with updated selected property
      $scope.listCheckBox = $scope.listCheckBox.map(img => {
        if (img.id === element.id) {
          img.selected = true;
          // Add the selected item to the new array
          selectedItems.push(img);
        }
        return img;
      });
    });

    // Remove selected items from their current positions in the listCheckBox array
    selectedItems.forEach(img => {
      const index = $scope.listCheckBox.findIndex(item => item.id === img.id);
      if (index !== -1) {
        $scope.listCheckBox.splice(index, 1);
      }
    });

    // Add selected items to the beginning of the listCheckBox array
    $scope.listCheckBox = selectedItems.concat($scope.listCheckBox);
  };



  $scope.toggleFormUpdate = function (event, item) {
    event.preventDefault();
    $scope.hienThiCheckBox();
    if ($scope.showForm) {
      // Nếu form thêm mới đang mở, đóng nó trước khi mở form cập nhật
      $scope.showForm = false;
    }
    // Trường hợp ấn dòng khác hoặc form chưa hiển thị, hiển thị và nạp dữ liệu của dòng được chọn
    $scope.showFormUpdate = true;
    $scope.activeItem = item;
    // Nạp dữ liệu của dòng được chọn vào biểu mẫu
    // Nạp dữ liệu của dòng được chọn vào biểu mẫu
    $scope.formProductUpdate = {
      id: item.id,
      name: item.name,
      mainImg: item.mainImg,
      description: item.description,
      brands: { id: item.brands.id },
      category: { id: item.category.id },
      status: item.status
    };
    $scope.selectedImages = item.listImage;
  };

  // update
  $scope.UpdateProduct = function (event) {
    event.preventDefault();
    console.log($scope.formProductUpdate);
    if (!$scope.formProductUpdate.name
      || !$scope.formProductUpdate.mainImg
      || !$scope.formProductUpdate.description
      || !$scope.formProductUpdate.brands
      || !$scope.formProductUpdate.category
      || !$scope.formProductUpdate.status
    ) {
      // Hiển thị thông báo lỗi
      $scope.checkUpdate = true;
      return; // Dừng việc thực hiện lưu nếu thông tin không hợp lệ
    }

    console.log("hi" + $scope.formProductUpdate)

    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        $http.put(apiAdmin + "Product/update", JSON.stringify($scope.formProductUpdate), headers)
          .then(function (response) {
            $scope.UpdateImageNull($scope.formProductUpdate.id);
            console.log("Success Response:", response.data); // Assuming the data property contains the relevant information
            Swal.fire({
              icon: 'success',
              title: 'Cập nhật thành công!',
              text: 'Thông tin sản phẩm đã được cập nhật.'
            });
            $scope.closeModal('productUpdateModal');
            $scope.formProductUpdate = {};
            $scope.hienThi($scope.pageCurrent, $scope.sizePage);
          })
          .catch(function (error) {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Lỗi!",
              text: "Đã xảy ra lỗi khi cập nhật sản phẩm. Vui lòng thử lại sau."
            });
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Hủy bỏ', '', 'error');
      }
    });
  };

  // checkbox image
  $scope.selectedImages = [];
  $scope.listCheckBox = [];


  $scope.hienThiCheckBox = function () {
    let apiUrl = apiImage;
    $http.get(apiUrl, headers).then(
      function (response) {

        // Xử lý phản hồi thành công
        $scope.listCheckBox = response.data.imageList.sort((a, b) => b.id - a.id);
        console.log("here1", $scope.listCheckBox)

      },
      function (error) {
        // Xử lý lỗi
        console.log(error);
      }
    );
  };
  $scope.hienThiCheckBox();
  $scope.updateSelection = function (image) {
    if (image.selected) {
      if ($scope.selectedImages.length < 4) {
        $scope.selectedImages.push(image);
        console.log($scope.selectedImages);
        $scope.formProductUpdate.mainImg = $scope.selectedImages[0].link;
        $scope.formproduct.mainImg = $scope.selectedImages[0].link;

      } else {
        image.selected = false; // Prevent selecting more than 4 images
      }
    } else {
      var index = $scope.selectedImages.indexOf(image);
      if (index !== -1) {
        $scope.selectedImages.splice(index, 1);
      }
    }
  };

  // end checkbox image
  // update
  $scope.UpdateImage = function (idImg, idPr) {
    console.log(apiAdmin + "Image/updateImgCb/" + idImg + `?idPr=${idPr}`);

    $http.put(apiAdmin + "Image/updateImgCb/" + idImg + `?idPr=${idPr}`, headers)
      .then(function (response) {
        console.log("Success Response:", response.data); // Assuming the data property contains the relevant information
        $scope.formImageUpdate = {};
        $scope.hienThiCheckBox();
        $scope.hienThi($scope.pageCurrent, $scope.sizePage);
      })
      .catch(function (error) {
        console.error("Error:", error);
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Đã xảy ra lỗi khi cập nhật người dùng. Vui lòng thử lại sau."
        });
      });
  };
  $scope.UpdateImageNull = function (idPr) {
    console.log(apiAdmin + "Image/updateById/" + idPr);

    $http.put(apiAdmin + "Image/updateById/" + idPr, headers)
      .then(function (response) {
        $scope.selectedImages.forEach(element => {
          let imageId = element.id;
          $scope.UpdateImage(imageId, idPr);
          isDeleted = true;
        });
        console.log("response:", response);
      })
      .catch(function (error) {
        console.error("Error:", error);
      });
  };
  // end update

  $scope.fileInput = [];

  $scope.openFilePicker = function () {
    document.getElementById('image').click();
  };

  document.getElementById('image').addEventListener('change', function () {
    const fileInput = document.getElementById('image');
    for (let i = 0; i < fileInput.files.length; i++) {
      const formData = new FormData();
      if (fileInput.files.length > 0) {
        formData.append('images', fileInput.files[i]);
        // You can also append other data to the formData if needed
        // formData.append('name', document.getElementById('name').value);
        $http.post('http://localhost:8080/CodeWalkers/admin/uploadImg', formData, {
          transformRequest: angular.identity,
          headers: {
            'Content-Type': undefined
          }
        })
          .then(function (response) {
            console.log('Success:', response);
          })
          .catch(function (error) {
            console.error('Error:', error.data);
          });
      } else {
        console.error('No file selected');
      }
    }
    $scope.hienThiCheckBox();
  });



  // import exel

  $scope.importing = false; // Biến để theo dõi trạng thái của animation
  $scope.importInProgress = false; // Flag để kiểm soát quá trình import
  $scope.errorShown = false; // Flag để kiểm soát việc hiển thị lỗi

  $scope.import = async function (files) {
    $scope.importInProgress = true;
    $scope.importing = true;
    $scope.errorShown = false;

    var reader = new FileReader();
    reader.onloadend = async () => {
      try {
        var workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(reader.result);
        const worksheet = workbook.getWorksheet("Sheet1");

        for (let index = 2; index <= worksheet.rowCount; index++) {
          let row = worksheet.getRow(index);

          let product = {
            name: row.getCell(1).value.trim(),
            description: row.getCell(2).value,
            brands: { id: findBrandId(row.getCell(3).value) || null },
            category: { id: findCategoryId(row.getCell(4).value) || null },
            status: 1,
          };

          console.log(product);

          if (!product.brands || !product.category) {
            product.status = 0;
          }

          try {
            await $http.post(apiAdmin + "Product" + "/insert", JSON.stringify(product), headers);
            handleSuccess();
          } catch (error) {
            handleError(error);
          }
        }
      } catch (error) {
        handleError(error);
      } finally {
        $scope.importing = false;
        $scope.importInProgress = false;
        $scope.$apply();
        document.getElementById("input-file").value = "";
        $scope.hienThi($scope.pageNo, $scope.sizePage);
      }
    };

    reader.readAsArrayBuffer(files[0]);

    function findBrandId(brandName) {
      return $scope.brands.find(sz => sz.name.toLowerCase().trim() === brandName.toLowerCase().trim())?.id;
    }

    function findCategoryId(categoryName) {
      return $scope.category.find(sz => sz.name.toLowerCase().trim() === categoryName.toLowerCase().trim())?.id;
    }

    function handleSuccess() {
      console.log("Success");
    }

    function handleError(error) {
      if (!$scope.errorShown) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Đã xảy ra lỗi!",
        });

        console.log(error);
        $scope.errorShown = true;
      }
    }
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
    const tableId = "ProductTable";
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
    var table = document.getElementById("ProductTable"); // Thay id table bảng của bạn vào đây

    // Hàm chuyển đổi giá trị từ class sang boolean
    function convertStatusClassToBoolean(statusClass) {
      return statusClass === "fa-2xl fa fa-toggle-on ng-scope";
    }

    // Lấy dữ liệu từ bảng
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
      var rowData = [];
      for (var j = 1; j < table.rows[i].cells.length - 1; j++) {
        if (j === 3) {
          continue; // Loại bỏ cột "Trạng Thái"
        }
        // Kiểm tra nếu là cột "Trạng Thái" và không phải là hàng đầu tiên
        if (j === table.rows[i].cells.length - 2 && i !== 0) {
          var statusCell = table.rows[i].cells[j].querySelector("i");
          var statusValue = statusCell ? convertStatusClassToBoolean(statusCell.getAttribute("class")) : false;
          rowData.push(statusValue);
        } else {
          rowData.push(table.rows[i].cells[j].innerText);
        }
      }
      data.push(rowData);
    }

    // Tạo một workbook và một worksheet
    var ws = XLSX.utils.aoa_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Xuất file Excel
    XLSX.writeFile(wb, "exported_data_product.xlsx");
  };


  $scope.exportToSVG = function () {
    // Lấy bảng theo ID
    var table = document.getElementById("ProductTable"); // Thay id table bảng của bạn vào đây

    // Tạo một đối tượng SVG
    var svg = SVG().size(2000, 1500); // Kích thước SVG

    // Thêm các đối tượng SVG từ các cột của bảng
    for (var i = 0; i < table.rows.length; i++) {
      var xPosition = 10; // Reset vị trí x cho mỗi dòng
      var yPosition = 30 * i + 40;

      for (var j = 0; j < table.rows[i].cells.length; j++) {
        // Tạo đối tượng text trong SVG
        var text = svg.text(table.rows[i].cells[j].innerText).move(xPosition, yPosition);

        // Tính toán chiều rộng thực tế của văn bản
        var textWidth = text.bbox().width;

        // Nếu chiều rộng vượt quá giới hạn, chia thành các dòng sử dụng tspan
        if (textWidth > 180) {
          var words = table.rows[i].cells[j].innerText.split(' ');
          var line = '';
          var tspan = text.tspan(line).move(xPosition, yPosition); // Sử dụng move() để thiết lập vị trí của tspan

          for (var k = 0; k < words.length; k++) {
            var testLine = line + words[k] + ' ';
            var testWidth = tspan.text(testLine).bbox().width;

            if (testWidth > 180 && k > 0) {
              tspan = text.tspan(words[k] + ' ').newLine().move(xPosition, yPosition + 20); // Tạo một dòng mới và thiết lập vị trí mới
            } else {
              line = testLine;
            }
          }
        }

        // Di chuyển vị trí x cho cột tiếp theo
        xPosition += 180 + 10; // 180 là chiều rộng của mỗi cột, 10 là khoảng cách giữa các cột
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
    angular.forEach($scope.listProduct, function (item) {
      item.isSelected = $scope.selectAllCheckbox;
    });
  };

  $scope.deleteAll = function () {
    var selectedItems = $scope.listProduct.filter(function (item) {
      return item.isSelected;
    });

    if (selectedItems.length === 0) {
      alert("Vui lòng chọn các kích thước bạn muốn xóa ?");
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
          let productId = element.id;
          let api = apiURL + "admin/Product/delete/" + productId;
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
    var thElements = document.querySelectorAll('#ProductTable th:not(:last-child)'); // Loại bỏ cột "Action"

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


  // hiển thị list image



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
