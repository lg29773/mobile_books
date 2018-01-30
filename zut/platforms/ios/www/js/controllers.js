angular.module('app.controllers', ['ngStorage'])

    .controller('menuCtrl', ['$scope', '$stateParams','$http', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams,$http) {


        }])



    .controller('signupCtrl', ['$scope', '$stateParams', '$http','$rootScope' ,// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $http) {

            $scope.doRegister = function (username, firstname, lastname, email, password) {


                $http({
                    headers: {
                        "Accept": "*/*",
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin':'*',
                        'Access-Control-Allow-Headers':'content-type'


                    },

                    method: 'POST',
                    url: '/zut/auth/register',
                    data: JSON.stringify({
                        email: email,
                        firstname: firstname,
                        lastname: lastname,
                        password: password,
                        userName: username
                    }),


                }).then(function successCallback(response) {
                    window.location.href = '#/page6';
                }, function errorCallback(response) {
                    console.log(response)
                });
            }
        }])

    .controller('loginCtrl', ['$scope', '$stateParams', '$http','$rootScope',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams,$http,$rootScope) {

        $scope.doLogin = function (userName,password) {
            console.log(password);
            $http({
                headers: {
                    "Accept": "*/*",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Headers':'content-type'


                },
                method: 'POST',
                url: '/zut/auth/login',
                data: JSON.stringify({
                    "password": password,
                    "userName": userName
                }),


            }).then(function successCallback(response) {
                console.log(response);
                localStorage.setItem("_token_books", response.data.token);
                window.location.href = '#/page7';
            }, function errorCallback(response) {
               alert("Złe dane!")
            });
        }

        }])

    .controller('dostPneKsiKiCtrl', ['$scope', '$stateParams', '$http', '$rootScope',
        function ($scope, $stateParams, $http, $window, $location,$rootScope) {


            $scope.book = '';
            $http({
                headers: {
                    "Accept": "*/*",
                    'Content-Type': 'application/json',
                },
                method: 'GET',
                url: '/zut/api/v1/book'
            }).then(function successCallback(response) {
                $scope.respp = response;
            }, function errorCallback(response) {
            });

        }])

    .controller('zamWieniaCtrl', ['$scope', '$stateParams', 'appRequestService', '$state', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, appRequestService, $state) {
      var vm = this;

          vm.transactions = [];

          function getTransactions(){
            appRequestService.get('/zut/api/v1/user/transaction').then(function(result){
              vm.transactions = result.data;
            });
          }

          vm.showTransactionDetails = function(id){

                $state.go('tabsController.kupione', {id: id});
            };

          vm.init = function(){
              getTransactions();
            };

        }])

    .controller('kupioneCtrl', ['$scope', '$stateParams', 'appRequestService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, appRequestService) {
      var vm = this;
      var transactionId = $stateParams.id;
      vm.transactionDetails = null;

      function getTransactionDetails(){
        appRequestService.get('/zut/api/v1/user/transaction/'+transactionId).then(function(result){
          vm.transactionDetails = result.data;
        });
      }

      vm.init = function(){
        getTransactionDetails();
      };
        }])

    .controller('ksiazkaCtrl', ['$scope', '$stateParams', '$http',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
        function ($scope, $stateParams, $http) {
        $scope.createOrder = function (id) {
            $http({
                headers: {
                    "Accept": "*/*",
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Headers':'content-type',
                    'Authorization':"Bearer " +localStorage.getItem("_token_books")

                },
                method: 'POST',
                url: '/zut/api/v1/buy/book/'+id,
        });}

            $scope.Id = $stateParams.bookId;
            $scope.getBookUrl = '/zut/api/v1/book' + '/' + $scope.Id;
            $http({
                method: 'GET',
                url: $scope.getBookUrl
            }).then(function successCallback(response) {
                $scope.respp = response;
            }, function errorCallback(response) {
            });

        }])
