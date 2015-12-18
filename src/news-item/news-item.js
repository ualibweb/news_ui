angular.module('ualib.news')

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

    .controller('newsItemCtrl', ['$scope', 'newsItem', '$routeParams', '$document', function($scope, newsItem, $routeParams, $document){
        $document.duScrollTo(0, 30, 500, function (t) { return (--t)*t*t+1; });
        $scope.showEnlarged = false;
        $scope.curImage = 0;
        $scope.curEnlImage = 0;
        var controlElms;

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
    }]);