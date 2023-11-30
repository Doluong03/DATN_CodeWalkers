window.SellAdminController = function ($scope, $http, $document, $window) {
  var headers = {
    headers: {
      'Authorization': 'Bearer ' + tokenAuthen(),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      // Các header khác nếu cần
    }
  };
  // Load tabs from local storage
  $scope.tabs = JSON.parse(localStorage.getItem('tabs')) || [
    // { title: 'Tab 1', formData: {}, active: true,id: generateUniqueId() },
  ];
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
  $scope.listRes = [];


  $scope.increaseQuantity = function (tab, pr) {
    pr.quantity++; // Tăng số lượng cho sản phẩm cụ thể
    pr.total += pr.price;
    $scope.updateTotalPay(tab, pr);
  };

  $scope.decreaseQuantity = function (tab, pr) {
    if (pr.quantity > 0) {
      pr.quantity--; // Giảm số lượng cho sản phẩm cụ thể nếu lớn hơn 1
      pr.total -= pr.price;
    }
    if (pr.quantity <= 0) {
      $scope.removeProduct(tab, pr);
    } else {
      $scope.updateTotalPay(tab, pr);
    }
  };

  $scope.onInputKeyPress = function (event, tab, pr) {
    if (event.keyCode === 13) { // Kiểm tra nếu phím Enter (keyCode=13)
      if (pr.quantity <= 0) {
        $scope.removeProduct(tab, pr);
      }
      pr.total = pr.price * pr.quantity;
      $scope.updateTotalPay(tab, pr);
    }
  };

  $scope.onInputBlur = function (tab, pr) {
    if (pr.quantity <= 0) {
      $scope.removeProduct(tab, pr);
    } else {
      pr.total = pr.price * pr.quantity;
      $scope.updateTotalPay(tab, pr);
    }
  };


  $scope.removeProduct = function (tab, pr) {
    $scope.confirmDelete(pr.productDetail.id, pr.cart.id, tab);
  };
  $scope.confirmDelete = function (productDtId, cartId, tab) {
    console.log(productDtId, 'praaaa')
    var url = `${host}/api/cart/delete/`;
    return swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc muốn xóa sản phẩm khỏi giỏ hàng?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3f51b5",
      cancelButtonColor: "#ff4081",
      confirmButtonText: "Có",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.value) {
        // Xử lý khi người dùng xác nhận xóa ở đây
        $http.delete(url + productDtId + "/" + cartId)
          .then(function () {
            toastr.success('Xóa sản phẩm thành công!', 'Thông báo')
            $scope.getFee(tab);
            return $scope.getCart(tab);
          })
          .catch(function (error) {
            // Xử lý khi Delete thất bại
            console.error('Delete thất bại', error);
            toastr.error('Xóa sản phẩm thất bại!', 'Thông báo');
          });

      } else {
        // Xử lý khi người dùng không xác nhận xóa ở đây
        console.log("Xóa bị hủy bỏ.");
        return $scope.getCart(tab);
      }
    });
  };

  $scope.updateProductQuantity = function (idCartdt, quantity, tab) {
    var url = `${host}/api/updateQuantity/`;
    var updateData = { quantity: quantity };

    // Sử dụng $http.put để gửi yêu cầu cập nhật đến API
    $http.put(url + idCartdt, updateData, headers)
      .then(function (response) {
        console.log('Cập nhật số lượng thành công');
        $scope.getFee(tab);
        $scope.activateTab(tab);
        $scope.activateTab(tab);
      })
      .catch(function (error) {
        // Xử lý khi cập nhật thất bại
        console.error('Cập nhật số lượng thất bại', error);
      });
    console.log('Giá trị đã thay đổi:', quantity);
  }
  $scope.updateTotalPay = function (tab, pr) {
    if (pr.quantity !== 0) {
      $scope.updateProductQuantity(pr.id, pr.quantity, tab);
    }
    tab.formData.totalPay = 0;
    for (var i = 0; i < tab.formData.listPrByCart.length; i++) {
      tab.formData.totalPay += $scope.calculateTotalPrice(tab.formData.listPrByCart[i]);
      $scope.saveTabsToLocalStorage();
    }
  }
  $scope.getFee = function (tab) {
    $scope.totalQuantity = 0;
    for (var i = 0; i < tab.formData.listPrByCart.length; i++) {
      $scope.totalQuantity += tab.formData.listPrByCart[i].quantity;
    }
    $scope.fee = {
      quantity: $scope.totalQuantity,
      wardId: tab.formData.wardId,
      districtId: tab.formData.districtId
    };
    console.log($scope.fee, "hereeee")
    var url = `${host}/calculateFee`;
    $http.post(url, JSON.stringify($scope.fee)).then(function (res) {
      console.log("Phi ", res.data);
      tab.formData.fee = res.data;
      tab.formData.totalPay = Number(tab.formData.totalPay) + Number(tab.formData.fee);
      $scope.saveTabsToLocalStorage();
    }).catch(function (error) {
      console.log("Lỗi khi tải ", error);
    });

  }

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

  $scope.loadAllPrBs = function () {
    var url = `${host}/api/get-all-pr`;
    $http.get(url).then(res => {
      $scope.itemsBs = res.data;
      $scope.filteredItems = $scope.itemsBs;
    }).catch(error => {
      console.log("Error", error);
    });
  }
  $scope.loadAllPrBs();
  $scope.filteredItems = $scope.itemsBs;


  $scope.filterProducts = function (tab) {
    var searchText = tab.formData.search.toLowerCase();
    var searchTerms = searchText.split(' ');

    $scope.filteredItems = $scope.itemsBs.filter(function (item) {
      var nameMatch = item.product.name.toLowerCase().includes(searchText);
      var sizeMatch = item.size.name.toLowerCase().includes(searchText);
      var colorMatch = item.color.name.toLowerCase().includes(searchText);

      // Lọc theo mỗi từ khóa trong searchTerms
      var searchTermMatch = searchTerms.every(function (term) {
        return (
          item.product.name.toLowerCase().includes(term) ||
          item.size.name.toLowerCase().includes(term) ||
          item.color.name.toLowerCase().includes(term)
        );
      });

      return nameMatch || sizeMatch || colorMatch || searchTermMatch;
    });
  };

  $scope.selectProduct = function (tab, pr) {
    $scope.sendDetailAddRequest(tab, pr);
    $scope.saveTabsToLocalStorage();
    tab.formData.totalPay = 0;
    for (var i = 0; i < tab.formData.listPrByCart.length; i++) {
      tab.formData.totalPay += $scope.calculateTotalPrice(tab.formData.listPrByCart[i]);
    }
  }
  // sell tai quay 
  var data = localStorage.getItem('userData');
  var dataStaff = JSON.parse(data);
  $scope.listUser = [];
  $scope.userName = '';
  $scope.getDataStaff = function () {
    var url = 'http://localhost:8080/CodeWalkers/admin/profile/' + dataStaff.username;
    $http.get(url).then(res => {
      $scope.formNotEditAdmin = {
        staffId: res.data.id,
        staffName: res.data.name,
        staffPhone: res.data.phoneNumber
      }
    }).catch(error => {
      console.log("Error", error);
    });
  }
  $scope.getDataStaff();
  $scope.addBill = function (tab) {
    var url = `${host}/api/addBill/0`;
    console.log(url, "url");
    return $http.post(url).then(function (res) {
      $scope.bill = res.data; // Gán dữ liệu từ API vào $scope.bill
      tab.formData.code = $scope.bill.code;
      tab.formData.id = $scope.bill.id;
      tab.formData.userIDNew = $scope.bill.users.id;
      // Cập nhật title của tab thành mã hóa đơn vừa tạo
      tab.title = 'Hóa đơn ' + $scope.bill.code.slice(5);
      $scope.saveTabsToLocalStorage();
      console.log($scope.bill, 'bill')
    }).catch(function (error) {
      console.error('ADD thất bại', error);
    });
  }
  $scope.createCart = function (tab) {
    var url = `${host}/api/CreateCart`;
    return $http.post(url).then(function (response) {
      tab.formData.cart = response.data.id;
      $scope.getCart(tab);
      $scope.saveTabsToLocalStorage();
      return response.data; // Trả về dữ liệu cho promise
    }).catch(function (error) {
      console.error('Lỗi: ', error);
      return $q.reject(error); // Trả về lỗi cho promise
    });
  };
  $scope.getCart = function (tab) {
    var url = `${host}/api/cart`;
    $scope.totalPrice = 0;
    var config = {
      params: { idCart: tab.formData.cart }
    };
    return $http.get(url, config)
      .then(function (res) {
        console.log(res.data, "here");
        tab.formData.listPrByCart = res.data;
        tab.formData.totalPay = 0;
        for (var i = 0; i < tab.formData.listPrByCart.length; i++) {
          tab.formData.totalPrice += $scope.calculateTotalPrice(tab.formData.listPrByCart[i]);

          tab.formData.totalPay += $scope.calculateTotalPrice(tab.formData.listPrByCart[i]);
          $scope.saveTabsToLocalStorage();
        }
        $scope.saveTabsToLocalStorage();
      })
      .catch(function (error) {
        console.error('get cart thất bại', error);
      });
  };
  $scope.calculateTotalPrice = function (item) {
    // Tính tổng giá trị của sản phẩm (price * quantity)
    return item.productDetail.price * item.quantity;
  };


  $scope.sendDetailAddRequest = function (tab, pr) {
    $scope.productId = pr.product.id;
    $scope.selectedValue = pr.size.id;
    $scope.selectedColor = pr.color.id;
    var url = `${host}/api/detailAdd/${tab.formData.cart}/${$scope.productId}/${$scope.selectedValue}/${$scope.selectedColor || ''}`;
    var data = { quantity: 1 };
    console.log("Sending request to:", url);
    $http.post(url, data)
      .then(function (response) {
        $scope.getCart(tab);
        toastr.success('Thêm sản phẩm thành công!', 'Thông báo');
      })
      .catch(function (error) {
        console.error('Cập nhật thất bại:', error);
        toastr.error('Có lỗi xảy ra khi thêm sản phẩm', 'Lỗi');
      });
  };


  // Function to save tabs to local storage
  $scope.saveTabsToLocalStorage = function () {
    localStorage.setItem('tabs', JSON.stringify($scope.tabs));
  }

  $scope.activateTab = function (selectedTab) {
    if (!selectedTab.disabled) {
      $scope.tabs.forEach(function (tab) {
        tab.active = (tab === selectedTab);
      });
      $scope.saveTabsToLocalStorage();
    }
    $scope.getCart(selectedTab);

  }
  function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
  }

  $scope.addNewTab = function (currentTab) {
    if ($scope.tabs.length >= 5) {
      return;
    }

    $scope.newTabIndex = $scope.newTabIndex || $scope.tabs.length + 1;

    var newTab = {
      title: generateUniqueId(),
      formData: {},
      active: true,
      isLast: false,
      id: generateUniqueId() // Hàm này tự viết để tạo id duy nhất
    };

    $scope.tabs.push(newTab);
    $scope.newTabIndex++;

    for (var i = 0; i < $scope.tabs.length - 1; i++) {
      $scope.tabs[i].active = false;
    }
    $scope.addBill(newTab);
    $scope.createCart(newTab);
    updateTabStatus();
    $scope.saveTabsToLocalStorage();
  };

  // Clear tabs from local storage on logout or when needed
  $scope.clear = function clearTabsFromLocalStorage() {
    localStorage.removeItem('tabs');
    // toastr.success("ok", "ok")
  }

  function loadTabsFromLocalStorage() {
    var tabsData = localStorage.getItem('tabs');
    if (tabsData) {
      $scope.tabs = JSON.parse(tabsData);
    }
  }
  // Call this function when your controller is initialized
  loadTabsFromLocalStorage();

  // Call clearTabsFromLocalStorage when needed

  $scope.removeTab = function (tabToRemove) {
    if (!$scope.checkDone) {
      $scope.removeBill(tabToRemove);
    }
    var tabIndex = $scope.tabs.indexOf(tabToRemove);
    var previousTabIndex = (tabIndex === $scope.tabs.length - 1) ? tabIndex - 1 : tabIndex;
    // Kích hoạt tab trước đó
    if (previousTabIndex < 0) {
      $scope.clear();
    } else {
      $scope.activateTab($scope.tabs[previousTabIndex]);
    }
    // Xóa tab hiện tại
    $scope.tabs.splice(tabIndex, 1);
    // Cập nhật trạng thái tab
    updateTabStatus();
    // Lưu trạng thái mới vào local storage
    $scope.saveTabsToLocalStorage();
  };

  function updateTabStatus() {
    // Cập nhật trạng thái "isLast" cho từng tab
    $scope.tabs.forEach(function (tab, index) {
      tab.isLast = (index === $scope.tabs.length - 1);
    });
  }
  $scope.dropdownOpen = false;

  $scope.toggleDropdown = function () {
    $scope.dropdownOpen = !$scope.dropdownOpen;
  };

  $scope.listUser = []; // Tạo danh sách người dùng
  $scope.filteredUsers = []; // Tạo danh sách người dùng lọc

  $scope.loadUser = function () {
    var url = `${host}/user/getAll`;
    $http.get(url).then(function (res) {
      res.data.forEach(element => {
        if (element.status == true) {
          $scope.listUser.push(element);
        }
      });
      $scope.filteredUsers = $scope.listUser;
    }).catch(error => {
      console.log("Error", error);
    });
  };
  $scope.loadUser();

  $scope.filterUsers = function () {
    var searchText = $scope.userInput.toLowerCase();
    $scope.filteredUsers = $scope.listUser.filter(function (user) {
      return user.name.toLowerCase().includes(searchText);
    });
  };


  $scope.searchCustomers = function (tab) {
    var searchText = tab.formData.userName.toLowerCase();
    $scope.filteredUsers = $scope.listUser.filter(function (user) {
      var lowerSearchText = searchText.toLowerCase();
      return user.name.toLowerCase().includes(lowerSearchText) || (user.phoneNumber && user.phoneNumber.includes(searchText));
    });
  };

  $scope.selectCustomer = function (user, tab) {
    tab.formData.userName = user.name;
    tab.formData.userPhone = user.phoneNumber; // Replace 'phoneNumber' with the actual property name in your user object
    tab.formData.userID = user.id;
    console.log(tab.formData.userID, 'iddddd select');

    $scope.saveTabsToLocalStorage();
  };

  $scope.searchPhone = function (tab) {
    var checkPhone = false;
    if ($scope.listUser.includes(tab.formData.userPhone)) {
    }
    $scope.listUser.forEach(x => {
      // Kiểm tra điều kiện để đảm bảo chỉ cập nhật khi số điện thoại khác nhau
      if (tab.formData.userPhone == x.phoneNumber) {
        checkPhone = true;
        return;
      }
    });
    if (!checkPhone) {
      tab.formData.userID = tab.formData.userIDNew;
      let api = apiAdmin + "Bill/updateUser/" + tab.formData.userIDNew + "?name=" + tab.formData.userName + "&phone=" + tab.formData.userPhone;
      $http.put(api, headers).then(function (response) {
        console.log("update User success");
      });
    }
    console.log(checkPhone, 'check')

  };
  $scope.deleteUser = function (id) {
    let api = apiAdmin + "Bill/deleteUser/" + id;
    $http.delete(api, headers).then(function (response) {
      console.log("delete User success");
    });

  }

  $scope.removeBill = function (tab) {
    let billId = tab.formData.id;
    let api = `${host}/Bill/delete/` + billId;

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
  $scope.pay = function (idBill, idCart) {
    var url = `${host}/api/addBillDt/`;
    $http.post(url + idBill + "/" + idCart).then(function () {
      console.log('ADD thành công');
    }).catch(function (error) {
      console.error('ADD thất bại', error);
    });
  }
  $scope.deleteCartDt = function (cart) {
    var url = `${host}/api/cart/deleteCart/` + cart;
    // Gửi yêu cầu xóa đến server hoặc thực hiện xóa trên giao diện
    $http.delete(url, headers)
      .then(function () {
        let api = apiAdmin + "Bill/deleteCart/" + cart;
        $http.delete(api, headers).then(function (response) {
          console.log("delete cart success");
        });
        // Xử lý khi Delete thành công
        console.log('Delete cart dt thành công');
      })
      .catch(function (error) {
        // Xử lý khi Delete thất bại
        console.error('Delete thất bại', error);
      });
  }
  $scope.resetDH = function (tab) {
    tab.formData.provinceId = '',
      tab.formData.districtId = ''
    tab.formData.wardId = '',
      tab.formData.address = '',
      tab.formData.fee = 0;
    tab.formData.totalPay = 0;
    for (var i = 0; i < tab.formData.listPrByCart.length; i++) {
      tab.formData.totalPay += $scope.calculateTotalPrice(tab.formData.listPrByCart[i]);
      $scope.saveTabsToLocalStorage();
    }
  }
  $scope.submitForm = function (event, tab) {
    event.preventDefault();
    $scope.checkDone = false;
    if (!tab.formData.listPrByCart) {
      toastr.error("Chưa có sản phẩm trong giỏ hàng", "Lỗi");
      return;
    }
    var dataToSend = {
      userId: tab.formData.userID,
      idBill: tab.formData.id,
      provinceId: tab.formData.provinceId || 0,
      districtId: tab.formData.districtId || 0,
      wardId: tab.formData.wardId || 0,
      address: tab.formData.address || '',
      note: "Mua hàng tại quầy",
      fee: tab.formData.fee,
      optionPay: tab.formData.optionPay,
      totalPay: tab.formData.totalPay,
      shipDate: new Date,
      status: 6,
      userName: tab.formData.userName || "Khách lẻ",
      userPhone: tab.formData.userPhone || "None",
      idStaff: $scope.formNotEditAdmin.staffId,
    }
    if (tab.formData.checkAct) {
      dataToSend.note = "Đặt hàng";
      dataToSend.status = 1;
      dataToSend.shipDate = "";
      if (
        !tab.formData.provinceId ||
        !tab.formData.districtId ||
        !tab.formData.wardId ||
        !tab.formData.address ||
        !tab.formData.fee
      ) {
        // Hiển thị thông báo lỗi
        $scope.checkAddress = true;
        return; // Dừng việc thực hiện lưu nếu thông tin không hợp lệ
      }
    }
    if (
      !tab.formData.totalPay) {
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
        $scope.searchPhone(tab);
        dataToSend.userId = tab.formData.userID;
        console.log(dataToSend, 'data')
        $http.put(
          `${host}/bill/updateBill`, dataToSend,
          headers
        ).then(function (response) {
          if (response) {
            Swal.fire({
              icon: "success",
              title: "Cập nhật thành công!",
              text: "Thông tin đơn hàng đã được cập nhật.",
            });
            if (dataToSend.userId !== tab.formData.userIDNew) {
              $scope.deleteUser(tab.formData.userIDNew);
            }
            $scope.generatePDF(tab);
            $scope.deleteCartDt(tab.formData.cart);
            $scope.pay(tab.formData.id, tab.formData.cart);
            $scope.checkDone = true;
            $scope.removeTab(tab);
          }
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

  $scope.changCurrency = function (tab) {
    tab.formData.userPay = tab.formData.userPay.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    tab.formData.moneyBack = (tab.formData.userPay - tab.formData.totalPay).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  $scope.changeSelect = function (tab) {
    if( tab.formData.optionPay === "1"){
      tab.formData.userPay = (tab.formData.totalPay).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    }else{
      tab.formData.userPay = 0;
    }
    $scope.saveTabsToLocalStorage();
  }

  $scope.getSelectedProvinceName = function (id) {
    if (id && $scope.provinces) {
      const selectedProvince = $scope.provinces.find(province => province.ProvinceID === id);
      return selectedProvince ? selectedProvince.ProvinceName : '';
    } else {
      return '';
    }
  };

  $scope.getSelectedDistrictName = function (id) {
    if (id && $scope.districts) {
      const selectedDistrict = $scope.districts.find(district => district.DistrictID === id);
      return selectedDistrict ? selectedDistrict.DistrictName : '';
    } else {
      return '';
    }
  };

  $scope.getSelectedWardName = function (id) {
    if (id && $scope.wards) {
      const selectedWard = $scope.wards.find(ward => ward.WardCode === id);
      return selectedWard ? selectedWard.WardName : '';
    } else {
      return '';
    }
  };

  $scope.generatePDF = function (tab) {
    // Tạo nội dung PDF
    // Khai báo biến totalAmount để lưu tổng tiền sản phẩm
    var totalAmount = 0;

    // Thêm dòng cho mỗi sản phẩm
    var tableBody = tab.formData.listPrByCart.map((product, index) => {
      // Tính giá trị cho cột "Thành tiền" của sản phẩm
      var productTotal = product.quantity * product.productDetail.price;

      // Thêm vào tổng tiền sản phẩm
      totalAmount += productTotal;

      // Trả về mảng mô tả hàng của bảng
      return [
        index + 1,
        product.productDetail.product.name + ' [' + product.productDetail.size.name + ' - ' + product.productDetail.color.name + ']',
        product.quantity,
        product.productDetail.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        productTotal.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
      ];
    });
    // Thêm dòng tổng tiền sản phẩm vào cuối mảng
    tableBody.push([
      '', '', '', 'Tổng tiền:',
      totalAmount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    ]);

    var documentDefinition = {
      content: [
        { text: 'CodeWalkers', style: 'header' },
        { text: 'Số điện thoại: 0865683753', style: 'subheader' },
        { text: 'Email: CodeWalkers2003@gmail.com', style: 'subheader' },
        { text: 'Địa chỉ: Phú Đô, Nam Từ Liêm, Hà Nội', style: 'subheader' },
        { text: 'HÓA ĐƠN BÁN HÀNG', style: 'title' },
        { text: tab.formData.code, style: 'subtitle' },
        { text: 'Ngày mua: ' + (tab.formData.purchaseDate || moment(new Date()).format('DD/MM/yyyy   hh:mm')), style: 'subtext' },
        { text: 'Khách hàng: ' + (tab.formData.userName || 'Khách lẻ'), style: 'subtext' },
        getAddressString(tab.formData),
        { text: 'Số điện thoại: ' + (tab.formData.userPhone || 'None'), style: 'subtext' },
        { text: 'Nhân viên bán hàng: ' + ($scope.formNotEditAdmin.staffName || 'None'), style: 'subtext' },
        { text: 'Danh sách sản phẩm', style: 'tableHeader', },
        {
          table: {
            headerRows: 1,
            widths: [30, '*', 65, 65, 80],
            body: [
              ['STT', 'Sản Phẩm', 'Số Lượng', 'Đơn giá', 'Thành tiền'],
              // Thêm dòng cho mỗi sản phẩm
              ...tableBody
            ]
          },
          layout: 'lightHorizontalLines'
        },
        {
          table: {
            headerRows: 1,
            widths: [220, 280], // Có thể điều chỉnh chiều rộng cột theo nhu cầu
            body: [
              tab.formData.fee !== undefined && tab.formData.fee !== 0
                ? ['Phí vận chuyển:', { text: tab.formData.fee.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), alignment: 'right', margin: [0, 0, 10, 0], bold: true }]
                : ['', { text: '' }],
              ['Tổng tiền phải thanh toán:', { text: (parseFloat(tab.formData.totalPay) || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), alignment: 'right', margin: [0, 0, 10, 0], bold: true }],
              tab.formData.optionPay == 0 && !tab.formData.checkAct
                ? ['Tiền khách trả:', { text: (parseFloat(tab.formData.userPay) || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), alignment: 'right', margin: [0, 0, 10, 0], bold: true }]
                : ['', { text: '' }],
              tab.formData.optionPay == 0 && !tab.formData.checkAct
                ? ['Tiền trả lại:', { text: ((tab.formData.moneyBack) || 0).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }), alignment: 'right', margin: [0, 0, 10, 0], bold: true }]
                : ['', { text: '' }],
              ['Phương thức thanh toán:', { text: tab.formData.optionPay == 0 ? "Thanh toán bằng tiền mặt" : "Thanh toán online" || 'None', alignment: 'right', margin: [0, 0, 10, 0], bold: true }]
            ]
          },
          margin: [0, 10, 0, 0],
          layout: 'noBorders' // Xóa đường biên để tránh đường biên trắng xung quanh bảng
        },
        { text: '---- Cảm ơn quý khách ----', margin: [0, 20, 0, 5], alignment: 'center', italics: true },

      ],
      styles: {
        header: {
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 12,
          alignment: 'center',
          margin: [0, 0, 0, 5]
        },
        subtext: {
          fontSize: 12,
          margin: [0, 0, 0, 5]
        },
        title: {
          fontSize: 16,
          bold: true,
          alignment: 'center',
          margin: [0, 20, 0, 5]
        },
        subtitle: {
          fontSize: 12,
          alignment: 'center',
          margin: [0, 0, 0, 10]
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          alignment: 'center',
          margin: [0, 10, 0, 15],
          color: 'black'
        }
      }
    };

    function getAddressString(formData) {
      const province = $scope.getSelectedProvinceName(formData.provinceId) || 'None';
      const district = $scope.getSelectedDistrictName(formData.districtId) || 'None';
      const ward = $scope.getSelectedWardName(formData.wardId) || 'None';
      const address = formData.address || 'None';

      const fullAddress = `${address}, ${ward}, ${district}, ${province}`;

      // Kiểm tra xem có dữ liệu nào không
      if (fullAddress !== 'None, None, None, None') {
        return { text: 'Địa chỉ: ' + fullAddress, style: 'subtext' };
      }

      // Nếu không có dữ liệu, trả về một mảng trống
      return [];
    }
    pdfMake.createPdf(documentDefinition).download('invoice_' + tab.formData.code + '.pdf');

    // --Auto Print --
    // var pdfDoc = pdfMake.createPdf(documentDefinition);
    // pdfDoc.getBuffer((buffer) => {
    //     var blob = new Blob([buffer], { type: 'application/pdf' });
    //     var url = URL.createObjectURL(blob);

    //     var iframe = document.createElement('iframe');
    //     iframe.style.display = 'none';
    //     iframe.src = url;

    //     document.body.appendChild(iframe);
    //     iframe.contentWindow.print();
    // });
  };

  // end ep 

  //QR
  var video = document.getElementById("scanner");
  var scanner = new Instascan.Scanner({ video: video });

  $scope.showScanner = true;
  $scope.detectedCode = '';

  $scope.startCam = function (tab) {
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });

    // Create a closure to capture the 'tab' value
    function onScan(content) {
      $scope.$apply(function () {
        $scope.detectedCode = content;
        var checkSp = 0;
        for (var i = 0; i < $scope.itemsBs.length; i++) {
          if (parseInt($scope.detectedCode) === $scope.itemsBs[i].id) {
            console.log(tab.formData.cart);
            $scope.sendDetailAddRequest(tab, $scope.itemsBs[i]);
            checkSp +=1;
          }
        }
        if(checkSp===0){
          toastr.info('Sản phẩm không tồn tại!', 'Thông báo')
        }
      });
    }

    // Attach the closure to the scan event
    scanner.addListener('scan', onScan);
    // Clean up the listener when no longer needed (e.g., leaving the page)
    $scope.$on('$destroy', function () {
      scanner.removeListener('scan', onScan);
    });
  };

  //end Qr




  $document.on("click", function (event) {
    // Check if the click is outside of the input and dropdown
    if (
      !$scope.isDescendant(document.getElementById("customerDropdown"), event.target) &&
      !$scope.isDescendant(document.getElementById("productDropdown"), event.target) &&
      !$scope.isDescendant(document.getElementById("productInput"), event.target)
    ) {
      $scope.$apply(function () {
        // Ẩn dropdown và thực hiện các hành động khác tùy thuộc vào yêu cầu của bạn
        $scope.dropdownOpen = false;

        // Thực hiện các hành động khác (nếu cần)
      });
    }
  });

  // Helper function to check if an element is a descendant of another
  $scope.isDescendant = function (parent, child) {
    var node = child.parentNode;
    while (node != null) {
      if (node == parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  };


  // end sell

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
