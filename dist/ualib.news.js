angular.module('ualib.news', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'angular.filter',
    'ui.bootstrap',
    'ui.utils',
    'ualib.ui',
    'ualib.hours',
    'ualib.news.templates'
]);;angular.module('ualib.news')

    .factory('newsFactory', ['$resource', '$sce', '$filter', function($resource, $sce, $filter){

        function preprocessNews(news){
            news = $filter('unique')(news, 'title');
            return news.map(function(item){
                var n = item;
                // Convert timestamps into JS millisecond standard
                n.activeFrom = (item.activeFrom * 1000);
                n.activeUntil = (item.activeUntil * 1000);

                // If link doesn't already exist, create one from the new item's title
                if (!n.hasOwnProperty('link')){
                    n.link = $filter('slugify')(n.title);
                }

                // If no 'blurb' exists, create one by truncating the description
                if (!n.hasOwnProperty('blurb')){
                    n.blurb = $filter('stripTags')(n.description);
                    n.blurb = $filter('truncate')(n.blurb, 250, '...', true);
                }
                return n;
            });
        }

        return $resource('https://wwwdev2.lib.ua.edu/newsApp/api/:news', {}, {
            cache: false,
            get: {
                method: 'GET',
                params: {news: 'all'},
                transformResponse: function(data){
                    var news = angular.fromJson(data);
                    formatted = preprocessNews(news.news);
                    news.news = formatted;
                    return news;
                }
            },
            today: {
                method: 'GET',
                params: {news: 'today'},
                transformResponse: function(data){
                    var news = angular.fromJson(data);
                    //var formatted = $filter('unique')(news.news, 'title');
                    for (var prop in news){
                        if (angular.isArray(news[prop])){
                            news[prop] = preprocessNews(news[prop]);

                        }
                    }
                    return news;
                }
            }
        });
    }]);;angular.module('ualib.news')

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/news-exhibits/:link', {
                reloadOnSearch: false,
                resolve: {
                    newsItem: function(newsFactory){
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
    }])

    .controller('newsItemCtrl', ['$scope', 'newsItem', '$routeParams', function($scope, newsItem, $routeParams){
       newsItem.$promise.then(function(data){
           for (var i = 0, len = data.news.length; i < len; i++){
               var item = data.news[i];
               if (item.hasOwnProperty('link') && item.link === $routeParams.link){
                   $scope.newsItem = item;
               }
           }
       });
    }])

    .directive('newsCard', [function(){
        return {
            restrict: 'A',
            replace: true,
            scope: {
                newsCard: '=?',
                newsFilters: '=?',
                newsType: '@'
            },
            templateUrl: function(tElem, tAttrs){
                var type = angular.isDefined(tAttrs.newsType) ? tAttrs.newsType : 'news';
                return 'news-item/' + type + '-card.tpl.html';
            }
        };
    }]);;angular.module('ualib.news')

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/news-exhibits/', {
                reloadOnSearch: false,
                resolve: {
                    newsList: function(newsFactory){
                        return newsFactory.get({news: 'all'}, function(data){
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
                    }
                },
                templateUrl: 'news/news-list.tpl.html',
                controller: 'newsListCtrl'
            });
    }])

    .controller('newsListCtrl', ['$scope', '$location', 'newsList', function($scope, $location, newsList){
        var filterWatcher;
        $scope.newsFilters = {
            sort: 'activeFrom',
            type: '',
            search: ''
        };

        newsList.$promise.then(function(data){
            console.log(data);
            $scope.news = data.news;
            paramsToScope();
            filterWatcher = $scope.$watch('newsFilters', function(newVal, oldVal){
                processFilters();
            }, true);
        });


        $scope.$on('$destroy', function(){
            filterWatcher();
        });

        function paramsToScope(){
            var params = $location.search();
            for (var param in params){
                if ($scope.newsFilters.hasOwnProperty(param)){
                    $scope.newsFilters[param] = params[param];
                }
            }
        }

        function processFilters(){
            var f = $scope.newsFilters;
            var params = $location.search();
            for (var filter in f){
                if (angular.isDefined(f[filter]) && f[filter] !== ''){
                    $location.search(filter, f[filter]);
                }
                else if (params.hasOwnProperty(filter)){
                    $location.search(filter, null);
                }
            }
        }
    }]);;angular.module('ualib.news')

    .controller('NewsTodayCtrl', ['$scope', '$filter', 'newsFactory', function($scope, $filter, newsFactory){
        newsFactory.today()
            .$promise
            .then(function(data){
                $scope.news = data.news;
                $scope.events = data.events;
                $scope.exhibitions = data.exhibitions;
                $scope.newsOverflow = (data.news.length + data.events.length + data.exhibitions.length) > 3;
            });
    }]);