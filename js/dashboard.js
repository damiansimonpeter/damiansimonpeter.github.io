/**
 * Created by lenovo on 9/16/2015.
 */
var app = angular.module('app', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider, $locationProvider){

    $routeProvider
        .when('/dashboard',{
            templateUrl: "template/dashboard.html",
            animation: 'first',
            controller:'DashboardCtrl'
        })
        .when('/pending-invite',{
            templateUrl: "template/pending-invite.html",
            animation: 'second'
        }).when('/sent-invite',{
            templateUrl: "template/sent-invite.html",
            animation: 'second'
        }).when('/pending-request',{
            templateUrl: "template/pending-request.html",
            animation: 'second',
            controller:'DashboardCtrl'
        }).when('/personal',{
            templateUrl: "template/personal-info.html",
            animation: 'second'
        }).when('/manage-event',{
            templateUrl: "template/manage-event.html",
            animation: 'first'
        }).when('/calendar',{
            templateUrl: "template/calendar.html",
            animation: 'first'
        })
        .when('/change-password',{
            templateUrl: "template/change-password.html",
            animation: 'first'
        }).when('/remove-account',{
            templateUrl: "template/remove-account.html",
            animation: 'second'
        }).when('/profile',{
            templateUrl: "template/profile.html",
            animation: 'first'
        })
        .otherwise({
            templateUrl: "template/dashboard.html",
            animation: 'welcome',
            controller:'DashboardCtrl'
        });
});


app.controller('ctrl', function($scope, $rootScope){
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        $rootScope.animation = currRoute.animation;
    });
});

app.controller('DashboardCtrl', function($scope, $rootScope){
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        $rootScope.animation = currRoute.animation;
    });


    $scope.requests = [];
    var join = new Join();

    join.getAll('sunday@bincom.net','0',function(data){
        var result = data.val();
        for(key in result){
            $scope.requests.push(result[key]);
            $scope.$apply();
        }
    });
});

$('#main-menu').metisMenu();