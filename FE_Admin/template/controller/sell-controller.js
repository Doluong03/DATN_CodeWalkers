window.SellAdminController = function ($scope, $http, $document, $timeout) {
  var headers = {
    headers: {
      'Authorization': 'Bearer ' + tokenAuthen(),
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      // Các header khác nếu cần
    }
  };
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
  $scope.tabs = [
    { title: 'Hóa đơn 1', content: '/template/billAdmin.html', active: true, isLast: false },
  ];
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
  };
  $scope.removeProduct = function (pr) {
    var index = $scope.listRes.indexOf(pr); // Tìm vị trí của phần tử trong mảng
    if (index !== -1) {
      $scope.listRes.splice(index, 1); // Xóa phần tử từ mảng
      console.log("tru r")
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

  $scope.selectProduct = function (tab,pr) {
    $scope.sendDetailAddRequest(tab,)
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
        staffName: res.data.name,
        staffPhone: res.data.phoneNumber
      }
    }).catch(error => {
      console.log("Error", error);
    });
  }
  $scope.getDataStaff();
  $scope.formOrderAdd = {
    idBill: "",
    address: "",
    wardId: "",
    provinceId: 0, // Gửi ID
    districtId: 0,
    userName: "",
    phone: "",
    fee: "Mua hàng tại quầy",
    optionPay: 0,
    totalPay: 0,
  };

  $scope.addBill = function (tab) {
    var url = `${host}/api/addBill/0`;
    console.log(url, "url");
    return $http.post(url).then(function (res) {
      $scope.bill = res.data; // Gán dữ liệu từ API vào $scope.bill
      tab.formData.code = $scope.bill.code;
      tab.formData.id = $scope.bill.id;
      $scope.idUser = $scope.bill.users.id;
    }).catch(function (error) {
      console.error('ADD thất bại', error);
    });
  }
  $scope.createCart = function (tab) {
    var url = `${host}/api/CreateCart`;
    return $http.post(url).then(function (response) {
      tab.formData.cart = response.data.id;
      return response.data; // Trả về dữ liệu cho promise
    }).catch(function (error) {
      console.error('Lỗi: ', error);
      return $q.reject(error); // Trả về lỗi cho promise
    });
  };

  $scope.sendDetailAddRequest = function (tab,pr) {
    var url = `${host}/api/detailAdd/${tab.formData.cart}/${$scope.productId}/${$scope.selectedValue}/${$scope.selectedColor || ''}`;
    var data = { quantity: 1 };
    console.log("Sending request to:", url);
    $http.post(url, data)
      .then(function (response) {
        toastr.success('Thêm sản phẩm thành công!', 'Thông báo');
      })
      .catch(function (error) {
        console.error('Cập nhật thất bại:', error);
        toastr.error('Có lỗi xảy ra khi thêm sản phẩm', 'Lỗi');
      });
  };

  $scope.activateTab = function (selectedTab) {
    if (!selectedTab.disabled) {
      $scope.tabs.forEach(function (tab) {
        tab.active = (tab === selectedTab);
      });
    }
  };
  $scope.tabs = [];
  $scope.addNewTab = function (currentTab) {
    if ($scope.tabs.length >= 5) {
      return;
    }

    $scope.newTabIndex = $scope.newTabIndex || $scope.tabs.length + 1;

    var newTab = {
      title: 'Hóa đơn ' + $scope.newTabIndex,
      formData: {},  // Tạo một đối tượng formData mới cho mỗi tab
      active: true,
      isLast: false
    };
    newTab.formData = {};
    $scope.tabs.push(newTab);
    $scope.newTabIndex++;

    for (var i = 0; i < $scope.tabs.length - 1; i++) {
      $scope.tabs[i].active = false;
    }
    updateTabStatus();
    $scope.addBill(newTab);
    $scope.createCart(newTab);
  };


  $scope.removeTab = function (tabToRemove) {
    $scope.removeBill(tabToRemove);
    var tabIndex = $scope.tabs.indexOf(tabToRemove);
    // Kích hoạt tab trước đó nếu tab hiện tại là tab cuối cùng
    var previousTabIndex = (tabIndex === $scope.tabs.length - 1) ? tabIndex - 1 : tabIndex;
    // Kích hoạt tab trước đó
    $scope.activateTab($scope.tabs[previousTabIndex]);
    // Xóa tab hiện tại
    $scope.tabs.splice(tabIndex, 1);
    // Cập nhật trạng thái tab
    updateTabStatus();
  };

  function updateTabStatus() {
    // Cập nhật trạng thái "isLast" cho từng tab
    $scope.tabs.forEach(function (tab, index) {
      tab.isLast = (index === $scope.tabs.length - 1);
    });
  }

  // Khởi tạo trạng thái ban đầu
  updateTabStatus();
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
      console.log($scope.filteredUsers, 'aaa')
    }).catch(error => {
      console.log("Error", error);
    });
  }
  $scope.loadUser();
  $scope.filterUsers = function () {
    var searchText = $scope.userInput.toLowerCase();
    $scope.filteredUsers = $scope.listUser.filter(function (user) {
      return user.name.toLowerCase().includes(searchText);
    });
  };
  $scope.searchCustomers = function (tab) {
    console.log("here", tab.formData.userName);
    var searchText = tab.formData.userName.toLowerCase();
    $scope.filteredUsers = $scope.listUser.filter(function (user) {
      var lowerSearchText = searchText.toLowerCase();
      return user.name.toLowerCase().includes(lowerSearchText) || (user.phoneNumber && user.phoneNumber.includes(searchText));
    });

  };

  $scope.selectCustomer = function (user, tab) {
    tab.formData.userName = user.name;
    tab.formData.phoneNumber = user.phoneNumber; // Replace 'phoneNumber' with the actual property name in your user object
  };

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
