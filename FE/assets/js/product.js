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
    $scope.loadBrand = function () {
        var url = `${host}/api/product/brand`;
        $http.get(url).then(res => {
            $scope.brands = res.data;
            console.log(res.data);
            console.log("Success", res);
        }).catch(error => {
            console.log("Error", error);
        });
    }
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
    angular.element(document).on('keypress', function(event) {
        if (event.key === 'Enter') {
            // Xử lý tìm kiếm ở đây
            if($scope.keyword ==""){
                $scope.loadAllPr()
            }
            $scope.keyword=$scope.name;
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
        }else{
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
        var url = `${host}/api/product`;
        $http.get(url).then(res => {
            $scope.items = res.data;
            console.log(res.data);
            console.log("Success", res);
            // Gọi loadDetail sau khi tải dữ liệu thành công
            $scope.numVisibleItems = 4;
            $scope.slides = $scope.splitIntoSlides($scope.items, $scope.numVisibleItems);
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadAllPr();
    $scope.sortProducts = function(sortBy) {
        // Gửi yêu cầu sắp xếp đến API Spring Boot với tiêu chí sắp xếp được truyền vào
        console.log('/api/product/sort'+sortBy)
        var url = `${host}/api/product/sort`+sortBy;
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
    };
    $scope.loadAllPrBs = function () {
        var url = `${host}/api/product_bs`;
        $http.get(url).then(res => {
            $scope.itemsBs = res.data;
            console.log($scope.currentImageSource);
            console.log("Success", res);
            // Gọi loadDetail sau khi tải dữ liệu thành công
            //  $scope.loadDetail();
            $scope.numVisibleItems = 4;
        }).catch(error => {
            console.log("Error", error);
        });
    }
    $scope.loadAllPrBs()
    $scope.loadSize();
    $scope.loadColor();
    $scope.loadCategory();
    $scope.loadMaterial();
    $scope.loadBrand();

})