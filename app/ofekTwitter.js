'use strict';

var ofekTwitter = angular.module('ofekTwitter', ['ngRoute', 'ngMaterial', 'ngAnimate']);

ofekTwitter.config(function ($routeProvider, $locationProvider, $mdThemingProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/partials/signIn',
            controller: 'signIpController'
        })
        .when('/signIn', {
            templateUrl: '/partials/signIn',
            controller: 'signIpController'
        })
        .when('/signUp', {
            templateUrl: '/partials/signUp',
            controller: 'signUpController'
        })
        .when('/users', {
            templateUrl: '/partials/users',
            controller: 'usersController'
        })
        .otherwise({
            redirectTo: '/'
        });

    //use the HTML5 History API
    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('amber');
});


// create the controller and inject Angular's $scope
ofekTwitter.controller('signUpController', function ($scope) {
    $scope.message = 'signUpController';
});

ofekTwitter.controller('signIpController', function ($scope) {
    $scope.message = 'signIpController';
});

ofekTwitter.controller('usersController', function ($scope) {
    $scope.message = 'usersController';
});