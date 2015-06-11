angular.module('ualib.news')

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
    }]);