var myApp = angular.module("myApp",["ngRoute"]);
// chuyen trang

myApp.factory('DataService', function($q) {
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
  
   
   
    .otherwise({
      redirectTo: "/trang-chu",
    });
});



myApp.service('DateService', function () {
  var dateList = [];
  var dayList = [];

  function formatDate(date) {
      var day = date.getDate();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      return day + '-' + month + '-' + year;
  }

  return {
      setDateList: function (newDateList) {
          dateList = newDateList;
      },
      setDayList: function (newDayList) {
          dayList = newDayList;
      },
      getDateList: function () {
          return dateList;
      },
      getDayList: function () {
          return dayList;
      },
      generateLists: function (startDate, endDate) {
          // Xóa danh sách ngày và chỉ chứa phần ngày trước khi thêm ngày mới
          dateList.splice(0, dateList.length);
          dayList.splice(0, dayList.length);

          var currentDate = new Date(startDate);
          while (currentDate <= endDate) {
              dateList.push(formatDate(new Date(currentDate)));
              dayList.push(currentDate.getDate());
              currentDate.setDate(currentDate.getDate() + 1);
          }
      }
  };
});


myApp.service('YearService', function () {
  var yearList = [];

  return {
      setYearList: function (newYearList) {
          yearList = newYearList;
      },
      getYearList: function () {
          return yearList;
      },
      generateYearList: function (year1, year2) {
          yearList = [];
          for (var i = year1; i <= year2; i++) {
              yearList.push(i);
          }
      }
  };
});


myApp.service('MonthService', function () {
  // Hàm lấy danh sách tháng trong khoảng từ month1 đến month2
  this.getDateRanges = function (start, end) {
      var dateRanges = [];
      var startDate = new Date(start.year, start.month - 1); // Adjust month to 0-based index
      var endDate = new Date(end.year, end.month - 1);

      while (startDate <= endDate) {
          var year = startDate.getFullYear().toString();
          var month = (startDate.getMonth() + 1).toString(); // Adjust month to 1-based index

          dateRanges.push({ year: year, month: month });

          startDate.setMonth(startDate.getMonth() + 1);
      }

      return dateRanges;
  };

  this.getMMYYYYDates = function (yearMonthObjects) {
    var mmYYYYDates = [];

    yearMonthObjects.forEach(function (item) {
        var year = item.year;
        var month = item.month;

        // Định dạng mm/yyyy
        var formattedDate = (month < 10 ? '0' : '') + month + '/' + year;

        mmYYYYDates.push(formattedDate);
    });

    return mmYYYYDates;
};
});



