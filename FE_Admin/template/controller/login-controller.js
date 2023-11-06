var app = angular.module('login', []);

app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
  $scope.loginRequest = {
    userName: "",
    password: ""
  };

  $scope.login = function (event) {
    event.preventDefault();

    let authURL = "http://localhost:8080/api/auth/login";

    $http.post(authURL, JSON.stringify($scope.loginRequest))
      .then((result) => {
        // Check if result.data.roles is an empty string
        if (result.data.roles.length === 0) {
          alert("You don't have access");
        } else {
          result.data.roles.forEach(element => {
            //  // Lưu thông tin đăng nhập vào localStorage
            alert("login successful")
            localStorage.setItem('userData', JSON.stringify(result.data));
            console.log(result.data);
            // Use regular JavaScript for navigation to another app or page
            window.location.href = "http://127.0.0.1:5500/template/index.html#/trang-chu";
          });
        }
      })
      .catch((err) => {

        if (err.status === 500) {
          alert("Account dont exist");
        }
        if (err.status === 403) {
          alert("Invalid password or username");
        }

      });

  };

}]);



