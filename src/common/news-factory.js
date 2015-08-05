angular.module('ualib.news')

    .factory('ualibNewsFactory', ['$resource', '$sce', '$filter', function($resource, $sce, $filter){

        function preprocessNews(news){
            news = $filter('unique')(news, 'title');
            return news.map(function(item){
                var n = item;
                n.type = 1;

                // Convert timestamps into JS millisecond standard
                if (item.activeFrom !== null) {
                    n.activeFrom = new Date(item.activeFrom * 1000);
                } else {
                    n.activeFrom = null;
                }
                if (item.activeUntil !== null) {
                    n.activeUntil = new Date(item.activeUntil * 1000);
                } else {
                    n.activeUntil = null;
                }

                //it is news if dates are not set, exhibit otherwise
                if (n.activeFrom === null && n.activeUntil === null) {
                    n.type = 0;
                }
                n.created = new Date(item.created * 1000);

                // If link doesn't already exist, create one from the new item's title
                if (!n.hasOwnProperty('link')){
                    n.link = $filter('slugify')(n.title);
                }

                // If no 'blurb' exists, create one by truncating the description
                if (!n.hasOwnProperty('blurb')){
                    n.blurb = $filter('stripTags')(n.description);
                    n.blurb = $filter('truncate')(n.blurb, 250, '...', true);
                }

                n.slides = [];
                if (typeof item.images !== 'undefined') {
                    if (item.images.length > 0) {
                        for (var i = 0; i < item.images.length; i++) {
                            n.slides.push({image: item.images[i], text: "", active: false});
                        }
                        n.slides[0].active = true;
                    }
                }

                return n;
            });
        }

        return $resource('https://wwwdev2.lib.ua.edu/newsApp/api/:news', {}, {
            cache: false,
            get: {
                method: 'GET',
                params: {news: 'archive'},
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