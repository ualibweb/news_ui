angular.module('ualib.news.templates', ['news-item/event-card.tpl.html', 'news-item/news-card.tpl.html', 'news-item/news-item.tpl.html', 'news/news-list.tpl.html', 'today/news-today.tpl.html']);

angular.module("news-item/event-card.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("news-item/event-card.tpl.html",
    "<a ng-href=\"{{newsCard.link}}\" target=\"_new\" class=\"media news-card\">\n" +
    "    <div class=\"media-left\">\n" +
    "        <div class=\"cal-icon\">\n" +
    "            <div class=\"cal-month\">{{newsCard.activeFrom | date:'MMM'}}</div>\n" +
    "            <div class=\"cal-day\">{{newsCard.activeFrom | date:'d'}}</div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\" ng-bind-html=\"newsCard.title | truncate:50:'...':true\"></h4>\n" +
    "        <p ng-bind-html=\"newsCard.blurb | truncate:150:'...':true\"></p>\n" +
    "    </div>\n" +
    "</a>");
}]);

angular.module("news-item/news-card.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("news-item/news-card.tpl.html",
    "<a ng-href=\"#/news-exhibits/{{newsCard.link}}\" class=\"media news-card\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <span ng-bind-html=\"newsCard.title | truncate:50:'...':true\"></span>\n" +
    "        </h4>\n" +
    "        <div class=\"details-context\" ng-if=\"(newsCard.activeFrom != newsCard.activeUntil && newsCard.type != 0)\">\n" +
    "            {{newsCard.activeFrom | date:mediumDate}} - {{newsCard.activeUntil | date:mediumDate}}\n" +
    "        </div>\n" +
    "        <div class=\"details-context\" ng-if=\"(newsCard.type == 0)\">\n" +
    "            {{newsCard.created | date:mediumDate}}\n" +
    "        </div>\n" +
    "        <p ng-bind-html=\"newsCard.blurb | truncate:150:'...':true\"></p>\n" +
    "    </div>\n" +
    "</a>");
}]);

