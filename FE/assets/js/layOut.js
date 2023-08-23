const app = angular.module("app",["ngRoute"]);
app.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/",{
        templateUrl: "page/home.html",
        controller: "LayOutController"
    })
})
let host = "http://localhost:8080/CodeWalkers" ; 
app.controller("LayOutController", function($scope,$http) {
    // Logic của controller ở đây
    $scope.listPr = [];

    $scope.loadAllPr = function(){
        var url = `${host}/api/product`;
        $http.get(url).then(res =>{
            $scope.listPr = res.data;
            console.log("Success",res);
        }).catch(error =>{
            console.log("Error",error);
        })
    }
});