app.directive("orderDirective", function () {
  return {
    restrict: "E", // E là cho Element
    templateUrl: "page/order_waitPay.html",
    controller: "OrderController",
  };
});
app.controller(
  "OrderController",
  function ($scope, $cookies, $http, $anchorScroll) {
    // Scroll đến phần tử có id "pageContent"
    $anchorScroll("pageContent");
    $scope.selectedTab = 0; // Đặt tab mặc định
    $scope.tabStyles = {};

    $scope.selectedTab = null; // Khởi tạo tab được chọn là null
    $scope.totalAmount = 0;

    $scope.calculateTotalAmount = function (order) {
      var orderTotal = 0;

      // Lặp qua danh sách sản phẩm của mỗi đơn hàng và tính tổng tiền
      angular.forEach(order.listBillDetail, function (pr) {
        orderTotal += pr.productDetail.price * pr.quantity;
      });

      return orderTotal;
    };



    $scope.changeTab = function (tab) {
      $scope.loadBillByUs();
      if (tab === 0) {
        $scope.allTabSelected = true;
      } else {
        $scope.allTabSelected = false;
      }
      // Xóa CSS style của tab được chọn trước đó
      if ($scope.selectedTab !== null) {
        $scope.tabStyles[$scope.selectedTab] = {};
      }
      // Đặt tab mới là tab được chọn và cập nhật CSS style
      $scope.selectedTab = tab;
      $scope.tabStyles[tab] = { "border-color": "#402dee", color: "#402dee" };
    };
    $scope.check = {};
    var dataUserCart = localStorage.getItem("userCartData");
    $scope.loadBillByUs = function () {
      var url = `${host}/api/getBill`;
      if (!dataUserCart) {
        var cartId = $cookies.get("cartId");
      } else {
        var cartId = dataUserCart;
      }
      var config = {
        params: { idCart: cartId },
      };
      $http
        .get(url, config)
        .then(function (res) {
          $scope.itemsOrder = res.data;
          $scope.filteredOrders = res.data;
          $scope.totalPrice = 0;
          // Kiểm tra xem có od nào có status bằng selectedTab hay không
          var hasOrderWithSelectedTab = $scope.filteredOrders.some(
            (od) => od.status == $scope.selectedTab
          );
          // Gán giá trị cho check[selectedTab] tương ứng
          $scope.check[$scope.selectedTab] = hasOrderWithSelectedTab;
          console.log("Danh sách đơn hàng", res.data);
        })
        .catch(function (error) {
          console.log("Lỗi khi tải danh sách", error);
        });
    };
    $scope.loadBillByUs();

    $scope.searchOrdersByProduct = function () {
      $scope.filteredOrders = $scope.itemsOrder.filter(function (order) {
        return order.listBillDetail.some(function (product) {
          // Thay 'product.name' bằng trường dữ liệu cần so sánh
          return product.productDetail.product.name
            .toLowerCase()
            .includes($scope.productSearch.toLowerCase());
        });
      });
    };
    $scope.calculateTotalPrice = function (item) {
      // Tính tổng giá trị của sản phẩm (price * quantity)
      return item.price * item.quantity;
    };


    $scope.getAddress = function (id) {
      $scope.address = {};
      var url = `${host}/get-address-by-id/`;
      $http.get(url + id).then(function (res) {
        $scope.address = res.data;
      }).catch(function (error) {
        console.log("Lỗi khi tải dia chi", error);
      });
    };
    $scope.openModal = function (order) {
      $scope.selectedOrder = order;
      // Gọi hàm tính tổng khi danh sách đơn hàng thay đổi
      $scope.$watch('selectedOrder', function () {
        $scope.totalAmount = 0;
        // Lặp qua danh sách đơn hàng và tính tổng tiền
        $scope.totalAmount += $scope.calculateTotalAmount(order);
        $scope.loadDistrictUser(order.province);
        $scope.loadWardUser(order.district);
      }, true);
    };

    $scope.loadProvince = function () {
      var url = `${host}/get-province`;
      $http.get(url).then(function (res) {
        $scope.provinces = res.data;
        console.log("Danh sách Thành phố", res.data);
      }).catch(function (error) {
        console.log("Lỗi khi tải danh sách thanh pho", error);
      });
    };
    $scope.loadProvince();

    $scope.districtsByProvince = {};
    $scope.loadDistrictUser = function (id) {
      var url = `${host}/get-district/`;
      $http.get(url + id).then(function (res) {
        $scope.districtsByProvince[id] = res.data;
        return res.data;
      }).catch(function (error) {
        console.log("Lỗi khi tải danh sách quan huyen", error);
      });
    };

    $scope.wardsByProvince = {};
    $scope.loadWardUser = function (id) {
      var url = `${host}/get-Ward/`;
      $http.get(url + id).then(function (res) {
        $scope.wardsByProvince[id] = res.data;
      }).catch(function (error) {
        console.log("Lỗi khi tải danh sách phuong xa", error);
      });
    };

    $scope.cancelBill = function (billId) {
      let api = `${host}/admin/Bill/updateStatus/`+ billId + "?status= 5" ;
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
          $http.put(api).then(function(response) {
            Swal.fire('Hủy thành công!', '', 'success');
            $scope.loadBillByUs();
            console.log("cancel bill success");
          })
            .catch(function (error) {
              console.log(error);
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Hành động khi người dùng ấn "Không"
          Swal.fire('Hủy bỏ', '', 'error');
        }} )
    };


  }
);
