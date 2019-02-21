angular.module('ualib.news')

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
                    n.activeFrom = new Date(correctEventTime(item.activeFrom));
                    console.log(n.activeFrom);
                } else {
                    n.activeFrom = null;
                }
                if (item.activeUntil !== null) {
                    n.activeUntil = new Date(correctEventTime(item.activeUntil));
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
    }]);
