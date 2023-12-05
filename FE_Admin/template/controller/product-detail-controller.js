
window.productDetailController = function ($scope, $http, $window) {


  $scope.listProductDetail = [];
  $scope.pageNo = 0;
  $scope.sizePage = 5;
  $scope.lastIndex = 0; // phần tử cuối của mảng
  $scope.sizeProduct = [];
  $scope.colorProduct = [];
  $scope.materialProduct = [];
  $scope.promotionalProduct = [];
  $scope.statusProduct = [];
  $scope.Product = [];
  $scope.detail = [];
  $scope.modalContent = "";
  // Kiểm tra nếu form là form thêm mới (ví dụ: nếu không có sản phẩm trong danh sách)


  $scope.formProductDetail = {
    quantity: "",
    price: "",
    product: { id: "" },
    material: { id: "" },
    size: { id: "" },
    color: { id: "" },
    status: { id: 1 },
  };

  $scope.formPdDetailUpdate = {
    id: "",
    quantity: "",
    price: "",
    product: { id: "" },
    material: { id: "" },
    size: { id: "" },
    color: { id: "" },
    promotional: { id: "" },
    status: { id: "" },
  }

  $scope.totalPage = 0;
  $scope.pageCurrent = 0;
  $scope.itemsPerPage = 3;
  $scope.displayedUsers = []; // Thêm mảng để hiển thị người dùng trên trang hiện tại
  $scope.finalMergedProducts = []; // Thêm mảng để lưu dữ liệu cần hiển thị

  $scope.pageRange = function () {
    var startPage = Math.max(1, $scope.pageCurrent - Math.floor($scope.itemsPerPage / 2));
    var endPage = Math.min($scope.totalPage, startPage + $scope.itemsPerPage - 1);
    var pages = [];

    if ($scope.pageCurrent + Math.floor($scope.itemsPerPage / 2) > $scope.totalPage) {
      startPage = Math.max(1, $scope.totalPage - $scope.itemsPerPage + 1);
      endPage = $scope.totalPage;
    }

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
      $scope.loadPage();
    }
  };

  $scope.previousPage = function () {
    if ($scope.pageCurrent > 0) {
      $scope.pageCurrent--;
      $scope.loadPage();
    }
  };

  $scope.onHover = function (index) {
    $scope.hoveredPage = index;
  };

  $scope.onLeave = function () {
    $scope.hoveredPage = null;
  };

  $scope.loadPage = function () {
    var startIndex = $scope.pageCurrent * $scope.itemsPerPage;
    var endIndex = ($scope.pageCurrent + 1) * $scope.itemsPerPage - 1;
    $scope.displayedUsers = $scope.finalMergedProducts.slice(startIndex, endIndex + 1);
    $scope.updateFinalMergedProducts();
  };

  // end phân trang

  $scope.hienThi = function (pageNo, sizePage) {
    let apiUrl = apiProductDetails + "?pageNo=" + pageNo + "&sizePage=" + sizePage;
    $http.get(apiUrl).then(
      function (response) {
        // Kiểm tra dữ liệu có được in ra không
        console.log(response, "")
        $scope.listProductDetail = response.data.productDetailList;
        $scope.totalPage = response.data.totalPages;
        // $scope.lastIndex = $scope.listProductDetail[$scope.listProductDetail.length - 1].id;
        $scope.sizeProduct = response.data.sizeList;
        $scope.colorProduct = response.data.colorList;
        $scope.materialProduct = response.data.materialList;
        $scope.promotionalProduct = response.data.promotionalList;
        $scope.statusProduct = response.data.statusList;
        $scope.Product = response.data.productList;
        $scope.detail = response.data.productDetailList;
        // Tạo một đối tượng để lưu trữ thông tin gộp
        // Hàm chuyển đổi tên màu từ tiếng Việt sang tiếng Anh
        function convertColorName(colorName) {
          switch (colorName) {
            case 'Đen':
              return 'Black';
            case 'Trắng':
              return 'azure';
            case 'Đỏ':
              return 'Red';
            case 'Xanh dương':
              return 'Blue';
            case 'Vàng':
              return 'Yellow';
            case 'Xám':
              return 'Gray';
            case 'Hồng':
              return 'Pink';
            case 'Xanh lá':
              return 'Green';
            case 'Cam':
              return 'Orange';
            case 'Nâu':
              return 'Brown';
            default:
              return colorName; // Nếu không khớp với các màu cơ bản, giữ nguyên tên màu
          }
        }
        $scope.updateFinalMergedProducts = function () {
          var mergedProducts = {};

          $scope.detail.forEach(function (product) {
            var englishColorName = convertColorName(product.color.name);

            if (product.status.id === 1) {
              if (!mergedProducts[product.product.name]) {
                // If the product doesn't exist, add a new entry
                mergedProducts[product.product.name] = {
                  name: product.product.name,
                  sizes: [product.size.name],  // Use an array to store unique sizes
                  colors: [englishColorName]   // Use an array to store unique colors
                };
              } else {
                // If the product already exists, update sizes and colors only if not already present
                if (mergedProducts[product.product.name].sizes.indexOf(product.size.name) === -1) {
                  mergedProducts[product.product.name].sizes.push(product.size.name);
                }

                if (mergedProducts[product.product.name].colors.indexOf(englishColorName) === -1) {
                  mergedProducts[product.product.name].colors.push(englishColorName);
                }
              }
            }
          });

          $scope.finalMergedProducts = Object.values(mergedProducts);
        };

        // Gọi hàm để cập nhật dữ liệu
        $scope.updateFinalMergedProducts();

      },
      function (error) {
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
    let productDt = item.id;
    let api = apiProductDetails + "/delete/" + productDt;

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
        $http.delete(api).then(function (response) {
          Swal.fire('Xóa thành công!', '', 'success');
          $scope.Reload($scope.modalContent)
          $scope.updateFinalMergedProducts()
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
    $scope.formProductDetail = {};
  };
  // add one product

  $scope.addUser = function (event) {
    if (!$scope.formProductDetail.quantity ||
      !$scope.formProductDetail.price ||
      !$scope.formProductDetail.product.id ||
      !$scope.formProductDetail.material.id ||
      !$scope.formProductDetail.size.id ||
      !$scope.formProductDetail.color.id) {
      // Hiển thị thông báo lỗi
      // Assuming you have a variable named checkProductDetail to handle the error message
      $scope.checkProductDetail = true;
      return; // Dừng việc thực hiện lưu nếu thông tin không hợp lệ
  }
  
    event.preventDefault();
    console.log($scope.formProductDetail);

    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
       var checkExist= $scope.listProductDetail.find(prDt => prDt.product.id === $scope.formProductDetail.product.id && prDt.color.id === $scope.formProductDetail.color.id && prDt.size.id === $scope.formProductDetail.size.id)
       if(checkExist){
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "sản phẩm đã tồn tại. Vui lòng thử lại."
        });
        return
       }
       $http.post(apiProductDetails + "/insert", JSON.stringify($scope.formProductDetail))
          .then(function (response) {
            console.log("Success Response:", response.data); // Assuming the data property contains the relevant information
            Swal.fire({
              icon: 'success',
              title: 'Thêm thành công!',
              text: 'Thông tin người dùng đã được thêm.'
            });
            $scope.hienThi($scope.pageCurrent, $scope.sizePage);
            $scope.formProductDetail = {};
            $scope.closeModal('formAddModal');
          })
          .catch(function (error) {
            console.error("Error:", error);
            Swal.fire({
              icon: "error",
              title: "Lỗi!",
              text: "Đã xảy ra lỗi khi thêm người dùng. Vui lòng thử lại sau."
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
  $scope.formPdDetailUpdate = {};

  $scope.toggleFormUpdate = function (event, item) {
    event.preventDefault();

    if ($scope.showForm) {
      // Nếu form thêm mới đang mở, đóng nó trước khi mở form cập nhật
      $scope.showForm = false;
    }

    if (item && $scope.activeItem === item && $scope.showFormUpdate) {
      // Trường hợp ấn lại dòng đã chọn và form đang hiển thị, đóng form và xóa dữ liệu
      $scope.showFormUpdate = false;
      $scope.activeItem = null;
      $scope.formPdDetailUpdate = {};
    } else if (item) {
      // Trường hợp ấn dòng khác hoặc form chưa hiển thị, hiển thị và nạp dữ liệu của dòng được chọn
      $scope.showFormUpdate = true;
      $scope.activeItem = item;
      // $('#formModal').modal('toggle');

      // Nạp dữ liệu của dòng được chọn vào biểu mẫu
      // Nạp dữ liệu của dòng được chọn vào biểu mẫu
      $scope.formPdDetailUpdate = {
        id: item.id,
        quantity: item.quantity,
        price: item.price,
        product: { id: item.product.id },
        material: { id: item.material.id },
        size: { id: item.size.id },
        color: { id: item.color.id },
        promotional: { id: item.promotional.id },
        status: { id: item.status.id },
      };
      console.log($scope.formPdDetailUpdate)
    } else {
      // Trường hợp không có đối tượng được chọn, đóng form và xóa dữ liệu
      $scope.showFormUpdate = false;
      $scope.activeItem = null;
      $scope.formPdDetailUpdate = {};
    }
  };
  $scope.closeModal = function (id) {
    document.getElementById(id).style.display = ('none')
    $('body').removeClass('modal-open'); // Loại bỏ class 'modal-open' khỏi body
    $('.modal-backdrop').remove();
  };
  // update pr
  $scope.UpdatePr = function (event) {
    if (
      !$scope.formPdDetailUpdate.quantity ||
      !$scope.formPdDetailUpdate.price ||
      !$scope.formPdDetailUpdate.product.id ||
      !$scope.formPdDetailUpdate.material.id ||
      !$scope.formPdDetailUpdate.size.id ||
      !$scope.formPdDetailUpdate.color.id ||
      !$scope.formPdDetailUpdate.status.id) {
      // Hiển thị thông báo lỗi
      $scope.checkPdDetailUpdate = true;
      return ; // Dừng việc thực hiện lưu nếu thông tin không hợp lệ
  }
    event.preventDefault();
    console.log($scope.formPdDetailUpdate);

    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        $http.put(apiProductDetails + "/update", JSON.stringify($scope.formPdDetailUpdate))
          .then(function (response) {
            console.log("Success Response:", response.data); // Assuming the data property contains the relevant information
            Swal.fire({
              icon: 'success',
              title: 'Cập nhật thành công!',
              text: 'Thông tin sản phẩm đã được cập nhật.'
            });
            $scope.formPdDetailUpdate = {};
            $scope.hienThi($scope.pageCurrent, $scope.sizePage);
            $scope.closeModal('formUpdateModal');
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

  $scope.loadMaterial = function () {
    var url = `${host}/api/product/material`;
    $http.get(url).then(res => {
      $scope.materials = res.data;
    }).catch(error => {
      console.log("Error", error);
    });
  }

  $scope.loadColor = function () {
    var url = `${host}/api/product/color`;
    $http.get(url).then(res => {
      $scope.colors = res.data;

    }).catch(error => {
      console.log("Error", error);
    });
  }
  $scope.loadSize = function () {
    var url = `${host}/api/detail/size`;
    $http.get(url).then(res => {
      $scope.sizes = res.data;
    }).catch(error => {
      console.log("Error", error);
    });
  }
  $scope.loadPr = function () {
    var url = `${host}/api/product`;
    $http.get(url).then(res => {
      $scope.products = res.data;
    }).catch(error => {
      console.log("Error", error);
    });
  }
  $scope.loadPr();
  $scope.loadSize();
  $scope.loadColor();
  $scope.loadMaterial();
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
        const worksheet = workbook.getWorksheet("Sheet4");
        worksheet.eachRow((row, index) => {
          $scope.checkSl = 0;
          console.log(row.getCell(3).value)
          if (index > 1) {
            let productDt = {
              product: {
                id: $scope.products.filter(pr => pr.name.toLowerCase().trim() === (row.getCell(1).value).toLowerCase().trim())[0]?.id
              },
              material: { id: $scope.materials.filter(sz => sz.name.toLowerCase().trim() === (row.getCell(2).value).toLowerCase().trim())[0]?.id },
              size: { id: $scope.sizes.filter(sz => sz.name === String(row.getCell(3).value).trim())[0]?.id },
              color: { id: $scope.colors.filter(sz => sz.name.toLowerCase().trim() === (row.getCell(4).value).toLowerCase().trim())[0]?.id },
              quantity: row.getCell(6).value,
              price: row.getCell(7).value,
              status: { id: 1 },
            };
            if (!productDt.product || !productDt.material || !productDt.size || !productDt.color) {
              productDt.statusstatus.id = 0;
            }
            console.log(productDt, '2')
            if (!$scope.listProductDetail.some(pr => pr.product.id === productDt.product.id && pr.size.id === productDt.size.id && pr.color.id === productDt.color.id)) {
              console.log($scope.checkSl)
              $http.post(apiProductDetails + "/insert", JSON.stringify(productDt))
                .then(function (response) {
                  if (response) {
                    $scope.checkSl += 1;
                    $scope.hienThi($scope.pageCurrent, $scope.sizePage);
                  }
                  console.log($scope.checkSl);
                  if (!$scope.errorShown) {
                    Swal.fire({
                      icon: "success",
                      title: "Ok",
                      text: "Đã import sản phẩm thành công",
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
          $scope.errorShown = true; // Set the error flag
        }
      } finally {
        $scope.importing = false; // Kết thúc animation
        $scope.importInProgress = false; // Reset the flag
        $scope.$apply(); // Cập nhật scope
        // Xóa file sau khi đã xử lý xong
        document.getElementById('input-file').value = '';
      }
    };
    reader.readAsArrayBuffer(files[0]);
  };


  // sort column
  $scope.sortColumn = '';
  $scope.reverseSort = false;

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

  // export pdf
  $scope.exportToPDF = function () {
    const tableId = 'DTProductTable';
    const fileName = 'exported_data';

    // Tạo đối tượng jsPDF
    const pdf = new $window.jsPDF('p', 'pt', 'letter');

    // Thêm bảng vào PDF
    pdf.autoTable({ html: `#${tableId}` });

    // Tải file PDF
    pdf.save(`${fileName}.pdf`);
  };

  $scope.exportToExcel = function () {
    // Lấy bảng theo ID
    var table = document.getElementById('DTProductTable'); // Thay id table bảng của bạn vào đây

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
    XLSX.writeFile(wb, 'exported_data.xlsx');
  };

  $scope.exportToSVG = function () {
    // Lấy bảng theo ID
    var table = document.getElementById('DTProductTable'); // Thay id table bảng của bạn vào đây

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


  $scope.getColorClass = function (color) {
    switch (color.toLowerCase()) {
      case 'red':
        return 'red';
      case 'blue':
        return 'blue';
      case 'green':
        return 'green';
      case 'yellow':
        return 'yellow';
      case 'orange':
        return 'orange';
      case 'purple':
        return 'purple';
      case 'pink':
        return 'pink';
      case 'brown':
        return 'brown';
      case 'grey':
        return 'grey';
      case 'teal':
        return 'teal';
      default:
        return ''; // Default class
    }
  };

  $scope.removeSizeText = function (size) {
    // Assuming size is a string
    return size.replace('Size', '').trim();
  };

  $scope.getColorClass = function (color) {
    switch (color.toLowerCase()) {
      case 'red':
        return 'red';
      case 'blue':
        return 'blue';
      case 'green':
        return 'green';
      case 'orange':
        return 'orange';
      case 'purple':
        return 'purple';
      case 'pink':
        return 'pink';
      case 'yellow':
        return 'yellow';
      case 'brown':
        return 'brown';
      case 'cyan':
        return 'cyan';
      case 'gray':
        return 'gray';
      default:
        return ''; // Default class
    }
  };


  $scope.openModal = function (itemName) {
    $scope.modalContent = itemName;
    $('#myModal').modal('show');

    $scope.Reload(itemName);
  };

  $scope.Reload = function (itemName) {
    let api = "http://localhost:8080/CodeWalkers/admin/ProductDetails/details?productName=" + itemName.trim();
    console.log(api)
    $http.get(api).then(function (res) {
      console.log(res.data)
      $scope.data = res.data;
    });
  };

  $scope.reloadPage = function () {
    $window.location.reload();
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