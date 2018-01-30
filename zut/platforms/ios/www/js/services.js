angular.module('app.services', [])


.service('BlankService', [function(){

}])
  .service('appRequestService', ['$http', function($http){

    var service = {
        send: function(url, method, data){
          data = data != null ? data : null;
          var dataType = typeof data;
          if(dataType != 'undefined' && dataType == "object"){
              data = JSON.stringify(data);
          }
          return $http({
            headers: {
              "Accept": "*/*",
              'Content-Type': 'application/json',
              'Authorization': "Bearer " +localStorage.getItem("_token_books")
            },
            method: method,
            url: url,
            data: data
          });
        },
      post: function(url, data){
          return this.send(url, 'POST', data);
      },
      get: function(url, data){
        return this.send(url, 'GET', data);
      }
    };

    return service;

  }])

;
