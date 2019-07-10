var article = {};
var articles = [];


// Use some nice scrollbars for in-page independent scrolling
$("#testContainer").overlayScrollbars({
    className: "os-theme-dark",
    resize: "none",
    autoHide: "move"
})

//Gets all of the articles and loads their titles, locations and synopses
function getArticles() {
    $("#dynamicContainer").empty();
    $.getJSON("/articles/articleListing.json")
        .done(function(data) {
            $.each(data.archives, function(i, archive) {
                article = {
                    _url: archive.url,
                    _title: archive.title,
                    _synopsis: archive.synopsis
                }
                articles.push(article);
            });
            articles.reverse();
            displayHome();
        });
}

//Displays articles as listing boxes
function displayHome() {
    $("#dynamicContainer").empty();
    var appender = "";
    var i;
    for (i = 0; i < articles.length; ++i) {
        appender += "<div class=\"catalogmember\" articleurl=\"" + articles[i]._url + "\" articletitle=\"" + articles[i]._title + "\"><div class=\"blurcontainer\"><div class=\"blur\"></div></div><div class=\"membertitle\">" + articles[i]._title + "</div><div class=\"memberdetails\"><span>" + articles[i]._synopsis + "</span></div></div>";
    }
    $("#dynamicContainer").append("<div class=\"articleListing\">" + appender + "</div>");
}

//Empties the main container and loads an article
function displayArticle(articleURL) {
    $("#dynamicContainer").empty();
    if (articleURL.length == 0) {
        displayHome()
    } else {
        $("#dynamicContainer").load("articles/" + articleURL);
        if ($("#dynamicContainer").is(":empty")) {
            displayHome();
            doPushState("", "");
        }
    }
}

//Supposed to push history states. WIP
function doPushState(articleURL, articleTitle) {
    var state = { selectedArticle: articleURL },
        title = articleTitle,
        path = "/";
    history.pushState(state, title, path);
}

//Checks for a direct link to an article. Dismisses other variables for now
function checkURL() {
    var url = window.location.search.substring(1);
    var urlvars = url.split('&');
    var articlevar = urlvars[0].split('=');
    if (articlevar[0] == "a") {
        displayArticle(articlevar[1]);
    }
}

$("#dynamicContainer").on("click", ".catalogmember", function() {
    displayArticle($(this).attr("articleurl"));
    doPushState($(this).attr("articleurl"), $(this).attr("articletitle"))
});

$("#dynamicContainer").on("click", ".return", function() {
    displayHome();
});

getArticles();
checkURL();