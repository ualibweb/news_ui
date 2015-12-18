angular.module('ualib.news')

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