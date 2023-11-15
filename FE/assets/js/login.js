
var app = angular.module('login', []);

app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
  $scope.loginRequest = {
    userName: "",
    password: ""
  };

  $scope.login = function (event) {
    event.preventDefault();
    console.log($scope.loginRequest)

    let authURL = "http://localhost:8080/api/auth/loginUser";
    $scope.showLoading = false;
    $scope.showIcon = false;
    $http.post(authURL, JSON.stringify($scope.loginRequest))
      .then((result) => {
        // Check if result.data.roles is an empty string
        if (result.data.role.length === 0) {
          alert("You don't have access");
        } else {
          result.data.role
          //  // Lưu thông tin đăng nhập vào localStorage
          localStorage.setItem('userData', JSON.stringify(result.data));
          console.log(result.data);
          toastr.success('Login successful!', 'Congratulations 🎉🎉🎉 ');
          $scope.showLoading = true;
          $scope.showIcon = true;

          // Sử dụng setTimeout để chuyển hướng sau 2 giây
          setTimeout(function () {
            // Use regular JavaScript for navigation to another app or page
            window.location.href = "http://127.0.0.1:5501/layoutUser.html#home";
            console.log(result.data.role, "here")
          }, 1000); // 2 giây (2000 ms)
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
}]);

