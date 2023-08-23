let host = "http://localhost:8080/CodeWalkers" ; 
const app = angular.module("app",["ngRoute"]);
app.config(function($routeProvider, $locationProvider){
    $locationProvider.hashPrefix('');
    $routeProvider
    .when("/",{
        templateUrl: "page/home.html",
        controller: "LayOutController"
    })
})
app.controller("LayOutController", function($scope,$http) {
    // Logic của controller ở đây
    $scope.items = [];
    $scope.loadAllPr = function(){
        var url = `${host}/api/product`;
        $http.get(url).then(res =>{
            $scope.items = res.data;
            console.log(res.data)
            console.log("Success",res);
        }).catch(error =>{
            console.log("Error",error);
        })
    }
    $scope.loadAllPr();
});