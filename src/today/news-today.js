angular.module('ualib.news')

    .controller('NewsTodayCtrl', ['$scope', '$filter', 'newsFactory', function($scope, $filter, newsFactory){
        newsFactory.today()
            .$promise
            .then(function(data){
                $scope.news = data.news;
                $scope.events = data.events;
                $scope.exhibitions = data.exhibitions;
                $scope.newsOverflow = (data.news.length + data.events.length + data.exhibitions.length) > 3;
            });
    }]);