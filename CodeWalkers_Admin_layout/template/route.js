var myApp = angular.module("myApp",["ngRoute"]);
// chuyen trang
myApp.config(function ($routeProvider, $locationProvider) {
  // xoa khoang trang trinh duyet
  $locationProvider.hashPrefix("");
  // $routeProvider : chuyen trang
  $routeProvider
    .when("/trang-chu", {
      templateUrl: "/template/index oke .html",
      controller: UserController,
    })
     .when("/bieu-do", {
      templateUrl: "/template/chart.html",
      controller : UserController,
    })   
    .when("/nhan-vien", {
      templateUrl: "/template/nhan-vien.html",
      controller : UserController,
    }) 
   
    .otherwise({
      redirectTo: "/trang-chu",
    });
});

