
window.ChartController = function ($scope, $http, $timeout, DateService, $q, YearService, MonthService) {
  // api weather
  var apiKey = '7640a7c0bc714ca7b3665346231709';
  var location = 'VietNam';

  var apiUrl = 'http://api.weatherapi.com/v1/current.json?key=' + apiKey + '&q=' + location + '&aqi=no';

  $http.get(apiUrl).then(function (response) {
    // Xử lý dữ liệu thời tiết ở đây
    $scope.weatherData = response.data;
    console.log(response.data);
  })
    .catch(function (error) {
      console.error('Error fetching weather data: ' + error);
    });


  // Initialize default values
  $scope.selectedYear1 = '';
  $scope.selectedYear2 = '';

  $scope.selectedMonth1 = '';
  $scope.selectedMonth2 = '';

  // Datepicker options year
  $scope.options = {
    format: 'yyyy',
    minViewMode: 'years',
    viewMode: 'years'
  };
  // Datepicker options month
  $scope.monthOptions = {
    format: 'MM/yyyy',
    minViewMode: 'months',
    viewMode: 'months'
  };

  // Function to handle changeDate event for any input
  $scope.selectedYears = {};
  $scope.selectedMonths = {};

  // Khởi tạo datepicker cho cả hai input
  $timeout(function () {
    $('#yearPicker1, #yearPicker2').datepicker($scope.options)
      .on('changeDate', function (e) {
        $scope.$apply(function () {
          const year = e.date.getFullYear().toString();
          $scope.selectedYears[e.target.id] = year;
        });
      });
  }, 0);

  $scope.getSelectedYear = function () {
    console.log($scope.selectedYears['yearPicker1'])
    console.log($scope.selectedYears['yearPicker2'])
  };
  // month
  $timeout(function () {
    $('#monthPicker1, #monthPicker2').datepicker($scope.monthOptions)
      .on('changeDate', function (e) {
        $scope.$apply(function () {
          const year = e.date.getFullYear().toString();
          const month = (e.date.getMonth() + 1).toString(); // Adjust month to 1-based index
          $scope.selectedMonths[e.target.id] = { year: year, month: month };
        });
      });
  }, 0);

  //2
  $scope.selectedYears2 = {};
  $scope.selectedMonths2 = {};

  // Khởi tạo datepicker cho cả hai input
  $timeout(function () {
    $('#yearPicker3, #yearPicker4').datepicker($scope.options)
      .on('changeDate', function (e) {
        $scope.$apply(function () {
          const year2 = e.date.getFullYear().toString();
          $scope.selectedYears2[e.target.id] = year2;
        });
      });
  }, 0);

  // month
  $timeout(function () {
    $('#monthPicker3, #monthPicker4').datepicker($scope.monthOptions)
      .on('changeDate', function (e) {
        $scope.$apply(function () {
          const year2 = e.date.getFullYear().toString();
          const month2 = (e.date.getMonth() + 1).toString(); // Adjust month to 1-based index
          $scope.selectedMonths2[e.target.id] = { year: year2, month: month2 };
        });
      });
  }, 0);


  $scope.dateOnchange = function () {
    // Reset values when display type changes
    $scope.selectedDay1 = null;
    $scope.selectedDay2 = null;
    $scope.selectedMonth1 = null;
    $scope.selectedMonth2 = null;
    $scope.selectedYear1 = null;
    $scope.selectedYear2 = null;

    // Show/hide fields based on the selected display type
    $scope.day = $scope.selectedDisplay === 'day';
    $scope.month = $scope.selectedDisplay === 'month';
    $scope.year = $scope.selectedDisplay === 'year';
  };

  $scope.dateOnchange2 = function () {
    // Reset values when display type changes
    $scope.selectedDay3 = null;
    $scope.selectedDay4 = null;
    $scope.selectedMonth3 = null;
    $scope.selectedMonth4 = null;
    $scope.selectedYear3 = null;
    $scope.selectedYear4 = null;

    // Show/hide fields based on the selected display type
    $scope.day2 = $scope.selectedDisplay2 === 'day2';
    $scope.month2 = $scope.selectedDisplay2 === 'month2';
    $scope.year2 = $scope.selectedDisplay2 === 'year2';
  };

  $scope.selectedDay1 = null;
  $scope.selectedDay2 = null;

  $scope.selectedDay3 = null;
  $scope.selectedDay4 = null;

  $scope.dayList = [];
  $scope.dateList = [];
  $scope.yearList = [];




  // thu vien jQuery không đụng vào
  (function ($) {
    'use strict';
    $(function () {
      $('[data-toggle="offcanvas"]').on("click", function () {
        $('.sidebar-offcanvas').toggleClass('active')
      });
    });
  })(jQuery);

  (function ($) {
    'use strict';
    $(function () {
      var body = $('body');
      var contentWrapper = $('.content-wrapper');
      var scroller = $('.container-scroller');
      var footer = $('.footer');
      var sidebar = $('.sidebar');

      //Add active class to nav-link based on url dynamically
      //Active class can be hard coded directly in html file also as required

      function addActiveClass(element) {
        if (current === "") {
          //for root url
          if (element.attr('href').indexOf("index.html") !== -1) {
            element.parents('.nav-item').last().addClass('active');
            if (element.parents('.sub-menu').length) {
              element.closest('.collapse').addClass('show');
              element.addClass('active');
            }
          }
        } else {
          //for other url
          if (element.attr('href').indexOf(current) !== -1) {
            element.parents('.nav-item').last().addClass('active');
            if (element.parents('.sub-menu').length) {
              element.closest('.collapse').addClass('show');
              element.addClass('active');
            }
            if (element.parents('.submenu-item').length) {
              element.addClass('active');
            }
          }
        }
      }



      $('.horizontal-menu .nav li a').each(function () {
        var $this = $(this);
        addActiveClass($this);
      })

      //Close other submenu in sidebar on opening any

      sidebar.on('show.bs.collapse', '.collapse', function () {
        sidebar.find('.collapse.show').collapse('hide');
      });


      //Change sidebar and content-wrapper height
      applyStyles();

      function applyStyles() {
        //Applying perfect scrollbar
        if (!body.hasClass("rtl")) {
          if ($('.settings-panel .tab-content .tab-pane.scroll-wrapper').length) {
            const settingsPanelScroll = new PerfectScrollbar('.settings-panel .tab-content .tab-pane.scroll-wrapper');
          }
          if ($('.chats').length) {
            const chatsScroll = new PerfectScrollbar('.chats');
          }
          if (body.hasClass("sidebar-fixed")) {
            if ($('#sidebar').length) {
              var fixedSidebarScroll = new PerfectScrollbar('#sidebar .nav');
            }
          }
        }
      }

      $('[data-toggle="minimize"]').on("click", function () {
        if ((body.hasClass('sidebar-toggle-display')) || (body.hasClass('sidebar-absolute'))) {
          body.toggleClass('sidebar-hidden');
        } else {
          body.toggleClass('sidebar-icon-only');
        }
      });

      //checkbox and radios
      $(".form-check label,.form-radio label").append('<i class="input-helper"></i>');

      //Horizontal menu in mobile
      $('[data-toggle="horizontal-menu-toggle"]').on("click", function () {
        $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
      });
      // Horizontal menu navigation in mobile menu on click
      var navItemClicked = $('.horizontal-menu .page-navigation >.nav-item');
      navItemClicked.on("click", function (event) {
        if (window.matchMedia('(max-width: 991px)').matches) {
          if (!($(this).hasClass('show-submenu'))) {
            navItemClicked.removeClass('show-submenu');
          }
          $(this).toggleClass('show-submenu');
        }
      })

      $(window).scroll(function () {
        if (window.matchMedia('(min-width: 992px)').matches) {
          var header = $('.horizontal-menu');
          if ($(window).scrollTop() >= 70) {
            $(header).addClass('fixed-on-scroll');
          } else {
            $(header).removeClass('fixed-on-scroll');
          }
        }
      });
    });

    // focus input when clicking on search icon
    $('#navbar-search-icon').click(function () {
      $("#navbar-search-input").focus();
    });

  })(jQuery);

  (function ($) {
    'use strict';
    $(function () {
      $(".nav-settings").on("click", function () {
        $("#right-sidebar").toggleClass("open");
      });
      $(".settings-close").on("click", function () {
        $("#right-sidebar,#theme-settings").removeClass("open");
      });

      $("#settings-trigger").on("click", function () {
        $("#theme-settings").toggleClass("open");
      });


      //background constants
      var navbar_classes = "navbar-danger navbar-success navbar-warning navbar-dark navbar-light navbar-primary navbar-info navbar-pink";
      var sidebar_classes = "sidebar-light sidebar-dark";
      var $body = $("body");

      //sidebar backgrounds
      $("#sidebar-light-theme").on("click", function () {
        $body.removeClass(sidebar_classes);
        $body.addClass("sidebar-light");
        $(".sidebar-bg-options").removeClass("selected");
        $(this).addClass("selected");
      });
      $("#sidebar-dark-theme").on("click", function () {
        $body.removeClass(sidebar_classes);
        $body.addClass("sidebar-dark");
        $(".sidebar-bg-options").removeClass("selected");
        $(this).addClass("selected");
      });


      //Navbar Backgrounds
      $(".tiles.primary").on("click", function () {
        $(".navbar").removeClass(navbar_classes);
        $(".navbar").addClass("navbar-primary");
        $(".tiles").removeClass("selected");
        $(this).addClass("selected");
      });
      $(".tiles.success").on("click", function () {
        $(".navbar").removeClass(navbar_classes);
        $(".navbar").addClass("navbar-success");
        $(".tiles").removeClass("selected");
        $(this).addClass("selected");
      });
      $(".tiles.warning").on("click", function () {
        $(".navbar").removeClass(navbar_classes);
        $(".navbar").addClass("navbar-warning");
        $(".tiles").removeClass("selected");
        $(this).addClass("selected");
      });
      $(".tiles.danger").on("click", function () {
        $(".navbar").removeClass(navbar_classes);
        $(".navbar").addClass("navbar-danger");
        $(".tiles").removeClass("selected");
        $(this).addClass("selected");
      });
      $(".tiles.light").on("click", function () {
        $(".navbar").removeClass(navbar_classes);
        $(".navbar").addClass("navbar-light");
        $(".tiles").removeClass("selected");
        $(this).addClass("selected");
      });
      $(".tiles.info").on("click", function () {
        $(".navbar").removeClass(navbar_classes);
        $(".navbar").addClass("navbar-info");
        $(".tiles").removeClass("selected");
        $(this).addClass("selected");
      });
      $(".tiles.dark").on("click", function () {
        $(".navbar").removeClass(navbar_classes);
        $(".navbar").addClass("navbar-dark");
        $(".tiles").removeClass("selected");
        $(this).addClass("selected");
      });
      $(".tiles.default").on("click", function () {
        $(".navbar").removeClass(navbar_classes);
        $(".tiles").removeClass("selected");
        $(this).addClass("selected");
      });
    });
  })(jQuery);

  (function ($) {
    'use strict';
    //Open submenu on hover in compact sidebar mode and horizontal menu mode
    $(document).on('mouseenter mouseleave', '.sidebar .nav-item', function (ev) {
      var body = $('body');
      var sidebarIconOnly = body.hasClass("sidebar-icon-only");
      var sidebarFixed = body.hasClass("sidebar-fixed");
      if (!('ontouchstart' in document.documentElement)) {
        if (sidebarIconOnly) {
          if (sidebarFixed) {
            if (ev.type === 'mouseenter') {
              body.removeClass('sidebar-icon-only');
            }
          } else {
            var $menuItem = $(this);
            if (ev.type === 'mouseenter') {
              $menuItem.addClass('hover-open')
            } else {
              $menuItem.removeClass('hover-open')
            }
          }
        }
      }
    });
  })(jQuery);


  (function ($) {
    showSwal = function (type) {
      'use strict';
      if (type === 'basic') {
        swal({
          text: 'Any fool can use a computer',
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-primary"
          }
        })

      } else if (type === 'title-and-text') {
        swal({
          title: 'Read the alert!',
          text: 'Click OK to close this alert',
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-primary"
          }
        })

      } else if (type === 'success-message') {
        swal({
          title: 'Congratulations!',
          text: 'You entered the correct answer',
          icon: 'success',
          button: {
            text: "Continue",
            value: true,
            visible: true,
            className: "btn btn-primary"
          }
        })

      } else if (type === 'auto-close') {
        swal({
          title: 'Auto close alert!',
          text: 'I will close in 2 seconds.',
          timer: 2000,
          button: false
        }).then(
          function () { },
          // handling the promise rejection
          function (dismiss) {
            if (dismiss === 'timer') {
              console.log('I was closed by the timer')
            }
          }
        )
      } else if (type === 'warning-message-and-cancel') {
        swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3f51b5',
          cancelButtonColor: '#ff4081',
          confirmButtonText: 'Great ',
          buttons: {
            cancel: {
              text: "Cancel",
              value: null,
              visible: true,
              className: "btn btn-danger",
              closeModal: true,
            },
            confirm: {
              text: "OK",
              value: true,
              visible: true,
              className: "btn btn-primary",
              closeModal: true
            }
          }
        })

      } else if (type === 'custom-html') {
        swal({
          content: {
            element: "input",
            attributes: {
              placeholder: "Type your password",
              type: "password",
              class: 'form-control'
            },
          },
          button: {
            text: "OK",
            value: true,
            visible: true,
            className: "btn btn-primary"
          }
        })
      }
    }

  })(jQuery);



  (function ($) {
    'use strict';
    if ($('.grid').length) {
      var colcade = new Colcade('.grid', {
        columns: '.grid-col',
        items: '.grid-item'
      });
    }
  })(jQuery);



  (function ($) {
    'use strict';
    //Open submenu on hover in compact sidebar mode and horizontal menu mode
    $(document).on('mouseenter mouseleave', '.sidebar .nav-item', function (ev) {
      var body = $('body');
      var sidebarIconOnly = body.hasClass("sidebar-icon-only");
      var sidebarFixed = body.hasClass("sidebar-fixed");
      if (!('ontouchstart' in document.documentElement)) {
        if (sidebarIconOnly) {
          if (sidebarFixed) {
            if (ev.type === 'mouseenter') {
              body.removeClass('sidebar-icon-only');
            }
          } else {
            var $menuItem = $(this);
            if (ev.type === 'mouseenter') {
              $menuItem.addClass('hover-open')
            } else {
              $menuItem.removeClass('hover-open')
            }
          }
        }
      }
    });
  })(jQuery)


  // Gọi hàm filterDate với selectedDisplay === '' khi trang được mở
  // Hàm sẽ được gọi khi trang web được mở
  $scope.onViewContentLoaded = function () {
    // Gọi hàm filterDate với selectedDisplay là rỗng
    $scope.filterDate('');
  };

  // Đăng ký sự kiện $viewContentLoaded
  $scope.$on('$viewContentLoaded', $scope.onViewContentLoaded);


  // line Chart
  $scope.filterDate = function (selectedDisplay) {
    console.log(selectedDisplay);
    $scope.loading = true;
    $scope.data = null;  // Xóa dữ liệu cũ

    $timeout(function () {

      try {
        var monthPicker1 = $scope.selectedMonths['monthPicker1'];
        var monthPicker2 = $scope.selectedMonths['monthPicker2'];

        console.log(monthPicker1)
        console.log(monthPicker2)

        if (selectedDisplay === "") {
          // Thiết lập giá trị mặc định là năm hiện tại và 12 tháng
          var currentYear = new Date().getFullYear().toString();
          monthPicker1 = { year: currentYear, month: "1" };
          monthPicker2 = { year: currentYear, month: "12" };
          var dateRanges = MonthService.getDateRanges(monthPicker1, monthPicker2);
          var yearMonthObjects = dateRanges.map(function (item) {
            return { year: item.year, month: item.month };
          });
          var mmYYYYDates = MonthService.getMMYYYYDates(yearMonthObjects);
          console.log(mmYYYYDates)
        }

        if (selectedDisplay === '') {
          labels = mmYYYYDates;
          dayList = yearMonthObjects;
        }

        var responseDataMap = {}; // Sử dụng một đối tượng thay vì một mảng
        var requests = [];


        angular.forEach(dayList, function (value) {
          // Thực hiện các thao tác mong muốn với mỗi phần tử trong dayList
          var url, params;

          if (selectedDisplay === '') {
            url = 'http://localhost:8080/CodeWalkers/thong-ke/thang';
            params = { month: value.month, month2: value.year };
          }

          var request = $http({
            method: 'POST',
            url: url,
            params: params,
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(function (response) {
              var intValue = parseInt(response.data);

              if (!isNaN(intValue)) {
                // Lưu trữ dữ liệu trong đối tượng với key là giá trị từ dayList
                responseDataMap[JSON.stringify(value)] = intValue;
              } else {
                responseDataMap[JSON.stringify(value)] = 0;
              }
            })
            .catch(function (error) {
              // Xử lý lỗi nếu có
              console.log(error);
            });

          requests.push(request);
        });

        $q.all(requests).then(function () {
          // Sau khi tất cả các request đã hoàn thành, thêm dữ liệu từ đối tượng vào mảng dữ liệu của bạn
          $scope.data = {
            labels: labels,
            datasets: [{
              label: '# of Votes',
              data: dayList.map(function (value) {
                return responseDataMap[JSON.stringify(value)];
              }),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1,
              fill: false
            }]
          };

          var options = {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero: true
                }
              }]
            },
            legend: {
              display: false
            },
            elements: {
              point: {
                radius: 0
              }
            }
          };

          // Initialize the single dataset line chart
          if ($("#lineChart").length) {
            var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
            var lineChart = new Chart(lineChartCanvas, {
              type: 'line',
              data: $scope.data,
              options: options
            });
          }

          // Ẩn hiệu ứng xoay xoay
          $scope.loading = false;
        })
          .catch(function (error) {
            console.log(error);
            // Ẩn hiệu ứng xoay xoay nếu có lỗi xảy ra
            $scope.loading = false;
          });
      } catch (error) {
        console.error("Error:", error.message);
        // Handle the error as needed
        $scope.loading = false;
      }
    }, 1000)

    $timeout(function () {
      if (selectedDisplay === 'day' || selectedDisplay === 'month' || selectedDisplay === 'year') {
        try {
          var startDate = new Date($scope.selectedDay1);
          var endDate = new Date($scope.selectedDay2);

          var monthPicker1 = $scope.selectedMonths['monthPicker1'];
          var monthPicker2 = $scope.selectedMonths['monthPicker2'];

          console.log(startDate, endDate);

          if (selectedDisplay === 'month') {
            var dateRanges = MonthService.getDateRanges(monthPicker1, monthPicker2);
            var yearMonthObjects = dateRanges.map(function (item) {
              return { year: item.year, month: item.month };
            });
            var mmYYYYDates = MonthService.getMMYYYYDates(yearMonthObjects);
          }

          YearService.generateYearList($scope.selectedYears['yearPicker1'], $scope.selectedYears['yearPicker2']);
          var yearList = YearService.getYearList();
          console.log(yearList);

          DateService.generateLists(startDate, endDate, selectedDisplay);
          var labels, dayList;

          if (selectedDisplay === 'day') {
            labels = DateService.getDateList();
            dayList = DateService.getDateList();
          } else if (selectedDisplay === 'month') {
            labels = mmYYYYDates;
            dayList = yearMonthObjects;
          } else if (selectedDisplay === 'year') {
            labels = yearList;
            dayList = yearList;
          }

          console.log("Danh sách ngày (dd-mm-yyyy):", labels);
          console.log("Danh sách chỉ chứa phần ngày (dd):", dayList);

          var responseDataMap = {}; // Sử dụng một đối tượng thay vì một mảng
          var requests = [];

          angular.forEach(dayList, function (value) {
            // Thực hiện các thao tác mong muốn với mỗi phần tử trong dayList
            var url, params;

            if (selectedDisplay === 'day') {
              url = 'http://localhost:8080/CodeWalkers/thong-ke/ngay';
              params = { day: value };
              console.log(params);
            } else if (selectedDisplay === 'month') {
              url = 'http://localhost:8080/CodeWalkers/thong-ke/thang';
              params = { month: value.month, month2: value.year };
            } else if (selectedDisplay === 'year') {
              url = 'http://localhost:8080/CodeWalkers/thong-ke/nam';
              params = { year: value };
            }

            var request = $http({
              method: 'POST',
              url: url,
              params: params,
              headers: {
                'Content-Type': 'application/json'
              }
            })
              .then(function (response) {
                var intValue = parseInt(response.data);

                if (!isNaN(intValue)) {
                  // Lưu trữ dữ liệu trong đối tượng với key là giá trị từ dayList
                  responseDataMap[JSON.stringify(value)] = intValue;
                } else {
                  responseDataMap[JSON.stringify(value)] = 0;
                }
              })
              .catch(function (error) {
                // Xử lý lỗi nếu có
                console.log(error);
              });

            requests.push(request);
          });

          $q.all(requests).then(function () {
            // Sau khi tất cả các request đã hoàn thành, thêm dữ liệu từ đối tượng vào mảng dữ liệu của bạn
            $scope.data = {
              labels: labels,
              datasets: [{
                label: '# of Votes',
                data: dayList.map(function (value) {
                  return responseDataMap[JSON.stringify(value)];
                }),
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                  'rgba(255,99,132,1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                fill: false
              }]
            };

            var options = {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              legend: {
                display: false
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            };

            // Initialize the single dataset line chart
            if ($("#lineChart").length) {
              var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
              var lineChart = new Chart(lineChartCanvas, {
                type: 'line',
                data: $scope.data,
                options: options
              });
            }

            // Ẩn hiệu ứng xoay xoay
            $scope.loading = false;
          })
            .catch(function (error) {
              console.log(error);
              // Ẩn hiệu ứng xoay xoay nếu có lỗi xảy ra
              $scope.loading = false;
            });
        } catch (error) {
          console.error("Error:", error.message);
          // Handle the error as needed
          $scope.loading = false;
        }
      }
    }, 1000); // Hẹn giờ 1 giây (1000 miliseconds)
  };

  // pie chart
  $(function () {
    'use strict';

    var parsedData;
    $scope.loadingPieChart = true;

    function fetchData() {
      return new Promise((resolve, reject) => {
        $http.get('http://localhost:8080/CodeWalkers/thong-ke/invoice')
          .then(response => {
            parsedData = response.data;
            console.log("Fetched data:", parsedData);
            resolve(parsedData);
          })
          .catch(error => {
            console.error("Error fetching data:", error);
            reject(error);
          });
      });
    }

    // Sử dụng fetchData với Promise
    fetchData()
      .then(() => {
        // Data validation
        if (parsedData && parsedData.Failed !== undefined && parsedData.Success !== undefined && parsedData.Pending !== undefined) {
          const failed = parsedData.Failed;
          const success = parsedData.Success;
          const pending = parsedData.Pending;

          // Correct loading indicator variable
          $scope.loadingPieChart = false;

          // Data for a Pie Chart

          var pieChartData = {
            datasets: [{
              data: [failed, success, pending],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)'
              ],
              borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
              ],
            }],
            labels: ['Thất bại', 'Thành công', 'Chờ']
          };

          // Options for the Pie Chart
          var pieChartOptions = {
            responsive: true,
            animation: {
              animateScale: true,
              animateRotate: true
            }
          };

          // Initialize the Pie Chart
          if ($("#pieChart").length) {
            var pieChartCanvas = $("#pieChart").get(0).getContext("2d");
            var pieChart = new Chart(pieChartCanvas, {
              type: 'pie',
              data: pieChartData,
              options: pieChartOptions
            });
          }

        } else {
          console.error("Invalid data structure");
        }
      })
      .catch(error => {
        // Correct loading indicator variable
        $scope.loadingPieChart = true;
        // Handle the error
        console.error("Error:", error);
      });
  });

  //barChart
  $scope.onViewContentLoaded2 = function () {
    // Gọi hàm filterDate với selectedDisplay là rỗng
    $scope.filterDate2('');
  };

  // Đăng ký sự kiện $viewContentLoaded
  $scope.$on('$viewContentLoaded', $scope.onViewContentLoaded2);
  $scope.filterDate2 = function (selectedDisplay2) {
    $scope.loadingBarchar = true;
    $scope.data = null; // Clear old data

    $timeout(function () {
      if (selectedDisplay2 === 'day2' || selectedDisplay2 === 'month2' || selectedDisplay2 === 'year2') {
        try {
          var startDate = new Date($scope.selectedDay3);
          var endDate = new Date($scope.selectedDay4);

          DateService.generateLists(startDate, endDate);

          var dayList = DateService.getDateList();

          var sDay = dayList[0];
          var eDay = dayList[dayList.length - 1];


          var monthPicker1 = $scope.selectedMonths2['monthPicker3'];
          var monthPicker2 = $scope.selectedMonths2['monthPicker4'];

          console.log(monthPicker1, monthPicker2);

          var year1 = $scope.selectedYears2['yearPicker3'];
          var year2 = $scope.selectedYears2['yearPicker4'];

          var url, params;

          if (selectedDisplay2 === 'day2') {
            url = 'http://localhost:8080/CodeWalkers/doanh-so/ngay';
            params = { sDay: sDay, eDay: eDay };
            console.log(params);
          } else if (selectedDisplay2 === 'month2') {
            url = 'http://localhost:8080/CodeWalkers/doanh-so/thang';
            params = { sMonth: monthPicker1.month, eMonth: monthPicker2.month, sYear: monthPicker1.year, eYear: monthPicker2.year };
          } else if (selectedDisplay2 === 'year2') {
            url = 'http://localhost:8080/CodeWalkers/doanh-so/nam';
            params = { sYear: year1, eYear: year2 };
          }

          $http({
            method: 'POST',
            url: url,
            params: params,
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(function (response) {
              console.log(response.data);

              // Sử dụng hàm generateColors để tạo mảng màu
              var colors = generateColors(response.data.length);

              var data = {
                labels: response.data.map(item => item.tenLoai),
                datasets: [{
                  label: '# of Votes',
                  data: response.data.map(item => item.soLuong),
                  backgroundColor: colors.backgroundColor,
                  borderColor: colors.borderColor,
                  borderWidth: 1,
                  fill: false
                }]
              };

              var options = {
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                },
                legend: {
                  display: false
                },
                elements: {
                  point: {
                    radius: 0
                  }
                }
              };

              // Vẽ biểu đồ
              if ($("#barChart").length) {
                var barChartCanvas = $("#barChart").get(0).getContext("2d");
                var barChart = new Chart(barChartCanvas, {
                  type: 'bar',
                  data: data,
                  options: options
                });
              }
            })
            .catch(function (error) {
              // Xử lý lỗi khi có
              console.log(error);
            })
            .finally(function () {
              $scope.loadingBarchar = false;
            });
        } catch (error) {
          console.error("Error:", error.message);
          // Xử lý lỗi khi có
          $scope.loadingBarchar = false;
        }
      }
    }, 1000); // Set timeout to 1 second (1000 milliseconds)

     //tồn kho
    $timeout(function () {
      if (selectedDisplay2 === 'stock') {
        try {
          $http.get('http://localhost:8080/CodeWalkers/ton').then(function (response) {
            console.log(response.data);

              
            // Sử dụng hàm generateColors để tạo mảng màu
            var colors = generateColors(response.data.length);

            var data = {
              labels: response.data.map(item => item[0]),
              datasets: [{
                label: '# of Votes',
                data: response.data.map(item => item[1]),
                backgroundColor: colors.backgroundColor,
                borderColor: colors.borderColor,
                borderWidth: 1,
                fill: false
              }]
            };

            var options = {
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              legend: {
                display: false
              },
              elements: {
                point: {
                  radius: 0
                }
              }
            };

            // Vẽ biểu đồ
            if ($("#barChart").length) {
              var barChartCanvas = $("#barChart").get(0).getContext("2d");
              var barChart = new Chart(barChartCanvas, {
                type: 'bar',
                data: data,
                options: options
              });
            }
          })
            .catch(function (error) {
              // Xử lý lỗi khi có
              console.log(error);
            })
            .finally(function () {
              $scope.loadingBarchar = false;
            });
        } catch (error) {
          console.error("Error:", error.message);
          // Xử lý lỗi khi có
          $scope.loadingBarchar = false;
        }
      }
    }, 1000);

    // dèault
    $timeout(function () {
      if (selectedDisplay2 === '') {
        try {
          var year1 = new Date().getFullYear();
          var year2 = new Date().getFullYear();
  
    
          $http({
            method: 'POST',
            url: 'http://localhost:8080/CodeWalkers/doanh-so/nam',
            params: {sYear: year1, eYear: year2}, // Dữ liệu gửi đi trong request body
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(function (response) {
              console.log(response.data);
    
              // Sử dụng hàm generateColors để tạo mảng màu
              var colors = generateColors(response.data.length);
    
              var data = {
                labels:  response.data.map(item => item.tenLoai),
                datasets: [{
                  label: '# of Votes',
                  data: response.data.map(item => item.soLuong),
                  backgroundColor: colors.backgroundColor,
                  borderColor: colors.borderColor,
                  borderWidth: 1,
                  fill: false
                }]
              };
    
              var options = {
                scales: {
                  yAxes: [{
                    ticks: {
                      beginAtZero: true
                    }
                  }]
                },
                legend: {
                  display: false
                },
                elements: {
                  point: {
                    radius: 0
                  }
                }
              };
    
              // Vẽ biểu đồ
              if ($("#barChart").length) {
                var barChartCanvas = $("#barChart").get(0).getContext("2d");
                var barChart = new Chart(barChartCanvas, {
                  type: 'bar',
                  data: data,
                  options: options
                });
              }
            })
            .catch(function (error) {
              // Xử lý lỗi khi có
              console.log(error);
            })
            .finally(function () {
              $scope.loadingBarchar = false;
            });
        } catch (error) {
          console.error("Error:", error.message);
          // Xử lý lỗi khi có
          $scope.loadingBarchar = false;
        }
      }
    }, 1000);
    
   
  };

  // Function để tạo mảng màu động
  function generateColors(count) {
    var backgroundColors = [];
    var borderColors = [];

    for (var i = 0; i < count; i++) {
      var dynamicColor = 'rgba(' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ',' +
        Math.floor(Math.random() * 256) + ',' +
        '0.2)';

      backgroundColors.push(dynamicColor);

      var borderColor = dynamicColor.replace('0.2', '1');
      borderColors.push(borderColor);
    }

    return {
      backgroundColor: backgroundColors,
      borderColor: borderColors
    };
  }









}