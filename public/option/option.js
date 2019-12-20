'use strict';

/* jshint node: true */
/* global chrome: false */
/* global $: false */
/* global jQuery: false */
/* global ga: false */
/* jslint browser:true */
/* jshint esversion: 6 */

require('material-design-lite');
global.jQuery = require('jquery');
global.$ = global.jQuery;

$(".clear-settings").on("click", function(){
    chrome.storage.local.clear();
    chrome.storage.sync.clear(function(){
        showSnackBar("OK", "모든 설정을 지웠습니다.");
    });
});

function showSnackBar(okMessage, mainMessage) {
    let snackbar = $('.result-snackbar');
    snackbar.find('.tip').html(mainMessage);
    snackbar.find('.count').html(okMessage);
    snackbar.one("click", () => {
        snackbar.css("visibility", "hidden");
    });
    snackbar.css("visibility", "visible");
}

$(".support-page").on("click", function(){
    chrome.storage.local.get({
        ENV: {}
    }, function(local){
        chrome.tabs.create({ url: local.ENV.SUPPORT_PAGE });
    });
    
});

var manifest = chrome.runtime.getManifest();
$(".version").html("Kick v" + manifest.version);

/*jshint -W069 */
/*jshint -W030 */
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments);},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m);
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-77764923-1', 'auto');
ga('set', 'checkProtocolTask', function(){}); // Removes failing protocol check. @see: http://stackoverflow.com/a/22152353/1958200
ga('require', 'displayfeatures');
ga('send', 'pageview', '/views/option.html');
