var myApp = angular.module("myApp",["ngRoute"]);
// chuyen trang
myApp.config(function ($routeProvider, $locationProvider) {
  // xoa khoang trang trinh duyet
  $locationProvider.hashPrefix("");
  // $routeProvider : chuyen trang
  $routeProvider
    .when("/trang-chu", {
      templateUrl: "/template/trang-chu.html",
      controller: UserController,
    })
     .when("/bieu-do", {
      templateUrl: "/template/chart.html",
      controller : ChartController,
    })   
    .when("/nhan-vien", {
      templateUrl: "/template/nhan-vien.html",
      controller : StaffController,
    })
      .when("/khach-hang", {
      templateUrl: "/template/user.html",
      controller : UserController,
    })    
     .when("/nsx", {
      templateUrl: "/template/manufacture.html",
      controller : ManufactureController,
    })  
    .when("/product-detail", {
      templateUrl: "/template/product-details.html",
      controller : productDetailController,
    }) 
   
    .otherwise({
      redirectTo: "/trang-chu",
    });
});

