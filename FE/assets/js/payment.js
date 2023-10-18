app.controller("PaymentController", function ($scope, $routeParams, $http, $anchorScroll) {
    // Scroll đến phần tử có id "pageContent"
    $anchorScroll("pageContent");

    $scope.listBillDt = [];
    $scope.totalPrices = [];
    $scope.idBillIP = 0;
    setTimeout(function () {
        $scope.testRd = getRandomThousand();
        $scope.testRd2 = getRandomThousand();
        $scope.calculateTotalPrice = function (item) {
            // Tính tổng giá trị của sản phẩm (price * quantity)
            return item.price * item.quantity;
        };
        function getRandomThousand() {
            // Sinh một số ngẫu nhiên từ 0 đến 1
            var randomFraction = Math.random();

            // Làm tròn số ngẫu nhiên lên đến số tròn nghìn gần nhất
            var randomNumber = Math.round(randomFraction * 55 + 15) * 1000;

            return randomNumber;
        }
        // Hàm này sẽ thực hiện sau 1 giây
        $scope.loadBillDt = function (id) {
            var url = `${host}/api/billDt`;
            // Sử dụng params để truyền tham số id vào yêu cầu GET
            var config = {
                params: { idBill: id }
            };
            $http.get(url, config).then(res => {
                $scope.listBillDt = res.data;
                console.log(res.data);
                console.log("Success ->>>>>>", res);
                $scope.totalPrice = 0;
                $scope.totalPrice = 0;
                $scope.randomValue = 0;
                $scope.randomValue1 = 0;
                $scope.randomValue2 = 0;
                $scope.countItem = $scope.items.length;
                $scope.totalPay = 0;
                for (var i = 0; i < $scope.listBillDt.length; i++) {
                    var Price = $scope.calculateTotalPrice($scope.listBillDt[i]);
                    $scope.totalPrice += $scope.calculateTotalPrice($scope.listBillDt[i]);
                    $scope.totalPrices.push(Price);
                    $scope.randomValue1 += $scope.testRd;
                    $scope.randomValue2 = $scope.testRd2;
                    $scope.randomValue = $scope.randomValue1 + $scope.randomValue2;
                    $scope.totalPay = ($scope.totalPrice + $scope.randomValue);
                }
            }).catch(error => {
                console.log("Error", error);
            });
        }

        $scope.idBillIP = 0;
        // Tạo một hàm trả về một Promise để lấy idBillIP từ API
        function getIdBillIP() {
            return new Promise(function (resolve, reject) {
                var url = `${host}/api/getBill`;
                $http.get(url).then(function (res) {
                    $scope.items = res.data;
                    var idBillIP = $scope.items[$scope.items.length - 1].id;
                    resolve(idBillIP);
                }).catch(function (error) {
                    reject(error);
                });
            });
        }

        // Sử dụng Promise để lấy idBillIP và sau đó gọi hàm loadBillDt
        getIdBillIP().then(function (idBillIP) {
            console.log("ID Bill IP: " + idBillIP);
            $scope.loadBillDt(idBillIP);
        }).catch(function (error) {
            console.log("Lỗi khi lấy ID Bill IP", error);
        });

        // Các dòng code sau đây sẽ thực hiện trước khi có kết quả từ Promise
        console.log("Chờ ID Bill IP...");
        console.log('Hàm này được gọi sau 1 giây');
    }, 50); // 1000 milliseconds = 1 giây



});