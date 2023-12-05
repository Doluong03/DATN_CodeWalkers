window.promotionController = function ($scope, $http, $window, $timeout, $filter, $location, VoucherService, $routeParams) {
    $scope.listPromotions = [];
    $scope.pageNo = 1;
    $scope.totalPage = 0;
    $scope.pageCurrent = 1;
    $scope.hoveredPage = null;
    $scope.itemsPerPage = 3;
    $scope.hoveredPage = null;
    $scope.selectedStatus = [];
    $scope.formattedEndDate2 = '';
    $scope.datePickerFormat = 'dd/MM/yyyy';
    $scope.altInputFormats = ['d!/M!/yyyy'];
    $scope.format = 'dd/MM/yyyy';
    $scope.dateTimePickerOpened1 = false;
    $scope.dateTimePickerOpened2 = false;
    $scope.isPercent = true;
    $scope.isCash = false;
    $scope.selectedOption = "Sản phẩm";
    $scope.isSearchProduct = true;
    $scope.isSearchCategoryPr = false;
    $scope.category = [];
    $scope.formAddPromDetail = {
        productDetail: { id: "" },
        promotion: { id: "" },
        discount: 0,
        status: true
    }
    $scope.formAddPro = {
        name: "",
        description: "",
        typeDiscount: "Phần Trăm",
        value: 0,
        startDate: null,
        endDate: null,
        status: 1,
        condition: 0
    }
    $scope.formUpdatePro = {
        id : "",
        name: "",
        description: "",
        typeDiscount: "Phần Trăm",
        value: 0,
        startDate: null,
        endDate: null,
        status: 1,
        condition: 0
    }

    $scope.listPrReduced = [];
    //config headers
    var headers = {
        headers: {
            'Authorization': 'Bearer ' + tokenAuthen(),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // Các header khác nếu cần
        }
    };

    //token authen
    function tokenAuthen() {
        // Lấy dữ liệu từ localStorage
        var userDataString = localStorage.getItem('userData');

        // Kiểm tra xem dữ liệu có tồn tại không
        if (userDataString) {
            // Chuyển đổi dữ liệu từ chuỗi JSON sang đối tượng JavaScript
            var userData = JSON.parse(userDataString);

            // Bạn có thể sử dụng userData ở đây
            console.log(userData.token);
            return userData.token;
        } else {
            // Trường hợp không có dữ liệu trong localStorage
            console.log('Không có dữ liệu đăng nhập trong localStorage.');
        }
    }

    // lấy các chương trình khuyến mại
    $scope.hienThi = function (pageNo) {
        let apiUrl = apiPromotion + "?pageNo=" + pageNo;
        $http.get(apiUrl, headers).then(function (response) {
            // Xử lý phản hồi thành công
            $scope.listPromotions = response.data.promotionalList;
            $scope.totalPage = response.data.totalPages;
            console.log("promotion:" + $scope.listPromotions);
            console.log(response.data.totalPages);
        },
            function (error) {
                // Xử lý lỗi
                console.log(error);
            }
        );
    };

    // ham date 
    $scope.datePickerOpened = false;
    $scope.openDatePicker = function () {
        $scope.datePickerOpened = !$scope.datePickerOpened;
    };

    // Cài đặt các tùy chọn cho datetimepicker
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2023, 12, 31),
        minDate: new Date(),
        startingDay: 1,
    };


    // Mở datetimepicker khi người dùng nhấn vào input hoặc icon
    $scope.openDateTimePicker = function (picker) {
        if (picker === 'picker1') {
            $scope.dateTimePickerOpened1 = !$scope.dateTimePickerOpened1;
            setDefaultTime2('picker1');
        } else if (picker === 'picker2') {
            $scope.dateTimePickerOpened2 = !$scope.dateTimePickerOpened2;
            setDefaultTime('picker2');
        }
    };

    function setDefaultTime(picker) {
        // Kiểm tra nếu endDate chưa được thiết lập, thì đặt giờ mặc định là giờ hiện tại
        if (!$scope.formAddPro.endDate) {
            $scope.formAddPro.endDate = new Date(); // Lấy thời gian hiện tại
            $scope.formAddPro.endDate.setMilliseconds(0);  // Đặt mili giây là 0
            $scope.formAddPro.endDate.setSeconds(0);  // Đặt mili giây là 0
        } else if (!$scope.formAddPro.startDate) {
            $scope.formAddPro.startDate = new Date(); // Lấy thời gian hiện tại
            $scope.formAddPro.startDate.setMilliseconds(0);  // Đặt mili giây là 0
            $scope.formAddPro.startDate.setSeconds(0);  // Đặt mili giây là 0


        }

        // Nếu là picker2 và giờ chưa được thiết lập, đặt giờ là giờ hiện tại
        if (picker === 'picker2' && !$scope.formAddPro.endDate.getHours()) {
            $scope.formAddPro.endDate.setHours(new Date().getHours());
            $scope.formAddPro.endDate.setMinutes(new Date().getMinutes());
        } else if (picker === 'picker1' && !$scope.formAddPro.startDate.getHours()) {
            $scope.formAddPro.startDate.setHours(new Date().getHours());
            $scope.formAddPro.startDate.setMinutes(new Date().getMinutes());
        }
    }
    function setDefaultTime2(picker) {
        if (!$scope.formAddPro.startDate) {
            $scope.formAddPro.startDate = new Date(); // Lấy thời gian hiện tại
            $scope.formAddPro.startDate.setMilliseconds(0);  // Đặt mili giây là 0
            $scope.formAddPro.startDate.setSeconds(0);  // Đặt mili giây là 0

        }

        if (picker === 'picker1' && !$scope.formAddPro.startDate.getHours()) {
            $scope.formAddPro.startDate.setHours(new Date().getHours());
            $scope.formAddPro.startDate.setMinutes(new Date().getMinutes());
        }
    }

    $scope.updateText = function (text) {
        if (text === 'Phần Trăm') {
            $scope.isPercent = true;
            $scope.isCash = false;
        } else if (text === 'Đồng giá') {
            $scope.isCash = true;
            $scope.isPercent = false;

        }
    }

   

    $scope.onOptionChange = function () {
        $scope.isSearchProduct = $scope.selectedOption === "Sản phẩm";
        $scope.isSearchCategoryPr = !$scope.isSearchProduct && $scope.selectedOption === "Danh mục";
        if ($scope.selectedOption == "Tất cả") {
            $scope.discountAllProducts();
        }
    };



    $scope.toggleCheckbox = function (pr) {
        pr.selected = !pr.selected;
        $scope.checkboxChanged(pr);
    };

    $scope.checkboxChanged = function (pr) {
        console.log("Checkbox changed for", pr.name, "Selected:", pr.selected);

        if (pr.selected) {
            // Gọi hàm để lấy sản phẩm theo loại
            $scope.selectProductsByType(pr.name);
        }
    };

    // lấy sản phẩm theo loại sản phẩm
    $scope.selectProductsByType = function (selectedType) {
        if ($scope.formAddPro.value !== 0) {
            let clonedItems = angular.copy($scope.filteredItems);

            clonedItems.forEach((product) => {
                // Check xem sản phẩm có cùng loại không
                if (selectedType === product.product.category.name) {
                    let originalPrice = product.price;

                    let discountedPrice;
                    if ($scope.formAddPro.typeDiscount === "Phần Trăm") {
                        discountedPrice = product.price - product.price * ($scope.formAddPro.value * 0.01);
                    } else {
                        discountedPrice = product.price - $scope.formAddPro.value;
                    }

                    if (discountedPrice >= 0) {
                        let isProductExist = $scope.listPrReduced.some(item => item.id === product.id);

                        if (!isProductExist) {
                            $scope.listPrReduced.push({
                                originalPrice,
                                discountedPrice,
                                ...product,
                                color: product.color.name,
                                size: product.size.name
                            });
                        }
                    } else {
                        console.log('Giá giảm vượt quá giá gốc.');
                    }
                }
            });
        }

        console.log($scope.listPrReduced);
    };

    // xóa các loại sản phẩm lăp lại
    function removeDuplicateCategories(items) {
        const seen = new Set();
        return items.reduce((uniqueCategories, item) => {
            const categoryID = item.product.category.id;
            if (!seen.has(categoryID)) {
                seen.add(categoryID);
                uniqueCategories.push(item.product.category);
            }
            return uniqueCategories;
        }, []);
    }


    $scope.loadAllPrBs = function () {
        var url = `${host}/api/get-all-pr`;
        $http.get(url).then(res => {
            $scope.itemsBs = res.data;
            $scope.filteredItems = $scope.itemsBs;
            $scope.category = removeDuplicateCategories($scope.itemsBs);
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadAllPrBs();
    $scope.filteredItems = $scope.itemsBs;


    $scope.filterProducts = function (tab) {
        var searchText = tab.formData.search.toLowerCase();
        var searchTerms = searchText.split(' ');

        $scope.filteredItems = $scope.itemsBs.filter(function (item) {
            var nameMatch = item.product.name.toLowerCase().includes(searchText);
            var sizeMatch = item.size.name.toLowerCase().includes(searchText);
            var colorMatch = item.color.name.toLowerCase().includes(searchText);

            // Lọc theo mỗi từ khóa trong searchTerms
            var searchTermMatch = searchTerms.every(function (term) {
                return (
                    item.product.name.toLowerCase().includes(term) ||
                    item.size.name.toLowerCase().includes(term) ||
                    item.color.name.toLowerCase().includes(term)
                );
            });

            return nameMatch || sizeMatch || colorMatch || searchTermMatch;
        });


    };


    $scope.selectProduct = function (selectedProduct) {
        console.log(selectedProduct);

        if ($scope.formAddPro.value !== 0) {
            let clonedItems = angular.copy($scope.filteredItems); // Tạo bản sao của filteredItems

            let existingProductIndex = $scope.listPrReduced.findIndex(item => item.id === selectedProduct.id);

            if (existingProductIndex !== -1) {
                // Nếu sản phẩm đã tồn tại, xóa nó khỏi danh sách
                $scope.listPrReduced.splice(existingProductIndex, 1);
                console.log("Sản phẩm đã tồn tại trong danh sách. Đã xóa khỏi danh sách.");
            } else {
                clonedItems.forEach((product) => {
                    if (selectedProduct.id === product.id) {
                        let originalPrice = product.price;
                        let discountedPrice;

                        if ($scope.formAddPro.typeDiscount === "Phần Trăm") {
                            discountedPrice = product.price - product.price * ($scope.formAddPro.value * 0.01);
                        } else {
                            if ($scope.formAddPro.condition == product.price) {
                                discountedPrice = $scope.formAddPro.value;
                            } else {
                                discountedPrice = product.price;
                            }
                        }

                        // Kiểm tra xem giá đã giảm có lớn hơn hoặc bằng 0 không
                        if (discountedPrice >= 0) {
                            // Thêm thông tin màu và kích thước vào item
                            $scope.listPrReduced.push({
                                originalPrice,
                                discountedPrice,
                                ...selectedProduct,
                                color: product.color.name,
                                size: product.size.name
                            });
                        } else {
                            console.log('Giá giảm vượt quá giá gốc.');
                        }
                    }
                });
            }
        }

        console.log($scope.listPrReduced);
    };

    $scope.discountAllProducts = function () {
        if ($scope.formAddPro.value !== 0) {
            let discountedProducts = [];

            $scope.filteredItems.forEach((product) => {
                let originalPrice = product.price;
                let discountedPrice;

                if ($scope.formAddPro.typeDiscount === "Phần Trăm") {
                    discountedPrice = originalPrice - originalPrice * ($scope.formAddPro.value * 0.01);
                } else {
                    if ($scope.formAddPro.condition == originalPrice) {
                        discountedPrice = $scope.formAddPro.value;
                    } else {
                        discountedPrice = originalPrice;
                    }
                }

                // Kiểm tra xem giá đã giảm có lớn hơn hoặc bằng 0 không
                if (discountedPrice >= 0) {
                    // Thêm thông tin màu và kích thước vào mảng discountedProducts
                    discountedProducts.push({
                        originalPrice,
                        discountedPrice,
                        ...product,
                        color: product.color.name,
                        size: product.size.name
                    });
                } else {
                    console.log(`Giá giảm vượt quá giá gốc cho sản phẩm ${product.name}`);
                }
            });

            // Gán mảng mới đã giảm giá vào listPrReduced
            $scope.listPrReduced = discountedProducts;

            console.log("Đã giảm giá cho tất cả sản phẩm trong danh sách.");
        }
    };



    $scope.savePro = async function (event) {
        event.preventDefault();
        console.log($scope.formAddPro);

        const confirmResult = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        });

        try {
            if (confirmResult.isConfirmed) {
                const response = await $http.post("http://localhost:8080/CodeWalkers/admin/promotion/save", $scope.formAddPro, headers);
                console.log("Success Response:", response.data);

                const idPromotion = response.data.data.id;

                const productDetailIds = await $scope.getProductDetailIds($scope.listPrReduced);
                await $scope.addProDetails(idPromotion, productDetailIds);

                Swal.fire({
                    icon: 'success',
                    title: 'Tạo chương trình khuyến mãi thành công!',
                    text: 'Thông tin khuyến mãi đã được tạo.'
                });
            } else if (confirmResult.dismiss === Swal.DismissReason.cancel) {
                Swal.fire('Hủy bỏ', '', 'error');
            }
        } catch (error) {
            console.error("Error:", error);

            Swal.fire({
                icon: "error",
                title: "Lỗi!",
                text: "Đã xảy ra lỗi khi tạo chương trình. Vui lòng thử lại sau."
            });
        } finally {
            $scope.loading = false;
        }
    };

    $scope.getProductDetailIds = async function (selectedProducts) {
        const productDetailIds = [];

        for (const product of selectedProducts) {
            const productName = product.product.name;
            const color = product.color;
            const size = product.size;

            const api = `http://localhost:8080/CodeWalkers/admin/ProductDetails/details?productName=${productName}`;

            try {
                const response = await $http.get(api);
                const productDetails = response.data;

                // Tìm chi tiết sản phẩm dựa trên màu sắc và kích thước
                const matchingProductDetail = productDetails.find(detail => detail.color.name === color && detail.size.name === size);

                if (matchingProductDetail) {
                    const productDetailId = matchingProductDetail.id;
                    const idProduct = matchingProductDetail.product.id; // Lấy trường idProduct
                    console.log(productDetailId, idProduct)
                    productDetailIds.push({ productDetailId, idProduct, color, size }); // Thêm cả màu sắc và kích thước vào mảng
                } else {
                    console.error(`Product detail not found for ${productName}, color ${color}, size ${size}`);
                }
            } catch (error) {
                console.error(`Error getting product details for ${productName}, color ${color}, size ${size}:`, error);
            }
        }

        return productDetailIds;
    };

    $scope.addProDetails = async function (idPromotion, productDetailIds) {
        const promises = productDetailIds.map(async function (productDetailId) {
            if (productDetailId) {
                const selectedProduct = $scope.listPrReduced.find(product =>
                    product.product.id === productDetailId.idProduct &&
                    product.color === productDetailId.color &&
                    product.size === productDetailId.size
                );

                if (selectedProduct) {
                    const newProDetails = angular.copy($scope.formAddPromDetail);
                    newProDetails.productDetail.id = productDetailId.productDetailId;
                    newProDetails.promotion.id = idPromotion;
                    newProDetails.discount = selectedProduct.discountedPrice;

                    try {
                        console.log(newProDetails)
                        return await $http.post('http://localhost:8080/CodeWalkers/admin/promotion-details/save', JSON.stringify(newProDetails), headers);
                    } catch (error) {
                        console.error("Error adding promotion details:", error);
                        return Promise.reject(error);
                    }
                } else {
                    console.error(`Selected product not found for productDetailId: ${productDetailId}`);
                    return Promise.reject(`Selected product not found for productDetailId: ${productDetailId}`);
                }
            } else {
                console.error("productDetailId is undefined");
                return Promise.reject("productDetailId is undefined");
            }
        });

        await Promise.all(promises);
    };



    //phan trang
    $scope.pageRange = function () {
        var startPage = Math.max(1, $scope.pageCurrent - Math.floor($scope.itemsPerPage / 2));
        var endPage = Math.min($scope.totalPage, startPage + $scope.itemsPerPage - 1);
        var pages = [];

        if ($scope.pageCurrent + Math.floor($scope.itemsPerPage / 2) > $scope.totalPage) {
            startPage = Math.max(1, $scope.totalPage - $scope.itemsPerPage + 1);
            endPage = $scope.totalPage;
        }

        // Bắt đầu từ trang đầu tiên nếu trang hiện tại là quá giữa danh sách
        if (startPage > 1) {
            startPage = Math.max(1, startPage - 1);
        }

        for (var i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    };

    $scope.nextPage = function () {
        if ($scope.pageCurrent < $scope.totalPage) {
            $scope.pageCurrent++;
            $scope.hienThi($scope.pageCurrent);
        }
    };

    $scope.previousPage = function () {
        if ($scope.pageCurrent > 1) {
            $scope.pageCurrent--;
        }
        $scope.hienThi($scope.pageCurrent);
    };

    $scope.hoveredPage = null;

    $scope.onHover = function (index) {
        $scope.hoveredPage = index;
    };

    $scope.onLeave = function () {
        $scope.hoveredPage = null;
    };

    $scope.PageNo = function (pageNo) {
        $scope.pageCurrent = pageNo; // Cập nhật pageCurrent khi chọn trang cụ thể
        $scope.hienThi(pageNo);
        $scope.hoveredPage = pageNo; // Truyền giá trị pageNo vào hàm hienThi
    };
    $scope.hienThi($scope.pageNo);



    $scope.removePromotion = async function (event, item) {
        event.preventDefault();

        const ProId = item.id;
        const api = `${apiURL}admin/promotion/delete/${ProId}`;

        const confirmResult = await Swal.fire({
            title: 'Xác nhận',
            text: 'Bạn có chắc chắn muốn thực hiện hành động này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        });

        if (confirmResult.isConfirmed) {
            try {
                const response = await $http.delete(api, headers);
                Swal.fire('Xóa thành công!', '', 'success');
                $scope.hienThi($scope.pageCurrent, $scope.sizePage);
                console.log(response);
            } catch (error) {
                console.error(error);
                Swal.fire({
                    icon: "error",
                    title: "Lỗi!",
                    text: "Đã xảy ra lỗi khi xóa voucher. Vui lòng thử lại sau."
                });
            }
        } else if (confirmResult.dismiss === Swal.DismissReason.cancel) {
            Swal.fire('Hủy bỏ', '', 'error');
        }
    };


    $scope.turnOn = function (id) {
        const api = `${apiURL}admin/promotion/turn-on/${id}`;
        $http.post(api, null).then(function (res) {
            console.log(res.data);
        });

    };

    $scope.turnOff = function (id) {
        const api = `${apiURL}admin/promotion/turn-off/${id}`;
        $http.post(api, null).then(function (res) {
            console.log(res.data);
        });
    };

    $scope.toggleStatus = function (item) {
        if (item.status) {
            $scope.turnOff(item.id);
        } else {
            $scope.turnOn(item.id);
        }
        // Gọi hàm hiển thị sau khi cập nhật trạng thái
        $scope.hienThi($scope.pageCurrent, $scope.sizePage);
    };


    $scope.promotionId = $routeParams.idPromotion;

    $scope.listPromotionsDetials = [];
    $scope.detail = function () {
        console.log($scope.promotionId, "hihihih");

        $http.get('http://localhost:8080/CodeWalkers/admin/promotion/details/' + $scope.promotionId, headers).then(function (res) {

            $scope.listPromotionsDetials = res.data;
            console.log($scope.listPromotionsDetials);

            $scope.formUpdatePro.id = $scope.listPromotionsDetials.id,
            $scope.formUpdatePro.name= $scope.listPromotionsDetials.name,
            $scope.formUpdatePro.description= $scope.listPromotionsDetials.description,
            $scope.formUpdatePro.typeDiscount= $scope.listPromotionsDetials.typeDiscount,
            $scope.formUpdatePro.value= $scope.listPromotionsDetials.value,
            $scope.formUpdatePro.startDate= $scope.listPromotionsDetials.startDate,
            $scope.formUpdatePro.endDate= $scope.listPromotionsDetials.endDate,
            $scope.formUpdatePro.status= $scope.listPromotionsDetials.status,
            $scope.formUpdatePro.condition= $scope.listPromotionsDetials.condition
           
        }).catch(function (err) {
            console.log("Lỗi khi tải detail" + err);
        });
    }
    $scope.detail();

    // thu vien jQuery không đụng vào
    (function ($) {
        "use strict";
        $(function () {
            $('[data-toggle="offcanvas"]').on("click", function () {
                $(".sidebar-offcanvas").toggleClass("active");
            });
        });
    })(jQuery);

    (function ($) {
        "use strict";
        $(function () {
            var body = $("body");
            var contentWrapper = $(".content-wrapper");
            var scroller = $(".container-scroller");
            var footer = $(".footer");
            var sidebar = $(".sidebar");

            //Add active class to nav-link based on url dynamically
            //Active class can be hard coded directly in html file also as required

            function addActiveClass(element) {
                if (current === "") {
                    //for root url
                    if (element.attr("href").indexOf("index.html") !== -1) {
                        element.parents(".nav-item").last().addClass("active");
                        if (element.parents(".sub-menu").length) {
                            element.closest(".collapse").addClass("show");
                            element.addClass("active");
                        }
                    }
                } else {
                    //for other url
                    if (element.attr("href").indexOf(current) !== -1) {
                        element.parents(".nav-item").last().addClass("active");
                        if (element.parents(".sub-menu").length) {
                            element.closest(".collapse").addClass("show");
                            element.addClass("active");
                        }
                        if (element.parents(".submenu-item").length) {
                            element.addClass("active");
                        }
                    }
                }
            }

            $(".horizontal-menu .nav li a").each(function () {
                var $this = $(this);
                addActiveClass($this);
            });

            //Close other submenu in sidebar on opening any

            sidebar.on("show.bs.collapse", ".collapse", function () {
                sidebar.find(".collapse.show").collapse("hide");
            });

            //Change sidebar and content-wrapper height
            applyStyles();

            function applyStyles() {
                //Applying perfect scrollbar
                if (!body.hasClass("rtl")) {
                    if (
                        $(".settings-panel .tab-content .tab-pane.scroll-wrapper").length
                    ) {
                        const settingsPanelScroll = new PerfectScrollbar(
                            ".settings-panel .tab-content .tab-pane.scroll-wrapper"
                        );
                    }
                    if ($(".chats").length) {
                        const chatsScroll = new PerfectScrollbar(".chats");
                    }
                    if (body.hasClass("sidebar-fixed")) {
                        if ($("#sidebar").length) {
                            var fixedSidebarScroll = new PerfectScrollbar("#sidebar .nav");
                        }
                    }
                }
            }

            $('[data-toggle="minimize"]').on("click", function () {
                if (
                    body.hasClass("sidebar-toggle-display") ||
                    body.hasClass("sidebar-absolute")
                ) {
                    body.toggleClass("sidebar-hidden");
                } else {
                    body.toggleClass("sidebar-icon-only");
                }
            });

            //checkbox and radios
            $(".form-check label,.form-radio label").append(
                '<i class="input-helper"></i>'
            );

            //Horizontal menu in mobile
            $('[data-toggle="horizontal-menu-toggle"]').on("click", function () {
                $(".horizontal-menu .bottom-navbar").toggleClass("header-toggled");
            });
            // Horizontal menu navigation in mobile menu on click
            var navItemClicked = $(".horizontal-menu .page-navigation >.nav-item");
            navItemClicked.on("click", function (event) {
                if (window.matchMedia("(max-width: 991px)").matches) {
                    if (!$(this).hasClass("show-submenu")) {
                        navItemClicked.removeClass("show-submenu");
                    }
                    $(this).toggleClass("show-submenu");
                }
            });

            $(window).scroll(function () {
                if (window.matchMedia("(min-width: 992px)").matches) {
                    var header = $(".horizontal-menu");
                    if ($(window).scrollTop() >= 70) {
                        $(header).addClass("fixed-on-scroll");
                    } else {
                        $(header).removeClass("fixed-on-scroll");
                    }
                }
            });
        });

        // focus input when clicking on search icon
        $("#navbar-search-icon").click(function () {
            $("#navbar-search-input").focus();
        });
    })(jQuery);

    (function ($) {
        "use strict";
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
            var navbar_classes =
                "navbar-danger navbar-success navbar-warning navbar-dark navbar-light navbar-primary navbar-info navbar-pink";
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
        "use strict";
        //Open submenu on hover in compact sidebar mode and horizontal menu mode
        $(document).on(
            "mouseenter mouseleave",
            ".sidebar .nav-item",
            function (ev) {
                var body = $("body");
                var sidebarIconOnly = body.hasClass("sidebar-icon-only");
                var sidebarFixed = body.hasClass("sidebar-fixed");
                if (!("ontouchstart" in document.documentElement)) {
                    if (sidebarIconOnly) {
                        if (sidebarFixed) {
                            if (ev.type === "mouseenter") {
                                body.removeClass("sidebar-icon-only");
                            }
                        } else {
                            var $menuItem = $(this);
                            if (ev.type === "mouseenter") {
                                $menuItem.addClass("hover-open");
                            } else {
                                $menuItem.removeClass("hover-open");
                            }
                        }
                    }
                }
            }
        );
    })(jQuery);

    (function ($) {
        "use strict";
        if ($(".grid").length) {
            var colcade = new Colcade(".grid", {
                columns: ".grid-col",
                items: ".grid-item",
            });
        }
    })(jQuery);

    (function ($) {
        "use strict";
        //Open submenu on hover in compact sidebar mode and horizontal menu mode
        $(document).on(
            "mouseenter mouseleave",
            ".sidebar .nav-item",
            function (ev) {
                var body = $("body");
                var sidebarIconOnly = body.hasClass("sidebar-icon-only");
                var sidebarFixed = body.hasClass("sidebar-fixed");
                if (!("ontouchstart" in document.documentElement)) {
                    if (sidebarIconOnly) {
                        if (sidebarFixed) {
                            if (ev.type === "mouseenter") {
                                body.removeClass("sidebar-icon-only");
                            }
                        } else {
                            var $menuItem = $(this);
                            if (ev.type === "mouseenter") {
                                $menuItem.addClass("hover-open");
                            } else {
                                $menuItem.removeClass("hover-open");
                            }
                        }
                    }
                }
            }
        );
    })(jQuery);

};