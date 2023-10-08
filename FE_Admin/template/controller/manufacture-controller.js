window.ManufactureController = function ($scope, $http, $window) {
  $scope.listManufacture = [];
  $scope.isActive = true;
  
  $scope.formManufacture = {
    id: "",
    name: "",
    moTa:"",
    status: "",
  };

  $scope.formManufactureUpdate = {
    id: "",
    name: "",
    moTa:"",
    status: "",
  };

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
      $scope.hienThi($scope.pageCurrent);
    }
  };
  
  $scope.previousPage = function () {
    if ($scope.pageCurrent > 0) {
      $scope.pageCurrent--;
    }
    $scope.hienThi($scope.pageCurrent);
  };
  
  $scope.hoveredPage = null;

  $scope.onHover = function (index) {
    $scope.hoveredPage = index;
  };
  
  $scope.onLeave = function () {
    $scope.hoveredPage = null;
  };
  
  
  $scope.pageNo = 0;
  
  $scope.hienThi = function (pageNo) {
    let apiUrl = apiManufacture + "?pageNo=" + pageNo;
    $http.get(apiUrl).then(
      function (response) {
        // Kiểm tra dữ liệu có được in ra không
        $scope.listManufacture = response.data.manufactureList;
        $scope.totalPage = response.data.totalPages;
        console.log(response.data);
        console.log(response.data.totalPages);
      },
      function (error) {
        console.log(error);
      }
    );
  };
  
  $scope.PageNo = function (pageNo) {
    $scope.pageCurrent = pageNo; // Cập nhật pageCurrent khi chọn trang cụ thể
    $scope.hienThi(pageNo); 
    $scope.hoveredPage = pageNo;// Truyền giá trị pageNo vào hàm hienThi
  };
  
  // Gọi hàm hienThi() để lấy dữ liệu ban đầu
  $scope.hienThi($scope.pageNo);
  

  //delete data

  $scope.removeStaff = function (event, index) {
    event.preventDefault();

    let Manufacture = $scope.listManufacture[index];
    let manufactureId = Manufacture.id;
    let api = apiManufacture + "/delete/" + manufactureId;
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
        $http.delete(api).then(function () {
          Swal.fire('Xóa thành công!', '', 'success');
          $scope.hienThi($scope.pageCurrent);
      })
      .catch(function (error) {
        console.log(error);
      });
        $scope.hienThi($scope.pageNo);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hành động khi người dùng ấn "Không"
        Swal.fire('Hủy bỏ', '', 'error');
      }
    });
    
  };

  // show form
  $scope.showForm = false; // Mặc định ẩn form
  $scope.toggleForm = function () {
    $scope.showForm = !$scope.showForm; // Khi click, đảo ngược trạng thái của form
  };

  // add one product

  $scope.addUser = function (event) {
    event.preventDefault();
    console.log($scope.formUser);

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
        $http.post(apiManufacture + "/insert", JSON.stringify($scope.formManufacture)).then(function (response) {
          Swal.fire('Thêm thành công!', '', 'success');
          $scope.hienThi($scope.pageCurrent);
          $scope.formUser = {};
          console.log(response);
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Đã xảy ra lỗi!",
          });
  
          console.log(error);
        });
       
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hành động khi người dùng ấn "Không"
        Swal.fire('Hủy bỏ', '', 'error');
      }
    });

    
  };

  // show form user and load detail

$scope.showFormUpdate = false;
$scope.activeIndex = -1; // Khởi tạo activeIndex là -1

$scope.formManufactureUpdate = {}; // Khởi tạo biểu mẫu

$scope.toggleFormUpdate = function (event, index) {
  event.preventDefault();
  if ($scope.activeIndex === index && $scope.showFormUpdate) {
    // Trường hợp ấn lại dòng đã chọn và form đang hiển thị, đóng form và xóa dữ liệu
    $scope.showFormUpdate = false;
    $scope.activeIndex = -1;
    $scope.formManufactureUpdate = {};
  } else {
    // Trường hợp ấn dòng khác hoặc form chưa hiển thị, hiển thị và nạp dữ liệu của dòng được chọn
    $scope.showFormUpdate = true;
    $scope.activeIndex = index;

    let manufacture = $scope.listManufacture[index];
    // Nạp dữ liệu của dòng được chọn vào biểu mẫu
    $scope.formManufactureUpdate.id = manufacture.id;
    $scope.formManufactureUpdate.name = manufacture.name;
    $scope.formManufactureUpdate.description = manufacture.description;
    $scope.formManufactureUpdate.status = manufacture.status.name;
    
  }
};


  // update
  $scope.UpdateUser = function (event) {
    event.preventDefault();
    console.log($scope.formManufactureUpdate);

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
        $http.put(apiManufacture + "/update", JSON.stringify($scope.formManufactureUpdate)).then(function (response) {
          Swal.fire('Cập nhật thành công!', '', 'success');
          $scope.formUserUpdate = {};
          $scope.hienThi($scope.pageCurrent);
        })
          .catch(function (error) {
            // Xử lý lỗi nếu có
            console.error("Lỗi khi cập nhật sản phẩm:", error);  
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Đã xảy ra lỗi!",
            });
          });
       
      
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Hành động khi người dùng ấn "Không"
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
      const worksheet = workbook.getWorksheet('Sheet1');
      worksheet.eachRow((row, index) => {
        if (index > 1) {
          let user = {
            name: row.getCell(1).value,
            dateOfBirth: formatDate(row.getCell(2).value),
            phoneNumber: row.getCell(3).value,
            gender: parseGender(row.getCell(4).value),
            email: row.getCell(5).value,
            address: row.getCell(6).value,
            image: row.getCell(7).value
          };
          $http.post(apiUser + "/insert", JSON.stringify(user))
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
          function () {},
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
