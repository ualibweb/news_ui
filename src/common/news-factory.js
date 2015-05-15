angular.module('ualib.news')

    .factory('newsFactory', ['$resource', function($resource){
        return $resource('https://wwwdev2.lib.ua.edu/newsApp/api/:news');
    }]);