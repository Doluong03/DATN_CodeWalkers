var app = angular.module('login', []);

app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
  toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": false,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "3000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "slideDown",
    "hideMethod": "slideUp"
  }
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
          //  // Lưu thông tin đăng nhập vào localStorage
          toastr.success('Login successful!', 'Congratulations 🎉🎉🎉 ');
          localStorage.setItem('userData', JSON.stringify(result.data));
          // Use regular JavaScript for navigation to another app or page
          setTimeout(function () {
            // Use regular JavaScript for navigation to another app or page
            window.location.href = "http://127.0.0.1:5500/template/index.html#/trang-chu";
          }, 1000);

        }
      })
      .catch((err) => {

        if (err.status === 500) {
          toastr.warning('Account dont exist!', 'Thông báo')
        }
        if (err.status === 403) {
          toastr.error('Invalid password or username!', 'Thông báo')
        }


      });

  };

}]);