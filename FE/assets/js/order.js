app.directive("orderDirective", function () {
  return {
    restrict: "E", // E là cho Element
    templateUrl: "page/order_waitPay.html",
    controller: "OrderController",
  };
});
app.controller(
  "OrderController",
  function ($scope, $cookies, $http, $anchorScroll,CookieService) {
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
        orderTotal += pr.price * pr.quantity;
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
    var dataUserJson = localStorage.getItem('userIdData');

    $scope.loadBillByUs = function () {
      var url = `${host}/api/getBill`;
      var idUser;
      if (!dataUserJson) {
        idUser = $cookies.get('idUser');
      } else {
         idUser = dataUserJson;
      }
      var config = {
        params: { idUser: idUser },
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

    function processActions(billId) {
          let api = `${host}/admin/Bill/updateStatus/${billId}?status=0` ;
          $http.put(api).then(function (response) {
              // ... (xử lý thành công)
              CookieService.set('billId', billId, 1);
              console.log(billId);
          }
          
          )
              .catch(function (error) {
                  console.log(error);
              });
      // $scope.hienThi($scope.pageCurrent, $scope.sizePage);
  }



    $scope.loadAllPrCart = function (id) {
      var url = `${host}/api/detail`;
      var config = { params: { idCart: id } };
      $scope.itemSelected = [];
      $http.get(url, config)
        .then(function (res) {
          $scope.itemsCart = res.data;
          var badge = document.querySelector(".badge");
          badge.textContent = $scope.itemsCart.length;
        })
        .catch(function (error) {
          console.log("Error loading the list of products in the cart", error);
        });
    };
  
    var dataUserCart = localStorage.getItem('userCartData');
    $scope.addCart = function (od) {
      var cartId = $cookies.get('cartId');
      if (!cartId || cartId == 95) {
        $scope.createCart().then(function (cartIdResponse) {
          $scope.loadAllPrCart(cartIdResponse);
          $scope.cartIdFinal = cartIdResponse;
          console.log("Cart ID created:", $scope.cartIdFinal);
          $scope.sendDetailAddRequest(sl, $scope.cartIdFinal);
        });
      } else {
        $scope.cartIdFinal = dataUserCart || cartId;
        console.log("Using existing Cart ID:", $scope.cartIdFinal);
        od.listBillDetail.forEach(billDt => {
          $scope.productId = billDt.productDetail.product.id;
          $scope.selectedValue = billDt.productDetail.size.id;
          $scope.selectedColor = billDt.productDetail.color.id;
          $scope.sendDetailAddRequest(od.listBillDetail[0].quantity, $scope.cartIdFinal);
        })
      }
      processActions(od.id);
    };
    $scope.sendDetailAddRequest = function (sl, idCart) {

      var url = `${host}/api/detailAdd/${idCart}/${$scope.productId}/${$scope.selectedValue}/${$scope.selectedColor || ''}`;
      var data = { quantity: sl };
  
      console.log("Sending request to:", url);
  
      $http.post(url, data)
        .then(function (response) {
          $scope.idCartDt = response.data.id;
          console.log('Successfully updated');
          $scope.loadAllPrCart(idCart);
          })
        .catch(function (error) {
          console.error('Update failed:', error);
          toastr.error('Có lỗi xảy ra trong quá trình thêm sản phẩm', 'Error');
        });
    };
  
  
    // $scope.addBill = function () {
    //   $scope.idUserFinal = idUserCook || dataUserJson || 0;
  
    //   var url = `${host}/api/addBill/${$scope.idUserFinal}`;
    //   console.log(url, "url");
  
    //   var idBill = $cookies.get('billId');
  
    //   if (!idBill) {
    //     return $http.post(url)
    //       .then(function (res) {
    //         $scope.bill = res.data;
    //         $scope.billJson = JSON.stringify($scope.bill);
    //         console.log("ID: " + $scope.billJson);
  
    //         if ($scope.billJson) {
    //           const billData = JSON.parse($scope.billJson);
    //           console.log("here", billData);
    //           CookieService.set('billId', billData.id, 1);
    //           CookieService.set('idUser', billData.users.id, 1);
    //           $scope.pay();
    //         }
  
    //         return true;
    //       })
    //       .catch(function (error) {
    //         console.error('Failed to add bill', error);
    //         return false;
    //       });
    //   }
  
    //   $scope.pay();
    // };
  
    // $scope.pay = function () {
    //   var idBill = $cookies.get('billId');
    //   var url = `${host}/api/addBillDtSl/`;
  
    //   console.log($scope.itemSelected, "bill");
  
    //   $http.post(url + idBill, $scope.itemSelected)
    //     .then(function (res) {
    //       console.log('Successfully added', res.data);
    //     })
    //     .catch(function (error) {
    //       console.error('Failed to add', error);
    //     });
    // };
  
    // $scope.payNow = function (quantity) {
    //   $scope.addCart(quantity);
    //   setTimeout(function(){
    //     $scope.addBill();
    //   },200)
    // };
  }
);
