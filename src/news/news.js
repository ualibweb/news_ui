/**
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
    }]);