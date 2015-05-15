angular.module('ualib.news')

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/news-events-exhibits/', {
                reloadOnSearch: false,
                resolve: {
                    newsList: function(newsFactory){
                        return newsFactory.get({news: 'all'})
                            .$promise.then(function(data){
                                return data;
                           /* var news = [];
                            var categories = [];
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
                                        val.category = key;
                                        news = news.concat(val);
                                        categories.push(key);
                                        break;
                                }
                            });

                            return {
                                items: news,
                                total: total,
                                categories: categories
                            };*/
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

    .controller('newsListCtrl', ['$scope', 'newsList', function($scope, newsList){

        function getToday(){
            var now = new Date();
            var year = now.getYear();
            var month = now.getMonth();
            var date = now.getDate();
            return Math.floor(Date.UTC(year, month, date, 0, 0, 0) / 1000);
        }

        $scope.news = newsList;
        $scope.today = getToday();
    }]);