var myApp = angular.module("myApp",["ngRoute"]);

myApp.filter('dateFormat', function($filter) {
  return function(input, format) {
      if (input) {
          var date = new Date(input);
          return $filter('date')(date, format);
      }
      return '';
  };
})
// chuyen trang
myApp.factory('DataService', function($location, $q) {
  var dataAvailable = false;

  return {
    isDataAvailable: function() {
      return dataAvailable;
    },
    fetchData: function() {
      function tokenAuthen() {
        return $q(function(resolve) {
          // Lấy dữ liệu từ localStorage
          var userDataString = localStorage.getItem('userData');

          // Kiểm tra xem dữ liệu có tồn tại không
          if (userDataString) {
            // Chuyển đổi dữ liệu từ chuỗi JSON sang đối tượng JavaScript
            var userData = JSON.parse(userDataString);

            // Bạn có thể sử dụng userData ở đây
            console.log(userData.token);
            resolve(userData.token);
          } else {
            // Trường hợp không có dữ liệu trong localStorage
            console.log('Không có dữ liệu đăng nhập trong localStorage.');
            resolve(null);
          }
        });
      }

      return tokenAuthen().then(function(token) {
        // Check if the token is available
        if (token !== null) {
          dataAvailable = true;
        } else {
          console.log('Token is not available. Redirecting to login.');
          // If token is not available, redirect to the login page
          window.location.href = "/FE_Admin/template/login.html";
        }

        // Resolve the promise after processing
        return $q.resolve();
      });
    }
  };
});



myApp.config(function ($routeProvider, $locationProvider) {
  // xoa khoang trang trinh duyet
  $locationProvider.hashPrefix("");
  // $routeProvider : chuyen trang
  $routeProvider
    .when("/trang-chu", {
      templateUrl: "/FE_Admin/template/trang-chu.html",
      controller: UserController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })
     .when("/bieu-do", {
      templateUrl: "/FE_Admin/template/chart.html",
      controller : ChartController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })   
    .when("/nhan-vien", {
      templateUrl: "/FE_Admin/template/staff.html",
      controller : StaffController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })
      .when("/khach-hang", {
      templateUrl: "/FE_Admin/template/user.html",
      controller : UserController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })    
     .when("/nsx", {
      templateUrl: "/FE_Admin/template/manufacture.html",
      controller : ManufactureController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })  
    .when("/product-detail", {
      templateUrl: "/FE_Admin/template/product-details.html",
      controller : productDetailController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    }) 
    .when("/material", {
      templateUrl: "/FE_Admin/template/material.html",
      controller :MaterialController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })  
    .when("/category", {
      templateUrl: "/FE_Admin/template/category.html",
      controller :CategoryController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })  
    .when("/bill", {
      templateUrl: "/FE_Admin/template/bill.html",
      controller :BillController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })  
    .when("/color", {
      templateUrl: "/FE_Admin/template/color.html",
      controller :ColorController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })  
    .when("/kich-thuoc", {
      templateUrl: "/FE_Admin/template/size.html",
      controller : SizeController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    }) 
    .when("/brand", {
      templateUrl: "/FE_Admin/template/brands.html",
      controller :BrandsController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    }) 
    .when("/product", {
      templateUrl: "/FE_Admin/template/product.html",
      controller :ProductController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    }) 
    .when("/order", {
      templateUrl: "/FE_Admin/template/order_manage.html",
      controller : orderManage,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })  
    .when("/hinh-anh", {
      templateUrl: "/FE_Admin/template/image.html",
      controller : ImageController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    }) 
    .otherwise({
      redirectTo: "/trang-chu",
    });
});
myApp.filter('vndCurrency', function () {
  return function (input) {
      if (!input) return '';
      return input.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  };
});
myApp.filter('dateformat', function() {
  return function(input) {
    if (input) {
      var date = new Date(input);
      var day = date.getDate();
      var month = date.getMonth() + 1; // Lưu ý: Tháng bắt đầu từ 0
      var year = date.getFullYear();

      // Hàm để thêm số 0 ở đầu nếu cần
      function pad(number) {
        if (number < 10) {
          return "0" + number;
        }
        return number;
      }

      return pad(day) + '/' + pad(month) + '/' + year;
    }
    return "";
  };
});
