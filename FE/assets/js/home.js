
app.controller("HomeController", function ($scope, $http, $window, $cookies, $anchorScroll, CookieService, $timeout) {
    $scope.now = new Date(); // Lấy ngày và thời gian hiện tại
    // Giảm đi 5 ngày
    $scope.now.setDate($scope.now.getDate() - 4);
    console.log($scope.now)
    $scope.loadAllPrBs = function () {
        var url = `${host}/api/product_bs`;
        $http.get(url).then(res => {
            $scope.itemsBs = res.data;
            // Gọi loadDetail sau khi tải dữ liệu thành công
            //  $scope.loadDetail();
            $scope.numVisibleItems = 4;
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $timeout(function () {

        $scope.getMinMaxPrice = function (product) {
            // Lọc danh sách chi tiết sản phẩm theo id sản phẩm
            var filteredDetails = $scope.itemsBs.filter(detail => detail.product.id === product.id);
            // Lấy giá thấp nhất và cao nhất từ danh sách chi tiết sản phẩm
            var minPrice = Math.min(...filteredDetails.map(detail => detail.price));
            var maxPrice = Math.max(...filteredDetails.map(detail => detail.price));

            return { min: minPrice, max: maxPrice };
        };
        $(document).ready(function () {
            // Chọn container của carousel
            var carouselContainer = $('.owl-carousel');
            // Sử dụng vòng lặp để thêm các slide từ dữ liệu
            for (var i = 0; i < $scope.itemsBs.length; i++) {
                var product = $scope.itemsBs[i].product;
                var imageLink = `assets/img/product/sp1/${product.listImage[0].link}`;
                var price = $scope.itemsBs[i].price;

                var slide = $(`
              <div class=" border"  style="height:440px; cursor:pointer;">
                <a href="#/product-detail/${product.id}">
                  <div class="card h-100">
                      <img class=" animated flipInX bg-light mb-3" style="height:280px;"  src="${imageLink}" class="card-img-top" alt="${product.name}">
                      <div class="card-body">
                          <h5 class="card-title fw-bold">${product.name}</h5>
                      </div>
                      <h5 class="card-title text-start ml-4 text-secondary" >${price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                  </div>
                  </a>
              </div>`
                );

                carouselContainer.append(slide);
            }

            // Khởi tạo Owl Carousel
            carouselContainer.owlCarousel({
                loop: true,
                margin: 20,
                nav: true,
                items: 3,
                autoplay: true,
                autoplayTimeout: 2000,
                autoplaySpeed: 800, // Tốc độ chuyển động (milliseconds)
                smartSpeed: 800, // Tốc độ tự động và kiểu chuyển động mượt mà
                navText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
                animateOut: 'fadeOut',
                animateIn: 'flipInX'
            });

            // Bắt sự kiện nút Prev
            // Bắt sự kiện nút Custom Prev
            $(".owl-custom-prev").click(function () {
                carouselContainer.trigger('prev.owl.carousel');
            });

            // Bắt sự kiện nút Custom Next
            $(".owl-custom-next").click(function () {
                carouselContainer.trigger('next.owl.carousel');
            });
        });
        
    }, 150)

});