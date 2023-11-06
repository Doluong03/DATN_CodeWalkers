app.controller("DetailController", function ($scope, $http, $routeParams, $rootScope, $anchorScroll) {
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
    $scope.productDTId = $routeParams.productId;
    $scope.currentImageSource= null;
    $scope.loadDetail = function () {
        console.log($scope.productId);
        var url = `${host}/api/product/${$scope.productDTId}`;
        $http.get(url).then(res => {
            $scope.itemDetail = res.data;
            $scope.img = $scope.itemDetail.product.listImage;
            $scope.productId = $scope.itemDetail.product.id;
            $scope.currentImageSource = `assets/img/product/sp1/${$scope.itemDetail.product.listImage[0].link}`;
            console.log(res.data);
            console.log("------->",$scope.itemDetail.product.name);
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
          console.log("IDPR:",$scope.productId);
      };
      $scope.addCart = function () {
        var url = `${host}/api/detailAdd/`;
        var productId = $scope.productId;
        var selectedValue = $scope.selectedValue;
        // Kiểm tra giá trị productId và selectedValue
        if (productId && selectedValue) {
            // Sử dụng $http.post để gửi yêu cầu cập nhật đến API
            $http.post(`${url}1/${productId}/${selectedValue}`)
                .then(function () {
                    // Xử lý khi cập nhật thành công
                    console.log('Cập nhật thành công');
                    $scope.loadAllPr();
                    $scope.loadAllPrCart();
                    $('#myModal').modal('show'); // Sử dụng jQuery để mở modal
                    
                })
                .catch(function (error) {
                    // Xử lý khi cập nhật thất bại
                    console.error('Cập nhật thất bại', error);
                });
        } else {
            // Xử lý khi giá trị không hợp lệ
            console.error('Giá trị không hợp lệ');
        }
    };
      // Hàm để gọi giá trị đã chọn
      $scope.callSelectedValue = function() {
              // Gọi giá trị đã chọn ở đây (ví dụ: in ra console)
              console.log('Giá trị đã chọn: ' + $scope.selectedValue);
      };
      $scope.loadAllPr();
      $scope.loadSize();
      $scope.callSelectedValue();

});