angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


      .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('signup', {
    url: '/page5',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('login', {
    url: '/page6',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('tabsController.dostPneKsiKi', {
    url: '/page7',
    views: {
      'tab1': {
        templateUrl: 'templates/dostPneKsiKi.html',
        controller: 'dostPneKsiKiCtrl'
      }
    }
  })

  .state('tabsController.zamWienia', {
    url: '/page8',
    views: {
      'tab2': {
        templateUrl: 'templates/zamWienia.html',
        controller: 'zamWieniaCtrl as vm'
      }
    }
  })

  .state('tabsController.kupione', {
    url: '/page9/:id',
    views: {
      'tab3': {
        templateUrl: 'templates/kupione.html',
        controller: 'kupioneCtrl as vm',
        params: {
          id: null
        }
      }
    }
  })

  .state('tabsController.ksiazka', {
    url: '/page10/:bookId',
    views: {
      'tab1': {
        templateUrl: 'templates/ksiazka.html',
        controller: 'ksiazkaCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/page1/page7')


});
