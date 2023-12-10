
app.controller("HomeController", function ($scope, $http, $timeout) {
    $scope.now = new Date(); // Lấy ngày và thời gian hiện tại
    // Giảm đi 5 ngày
    $scope.now.setDate($scope.now.getDate() - 7);
    console.log($scope.now)

    $scope.loadAllPrBs = function () {
        var url = `${host}/api/product_bs`;
        $http.get(url).then(res => {
            $scope.itemsBs2 = res.data;

            // Bước 1: Lấy thông tin chương trình khuyến mãi đang hoạt động
            var promoUrl = `${host}/api/active_promotions`;
            $http.get(promoUrl).then((promoRes) => {
                var activePromotions = promoRes.data;

                // Kiểm tra xem có chương trình khuyến mãi hay không
                if (activePromotions && activePromotions.length > 0) {
                    // Bước 2: Tạo một đối tượng để ánh xạ id sản phẩm với mảng thông tin khuyến mãi
                    var productPromotionsMap = {};

                    // Bước 3: Lặp qua các chương trình khuyến mãi
                    activePromotions.forEach((promo) => {
                        if (
                            promo.promotionDetailsList &&
                            promo.promotionDetailsList.length > 0
                        ) {
                            // Lặp qua từng chi tiết khuyến mãi của chương trình
                            promo.promotionDetailsList.forEach((promoDetail) => {
                                // Kiểm tra xem có thông tin productDetail và id hay không
                                if (
                                    promoDetail.productDetail &&
                                    promoDetail.productDetail.id
                                ) {
                                    // Nếu chưa có thông tin khuyến mãi cho sản phẩm, tạo một mảng để lưu
                                    if (!productPromotionsMap[promoDetail.productDetail.id]) {
                                        productPromotionsMap[promoDetail.productDetail.id] = [];
                                    }

                                    // Thêm thông tin khuyến mãi vào mảng
                                    productPromotionsMap[promoDetail.productDetail.id].push(
                                        promoDetail
                                    );

                                    // Thêm trường promotionId vào chi tiết khuyến mãi
                                    promoDetail.promotionId = promo.id;
                                }
                            });
                        }
                    });

                    // In ra để kiểm tra

                    // Bước 4: Kiểm tra và áp dụng giảm giá cho từng sản phẩm
                    $scope.itemsBs2.forEach((item) => {
                        // Tìm thông tin khuyến mãi áp dụng cho sản phẩm
                        var productPromotion = productPromotionsMap[item.id];

                        if (productPromotion && productPromotion.length > 0) {
                            // Bước 5: Sắp xếp chi tiết khuyến mãi theo thời gian giảm dần
                            productPromotion.sort((a, b) => b.createdDate - a.createdDate);

                            // Bước 6: Lấy chi tiết khuyến mãi mới nhất
                            var latestPromoDetail = productPromotion[0];

                            // Thêm trường priceWithPromo vào item
                            item.priceWithPromo = latestPromoDetail
                                ? latestPromoDetail.discount
                                : item.price;

                            // Thêm trường promotionId vào item
                            item.promotionId = latestPromoDetail ? latestPromoDetail.promotionId : null;

                            // Đánh dấu sản phẩm có chương trình khuyến mãi
                            item.hasPromotion = true;
                        } else {
                            // Nếu không có chương trình khuyến mãi, giá giữ nguyên
                            // Đánh dấu sản phẩm không có chương trình khuyến mãi
                            item.hasPromotion = false;
                            // Thêm trường priceWithPromo vào item
                            item.priceWithPromo = item.price;
                        }
                    });
                } else {
                    // Nếu không có chương trình khuyến mãi, giá giữ nguyên cho tất cả sản phẩm
                    $scope.itemsBs2.forEach((item) => {
                        // Đánh dấu sản phẩm không có chương trình khuyến mãi
                        item.hasPromotion = false;
                        // Thêm trường priceWithPromo vào item
                        item.priceWithPromo = item.price;
                    });
                }
                $scope.numVisibleItems = 4;
            }).catch((error) => {
                console.log("Error", error);
            });

        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadAllPrBs();
    $scope.loadAllDetail = function () {
        var url = `${host}/api/get-all-pr`;
        $http.get(url).then(res => {
            $scope.itemsDetail = res.data;
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadAllDetail();
    $timeout(function () {

    
        $scope.getTotalQuantity = function(item) {
            // Lọc danh sách itemsBs2 theo id sản phẩm
            var filteredItems = $scope.itemsDetail.filter(prDt => prDt.product.id === item.product.id);
            // Sử dụng reduce để tính tổng số lượng
            $scope.totalQuantity= filteredItems.reduce((total, prDt) => total + prDt.quantity, 0);
            return $scope.totalQuantity;
        };
        
        
        $scope.getMinMaxPrice = function (product) {
            // Lọc danh sách chi tiết sản phẩm theo id sản phẩm
            var filteredDetails = $scope.itemsBs2.filter(detail => detail.product.id === product.id);
            // Lấy giá thấp nhất và cao nhất từ danh sách chi tiết sản phẩm
            var minPrice = Math.min(...filteredDetails.map(detail => detail.price));
            var maxPrice = Math.max(...filteredDetails.map(detail => detail.price));

            return { min: minPrice, max: maxPrice };
        };
        $(document).ready(function () {
            // Chọn container của carousel
            var carouselContainer = $('.owl-carousel');
            // Sử dụng vòng lặp để thêm các slide từ dữ liệu
            var listItemPromo = $scope.itemsBs2.filter(item => item.hasPromotion === true);
            for (var i = 0; i < listItemPromo.length; i++) {
                var hasPromotion;
                var product = listItemPromo[i].product;
                var item = listItemPromo[i];
                var imageLink = `assets/img/product/sp1/${product.listImage[0].link}`;
                var price = listItemPromo[i].price;
                 hasPromotion = listItemPromo[i].hasPromotion;
                
                var slide = $(`
                    <div class="border" style="height:440px; cursor:pointer;">
                        <a href="#/product-detail/${item.product.id}${hasPromotion ? '/' + item.promotionId : ''}">
                            <div class="card h-100">
                                <img class="animated flipInX bg-light mb-3" style="height:280px;" src="${imageLink}" alt="${product.name} product image" class="card-img-top">
                                <div class="card-body">
                                    <h5 class="card-title fw-bold">${product.name}</h5>
                                </div>
                                ${hasPromotion ?
                                    `<div class="row">
                                        <h5 class="card-title col text-start ml-4 text-danger">${item.priceWithPromo.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                        <h5 class="card-title text-start ml-4 text-secondary col text-decoration-line-through">${price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>
                                    </div>` :
                                    `<h5 class="card-title text-start ml-4 text-secondary col">${price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h5>`
                                }
                            </div>
                        </a>
                    </div>
                `);
            
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

    }, 350)

});