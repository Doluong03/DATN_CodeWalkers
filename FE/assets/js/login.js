
var app = angular.module('login', []);

app.controller('loginController', ['$scope', '$http', function ($scope, $http) {
  $scope.loginRequest = {
    userName: "",
    password: ""
  };
  $scope.signUpRequest = {
    userName: "",
    password: "",
    phoneNumber: "",
    fullName: ""
  };


  $scope.login = function (event, item) {
    event.preventDefault();
    console.log(item)

    let authURL = "http://localhost:8080/api/auth/loginUser";
    $scope.showLoading = false;
    $scope.showIcon = false;
    $http.post(authURL, JSON.stringify(item))
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

  $scope.checkSignup = false;

  $scope.signUp = function (event) {
    event.preventDefault();
    let authURL = "http://localhost:8080/api/auth/signUpUser";
    $scope.showLoading = false;
    $scope.showIcon = false;
    if (
      !$scope.signUpRequest.userName || 
      !$scope.signUpRequest.phoneNumber ||
      !$scope.signUpRequest.fullName ||
      !$scope.signUpRequest.password 
  ) {
    toastr.error('Vui lòng điền đầy đủ thông tin', 'Thông báo')
    $scope.checkSignup = true;
      return; // Dừng việc thực hiện lưu nếu thông tin không hợp lệ
  }
  console.log($scope.checkSignup)

  $scope.checkSignup = false;
    $http.post(authURL, JSON.stringify($scope.signUpRequest))
      .then((result) => {
        if (result) {
          console.log(result,'here');
          var data = {
            userName: result.data.userName,
            password: result.data.password
          }
          // Check if result.data.roles is an empty string
          $scope.login(event, data);
        }
      })
      .catch((err) => {

        if (err.status === 500) {
          toastr.warning('Account dont exist!', 'Thông báo')
        }
        if (err.status === 403) {
          toastr.error('Invalid password or username!', 'Thông báo')
        }
        if (err.status === 400) {
          toastr.warning('UserName is already registered', 'Thông báo')
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

