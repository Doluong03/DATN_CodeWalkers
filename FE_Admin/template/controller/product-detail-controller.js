
window.productDetailController = function ($scope, $http, $window, $timeout) {


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
          $scope.detail.sort(function (a, b) {
            return b.id - a.id;
          });
          $scope.detail.forEach(function (product) {
            var englishColorName = convertColorName(product.color.name);

            if (product.status.id) {
              if (!mergedProducts[product.product.name]) {
                // If the product doesn't exist, add a new entry
                mergedProducts[product.product.name] = {
                  id: product.product.id,
                  name: product.product.name,
                  sizes: [product.size.name],  // Use an array to store unique sizes
                  colors: [englishColorName],   // Use an array to store unique colors
                  status: product.product.status   // Use an array to store unique colors
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
  $scope.reloadItems = function () {
    $scope.itemsPerPage = 5;
    $scope.setPage(1);
  };
  // phan trang 
  // Assuming you have $scope.currentPage and $scope.itemsPerPage in your controller
  $scope.pageRange = function () {
    var startPage = Math.max(1, $scope.currentPage - Math.floor($scope.itemsPerPage / 2));
    var endPage = Math.min($scope.totalPages(), startPage + $scope.itemsPerPage - 1);
    var pages = [];

    if ($scope.currentPage + Math.floor($scope.itemsPerPage / 2) > $scope.totalPages()) {
      startPage = Math.max(1, $scope.totalPages() - $scope.itemsPerPage + 1);
      endPage = $scope.totalPages();
    }

    if (startPage > 1) {
      startPage = Math.max(1, startPage - 1);
    }

    for (var i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };
  $scope.currentPage = 1;
  $scope.itemsPerPage = 5;  // Adjust the number of items per page as needed

  $scope.paginateFinalMergedProducts = function () {
    var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
    var end = begin + $scope.itemsPerPage;

    // Slice the array to get the current page's items
    $scope.displayedFinalMergedProducts = $scope.finalMergedProducts.slice(begin, end);
  };
  $scope.itemsPerPageOptions = [5, 10, 20, 100];  // You can customize the available options

  // Function to handle changes in itemsPerPage
  $scope.onItemsPerPageChange = function () {
    $scope.currentPage = 1;
    $scope.paginateFinalMergedProducts();
  };

  // Watch for changes in currentPage or finalMergedProducts and update the displayed items
  $scope.$watchGroup(['currentPage', 'itemsPerPage', 'finalMergedProducts'], function () {
    $scope.paginateFinalMergedProducts();
  });

  // Function to change the current page
  $scope.setPage = function (pageNo) {
    $scope.currentPage = pageNo;
  };

  // Function to navigate to the previous or next page
  $scope.prevPage = function () {
    if ($scope.currentPage > 1) {
      $scope.currentPage--;
    }
  };

  $scope.nextPage = function () {
    if ($scope.currentPage < $scope.totalPages()) {
      $scope.currentPage++;
    }
  };

  // Calculate the total number of pages
  $scope.totalPages = function () {
    return Math.ceil($scope.finalMergedProducts.length / $scope.itemsPerPage);
  };

  // Initialize the displayed items
  $scope.paginateFinalMergedProducts();


  // end phan trang 

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
          $scope.setPage(1);

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
  $scope.switchStatusPr = function (item) {
    let api = apiProductDetails + "/switch-all-by-pr/" + item.id;
    $http.post(api, null).then(function (res) {
      console.log(res.data);
      $scope.hienThi($scope.pageCurrent, $scope.sizePage);
    });
  };

  $scope.toggleStatus = function (item) {
    if (item.status.id == 1) {
      $scope.turnOff(item);
    } else {
      $scope.turnOn(item);
    }
    $scope.Reload(item.product.name);

    // Gọi hàm hiển thị sau khi cập nhật trạng thái
    console.log(item.status.id, "")
  };

  $scope.turnOn = function (item) {
    let api = apiProductDetails + "/turn-on/" + item.id;
    $http.post(api, null).then(function (res) {
      console.log(res.data);
      $scope.Reload(item.product.name);
    });

  };

  $scope.turnOff = function (item) {
    let api = apiProductDetails + "/turn-off/" + item.id;
    $http.post(api, null).then(function (res) {
      console.log(res.data);
      $scope.Reload(item.product.name);

    });
  };

  // show form add
  $scope.showForm = false; // Mặc định ẩn form
  $scope.toggleForm = function () {
    $timeout(function () {
      $('#exampleInputSize').val(null).trigger('change');
      $('#product').val(null).trigger('change');
    }, 100)

    if ($scope.showFormUpdate) {
      // Bỏ chọn tất cả các giá trị đã chọn

      // Nếu form cập nhật đang mở, đóng nó trước khi mở form thêm mới
      $scope.showFormUpdate = false;
    }
    $scope.showForm = !$scope.showForm; // Khi click, đảo ngược trạng thái của form thêm mới
    $scope.formProductDetail = {};
  };
  // add one product
  $scope.reLoadForm = function () {

    $scope.paginateFinalMergedProducts();
  };
  $scope.selectAllChanged2 = function () {
    console.log("Trạng thái của selectAllCheckbox:", $scope.selectAllCheckbox2);
    angular.forEach($scope.data, function (item) {
      item.isSelected = $scope.selectAllCheckbox2;
    });
  };
  $scope.isDeleted = false;

  $scope.deleteAll = function () {
    var selectedItems = $scope.data.filter(function (item) {
      return item.isSelected;
    });

    if (selectedItems.length === 0) {
      alert("Vui lòng chọn các kích thước bạn muốn xóa ?");
      return false;
    }
    var isDeleted = false;
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
          let productDt = element.id;
          let api = apiProductDetails + "/delete/" + productDt;
          $http.delete(api).then(function (response) {
            isDeleted = true;
            console.log(response);
            $scope.Reload($scope.modalContent);
            $scope.reLoadForm();
          })

            .catch(function (error) {
              console.log(error);
            });
        });
        $scope.hienThi($scope.pageNo, $scope.sizePage);
        Swal.fire("Xóa thành công!", "", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hành động khi người dùng ấn "Không"
        Swal.fire("Hủy bỏ", "", "error");
      }
    });
    // Thực hiện xử lý xóa tất cả ở đây với mảng selectedItems
  };

  $scope.loading=false;

  $scope.addUser = function (event) {

    if (
      !$scope.formProductDetail.quantity ||
      !$scope.formProductDetail.price ||
      !$scope.formProductDetail.material.id ||
      $scope.selectSize.length === 0 ||
      $scope.productData.length === 0
    ) {
      toastr.error('Vui lòng nhập đủ thông tin!', 'Thông báo');
      $scope.checkProductDetail = true;
      return;
    }

    event.preventDefault();

    Swal.fire({
      title: 'Xác nhận',
      text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Có',
      cancelButtonText: 'Không'
    }).then((result) => {
      if (result.isConfirmed) {
        $scope.loading=true;
        $scope.closeModal('formAddModal');
        $scope.selectSize.reduce(function (sizePromise, size) {
          return sizePromise.then(function () {
            // Iterate through each color
            return $scope.productColors.reduce(function (colorPromise, color) {
              return colorPromise.then(function () {
                // Set color properties in formProductDetail
                $scope.formProductDetail.color = {};
                $scope.formProductDetail.color.id = Number(color.id);
                $scope.formProductDetail.size = {};
                $scope.formProductDetail.size.id = Number(size.id);
                $scope.formProductDetail.product = {};
                $scope.formProductDetail.product.id = Number($scope.productData[0].id);
                // Other properties (size, product) remain the same as before

                // Add product detail for the current size and color
                return addProductDetail(size);
              });
            }, Promise.resolve());
          });
        }, Promise.resolve())
          .then(function () {
            // All iterations completed successfully
            $scope.hienThi($scope.pageCurrent, $scope.sizePage);
            $scope.paginateFinalMergedProducts();
            $scope.setPage(1);
            toastr.success('Thêm thành công', 'Thông báo');
            $scope.loading=false;

            console.log("All product details added successfully");
          })
          .catch(function (error) {
            // Handle errors from any iteration
            console.error("Error:", error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Hủy bỏ', '', 'error');
      }
    });
  };

  // Define a function to add a product detail and return a promise
  function addProductDetail(size) {
    return new Promise(function (resolve, reject) {
      var checkExist = $scope.listProductDetail.find(
        (prDt) =>
          prDt.product.id === Number($scope.productData[0].id) &&
          prDt.color.id === $scope.formProductDetail.color.id &&
          prDt.size.id === Number(size.id)
      );
      console.log($scope.formProductDetail, 'here');
      // Send POST request to insert product detail
      $http.post(apiProductDetails + "/insert", JSON.stringify($scope.formProductDetail))
        .then(function (response) {
          // Success handling
          resolve(response.data);
        })
        .catch(function (error) {
          // Error handling
          reject(error);
        });
    });
  }




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
      return; // Dừng việc thực hiện lưu nếu thông tin không hợp lệ
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
            $scope.setPage(1);
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
  $scope.selectSize = [];

  // select multiple size
  angular.element(document).ready(function () {
    // Set up a listener for the change event
    $('#exampleInputSize').on('change', function () {
      // Manually update the AngularJS model
      $scope.$apply(function () {
        $scope.selectedData = $('#exampleInputSize').select2('data');
        // Check if any data is selected
        if ($scope.selectedData && $scope.selectedData.length > 0) {
          // Access the first selected data's id
          // Assuming you want to remove the option with value 'first'
          $scope.selectSize = $scope.selectedData;
          console.log($scope.selectSize, '111')
        }

      });
    });

    $('#exampleInputColor').on('change', function () {
      // Manually update the AngularJS model
      $scope.$apply(function () {
        $scope.selectedData2 = $('#exampleInputColor').select2('data');
        // Check if any data is selected
        if ($scope.selectedData2 && $scope.selectedData2.length > 0) {
          // Access the first selected data's id
          // Assuming you want to remove the option with value 'first'
          $scope.productColors = $scope.selectedData2;
          console.log($scope.productColors, '111')
        }

      });
    });

    $('#product').on('change', function () {
      // Manually update the AngularJS model
      $scope.$apply(function () {
        $scope.productData = $('#product').select2('data');
        // Check if any data is selected
        if ($scope.productData && $scope.productData.length > 0) {
          // Access the first selected data's id
          // Assuming you want to remove the option with value 'first'
          $scope.selectPr = $scope.productData;
          console.log($scope.selectPr, '111')
        }

      });
    });
  });
  // Initialize the formProductDetail object
  $scope.loadPr();
  $scope.loadSize();
  $scope.loadColor();
  $scope.loadMaterial();
  // import exel
  $scope.importing = false;
  $scope.importInProgress = false;
  $scope.errorShown = false;

  $scope.import = async function (files) {
    $scope.loading=true;

    if ($scope.importInProgress) {
      return;
    }

    $scope.importInProgress = true;
    $scope.importing = true;
    $scope.errorShown = false;

    var reader = new FileReader();
    reader.onloadend = async () => {
      try {
        var workbook = new ExcelJS.Workbook();
        await workbook.xlsx.load(reader.result);
        const worksheet = workbook.getWorksheet("Sheet2");

        for (let index = 2; index <= worksheet.rowCount; index++) {
          let row = worksheet.getRow(index);

          if (index > 1) {
            $scope.checkSl = 0;
            console.log(row.getCell(3).value);

            let productDt = {
              product: {
                id: $scope.products.find(pr => pr.name.toLowerCase().trim() === row.getCell(1).value.toLowerCase().trim())?.id,
              },
              material: {
                id: $scope.materials.find(sz => sz.name.toLowerCase().trim() === row.getCell(2).value.toLowerCase().trim())?.id,
              },
              size: {
                id: $scope.sizes.find(sz => sz.name === String(row.getCell(3).value).trim())?.id,
              },
              color: {
                id: $scope.colors.find(sz => sz.name.toLowerCase().trim() === row.getCell(4).value.toLowerCase().trim())?.id,
              },
              quantity: row.getCell(6).value,
              price: row.getCell(7).value,
              status: {
                id: 1,
              },
            };

            if (!productDt.product || !productDt.material || !productDt.size || !productDt.color) {
              productDt.status.id = 0;
            }

            console.log(productDt, '2');

            try {
              let response = await $http.post(apiProductDetails + "/insert", JSON.stringify(productDt));
              if (response) {
                $scope.checkSl += 1;
                $scope.hienThi($scope.pageCurrent, $scope.sizePage);
              }

              console.log($scope.checkSl);


            } catch (error) {
              handleError(error);
            }

          }
        }
        if (!$scope.errorShown) {
          Swal.fire({
            icon: "success",
            title: "Ok",
            text: "Đã import sản phẩm thành công",
          });
          $scope.loading=false;

        }
      } catch (error) {
        handleError(error);
      } finally {
        $scope.importing = false;
        $scope.importInProgress = false;
        $scope.$apply();
        document.getElementById('input-file').value = '';
      }
    };

    reader.readAsArrayBuffer(files[0]);

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
  // Lấy tên cột từ bảng HTML
  $scope.selectAll = true; // Đặt giá trị mặc định cho checkbox "Chọn Tất Cả"
  $scope.columns = [];

  // Khai báo biến và khởi tạo giá trị mặc định
  $scope.columnFilters = {};

  $scope.selectAllChanged = function () {
    console.log("Trạng thái của selectAllCheckbox:", $scope.selectAllCheckbox);
    angular.forEach($scope.displayedFinalMergedProducts, function (item) {
      item.isSelected = $scope.selectAllCheckbox;
    });
  };

  $scope.exportTo = function (checkSelect) {
    var selectedItems = $scope.displayedFinalMergedProducts.filter(function (item) {
      return item.isSelected;
    });

    function reloadAndExport(element) {
      return new Promise((resolve, reject) => {
        $scope.Reload(element.name).then(() => {
          // Reload succeeded, resolve the promise
          resolve();
        }).catch((error) => {
          // Reload failed, reject the promise
          reject(error);
        });
      });
    }

    // ...

    selectedItems.reduce((previousPromise, element) => {
      return previousPromise.then(() => {
        // Chain the promise for each item
        return reloadAndExport(element).then(() => {
          // After reload and export, open modal, hide modal, etc.
          if (checkSelect == "pdf") {
            dataExport();
          } else if (checkSelect == "excel") {
            $scope.exportToExcel();
          } else if (checkSelect == "svg") {
            $scope.exportToSVG();
          }
          console.log('a');
        });
      });
    }, Promise.resolve());

  };

  function dataExport() {
    const tableId = 'DTProductTable2';
    const fileName = 'exported_data(' + $scope.modalContent + ')';

    const data = [];
    const table = document.getElementById(tableId);

    for (let i = 0; i < table.rows.length; i++) {
      const rowData = [];
      for (let j = 0; j < table.rows[i].cells.length - 2; j++) {
        rowData.push(table.rows[i].cells[j].innerText);
      }
      data.push(rowData);
    }

    const docDefinition = {
      content: [
        {
          table: {
            body: data,
            rowHeight: 15,
            styles: {
              cellPadding: 5,
              fontSize: 10,
              fontStyle: 'normal',
              fillColor: '#f3f3f3',
            },
          },
        },
      ],
    };

    pdfMake.createPdf(docDefinition).download(`${fileName}.pdf`);
  }

  $scope.exportToExcel = function () {
    // Lấy bảng theo ID
    var table = document.getElementById('DTProductTable2'); // Thay id table bảng của bạn vào đây

    // Hàm chuyển đổi giá trị từ class sang boolean
    function convertStatusClassToBoolean(statusClass) {
      return statusClass === 'fa-2xl fa fa-toggle-on ng-scope';
    }

    // Lấy dữ liệu từ bảng và loại bỏ 2 cột cuối cùng
    var data = [];
    for (var i = 0; i < table.rows.length; i++) {
      var rowData = [];
      for (var j = 0; j < table.rows[i].cells.length; j++) {
        // Kiểm tra nếu là cột "Trạng Thái" và không phải là hàng cuối cùng
        if (j === table.rows[i].cells.length - 2 && i !== 0) {
          var statusCell = table.rows[i].cells[j].querySelector('i');
          var statusValue = statusCell ? convertStatusClassToBoolean(statusCell.getAttribute('class')) : false;
          rowData.push(statusValue);
        } else {
          // Bỏ 2 cột cuối cùng (j >= table.rows[i].cells.length - 2)
          if (j < table.rows[i].cells.length - 1) {
            rowData.push(table.rows[i].cells[j].innerText);
          }
        }
      }
      data.push(rowData);
    }

    // Tạo một workbook và một worksheet
    var ws = XLSX.utils.aoa_to_sheet(data);
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Xuất file Excel
    XLSX.writeFile(wb, 'exported_data(' + table.rows[table.rows.length - 2].cells[1].innerText + ').xlsx');
  };


  $scope.exportToSVG = function () {
    // Lấy bảng theo ID
    var table = document.getElementById('DTProductTable2'); // Thay id table bảng của bạn vào đây

    // Tạo một đối tượng SVG
    var svg = SVG().size(2000, 1500); // Kích thước SVG

    // Lấy số cột của bảng
    var numColumns = table.rows.length > 0 ? table.rows[0].cells.length : 0;

    // Xác định chiều rộng của cột thứ hai và chiều rộng của cột cuối cùng
    var secondColumnWidth = table.rows.length > 0 ? table.rows[0].cells[1].offsetWidth : 0;
    var lastColumnWidth = table.rows.length > 0 ? table.rows[0].cells[numColumns - 1].offsetWidth : 0;

    // Xác định chiều rộng của cột rộng nhất (loại bỏ cột cuối cùng)
    var maxWidth = 0;
    for (var i = 0; i < table.rows.length; i++) {
      var cellWidth = i !== numColumns - 1 ? table.rows[i].cells[0].offsetWidth : 0;
      maxWidth = Math.max(maxWidth, cellWidth);
    }

    // Thêm các đối tượng SVG từ các cột của bảng (loại bỏ cột cuối cùng)
    for (var i = 0; i < table.rows.length; i++) {
      for (var j = 0; j < numColumns - 2; j++) {
        // Tính toán vị trí dựa trên chỉ số của cột
        var xPosition = 10 + j * (maxWidth + 180); // 10 là khoảng cách giữa các cột
        var yPosition = 30 * i + 40;

        // Chỉnh độ rộng của cột thứ hai
        if (j > 1) {
          xPosition = 100 + j * (secondColumnWidth + 280);
        }

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
    a.download = 'exported_svg(' + table.rows[1].cells[1].innerText + ').svg';
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

    $scope.modalContent = itemName;
    let api = "http://localhost:8080/CodeWalkers/admin/ProductDetails/details?productName=" + itemName.trim();
    console.log(api)
    return $http.get(api).then(function (res) {
      console.log(res.data)
      $scope.data = res.data;
      return $scope.data;
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