angular.module("news-item/news-item.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("news-item/news-item.tpl.html",
    "<div class=\"page-header\">\n" +
    "    <h1>{{newsItem.title}}</h1>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-4 col-md-push-8\">\n" +
    "        <div class=\"well\" ng-if=\"newsItem.contactName\">\n" +
    "            <h4>For more information contact</h4>\n" +
    "            <ul class=\"fa-ul\">\n" +
    "                <li><span class=\"fa fa-user fa-li\"></span>{{newsItem.contactName}}</li>\n" +
    "                <li><span class=\"fa fa-phone fa-li\"></span>{{newsItem.contactPhone}}</li>\n" +
    "                <li><span class=\"fa fa-envelope fa-li\"></span>{{newsItem.contactEmail}}</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <a href=\"#/news-exhibits\" class=\"btn btn-default\"><span class=\"fa fa-reply\"></span> See all news &amp; exhibits</a>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-8 col-md-pull-4\">\n" +
    "        <div class=\"text-center news-carousel-container-small\" ng-if=\"newsItem.images.length > 0\">\n" +
    "            <ul rn-carousel rn-carousel-auto-slide rn-carousel-buffered\n" +
    "                rn-carousel-index=\"curImage\" rn-carousel-locked=\"isLocked\"\n" +
    "                class=\"image news-carousel-small\">\n" +
    "                <li ng-repeat=\"img in newsItem.images\">\n" +
    "                    <div class=\"layer text-center\">\n" +
    "                        <div class=\"news-carousel-image-small\"\n" +
    "                             ng-style=\"{'background-image':'url('+img+')'}\" ng-click=\"enlargeImages(true, $index)\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <div rn-carousel-indicators ng-if=\"newsItem.images.length > 1\" slides=\"newsItem.images\" rn-carousel-index=\"curImage\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <h5 class=\"text-muted\">\n" +
    "            <span>Created on {{newsItem.created | date:mediumDate}}</span>\n" +
    "        </h5>\n" +
    "        <p class=\"text-justify\" ng-bind-html=\"newsItem.description\"></p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div ng-show=\"showEnlarged\">\n" +
    "    <div class=\"carousel-lg\" ng-click=\"enlargeImages(false)\">\n" +
    "        <button type=\"button\" class=\"close\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n" +
    "        <ul rn-carousel rn-carousel-controls rn-carousel-index=\"curEnlImage\" class=\"image\">\n" +
    "            <li ng-repeat=\"img in newsItem.images\">\n" +
    "                <div class=\"layer\"><img class=\"fullsize-img\" ng-src=\"{{img}}\" ng-click=\"nextSlide()\"/></div>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <div class=\"text-center\" rn-carousel-indicators ng-if=\"newsItem.images.length > 1\" slides=\"newsItem.images\" rn-carousel-index=\"curEnlImage\"></div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--<div class=\"news-carousel-container-large\">-->\n" +
    "        <!--<ul rn-carousel rn-carousel-controls rn-carousel-buffered-->\n" +
    "            <!--rn-carousel-index=\"curEnlImage\" rn-carousel-transition=\"none\"-->\n" +
    "            <!--class=\"image news-carousel-large\" rn-carousel-controls-allow-loop>-->\n" +
    "            <!--<li ng-repeat=\"img in newsItem.images\">-->\n" +
    "                <!--<div class=\"layer text-center\">-->\n" +
    "                    <!--<div class=\"news-carousel-image-large\"-->\n" +
    "                         <!--ng-style=\"{'background-image':'url('+img+')'}\" ng-click=\"setCurEnlImage($event, $index)\">-->\n" +
    "                    <!--</div>-->\n" +
    "                <!--</div>-->\n" +
    "            <!--</li>-->\n" +
    "        <!--</ul>-->\n" +
    "        <!--<div rn-carousel-indicators ng-if=\"newsItem.images.length > 1\" slides=\"newsItem.images\" rn-carousel-index=\"curEnlImage\">-->\n" +
    "        <!--&lt;!&ndash;<div class=\"news-carousel-large-indicators text-center\" ng-if=\"newsItem.images.length > 1\">&ndash;&gt;-->\n" +
    "            <!--&lt;!&ndash;<span ng-repeat=\"img in newsItem.images\" class=\"clickable-item\"&ndash;&gt;-->\n" +
    "                  <!--&lt;!&ndash;ng-click=\"setCurEnlImage($event, $index)\">&ndash;&gt;-->\n" +
    "                <!--&lt;!&ndash;<span class=\"fa fa-2x fa-circle-o\" ng-class=\"{'fa-3x': $index == $parent.curEnlImage}\">&ndash;&gt;-->\n" +
    "                <!--&lt;!&ndash;</span>&ndash;&gt;-->\n" +
    "            <!--&lt;!&ndash;</span>&ndash;&gt;-->\n" +
    "        <!--&lt;!&ndash;</div>&ndash;&gt;-->\n" +
    "    <!--</div>-->\n" +
    "</div>\n" +
    "");
}]);

