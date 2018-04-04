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
    "        <h3 class=\"h4 media-heading\" ng-bind-html=\"newsCard.title | truncate:50:'...':true\"></h3>\n" +
    "        <p ng-bind-html=\"newsCard.blurb | truncate:150:'...':true\"></p>\n" +
    "    </div>\n" +
    "</a>");
}]);

angular.module("news-item/news-card.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("news-item/news-card.tpl.html",
    "<a ng-href=\"#/news-exhibits/{{newsCard.link}}\" class=\"media news-card\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h3 class=\"h4 media-heading\">\n" +
    "            <span ng-bind-html=\"newsCard.title | truncate:50:'...':true\"></span>\n" +
    "        </h3>\n" +
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
    "<div class=\"jumbotron-header\">\n" +
    "    <div class=\"jumbotron\">\n" +
    "        <div class=\"container\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <ol class=\"breadcrumb\" typeof=\"BreadcrumbList\" vocab=\"http://schema.org/\">\n" +
    "                        <li><a title=\"Go to The University of Alabama Libraries.\" href=\"/#/home\" class=\"home\">The University of Alabama Libraries</a></li>\n" +
    "                        <li><a title=\"Go to News.\" href=\"/#/news-exhibits\" class=\"post post-page\">News</a></li>\n" +
    "                        <li><a title=\"Go to news article.\" href=\"\" class=\"post post-page\">{{newsItem.title | truncate: 30: '...': true}}</a></li>\n" +
    "                    </ol>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-7\">\n" +
    "                    <h1>News &amp; Exhibits</h1>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-5\">\n" +
    "                    <div class=\"well\">\n" +
    "                        <p class=\"lead\">Looking for upcoming events in the University Libraries?</p>\n" +
    "                        <a href=\"https://www.ua.edu/events/category/22/view/month/\" class=\"btn btn-primary\" target=\"_new\">View event calendar <span class=\"fa fa-external-link\"></span></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"page-header\">\n" +
    "        <h2>{{newsItem.title}}</h2>\n" +
    "    </div>\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-4 col-md-push-8\">\n" +
    "            <div class=\"well\" ng-if=\"newsItem.contactName\">\n" +
    "                <h4>For more information contact</h4>\n" +
    "                <ul class=\"fa-ul\">\n" +
    "                    <li><span class=\"fa fa-user fa-li\"></span>{{newsItem.contactName}}</li>\n" +
    "                    <li><span class=\"fa fa-phone fa-li\"></span>{{newsItem.contactPhone}}</li>\n" +
    "                    <li><span class=\"fa fa-envelope fa-li\"></span>{{newsItem.contactEmail}}</li>\n" +
    "                </ul>\n" +
    "            </div>\n" +
    "            <a href=\"#/news-exhibits\" class=\"btn btn-default\"><span class=\"fa fa-reply\"></span> See all news &amp; exhibits</a>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-8 col-md-pull-4\">\n" +
    "            <div class=\"text-center news-carousel-container-small\" ng-if=\"newsItem.images.length > 0\">\n" +
    "                <div class=\"layer text-center image-holder\" ng-repeat=\"img in newsItem.images track by $index\">\n" +
    "                    <img class=\"news-image\" ng-src=\"{{img.src}}\" ng-click=\"enlargeImages(true, $index)\" ng-if=\"newsItem.altText != null\" ng-attr-alt=\"{{newsItem.altText}}\" />\n" +
    "                    <img class=\"news-image\" ng-src=\"{{img.src}}\" ng-click=\"enlargeImages(true, $index)\" ng-if=\"newsItem.altText == null\" />\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <h5 class=\"text-muted\">\n" +
    "                <span>Created on {{newsItem.created | date:mediumDate}}</span>\n" +
    "            </h5>\n" +
    "            <p class=\"text-justify\" ng-bind-html=\"newsItem.description\"></p>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("news/news-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("news/news-list.tpl.html",
    "<div class=\"jumbotron-header\">\n" +
    "    <div class=\"jumbotron\">\n" +
    "        <div class=\"container\">\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-12\">\n" +
    "                    <ol class=\"breadcrumb\" typeof=\"BreadcrumbList\" vocab=\"http://schema.org/\">\n" +
    "                        <li><a title=\"Go to The University of Alabama Libraries.\" href=\"/#/home\" class=\"home\">The University of Alabama Libraries</a></li>\n" +
    "                        <li><a title=\"Go to News.\" href=\"/#/news-exhibits\" class=\"post post-page\">News</a></li>\n" +
    "                    </ol>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"row\">\n" +
    "                <div class=\"col-sm-7\">\n" +
    "                    <h1>News &amp; Exhibits</h1>\n" +
    "                </div>\n" +
    "                <div class=\"col-sm-5\">\n" +
    "                    <div class=\"well\">\n" +
    "                        <p class=\"lead\">Looking for upcoming events in the University Libraries?</p>\n" +
    "                        <a href=\"https://www.ua.edu/events/category/22/view/month/\" class=\"btn btn-primary\" target=\"_new\">View event calendar <span class=\"fa fa-external-link\"></span></a>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"container\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-3 col-md-push-9 hidden-xs\">\n" +
    "            <h2 class=\"h4\">Filters</h2>\n" +
    "            <form class=\"facets-form\">\n" +
    "                <div class=\"form-group\">\n" +
    "                    <h3 class=\"h5\" id=\"filterNews\">Search news and exhibits</h3>\n" +
    "                    <input type=\"text\" aria-labelledby=\"filterNews\" class=\"form-control\" ng-model=\"newsFilters.search\" placeholder=\"Keyword search\">\n" +
    "                </div>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-9 col-md-pull-3\">\n" +
    "\n" +
    "            <div class=\"media animate-repeat\" ng-repeat=\"item in news | filter:{type: newsFilters.type}\n" +
    "                                                                  | filter:newsFilters.search\n" +
    "                                                                  | orderBy:['-sticky','-created']\">\n" +
    "                <div class=\"media-left hidden-sm hidden-xs\">\n" +
    "                    <span class=\"news-list-tb\" ng-class=\"{img: item.tb}\">\n" +
    "                        <img class=\"media-object\" ng-src=\"{{item.tb}}\" alt={{item.altText}} ng-if=\"item.tb\" />\n" +
    "                        <span class=\"media-object\"\n" +
    "                          ng-if=\"item.type == 0 && !item.tb\"><span class=\"fa fa-newspaper-o\"></span></span>\n" +
    "                        <span class=\"media-object\"\n" +
    "                          ng-if=\"item.type == 1 && !item.tb\"><span class=\"fa fa-calendar\"></span></span>\n" +
    "                    </span>\n" +
    "                </div>\n" +
    "                <div class=\"media-body\">\n" +
    "                    <h2 class=\"h3 media-heading\">\n" +
    "                        <a ng-href=\"#/news-exhibits/{{item.link}}\" ng-bind-html=\"item.title | highlight:newsFilters.search\"></a>\n" +
    "                    </h2>\n" +
    "\n" +
    "                    <h3 class=\"h5 text-muted\" ng-if=\"item.type > 0\">Exhibit {{item.activeFrom | date:mediumDate}} - {{item.activeUntil | date:mediumDate}}</h5>\n" +
    "                    <h3 class=\"h5 text-muted\" ng-if=\"item.type < 1\">Created on {{item.created | date:mediumDate}}</h5>\n" +
    "                    <p class=\"text-justify\">\n" +
    "                    <span ng-bind-html=\"item.blurb | highlight:newsFilters.search\">\n" +
    "                    </span>\n" +
    "                    </p>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"text-center\">\n" +
    "                <pagination total-items=\"filteredNews.length\" ng-model=\"soft.page\" max-size=\"10\" class=\"pagination-sm\" boundary-links=\"true\" items-per-page=\"soft.perPage\" ng-change=\"update()\" ng-if=\"filteredNews.length > soft.perPage\"></pagination>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"alert alert-warning text-center\" role=\"alert\" ng-show=\"news.length < 1\">\n" +
    "                <span class=\"h2\">\n" +
    "                    No\n" +
    "                    <span ng-show=\"newsFilters.type == ''\">News or Exhibits</span>\n" +
    "                    <span ng-show=\"newsFilters.type == '0'\">News</span>\n" +
    "                    <span ng-show=\"newsFilters.type == '1'\">Exhibits</span>\n" +
    "                    match the search \"<strong>{{newsFilters.search}}</strong>\"</span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
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
;/**
 * @ngdoc overview
 * @name index
 * @description
 * # Quick Start
 *
 * Run the following commands to install:
 *
 * ```shell
 * npm install
 * bower install
 * ```
 *
 * <div class="alert alert-warning">
 *     If you are unfamiliar with **Node.js**, **Grunt**, or **Bower** tools *or* have not installed them on your computer,
 *     read through the instructions in the [Getting Started](#getting-started) section.
 * </div>
 *
 * # Getting Started
 *
 * This package requires[Node.js](http://nodejs.org/) - an application platform which many development and automation tools may be run.
 * Download [Node.js](http://nodejs.org/download/) and install it on your computer.
 *
 * > The **Node.js** platform is used to run development tools such as [Grunt](#getting-started_install-grunt) and [Bower](#getting-started_install-bower)
 *
 * Once `Node.js` is installed, use the `npm` (node package manager) command to install this project's node dependencies:
 *
 * ```shell
 * npm install
 * ```
 *
 * <div class="alert alert-info">
 *     When the [npm install](https://docs.npmjs.com/cli/install) command is run without a package (e.g., `npm install <package_name>`),
 *     it installs dependencies listed in the `package.json` file (located in the root directory of this project).
 * </div>
 *
 *
 * ## Install Grunt
 * *This package requires Grunt `~0.4.5`*
 *
 * If you have not already installed `Grunt` on your computer, use the following command to install the `Grunt Command Line Interface (grunt-cli)`:
 *
 * ```shell
 * npm install -g grunt-cli
 * ```
 * <div class="alert alert-info">
 *     The **-g** option installs `grunt-cli` globally on you computer. You only need to run this command once.
 * </div>
 *
 * > If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide,
 * > as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins.
 *
 *
 * ## Install Bower
 *
 * If `Bower` is not globally installed on your computer, run the following command:
 *
 * ```shell
 * npm install -g bower
 * ```
 *
 * [Bower](http://bower.io/) is also a package manager for front-end web frameworks such as jQuery, Angular, and Bootstrap.
 * This project uses Bower to manage front-end third-party and peer dependencies.
 *
 * Once installed, you can download this project's `Bower` dependencies with the following command:
 *
 * ```shell
 * bower install
 * ```
 *
 * <div class="alert alert-info">
 *     Similar to `npm install` if `Bower's install` command is not given a package name (e.g., `bower install <package_name>`), it will install
 *     dependencies listed in the `bower.json` config file.
 * </div>
 */

angular.module('ualib.news', [
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

    /**
     * @ngdoc service
     * @name news.ualibNewsFactory
     *
     * @requires $resource
     * @requires $sce
     * @requires $filters
     * @requires $http
     */

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
        
        /**
         * @ngdoc function
         * @name news.ualibNewsFactory#appendTransform
         * @methodOf news.ualibNewsFactory
         *
         * @param {Array.<function()>} defaults Default `Array` of `$http` transform response transform functions from Angular - will always be `$http.defaults.transformResponse`
         * @param {function()} transform Transform function to extend the `$http.defaults.transformResponse` Array with.
         *
         * @description
         * <span class="label label-warning">Private</span>
         * Extend the default responseTransform array - Straight from Angular 1.2.8 API docs - https://docs.angularjs.org/api/ng/service/$http#overriding-the-default-transformations-per-request
         *
         * Doing this allows custom modifications of the JSON response from the API to be cached after the initial `$resource` call, instead of
         * performing these modifications on every `$digest()` cycle (e.g., make modifications once, instead of every time the news list is refreshed).
         *
         * @returns {Array.<function()>} Returns the new `transformResponse` Array
         */
        function appendTransform(defaults, transform) {

            // We can't guarantee that the default transformation is an array1
            defaults = angular.isArray(defaults) ? defaults : [defaults];
            //console.log(defaults.concat(transform));
            // Append the new transformation to the defaults
            return defaults.concat(transform);
        }

        /**
         * @ngdoc method
         * @name news.ualibNewsFactory:get
         * @methodOf news.ualibNewsFactory
         *
         * @param {object.<string>=} params REST params object to send to the API
         * @param {string} params.news News list identifier
         *
         * Available `identifiers`:
         * - `archive` - Retrieves all news items from the API.
         *
         * @example
         * <pre>
         ualibNewsFactory.get({news: 'archive'})
            .$promise
            .then(function(data){
                $scope.news = data;
            }, function(data, status, headers, config) {
                console.log({
                    data: data,
                    status: status,
                    headers: headers,
                    config: config
                });
            });
         * </pre>
         *
         * @returns {Promise} Returns a [promise](https://code.angularjs.org/1.2.29/docs/api/ng/service/$q).
         */

        /**
         * @ngdoc method
         * @name news.ualibNewsFactory:today
         * @methodOf news.ualibNewsFactory
         *
         * @description
         * Retrieves *current* news items from the API and upcoming events from the [UA Events Calendar](http://events.ua.edu/category/22/).
         *
         * @example
         * <pre>
         *     ualibNewsFactory.today()
         .$promise
         .then(function(data){
                $scope.news = data.news;
                $scope.events = data.events;
            });
         * </pre>
         *
         * @returns {Promise} Returns a [promise](https://code.angularjs.org/1.2.29/docs/api/ng/service/$q).
         */

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

    /**
     * @ngdoc interface
     * @name news.news-item
     *
     * @description
     * Route module to display individual news items
     *
     * ```
     * /#/news-exhibits/:news-item
     * ```
     *
     *
     */

    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/news-exhibits/:link', {
                reloadOnSearch: false,
                resolve: {
                    /**
                     * @ngdoc service
                     * @name news.news-item.newsItem
                     *
                     * @requires news.ualibNewsFactory
                     *
                     * @description
                     * A resolve service for {@link news.Route:news-item news-item} route, which is injected into the {@link news.controller:newsItemCtrl}
                     */
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

    /**
     * @ngdoc controller
     * @name news.news-item.controller:newsItemCtrl
     *
     * @requires $scope
     * @requires $routeParams
     * @requires $document
     * @requires ualibNewsFactory
     *
     * @description
     * Route controller when viewing individual news items
     */

    .controller('newsItemCtrl', ['$scope', 'newsItem', '$routeParams', '$document', '$q', function($scope, newsItem, $routeParams, $document, $q){
        $document.duScrollTo(0, 30, 500, function (t) { return (--t)*t*t+1; });
        $scope.showEnlarged = false;
        $scope.curImage = 0;

        var controlElms;

        function loadImages(item, i, len, deferred){
            i = i ? i :0;
            len = len ? len : item.images.length;
            deferred = deferred ? deferred : $q.defer();

            if (len < 1){
                deferred.resolve(item);
            }

            var image = new Image();

            image.onload = function(){
                this.styles = 'url('+this.src+')';


                if (this.width/this.height < 1.3){
                    this.isPortrait = true;
                    console.log("PORTRAIT TRUE!");
                }
                item.images[i] = this;

                if (i+1 === len){
                    deferred.resolve(item);
                }
                else {
                    i++;
                    loadImages(item, i, len, deferred);
                }
            };

            image.src = item.images[i];

            return deferred.promise;
        }

        /**
         * @ndgoc method
         * @name news.news-item.controller:newsItemCtrl.$scope.englargeImages
         * @methodOf news.controller:newsItemCtrl
         *
         * @param {boolean} enlarge `true` or `false` to toggle full screen
         * @param {number} index Element index of the image clicked - ensures that the image clicked is the one visible when toggling full screen
         *
         * @description
         * `$scope` function used to trigger full-screen carousel when images are attached to a news item.
         */
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

        /**
         * @ndgoc method
         * @name news.news-item.controller:newsItemCtrl.$scope.setCurEnlImage
         * @methodOf news.controller:newsItemCtrl
         *
         * @param {number} index Element index of the image
         *
         * @description
         * `$scope` function to set the currently viewable image in the carousel.
         */

        $scope.setCurEnlImage = function(index) {
            $scope.curEnlImage = index;
        };

       newsItem.$promise.then(function(data){
           var item = null;
           for (var i = 0, len = data.news.length; i < len; i++){
               item = data.news[i];
               if (item.link && item.link === $routeParams.link){
                   break;
               }
           }



           loadImages(item).then(function(newsItem){
               $scope.newsItem = newsItem;

               if ($scope.newsItem.altText === ''){
                   console.log("Alt text empty!");
                   console.log($scope.newsItem);
               }
               else {
                   console.log($scope.newsItem);
               }
           });
       });



        $scope.$on('$destroy', function(){
            if (controlElms){
                controlElms.unbind('click');
            }
        });
    }])

    /**
     * @ngdoc directive
     * @name news.news-item.directive:newsCard
     *
     * @restrict A
     * @scope
     *
     * @param {object} newsCard The news item JSON object from the API
     * @param {string=} [newsType=news] Used to load templates for different types of news items
     *
     * Supported `news types`:
     *
     * | type | template |
     * |------|----------|
     * | news | `news-item/news-card.tpl.html` |
     * | event | `news-item/news-card.tpl.html` |
     *
     * @description
     * Directive to render different types of news items in a condensed list. This is useful for lists of the most current items and not intended for
     * rendering a list of the whole news archive
     *
     * @example
     *
     * ```html
     * <h2>News</h2>
     * <div ng-repeat="item in news">
     *      <div news-card="item">
     * </div>
     *
     * <h2>Events</h2>
     * <div ng-repeat="item in event">
     *      <div news-card="item" news-type="event">
     * </div>
     * ```
     * 
     */

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
    }]);;/**
 * @ngdoc overview
 * @name news
 * 
 * @requires  ngRoute
 * @requires ngResource
 * @requires ngSanitize
 * @requires ngAnimate
 * @requires angular.filter
 * @requires duScroll
 * @requires ui.bootstrap
 * @requires angular-carousel
 * @requires ualib.ui
 *
 * @description
 * News and Events web app
 *
 * **default route: [/#/news-exhibits](http://www.lib.ua.edu/#/news-exhibits/)**
 */
angular.module('ualib.news')

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

    /**
     * @ngdoc controller
     * @name news.Controller:newsListCtrl
     *
     * @requires $scope
     * @requires $location
     * @requires news.ualibNewsFactory
     *
     * @description
     * Controller for the News and Exhibits web app route {@link $scope}
     *
     */

    .controller('newsListCtrl', ['$scope', '$location', 'newsList', function($scope, $location, newsList){
        var filterWatcher;
        /**
         * @ngdoc object
         * @name news.Controller:newsListCtrl:$scope.newsFilter
         * @propertyOf news.Controller:newsListCtrl
         * @type {Object.<string>}
         *
         * @description
         * `$scope` object for the news list filters
         */
        $scope.newsFilters = {
            sort: 'created',
            type: '',
            search: ''
        };

        /**
         * @ngdoc object
         * @name news.Controller:newsListCtrl:$scope.news
         * @propertyOf news.Controller:newsListCtrl
         *
         * @description
         * `$scope` variable for the list of news items return from the API via the {@link news.ualibNewsFactory ualibNewsFactory} service.
         */

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

        /**
         * @ngdoc function
         * @name news.Controller:newsListCtrl#paramsToScope
         * @methodOf news.Controller:newsListCtrl
         *
         * @description
         * <span class="label label-danger">private</span>
         *
         * Function to bind `URI query params` to `$scope.newsFilters`.
         */
        function paramsToScope(){
            var params = $location.search();
            for (var param in params){
                if ($scope.newsFilters.hasOwnProperty(param)){
                    $scope.newsFilters[param] = params[param];
                }
            }
        }

        /**
         * @ngdoc function
         * @name news.Controller:newsListCtrl#processFilters
         * @methodOf news.Controller:newsListCtrl
         *
         * @description
         * <span class="label label-danger">private</span>
         *
         * Function to bind `$scope.newsFilters` to `URI query params`.
         */
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

    /**
     * @ngdoc controller
     * @name news.controller:NewsTodayCtrl
     *
     * @requires $scope
     * @requires $filter
     * @requires ualibNewsFactory
     *
     * @description
     * Convenience controller to be used with the {@link news.directive:newsCard newsCard} directive, to display
     * current `news` and `events`.
     *
     * @example
     * ```html
     * <div ng-contorller="NewsTodayCtrl">
     *  <h2>News</h2>
     *  <div ng-repeat="item in news">
     *      <div news-card="item">
     *  </div>
     *
     *  <h2>Events</h2>
     *  <div ng-repeat="item in event">
     *      <div news-card="item" news-type="event">
     *  </div>
     * </div>
     * ```
     */

    .controller('NewsTodayCtrl', ['$scope', '$filter', 'ualibNewsFactory', function($scope, $filter, ualibNewsFactory){
        ualibNewsFactory.today()
            .$promise
            .then(function(data){
                $scope.news = data.news;
                $scope.events = data.events;
                $scope.newsOverflow = (data.news.length + data.events.length) > 3;
            });
    }]);