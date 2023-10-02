app.controller("DetailController", function ($scope, $http, $routeParams, $location, $anchorScroll) {
    $anchorScroll("pageContent");
    $scope.items = [];
    $scope.itemsBs = [];
    $scope.img = [];
    $scope.itemDetail = [];
    $scope.sizes = [];
    // Hàm để thay đổi nguồn ảnh
    $scope.changeImage = function (newSource) {
        $scope.currentImageSource = `assets/img/product/sp1/${newSource}`;
    };

    $scope.loadDetail = function () {
        $scope.productId = $routeParams.productId;
        console.log($scope.productId);
        var url = `${host}/api/product/${$scope.productId}`;
        $http.get(url).then(res => {
            $scope.itemDetail = res.data;
            $scope.img = $scope.itemDetail.product.listImage;
            $scope.currentImageSource = `assets/img/product/sp1/${$scope.itemDetail.product.listImage[0].link}`;
            console.log(res.data);
            console.log("Success", res);
        }).catch(error => {
            console.log("Error", error);
        });
    };

    $scope.loadSize = function () {
            var url = `${host}/api/detail/size`;
            $http.get(url).then(res => {
                $scope.sizes = res.data;
                console.log(res.data);
                console.log("Success", res);
            }).catch(error => {
                console.log("Error", error);
            });
        }
    $scope.loadAllPr = function () {
        var url = `${host}/api/product`;
        $http.get(url).then(res => {
            $scope.items = res.data;
            console.log(res.data);
            console.log("Success", res);
            // Gọi loadDetail sau khi tải dữ liệu thành công
            $scope.loadDetail();
            $scope.numVisibleItems = 4;
            $scope.slides = $scope.splitIntoSlides($scope.items, $scope.numVisibleItems);
        }).catch(error => {
            console.log("Error", error);
        });
    }

    // Hàm để thay đổi chỉ mục slide
    $scope.splitIntoSlides = function (items, numItemsPerSlide) {
        var slides = [];
        for (var i = 0; i < items.length - numItemsPerSlide + 1; i++) {
          slides.push(items.slice(i, i + numItemsPerSlide));
        }
        return slides;
      };
    $scope.activeSlideIndex = 0;

    $scope.prevSlide = function () {
        if ($scope.activeSlideIndex > 0) {
          $scope.activeSlideIndex--;
        } else {
          $scope.activeSlideIndex = $scope.slides.length - 1;
        }
      };
      
      $scope.nextSlide = function () {
        if ($scope.activeSlideIndex < $scope.slides.length - 1) {
          $scope.activeSlideIndex++;
          
        } else {
          $scope.activeSlideIndex = 0;
        }
      };

      $scope.selectedValue = '';
      // Hàm để cập nhật giá trị đã chọn
      $scope.selectSize = function(size) {
          $scope.selectedValue = size;
      };

      // Hàm để gọi giá trị đã chọn
      $scope.callSelectedValue = function() {
          if ($scope.selectedValue) {
              // Gọi giá trị đã chọn ở đây (ví dụ: in ra console)
              console.log('Giá trị đã chọn: ' + $scope.selectedValue);
          } else {
              console.log('Chưa chọn giá trị.');
          }
      };
      $scope.loadAllPr();
      $scope.loadSize();
});