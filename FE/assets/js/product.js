app.controller("ProductController", function ($scope, $http, $routeParams, $location, $anchorScroll) {
    $anchorScroll("pageContent");
    $scope.brands = [];
    $scope.sizes = [];
    $scope.categories = [];
    $scope.materials = [];
    $scope.colors = [];
    $scope.items = [];
    $scope.itemsSort = [];
    $scope.brands = [];
    $scope.itemsBs = [];

    $scope.loadBrand = function () {
        var url = `${host}/api/product/brand`;
        $http.get(url).then(res => {
            $scope.brands = res.data;
            console.log(res.data);
            console.log("Success", res);
    
            // Check if brandName is provided in the URL
            var brandNameFromUrl = $routeParams.brandName;
            if (brandNameFromUrl) {

                // Your logic to select the brand based on brandNameFromUrl
                // For example, mark the brand as selected
                var selectedBrand = $scope.brands.find(function (brand) {
                    console.log(brandNameFromUrl,brand,'here');

                    return brand.name === brandNameFromUrl;
                });
    
                if (selectedBrand) {
                    $scope.chooseBr(selectedBrand);
                }
            }
        }).catch(error => {
            console.log("Error", error);
        });
    };
    
    $scope.loadCategory = function () {
        var url = `${host}/api/product/category`;
        $http.get(url).then(res => {
            $scope.categories = res.data;
            console.log(res.data);
            console.log("Success", res);
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadMaterial = function () {
        var url = `${host}/api/product/material`;
        $http.get(url).then(res => {
            $scope.materials = res.data;
            console.log(res.data);
            console.log("Success", res);
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadColor = function () {
        var url = `${host}/api/product/color`;
        $http.get(url).then(res => {
            $scope.colors = res.data;
            console.log(res.data);
            console.log("Success", res);
        }).catch(error => {
            console.log("Error", error);
        });
    }
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
    $scope.selectedValue = '';
    // Hàm để cập nhật giá trị đã chọn
    $scope.selectSize = function (size) {
        $scope.selectedValue = size;
    };

    // Hàm để gọi giá trị đã chọn
    $scope.callSelectedValue = function () {
        if ($scope.selectedValue) {
            // Gọi giá trị đã chọn ở đây (ví dụ: in ra console)
            console.log('Giá trị đã chọn: ' + $scope.selectedValue);
        } else {
            console.log('Chưa chọn giá trị.');
        }
    };
    angular.element(document).on('keypress', function (event) {
        if (event.key === 'Enter') {
            // Xử lý tìm kiếm ở đây
            if ($scope.keyword == "") {
                $scope.loadAllPr();
            }
            $scope.keyword = $scope.name;
            $scope.loadSearch();
        }
    });
    $scope.loadSearch = function () {
        var url = `${host}/api/search/${$scope.keyword}`;
        $http.get(url).then(res => {
            $scope.items = res.data;
            console.log(res.data);
            console.log("Success", res);
            // Kiểm tra xem danh sách sản phẩm có rỗng hay không
            if ($scope.items.length === 0) {
                $scope.products = 0;
            } else {
                $scope.products = 1;
            }
            // Gọi loadDetail sau khi tải dữ liệu thành công
            $scope.numVisibleItems = 4;
            $scope.slides = $scope.splitIntoSlides($scope.items, $scope.numVisibleItems);
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.products = 1;

    $scope.loadAllPr = function () {
        var url = `${host}/api/product_bs`;
        $http.get(url).then(res => {
            $scope.items = res.data;
            $scope.filteredItems = res.data;
            console.log(res.data);
            console.log("Success", res);
            
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
                    console.log(productPromotionsMap);
            
                    // Bước 4: Kiểm tra và áp dụng giảm giá cho từng sản phẩm
                    $scope.items.forEach((item) => {
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
                    $scope.items.forEach((item) => {
                        // Đánh dấu sản phẩm không có chương trình khuyến mãi
                        item.hasPromotion = false;
                        // Thêm trường priceWithPromo vào item
                        item.priceWithPromo = item.price;
                    });
                }
            
                console.log($scope.items);
                $scope.numVisibleItems = 4;
            }).catch((error) => {
                console.log("Error", error);
            });
            

            
            // Gọi loadDetail sau khi tải dữ liệu thành công
            $scope.numVisibleItems = 4;
            $scope.slides = $scope.splitIntoSlides($scope.items, $scope.numVisibleItems);
        }).catch(error => {
            console.log("Error", error);
        });
    }


    $scope.loadAllPr();
    $scope.sortProducts = function (sortBy) {
        // Gửi yêu cầu sắp xếp đến API Spring Boot với tiêu chí sắp xếp được truyền vào
        console.log('/api/product/sort' + sortBy)
        var url = `${host}/api/product/sort` + sortBy;
        $http.get(url).then(res => {
            $scope.filteredItems = res.data;
            $scope.sortProducts("priceAsc");

            // Kiểm tra xem danh sách sản phẩm có rỗng hay không
            if ($scope.items.length === 0) {
                $scope.products = 0;
            } else {
                $scope.products = 1;
            }
        }).catch(error => {
            console.log("Error", error);
        });
    };



    $scope.loadAllPr();
    $scope.sortProducts = function (sortBy) {
        // Gửi yêu cầu sắp xếp đến API Spring Boot với tiêu chí sắp xếp được truyền vào
        console.log('/api/product/sortBy');
        var url = `${host}/api/product/sortBy?sortBy=` + sortBy;

        $http.post(url, $scope.filteredItems).then(res => {
            $scope.filteredItems = res.data;
            console.log(res.data);
            // Gọi loadDetail sau khi tải dữ liệu thành công
        }).catch(error => {
            console.log("Error", error);
        });
    };

    $scope.loadAllPrBs = function () {
        var url = `${host}/api/get-all-pr`;
        $http.get(url).then(res => {
            $scope.itemsBs = res.data;
            console.log($scope.currentImageSource);
            console.log("itemsBs", res);
            // Gọi loadDetail sau khi tải dữ liệu thành công
            //  $scope.loadDetail();
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadAllPrBs();
    $scope.loadDetail = function (idPR) {
        var url = `${host}/api/product/${idPR}`;
        $http.get(url).then(res => {
            $scope.itemDetail = res.data;
            console.log($scope.itemDetail, "here ")
            $scope.productId = $scope.itemDetail[0].product.id;
        }).catch(error => {
            console.log("Error", error);
        });
    };

    $scope.getMinMaxPrice = function (product) {
        // Lọc danh sách chi tiết sản phẩm theo id sản phẩm
        var filteredDetails = $scope.itemsBs.filter(detail => detail.product.id === product.id);
        // Lấy giá thấp nhất và cao nhất từ danh sách chi tiết sản phẩm
        var minPrice = Math.min(...filteredDetails.map(detail => detail.price));
        var maxPrice = Math.max(...filteredDetails.map(detail => detail.price));

        return { min: minPrice, max: maxPrice };
    };

    // Trong controller AngularJS
    $scope.filterByAttributes = function () {
        var url = `${host}/api/product/filterBy`;
        var config = {
            minPrice: $scope.minPrice,
            maxPrice: $scope.maxPrice,
            sizes: $scope.sizes.filter(size => size.isSelected).map(size => size.id),
            colors: $scope.colors.filter(color => color.isSelected).map(color => color.id),
            materials: $scope.materials.filter(material => material.isSelected).map(material => material.id),
            categories: $scope.categories.filter(category => category.isSelected).map(category => category.id),
            brands: $scope.brands.filter(brand => brand.isSelected).map(brand => brand.id)
        };
        $http.post(url, config)
            .then(function (response) {
                // Xử lý dữ liệu phản hồi ở đây
                $scope.filteredProducts = response.data;
                $scope.filteredItems = $scope.items.filter(item => {
                    // Kiểm tra xem có bất kỳ phần tử nào trong filteredProducts có cùng product.id không
                    return $scope.filteredProducts.some(filteredItem => filteredItem.product.id === item.product.id);
                });

            })
            .catch(function (error) {
                console.log("Error", error);
            });
    };



    $scope.getcolorStyle = function (color) {
        if ($scope.colors.some(sz => sz.name === color.name)) {
            var style = {
                'background-color': $scope.colorMapping[color.name],
                'border': '1px solid black',
                'width': '15%'
            };

            return style;
        } else {
            return {
                'background-color': 'brown',
                'display': 'none'
            };
        }
    };
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
    $scope.check = function (color) {
        color.isSelected = !color.isSelected;
        $scope.filterByAttributes();
    };
    $scope.chooseBr = function (br) {
        br.isSelected = !br.isSelected;
        $scope.filterByAttributes();
        $scope.type= br.name;
    };
  
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

    $scope.loadAllPrBs()
    $scope.loadSize();
    $scope.loadColor();
    $scope.loadCategory();
    $scope.loadMaterial();
    $scope.loadBrand();

})