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
    "        <h4 class=\"media-heading\" ng-bind-html=\"newsCard.title\"></h4>\n" +
    "        <p ng-bind-html=\"newsCard.blurb\"></p>\n" +
    "    </div>\n" +
    "</a>");
}]);

angular.module("news-item/news-card.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("news-item/news-card.tpl.html",
    "<a ng-href=\"#/news-exhibits/{{newsCard.link}}\" class=\"media news-card\">\n" +
    "    <div class=\"media-body\">\n" +
    "        <h4 class=\"media-heading\">\n" +
    "            <span ng-bind-html=\"newsCard.title\"></span>\n" +
    "        </h4>\n" +
    "        <div class=\"details-context\" ng-if=\"(newsCard.activeFrom != newsCard.activeUntil && newsCard.type != 0)\">{{newsCard.activeFrom | date:mediumDate}} - {{newsCard.activeUntil | date:mediumDate}}</div>\n" +
    "        <p ng-bind-html=\"newsCard.blurb\"></p>\n" +
    "    </div>\n" +
    "</a>");
}]);

angular.module("news-item/news-item.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("news-item/news-item.tpl.html",
    "<div class=\"page-header\">\n" +
    "    <h1>{{newsItem.title}}</h1>\n" +
    "</div>\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-8\">\n" +
    "        <div class=\"text-center\" ng-if=\"newsItem.images.length > 0\">\n" +
    "            <ul rn-carousel rn-carousel-auto-slide rn-carousel-buffered\n" +
    "                rn-carousel-index=\"curImage\"\n" +
    "                class=\"image news-carousel-small\">\n" +
    "                <li ng-repeat=\"img in newsItem.images\">\n" +
    "                    <div class=\"layer text-center\">\n" +
    "                        <div class=\"news-carousel-image-small\"\n" +
    "                             ng-style=\"{'background-image':'url('+img+')'}\" ng-click=\"enlargeImages(true, $index)\">\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </li>\n" +
    "            </ul>\n" +
    "            <div rn-carousel-indicators ng-if=\"newsItem.images.length > 1\" slides=\"newsItem.images\" rn-carousel-index=\"curImage\">\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"text-muted\">\n" +
    "            <span>Created by {{newsItem.creator}} on {{newsItem.created | date:mediumDate}}</span>\n" +
    "        </div>\n" +
    "        <p class=\"text-justify\" ng-bind-html=\"newsItem.description\"></p>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-4\">\n" +
    "        <div class=\"well\" ng-if=\"newsItem.contactName\">\n" +
    "            <h4>For more information contact</h4>\n" +
    "            <ul class=\"fa-ul\">\n" +
    "                <li><span class=\"fa fa-user fa-li\"></span>{{newsItem.contactName}}</li>\n" +
    "                <li><span class=\"fa fa-phone fa-li\"></span>{{newsItem.contactPhone}}</li>\n" +
    "                <li><span class=\"fa fa-envelope fa-li\"></span>{{newsItem.contactEmail}}</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "        <a href=\"#/news-exhibits\" class=\"btn btn-default\"><span class=\"fa fa-reply\"></span> See all news &amp; exhibits</a>\n" +
    "    </div>\n" +
    "</div>\n" +
    "<div ng-show=\"showEnlarged\">\n" +
    "    <div class=\"news-carousel-container-large\">\n" +
    "        <ul rn-carousel rn-carousel-controls rn-carousel-controls-allow-loop rn-carousel-buffered\n" +
    "            rn-carousel-index=\"curEnlImage\" rn-carousel-transition=\"none\"\n" +
    "            class=\"image news-carousel-large\">\n" +
    "            <li ng-repeat=\"img in newsItem.images\">\n" +
    "                <div class=\"layer text-center\">\n" +
    "                    <div class=\"news-carousel-image-large\"\n" +
    "                         ng-style=\"{'background-image':'url('+img+')'}\" ng-click=\"enlargeImages(false, $index)\">\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "        <div class=\"news-carousel-large-indicators text-center\" ng-if=\"newsItem.images.length > 0\">\n" +
    "            <span ng-repeat=\"img in newsItem.images\" class=\"clickable-item\"\n" +
    "                  ng-click=\"setCurEnlImage($index)\">\n" +
    "                <span class=\"fa fa-2x fa-circle-o\" ng-class=\"{'fa-3x': $index == $parent.curEnlImage}\">\n" +
    "                </span>\n" +
    "            </span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("news/news-list.tpl.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("news/news-list.tpl.html",
    "<div class=\"jumbotron bg-transparent\">\n" +
    "    <div class=\"row\">\n" +
    "        <div class=\"col-md-7\">\n" +
    "            <h1>News &amp; Exhibits</h1>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-5\">\n" +
    "            <div class=\"well\">\n" +
    "                <p class=\"lead\">Looking for upcoming events in the University Libraries?</p>\n" +
    "                <a href=\"http://events.ua.edu/category/22/\" class=\"btn btn-primary\" target=\"_new\">View event calendar <span class=\"fa fa-external-link\"></span></a>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-md-9\">\n" +
    "\n" +
    "        <div class=\"media animate-repeat\" ng-repeat=\"item in news | filter:{type: newsFilters.type}\n" +
    "                                                                  | filter:newsFilters.search\n" +
    "                                                                  | orderBy:['-sticky','-created']\">\n" +
    "            <div class=\"media-left news-list-tb\"\n" +
    "                 ng-style=\"{'background-image':'url('+item.tb+')'}\" ng-if=\"item.tb.length > 0\">\n" +
    "            </div>\n" +
    "            <div class=\"media-left news-list-tb news-list-tb-news\" ng-if=\"item.type == 0 && item.images.length == 0\">\n" +
    "            </div>\n" +
    "            <div class=\"media-left news-list-tb news-list-tb-exhibit\" ng-if=\"item.type == 1 && item.images.length == 0\">\n" +
    "            </div>\n" +
    "            <div class=\"media-body\">\n" +
    "                <h4 class=\"media-heading\">\n" +
    "                    <a ng-href=\"#/news-exhibits/{{item.link}}\" ng-bind-html=\"item.title | highlight:newsFilters.search\"></a>\n" +
    "                    <small ng-if=\"item.type > 0\">{{item.activeFrom | date:mediumDate}} - {{item.activeUntil | date:mediumDate}}</small>\n" +
    "                </h4>\n" +
    "                <p class=\"text-justify\" ng-bind-html=\"item.description | truncate:250:true | highlight:newsFilters.search\"></p>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"text-center\">\n" +
    "            <pagination total-items=\"filteredNews.length\" ng-model=\"soft.page\" max-size=\"10\" class=\"pagination-sm\" boundary-links=\"true\" items-per-page=\"soft.perPage\" ng-change=\"update()\" ng-if=\"filteredNews.length > soft.perPage\"></pagination>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"alert alert-warning text-center\" role=\"alert\" ng-show=\"news.length < 1\">\n" +
    "            <h2>\n" +
    "                No\n" +
    "                <span ng-show=\"newsFilters.type == ''\">News or Exhibits</span>\n" +
    "                <span ng-show=\"newsFilters.type == '0'\">News</span>\n" +
    "                <span ng-show=\"newsFilters.type == '1'\">Exhibits</span>\n" +
    "                match the search \"<strong>{{newsFilters.search}}</strong>\"</span>\n" +
    "            </h2>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-3 software-list-container\">\n" +
    "        <h3>Filters</h3>\n" +
    "        <form class=\"facets-form\">\n" +
    "            <div class=\"form-group\">\n" +
    "                <input type=\"text\" class=\"form-control\" ng-model=\"newsFilters.search\" placeholder=\"Keyword search\">\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"form-group\">\n" +
    "                <label for=\"byType\">Type</label>\n" +
    "                <div id=\"byType\" class=\"btn-group btn-group-justified btn-group-sm\">\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"newsFilters.type\" btn-radio=\"''\">All</label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"newsFilters.type\" btn-radio=\"'0'\">News</label>\n" +
    "                    <label class=\"btn btn-default\" ng-model=\"newsFilters.type\" btn-radio=\"'1'\">Exhibits</label>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
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
