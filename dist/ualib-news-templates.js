angular.module('ualib-news.templates', ['news/news-list.tpl.html', 'today/news-today.tpl.html']);

angular.module("news/news-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("news/news-list.tpl.html",
    "<div class=\"page-header\"><h1>Libraries' Software List</h1></div>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-3 col-md-push-9\">\n" +
    "        <form>\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"soft.search\" placeholder=\"Search software, locations, etc...\" ng-change=\"update()\">\n" +
    "            </div>\n" +
    "            <div class=\"form-group\">\n" +
    "                <div class=\"btn-group btn-group-justified\">\n" +
    "                    <label class=\"btn btn-default active\" ng-model=\"soft.os\" btn-radio=\"''\" ng-change=\"update()\" uncheckable>All</label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"'1'\" ng-change=\"update()\" uncheckable><span class=\"fa fa-fw fa-windows\"></span></label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"'2'\" ng-change=\"update()\" uncheckable><span class=\"fa fa-fw fa-apple\"></span></label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"soft.os\" btn-radio=\"'3'\" ng-change=\"update()\" uncheckable><span class=\"fa fa-fw fa-linux\"></span></label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group hidden-xs\">\n" +
    "                <h5>Locations</h5>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"\" ng-model=\"soft.loc\" ng-change=\"update()\" checked>\n" +
    "                        All Locations\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\" ng-repeat=\"loc in software.locations\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"{{loc.name}}\" ng-model=\"soft.loc\" ng-change=\"update()\">\n" +
    "                        {{loc.name}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"form-group hidden-xs\">\n" +
    "                <h5>Categories</h5>\n" +
    "                <div class=\"radio\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"\" ng-model=\"soft.cat\" ng-change=\"update()\">\n" +
    "                        All categories\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "                <div class=\"radio\" ng-repeat=\"cat in software.categories\">\n" +
    "                    <label>\n" +
    "                        <input type=\"radio\" value=\"{{cat.name}}\" ng-model=\"soft.cat\" ng-change=\"update()\">\n" +
    "                        {{cat.name}}\n" +
    "                    </label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-9 col-md-pull-3 software-list-container\">\n" +
    "        <div class=\"text-center\">\n" +
    "            <pagination total-items=\"filteredSoft.length\" ng-model=\"soft.page\" max-size=\"10\" class=\"pagination-sm\" boundary-links=\"true\" items-per-page=\"soft.perPage\" ng-change=\"update()\" ng-if=\"filteredSoft.length > soft.perPage\"></pagination>\n" +
    "        </div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "        <div class=\"text-center\">\n" +
    "            <pagination total-items=\"filteredSoft.length\" ng-model=\"soft.page\" max-size=\"10\" class=\"pagination-sm\" boundary-links=\"true\" items-per-page=\"soft.perPage\" ng-change=\"update()\" ng-if=\"filteredSoft.length > soft.perPage\"></pagination>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("today/news-today.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("today/news-today.tpl.html",
    "<div class=\"news-container\" ng-if=\"news.totalNews\">\n" +
    "    <span class=\"fa fa-newspaper-o fa-3x\"></span>\n" +
    "    <a class=\"news-card\" ng-repeat=\"item in news.news\">\n" +
    "        <h4>{{item.title}}</h4>\n" +
    "        <p>{{item.blurb}}</p>\n" +
    "    </a>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"exhibits-container\" ng-if=\"news.totalExhibitions\">\n" +
    "    <span class=\"fa fa-eye fa-3x\"></span>\n" +
    "    <a class=\"news-card\" ng-repeat=\"exhibit in news.exhibitions\">\n" +
    "        <h4>{{exhibit.title}}</h4>\n" +
    "        <p>{{exhibit.blurb}}</p>\n" +
    "    </a>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"events-container\" ng-if=\"news.totalEvents\">\n" +
    "    <span class=\"fa fa-calendar fa-3x\"></span>\n" +
    "    <a class=\"news-card\" ng-repeat=\"event in news.events\">\n" +
    "        <h4>{{event.title}}</h4>\n" +
    "        <p>{{event.blurb}}</p>\n" +
    "    </a>\n" +
    "</div>");
}]);
