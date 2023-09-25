var myApp = angular.module("myApp",["ngRoute"]);
// chuyen trang
myApp.config(function ($routeProvider, $locationProvider) {
  // xoa khoang trang trinh duyet
  $locationProvider.hashPrefix("");
  // $routeProvider : chuyen trang
  $routeProvider
    .when("/trang-chu", {
      templateUrl: "/FE_Admin/template/trang-chu.html",
      controller: UserController,
    })
     .when("/bieu-do", {
      templateUrl: "/FE_Admin/template/chart.html",
      controller : ChartController,
    })   
    .when("/nhan-vien", {
      templateUrl: "/FE_Admin/template/nhan-vien.html",
      controller : UserController,
    }) 
   
    .otherwise({
      redirectTo: "/trang-chu",
    });
});