angular.module("news/news-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("news/news-list.tpl.html",
    "<div class=\"jumbotron bg-transparent\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-7\">\n" +
    "            <h1>News &amp; Exhibits</h1>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-5\">\n" +
    "            <div class=\"well\">\n" +
    "                <p class=\"lead\">Looking for upcoming events in the University Libraries?</p>\n" +
    "                <a href=\"http://events.ua.edu/category/22/\" class=\"btn btn-primary\" target=\"_new\">View event calendar <span class=\"fa fa-external-link\"></span></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-9\">\n" +
    "\n" +
    "        <div class=\"media animate-repeat\" ng-repeat=\"item in news | filter:{type: newsFilters.type}\n" +
    "                                                                  | filter:newsFilters.search\n" +
    "                                                                  | orderBy:['-sticky','-created']\">\n" +
    "            <div class=\"media-left hidden-sm hidden-xs\">\n" +
    "                <a ng-href=\"#/news-exhibits/{{item.link}}\" class=\"news-list-tb\">\n" +
    "                    <img class=\"media-object\" ng-src=\"{{item.tb}}\" ng-if=\"item.tb\" />\n" +
    "                    <span class=\"media-object\"\n" +
    "                          ng-if=\"item.type == 0 && !item.tb\"><span class=\"fa fa-newspaper-o\"></span></span>\n" +
    "                    <span class=\"media-object\"\n" +
    "                          ng-if=\"item.type == 1 && !item.tb\"><span class=\"fa fa-calendar\"></span></span>\n" +
    "                </a>\n" +
    "            </div>\n" +
    "            <div class=\"media-body\">\n" +
    "                <h3 class=\"media-heading\">\n" +
    "                    <a ng-href=\"#/news-exhibits/{{item.link}}\" ng-bind-html=\"item.title | highlight:newsFilters.search\"></a>\n" +
    "                </h3>\n" +
    "\n" +
    "                <h5 class=\"text-muted\" ng-if=\"item.type > 0\">Exhibit {{item.activeFrom | date:mediumDate}} - {{item.activeUntil | date:mediumDate}}</h5>\n" +
    "                <h5 class=\"text-muted\" ng-if=\"item.type < 1\">Created on {{item.created | date:mediumDate}}</h5>\n" +
    "                <p class=\"text-justify\">\n" +
    "                    <span ng-bind-html=\"item.blurb | highlight:newsFilters.search\">\n" +
    "                    </span>\n" +
    "                </p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"text-center\">\n" +
    "            <pagination total-items=\"filteredNews.length\" ng-model=\"soft.page\" max-size=\"10\" class=\"pagination-sm\" boundary-links=\"true\" items-per-page=\"soft.perPage\" ng-change=\"update()\" ng-if=\"filteredNews.length > soft.perPage\"></pagination>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"alert alert-warning text-center\" role=\"alert\" ng-show=\"news.length < 1\">\n" +
    "            <h2>\n" +
    "                No\n" +
    "                <span ng-show=\"newsFilters.type == ''\">News or Exhibits</span>\n" +
    "                <span ng-show=\"newsFilters.type == '0'\">News</span>\n" +
    "                <span ng-show=\"newsFilters.type == '1'\">Exhibits</span>\n" +
    "                match the search \"<strong>{{newsFilters.search}}</strong>\"</span>\n" +
    "            </h2>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-3 hidden-xs\">\n" +
    "        <h4>Filters</h4>\n" +
    "        <form class=\"facets-form\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"newsFilters.search\" placeholder=\"Keyword search\">\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("today/news-today.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("today/news-today.tpl.html",
    "<div class=\"row\" ng-controller=\"NewsTodayCtrl\">\n" +
    "\n" +
    "    <a news-card=\"item\" ng-repeat=\"item in news\">\n" +
    "    </a>\n" +
    "\n" +
    "    <masonry>\n" +
    "        <div class=\"masonry-brick\">\n" +
    "            <a news-card=\"item\" ng-repeat=\"item in news\">\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"masonry-brick\">\n" +
    "            <a news-card=\"item\" ng-repeat=\"item in events\">\n" +
    "            </a>\n" +
    "        </div>\n" +
    "        <div class=\"masonry-brick\">\n" +
    "            <div class=\"hours-list\"></div>\n" +
    "        </div>\n" +
    "    </masonry>\n" +
    "\n" +
    "</div>");
}]);
;angular.module('ualib.news', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ngAnimate',
    'angular.filter',
    'duScroll',
    'ui.bootstrap',
    'angular-carousel',
    'ualib.ui',
    'ualib.news.templates'
]);;angular.module('ualib.news')

    .factory('ualibNewsFactory', ['$resource', '$sce', '$filter', '$http', function($resource, $sce, $filter, $http){

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

                return n;
            });
        }

        //TODO: centralize this function so it can be used with all apps
        // Extend the default responseTransform array - Straight from Angular 1.2.8 API docs - https://docs.angularjs.org/api/ng/service/$http#overriding-the-default-transformations-per-request
        function appendTransform(defaults, transform) {

            // We can't guarantee that the default transformation is an array1
            defaults = angular.isArray(defaults) ? defaults : [defaults];
            //console.log(defaults.concat(transform));
            // Append the new transformation to the defaults
            return defaults.concat(transform);
        }

        return $resource('//wwwdev2.lib.ua.edu/newsApp/api/:news', {}, {
            get: {
                method: 'GET',
                params: {news: 'archive'},
                cache: true,
                transformResponse: appendTransform($http.defaults.transformResponse, function(data){
                    var news = angular.fromJson(data);
                    formatted = preprocessNews(news.news);
                    news.news = formatted;
                    return news;
                })
            },
            today: {
                method: 'GET',
                params: {news: 'today'},
                cache: true,
                transformResponse: appendTransform($http.defaults.transformResponse, function(data){
                    var news = angular.fromJson(data);
                    //var formatted = $filter('unique')(news.news, 'title');
                    for (var prop in news){
                        if (angular.isArray(news[prop])){
                            news[prop] = preprocessNews(news[prop]);

                        }
                    }
                    return news;
                })
            }
        });
    }]);;angular.module('ualib.news')

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/news-exhibits/:link', {
                reloadOnSearch: false,
                resolve: {
                    newsItem: ['ualibNewsFactory', function(ualibNewsFactory){
                        return ualibNewsFactory.get({news: 'archive'}, function(data){
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
                    }]
                },
                templateUrl: 'news-item/news-item.tpl.html',
                controller: 'newsItemCtrl'
            });
    }])

    .controller('newsItemCtrl', ['$scope', 'newsItem', '$routeParams', '$document', function($scope, newsItem, $routeParams, $document){
        $document.duScrollTo(0, 30, 500, function (t) { return (--t)*t*t+1; });
        $scope.showEnlarged = false;
        $scope.curImage = 0;
        $scope.curEnlImage = 0;
        var controlElms;

        $scope.enlargeImages = function(enlarge, index) {
            if (enlarge) {
                $scope.showEnlarged = true;
                $scope.isLocked = true;
                $scope.curEnlImage = index;
                if (!controlElms){
                    controlElms = angular.element(document.querySelectorAll('.rn-carousel-controls, .rn-carousel-indicator, .fullsize-img'));
                    controlElms.bind('click', function(ev){
                        ev.preventDefault();
                        ev.stopPropagation();
                    });
                }
            } else {
                $scope.showEnlarged = false;
                $scope.isLocked = false;
            }
        };

        $scope.setCurEnlImage = function(index) {
            $scope.curEnlImage = index;
        };

       newsItem.$promise.then(function(data){
           for (var i = 0, len = data.news.length; i < len; i++){
               var item = data.news[i];
               if (item.hasOwnProperty('link') && item.link === $routeParams.link){
                   $scope.newsItem = item;
               }
           }
       });

        $scope.$on('$destroy', function(){
            if (controlElms){
                controlElms.unbind('click');
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
                    newsList: ['ualibNewsFactory', function(ualibNewsFactory){
                        return ualibNewsFactory.get({news: 'archive'}, function(data){
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
                    }]
                },
                templateUrl: 'news/news-list.tpl.html',
                controller: 'newsListCtrl'
            });
    }])

    .controller('newsListCtrl', ['$scope', '$location', 'newsList', function($scope, $location, newsList){
        var filterWatcher;
        $scope.newsFilters = {
            sort: 'created',
            type: '',
            search: ''
        };

        newsList.$promise.then(function(data){
            $scope.news = data.news;
            paramsToScope();
            filterWatcher = $scope.$watch('newsFilters', function(newVal, oldVal){
                if (newVal !== oldVal){
                    processFilters();
                }
            }, true);
        });

        $scope.$on('$destroy', function(){
            filterWatcher();
        });

        //TODO: will need to replace highlight filter by a custom one
        // if we use item.description instead of item.blurb

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

    .controller('NewsTodayCtrl', ['$scope', '$filter', 'ualibNewsFactory', function($scope, $filter, ualibNewsFactory){
        ualibNewsFactory.today()
            .$promise
            .then(function(data){
                $scope.news = data.news;
                $scope.events = data.events;
                $scope.newsOverflow = (data.news.length + data.events.length) > 3;
            });
    }]);