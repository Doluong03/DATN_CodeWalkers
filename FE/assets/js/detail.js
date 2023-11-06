app.controller("DetailController", function ($scope, $http, $routeParams, CookieService,$cookies, $anchorScroll,$filter) {
  $anchorScroll("pageContent");
  $scope.items = [];
  $scope.itemsBs = [];
  $scope.img = [];
  $scope.itemDetail = [];
  $scope.sizes = [];
  $scope.sizesPr = [];
  $scope.colorPr = [];
  $scope.selectedColor=0;
  $scope.productSizes = {};
  $scope.list = [];
  $scope.colorMapping = {
    'Đỏ': 'red',
    'Xanh dương': 'blue',
    'Xanh lá': 'green',
    'Vàng': 'yellow',
    'Cam': 'orange',
    'Tím': 'purple',
    'Hồng': 'pink',
    'Đen': 'black',
    'Trắng': 'White',
    'Xám': 'grey',
    'Cam': 'orange',
    'Nâu': 'brown'
    /* Thêm các ánh xạ màu khác ở đây */
  };
  // Hàm để thay đổi nguồn ảnh
  $scope.changeImage = function (newSource) {
    $scope.currentImageSource = `assets/img/product/sp1/${newSource}`;
  };
  $scope.productDTId = $routeParams.productId;
  $scope.currentImageSource = null;
  $scope.loadDetail = function () {
    var url = `${host}/api/product/${$scope.productDTId}`;
    $http.get(url).then(res => {
      $scope.totalQuantity= 0;
      $scope.itemDetail = res.data;
      console.log( $scope.itemDetail ,"here ")
      $scope.img = $scope.itemDetail[0].product.listImage;
      $scope.productId = $scope.itemDetail[0].product.id;
      $scope.currentImageSource = `assets/img/product/sp1/${$scope.itemDetail[0].product.listImage[0].link}`;
      for (var i = 0; i < $scope.itemDetail.length; i++) {
        $scope.sizesPr.push({
          name: $scope.itemDetail[i].size.name,
        });
        $scope.colorPr.push({
          name: $scope.itemDetail[i].color.name,
        });
        $scope.totalQuantity+= $scope.itemDetail[i].quantity;
      }
      console.log(res.data);
      console.log("Success", res);
    }).catch(error => {
      console.log("Error", error);
    });
  };
  $scope.totalQuantity = 0;
  $scope.check = function (idColor) {
    $scope.checkPrice = false; // Mặc định, không tìm thấy giá
    $scope.price = 0; // Đặt giá thành 0
    $scope.totalQuantity = 0;
    $scope.loadSizeByCl($scope.productDTId,idColor)
    for (var i = 0; i < $scope.itemDetail.length; i++) {
      if ($scope.itemDetail[i].color.id === idColor) {
        $scope.checkPrice = true; 
        $scope.price = $scope.itemDetail[i].price; // Gán giá của sản phẩm đó
        $scope.selectedColor = idColor;
        break; // Dừng vòng lặp khi đã tìm thấy sản phẩm
      }
    }
  };
  $scope.loadSizeByCl = function (productId, clId) {
    var url = `${host}/api/getSizeBycolor`;
    var config = {
        params: {
            idPr: productId,
            idColor: clId,
        }
    };
    // Sử dụng $http.get trả về một promise
    return $http.get(url, config).then(function (res) {
        $scope.list = res.data;
        console.log(url, config);
        $scope.totalQuantity = 0;
        $scope.selectedValue = '';
        for (var i = 0; i < $scope.list.length; i++) {
          if($scope.selectedValue === ''){
            $scope.totalQuantity+= $scope.list[i].quantity;
          }else{
              if($scope.list[i].size.id == $scope.selectedValue ){
              $scope.totalQuantity+= $scope.list[i].quantity;
            }
          }
        }
        // Lưu trữ danh sách kích thước vào productSizes
        if (!$scope.productSizes[productId]) {
            $scope.productSizes[productId] = {};
        }
        $scope.productSizes[productId][clId] = $scope.list.map(item => item.size);
        $scope.sizesPr = $scope.productSizes[productId][clId];
        console.log("Danh sách kích thước", $scope.productSizes);
    }).catch(function (error) {
        console.log("Lỗi khi tải danh sách kích thước", error);
    });
};

  $scope.getcolorStyle = function (color) {
    if ($scope.colorPr.some(sz => sz.name === color.name)) {
        var style = {
            'background-color': $scope.colorMapping[color.name],
            'border': '1px solid black',
        };

        if (color.id === $scope.selectedColor) {
          var style = {
            'background-color': $scope.colorMapping[color.name],
            'box-shadow': '2px 2px 5px #888', 
        };
            style.border = '2px solid red';
            style.transition = 'border 0.2s'; // Thêm hiệu ứng chuyển động
        }
        return style;
    } else {
        return {
            'background-color': 'brown',
            'display': 'none'
        };
    }
};

function colorToRGBA(color) {
  var cvs, ctx;
  cvs = document.createElement('canvas');
  cvs.height = 1;
  cvs.width = 1;
  ctx = cvs.getContext('2d');
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);
  return String(ctx.getImageData(0, 0, 1, 1).data);
}
  $scope.getTextColor = function (colorName) {
    if (colorName in $scope.colorMapping) {
        // Nếu tên màu có trong ánh xạ, sử dụng ánh xạ để lấy mã màu CSS
        var backgroundColor = $scope.colorMapping[colorName];
        var rgb = colorToRGBA(backgroundColor);
        var brightness = calculateBrightness(rgb)
        if (brightness > 200) {
          return 'black';
      } else if (brightness > 128) {
          return 'gray';
      } else {
          return 'white';
      }
  } else {
      return 'white';
  }
};

function calculateBrightness(rgb) {
  if (typeof rgb === 'string') {
      const rgbArray = rgb.split(",").map(Number);
      const r = rgbArray[0];
      const g = rgbArray[1];
      const b = rgbArray[2];
      const brightness = Math.sqrt(0.299 * r ** 2 + 0.587 * g ** 2 + 0.114 * b ** 2);
      return brightness;
  } else {
      console.error('Input is not a string.');
      return 0; // Hoặc giá trị mặc định tùy theo trường hợp.
  }
}

  $scope.getSizeStyle = function (size) {
    if ($scope.sizesPr.some(sz => sz.name === size.name)) {
      return { 'background-color': $scope.selectedValue === size.id ? 'lightblue' : '' };
    } else {
      return { 'background-color': ' #eee4e4d5' };
    }
  };
  console.log($scope.colorPr, "aaa")
 

  // Sử dụng ng-click để chọn size

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
  $scope.loadColor = function () {
    var url = `${host}/api/detail/color`;
    $http.get(url).then(res => {
      $scope.colors = res.data;
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
  $scope.formattedPrice = function(price) {
    return $filter('vndCurrency')(price);
};
  $scope.getPriceDisplay = function () {
    if ($scope.itemDetail.length === 1) {
        return $scope.itemDetail[0].price; // Nếu chỉ có một giá, trả về giá đó
    } else if ($scope.itemDetail.length > 1) {
        // Tìm giá thấp nhất và lớn nhất
        var minPrice = $scope.itemDetail.reduce((min, item) => Math.min(min, item.price), $scope.itemDetail[0].price);
        var maxPrice = $scope.itemDetail.reduce((max, item) => Math.max(max, item.price), $scope.itemDetail[0].price);
        return minPrice !== maxPrice ? `${$scope.formattedPrice(minPrice)} - ${$scope.formattedPrice(maxPrice)}` : `${$scope.formattedPrice(minPrice)} `;
    } else {
        return "Không có giá"; // Nếu không có giá
    }
};


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
  $scope.selectSize = function (size) {
    $scope.totalQuantity = 0;
    $scope.selectedValue = size;
    if($scope.selectedColor === 0){
      for (var i = 0; i < $scope.itemDetail.length; i++) {
        if($scope.itemDetail[i].size.id == size )
        $scope.totalQuantity+= $scope.itemDetail[i].quantity;
      }
    }else{
      for (var i = 0; i < $scope.list.length; i++) {
        if($scope.list[i].size.id == size )
        $scope.totalQuantity+= $scope.list[i].quantity;
      }
    }
  };
  $scope.idCart = 0;
  // Hàm tạo giỏ hàng
  $scope.createCart = function () {
    var url = `${host}/api/CreateCart`;
    $http.post(url).then(function (response) {
      $scope.idCart = response.data.id;
      CookieService.set('cartId', $scope.idCart, 7); // Lưu cartId vào Cookie trong 7 ngày
      console.log(response.data);
    }).catch(function (error) {
      console.error('Lỗi: ', error);
    });
  };
  // Hàm thêm sản phẩm vào giỏ hàng
  $scope.addCart = function () {
    var cartId = $cookies.get('cartId');
    console.log("cook->",cartId)
    if (!cartId) {
      $scope.createCart();
    } else {
      var url = `${host}/api/detailAdd/`;
      var productId = $scope.productId;
      var selectedValue = $scope.selectedValue;
      var cartId = $scope.idCart || sessionStorage.cartId || CookieService.get('cartId');
      // Kiểm tra giá trị $scope.selectedColor
      if ($scope.selectedColor !== undefined) {
        var idCl= $scope.selectedColor;
      }
      // Kiểm tra giá trị productId và selectedValue
      if (productId && selectedValue && cartId) {
        // Sử dụng $http.post để gửi yêu cầu cập nhật đến API
        $http.post(url +cartId+'/'+productId +'/'+selectedValue+"/"+idCl)
          .then(function () {
            // Xử lý khi cập nhật thành công
            console.log('Cập nhật thành công');
            $scope.loadAllPr();
            $scope.loadAllPrCart();
            toastr.success('Thêm sản phẩm thành công!', 'Thông báo');
            // Sử dụng jQuery để mở modal
          })
          .catch(function (error) {
            // Xử lý khi cập nhật thất bại
            console.error('Cập nhật thất bại', error);
          });
      } else {
        // Xử lý khi giá trị không hợp lệ hoặc không có cartId
        console.error('Giá trị không hợp lệ hoặc không tìm thấy cartId');
      }
    }
  };


  // Hàm để gọi giá trị đã chọn
  $scope.callSelectedValue = function () {
    // Gọi giá trị đã chọn ở đây (ví dụ: in ra console)
    console.log('Giá trị đã chọn: ' + $scope.selectedValue);
  };

  $scope.loadAllPr();
  $scope.loadSize();
  $scope.loadColor();
  $scope.callSelectedValue();
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
});