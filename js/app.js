/**
 * Created by lenovo on 9/16/2015.
 */
app = angular.module('app', ['ngRoute', 'ngAnimate']);
app.config(function($routeProvider, $locationProvider){

    $routeProvider
        .when('/login',{
            templateUrl: "template/login.html",
            animation: 'first',
            controller:'LoginCtrl'
        })
        .when('/register',{
            templateUrl: "template/register.html",
            animation: 'second',
            controller:'RegisterCtrl'
        })
        .when('/recover',{
            templateUrl: "template/recover.html",
            animation: 'first',
            controller:'RecoverCtrl'
        })
        .otherwise({
            templateUrl: "template/login.html",
            animation: 'welcome',
            controller:'LoginCtrl'
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
});

app.controller('LoginCtrl', function($scope, $rootScope){

    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        $rootScope.animation = currRoute.animation;
    });

    $scope.login = function(){
        var email = $('#email').val();
        var password = $('#password').val();
        if(email.length < 4){
           Config.showMessage('Your email length must be greater than 4');
            return
        }

        if(password.length < 7){
           Config.showMessage('Your Password length must be greater than 6');
            return;
        }

        if(!Config.validateEmail(email)){
            Config.showMessage('You have entered an invalid email format');
            return;
        }

        FireBaseUtil.login(email,password, function(error, authData) {
            if (error) {
                Config.showMessage("Login Failed!"+error);
            } else {

                FireBaseUtil.searchUser(email,function(data){
                    console.log(data.val());
                });

                console.log("Authenticated successfully with payload:", authData);
            }
        });

    };


});

app.controller('RegisterCtrl', function($scope, $rootScope){
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        $rootScope.animation = currRoute.animation;
    });
});

app.controller('RecoverCtrl', function($scope, $rootScope){
    $rootScope.$on('$routeChangeStart', function(event, currRoute, prevRoute){
        $rootScope.animation = currRoute.animation;
    });
});