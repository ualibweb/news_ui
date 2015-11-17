angular.module('ualib.news')

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
    }]);