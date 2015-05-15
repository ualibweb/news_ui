angular.module('ualib.news')

    .controller('NewsTodayCtrl', ['$scope', 'newsFactory', function($scope, newsFactory){
        $scope.news = newsFactory.get({news: 'today'}, function(data){
            return data;
        }, function(data, status, headers, config) {
            console.log('ERROR: news');
            console.log({
                data: data,
                status: status,
                headers: headers,
                config: config
            });
        });
    }])

    .directive('newsToday', [function(){
        return {
            restrict: 'AC',
            templateUrl: 'today/news-today.tpl.html',
            controller: 'NewsTodayCtrl'
        };
    }]);