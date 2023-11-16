app.controller("DetailController", function ($scope, $http, $routeParams, CookieService, $cookies, $anchorScroll, $filter) {
  $anchorScroll("pageContent");
  $scope.items = [];
  $scope.itemsBs = [];
  $scope.img = [];
  $scope.itemDetail = [];
  $scope.sizes = [];
  $scope.sizesPr = [];
  $scope.colorPr = [];
  $scope.selectedColor = 0;
  $scope.productSizes = {};
  $scope.list = [];
  var cartId = $cookies.get('cartId');
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
      $scope.totalQuantity = 0;
      $scope.itemDetail = res.data;
      console.log($scope.itemDetail, "here ")
      $scope.img = $scope.itemDetail[0].product.listImage;
      $scope.productId = $scope.itemDetail[0].product.id;
      $scope.currentImageSource = `assets/img/product/sp1/${$scope.itemDetail[0].product.listImage[0].link}`;
      for (var i = 0; i < $scope.itemDetail.length; i++) {
        $scope.sizesPr.push({
          name: $scope.itemDetail[i].size.name,
          checkcl: true
        });
        $scope.colorPr.push({
          name: $scope.itemDetail[i].color.name,
        });
        $scope.totalQuantity += $scope.itemDetail[i].quantity;
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
    $scope.loadSizeByCl($scope.productDTId, idColor)
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
        if ($scope.selectedValue === '') {
          $scope.totalQuantity += $scope.list[i].quantity;
        } else {
          if ($scope.list[i].size.id == $scope.selectedValue) {
            $scope.totalQuantity += $scope.list[i].quantity;
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
      $scope.checkSize = true;
      return { 'background-color': $scope.selectedValue === size.id ? 'lightblue' : '' };
    } else {
      $scope.checkSize = false;
      return { 'background-color': '#dfd8d8', 'cursor': 'not-allowed' };
    }
  };
  $scope.checkCl = function (size) {
    if ($scope.sizesPr.some(sz => sz.name === size.name)) {
      return { 'cursor': 'pointer' };
    } else {
      return { 'cursor': 'not-allowed' };
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
  $scope.formattedPrice = function (price) {
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
    if ($scope.selectedColor === 0) {
      for (var i = 0; i < $scope.itemDetail.length; i++) {
        if ($scope.itemDetail[i].size.id == size)
          $scope.totalQuantity += $scope.itemDetail[i].quantity;
      }
    } else {
      for (var i = 0; i < $scope.list.length; i++) {
        if ($scope.list[i].size.id == size)
          $scope.totalQuantity += $scope.list[i].quantity;
      }
    }
  };
  $scope.idCart = 0;
  // Hàm tạo giỏ hàng
  $scope.createCart = function () {
    var url = `${host}/api/CreateCart`;
    return $http.post(url).then(function (response) {
      $scope.idCart = response.data.id;
      CookieService.set('cartId', $scope.idCart, 7); // Lưu cartId vào Cookie trong 7 ngày
      console.log(response.data);
      return response.data; // Trả về dữ liệu cho promise
    }).catch(function (error) {
      console.error('Lỗi: ', error);
      return $q.reject(error); // Trả về lỗi cho promise
    });
  };

  // Hàm thêm sản phẩm vào giỏ hàng
  var dataUserCart = localStorage.getItem('userCartData');
  $scope.addCart = function (sl) {
    var cartId = $cookies.get('cartId');
    var productId = $scope.productId;
    var selectedValue = $scope.selectedValue;
    var selectedColor = $scope.selectedColor || undefined; // Xử lý trường hợp không chọn màu sắc
       
    if (!selectedColor) {
      toastr.error("Vui lòng chọn màu sắc ","Warning")
      return;
    }
    if ($scope.quantity === null || $scope.quantity === undefined) {
      console.error('Giá trị quantity không hợp lệ.');
      return;
    }
  
    if (!productId || !selectedValue) {
      console.log(productId, selectedValue);
      toastr.error("Vui lòng chọn kích cỡ ","Warning")
      return;
    }
  
    if (!cartId || cartId==95) {
      // Thực hiện khi cartId không hợp lệ hoặc không tồn tại
      $scope.createCart().then(function (cartIdResponse) {
        var cartIdResponse = $cookies.get('cartId');
        $scope.loadAllPrCart(cartIdResponse);
        $scope.cartIdFinal = cartIdResponse;
        console.log("Cart ID created:", $scope.cartIdFinal);
        $scope.sendDetailAddRequest(sl,$scope.cartIdFinal);
        // $scope.loadAllPrCart($scope.cartIdFinal);
      });   
    } else {
      if(!dataUserCart){
        $scope.cartIdFinal = cartId;
        console.log("Using existing Cart ID:", cartId);
        $scope.sendDetailAddRequest(sl,cartId);
      }else{
        $scope.cartIdFinal = dataUserCart;
        console.log("Using existing Cart ID:", dataUserCart);
        $scope.sendDetailAddRequest(sl,dataUserCart);
      }
      }
    
  };
  
  $scope.sendDetailAddRequest = function (sl,idCart) {
    var url = `${host}/api/detailAdd/${idCart}/${$scope.productId}/${$scope.selectedValue}/${$scope.selectedColor || ''}`;
    var data = { quantity: sl };
    console.log("Sending request to:", url);
    $http.post(url, data)
      .then(function (response) {
        console.log('Cập nhật thành công');
        $scope.loadAllPr();
        $scope.loadAllPrCart(idCart);
        toastr.success('Thêm sản phẩm thành công!', 'Thông báo');
        // Mở modal (nếu cần)
      })
      .catch(function (error) {
        console.error('Cập nhật thất bại:', error);
        toastr.error('Có lỗi xảy ra khi thêm sản phẩm', 'Lỗi');
      });
  };
  



  // Hàm để gọi giá trị đã chọn
  $scope.callSelectedValue = function () {
    // Gọi giá trị đã chọn ở đây (ví dụ: in ra console)
    console.log('Giá trị đã chọn: ' + $scope.selectedValue);
  };
  $scope.quantity = 1;
  $scope.increaseQuantity = function (quantity) {
    $scope.quantity++;
  };

  // Hàm xử lý khi người dùng giảm số lượng
  $scope.decreaseQuantity = function (quantity) {
    if ($scope.quantity > 1) {
      $scope.quantity--;
    }
  };
  $scope.onInputKeyPress = function (event, quantity) {
    if (event.keyCode === 13) { // Kiểm tra nếu phím Enter (keyCode=13)
      if (quantity <= 0) {
        $scope.quantity = 1;
      } else {
        $scope.quantity = quantity;
      }
    }
  };
  $scope.onInputBlur = function (quantity) {
    if (quantity <= 0) {
      $scope.quantity = 1;
    } else {
      $scope.quantity = quantity;
    }
  };
  $scope.loadAllPrCart = function (id) {
    var url = `${host}/api/detail`;
    var config = {
      params: { idCart: id }
    };
    $http.get(url, config).then(function (res) {
      $scope.items = res.data;
      var badge = document.querySelector(".badge");
      badge.textContent = $scope.items.length;
      // Thay đổi số trên biểu tượng
      console.log("------>ád", $scope.items.length)
    }).catch(function (error) {
      console.log("Lỗi khi tải danh sách sản phẩm trong giỏ hàng", error);
    })
  }
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