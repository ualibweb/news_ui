angular.module('ualib.news', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'angular.filter',
    'ui.bootstrap',
    'ualib.ui',
    'ualib.news.templates'
]);;angular.module('ualib.news')

    .factory('newsFactory', ['$resource', function($resource){
        return $resource('https://wwwdev2.lib.ua.edu/newsApp/api/:news');
    }]);;angular.module('ualib.news')

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/news-events-exhibits/news-item/:nid', {
                reloadOnSearch: false,
                resolve: {
                    news: function(newsFactory){
                        return newsFactory.get({news: 'all'}, function(data){

                            return data;
                        }, function(data, status, headers, config) {
                            console.log('ERROR: news item');
                            console.log({
                                data: data,
                                status: status,
                                headers: headers,
                                config: config
                            });
                        });
                    }
                },
                templateUrl: 'news-item/news-item.tpl.html',
                controller: 'newsItemCtrl'
            });
    }]);;angular.module('ualib.news')

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/news-events-exhibits/', {
                reloadOnSearch: false,
                resolve: {
                    news: function(newsFactory){
                        var news = [];
                        var total = 0;

                        function processNewsData(data){
                            for (var i = 0, len = data.length; i < len; i++){

                            }
                        }

                        return newsFactory.get({news: 'all'}, function(data){

                            var news = [];
                            var total = 0;
                            angular.forEach(data, function(val, key){
                                switch (key){
                                    case 'totalNews':
                                    case 'totalEvents':
                                    case 'totalExhibitions':
                                        total += data[key];
                                        break;
                                    case 'news':
                                    case 'events':
                                    case 'exhibitions':
                                        news.concat(data[key]);

                                }
                            });

                            return {
                                items: news,
                                total: total
                            };
                        }, function(data, status, headers, config) {
                            console.log('ERROR: news');
                            console.log({
                                data: data,
                                status: status,
                                headers: headers,
                                config: config
                            });
                        });
                    }
                },
                templateUrl: 'news-list/news-list.tpl.html',
                controller: 'newsListCtrl'
            });
    }])

    .controller('newsListCtrl', ['$scope', 'news', function($scope, news){
        $scope.news = news;
    }]);;angular.module('ualib.news')

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