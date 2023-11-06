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
          window.location.href = "/template/login.html";
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
      templateUrl: "/template/trang-chu.html",
      controller: UserController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })
     .when("/bieu-do", {
      templateUrl: "/template/chart.html",
      controller : ChartController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })   
    .when("/nhan-vien", {
      templateUrl: "/template/nhan-vien.html",
      controller : StaffController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })
      .when("/khach-hang", {
      templateUrl: "/template/user.html",
      controller : UserController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })    
     .when("/nsx", {
      templateUrl: "/template/manufacture.html",
      controller : ManufactureController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })  
    .when("/product-detail", {
      templateUrl: "/template/product-details.html",
      controller : productDetailController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    }) 
    .when("/material", {
      templateUrl: "/template/material.html",
      controller :MaterialController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })  
    .when("/category", {
      templateUrl: "/template/category.html",
      controller :CategoryController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })  
    .when("/bill", {
      templateUrl: "/template/bill.html",
      controller :BillController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    })  
    .when("/color", {
      templateUrl: "/template/color.html",
      controller :ColorController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    }) 
    .when("/brand", {
      templateUrl: "/template/brands.html",
      controller :BrandsController,
      resolve: {
        checkData: function(DataService) {
          return DataService.fetchData();
        }
      }
    }) 
    .when("/product", {
      templateUrl: "/template/product.html",
      controller :ProductController,
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

