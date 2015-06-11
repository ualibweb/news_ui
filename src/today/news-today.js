angular.module('ualib.news')

    .controller('NewsTodayCtrl', ['$scope', '$filter', 'ualibNewsFactory', function($scope, $filter, ualibNewsFactory){
        ualibNewsFactory.today()
            .$promise
            .then(function(data){
                $scope.news = data.news;
                $scope.events = data.events;
                $scope.exhibitions = data.exhibitions;
                $scope.newsOverflow = (data.news.length + data.events.length + data.exhibitions.length) > 3;
            });
    }]);