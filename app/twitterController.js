angular.module('ofekTwitter')
    .controller('twitterController', function ($scope) {
        $scope.currentNavItem = 'signIn';
        console.log("stuff");
        $scope.goTo = function (page) {
            console.log("Goto " + page);
        }
    });