angular.module('ualib.news')

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
    }]);