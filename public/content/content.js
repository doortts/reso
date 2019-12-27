'use strict';
/* jshint node: true */
/* global chrome: false */
/* global $: false */
/* global jQuery: false */
/* jslint browser:true */
/* jshint esversion: 6 */

class PageRecorder {
    constructor(location, title, author){
        this.location = location;
        this.segments = location.pathname.split("/");
        this.removeTrailingSlashFromSegments();
        this.page = {
            category: 'page',
            site: location.hostname.split(".")[0],
            title: title,
            author: author
        };
    }

    removeTrailingSlashFromSegments() {
        while(this.segments[this.segments.length -1] === "/"){
            this.segments.pop();
        }
    }

    getPathsToFilter(){
        return ["wiki", "pull", "issues", "issue", "post"];
    }

    getPageObjectToRecord(){
        let segments = this.segments;
        if( segments.length < 5) {
            return undefined;
        }

        let id = segments[segments.length -1].split("#")[0];
        let assumeType = segments[segments.length -2];
        let assumeProjectName = segments[segments.length -3];
        let assumeOwner = segments[segments.length -4];

        if(assumeType === 'wiki'){
            this.page.id = id;
            this.page.type = assumeType;
            this.page.owner = assumeOwner;
            this.page.projectName = assumeProjectName;
            this.page.url = this.location.origin + this.location.pathname;

            let PAGE_PREFIX = "//";
            // special case of oss wiki author
            this.page.author = $(".gh-header-meta").html().split(" edited this page ")[0].trim();
            this.page.metadata = PAGE_PREFIX + this.page.title + PAGE_PREFIX + this.page.author;
            return this.page;
        }

        if(Number.isInteger(parseInt(id)) && this.getPathsToFilter().indexOf(assumeType) !== -1){
            this.page.id = id;
            this.page.type = assumeType;
            this.page.owner = assumeOwner;
            this.page.projectName = assumeProjectName;
            this.page.url = this.location.origin + this.location.pathname;

            // special case of yobi title
            this.removeNumberStringFromTitleInYobi();

            let PAGE_PREFIX = "//";
            this.page.metadata = PAGE_PREFIX + this.page.title + PAGE_PREFIX + this.page.author;
            return this.page;
        }
    }

    removeNumberStringFromTitleInYobi() {
        if(this.page.site === 'yobi' && this.page.type === 'issue'){
            let startIndex = this.page.title.indexOf(" ");
            this.page.title = this.page.title.substr(startIndex).trim();
        }
    }
}

// Add jQuery extension for cursor position
(function ($, undefined) {
    $.fn.getCursorPosition = function() {
        var el = $(this).get(0);
        var pos = 0;
        if('selectionStart' in el) {
            pos = el.selectionStart;
        } else if('selection' in document) {
            el.focus();
            var Sel = document.selection.createRange();
            var SelLength = document.selection.createRange().text.length;
            Sel.moveStart('character', -el.value.length);
            pos = Sel.text.length - SelLength;
        }
        return pos;
    };

    $.fn.selectRange = function(start, end) {
        if(end === undefined) {
            end = start;
        }
        return this.each(function() {
            if('selectionStart' in this) {
                this.selectionStart = start;
                this.selectionEnd = end;
            } else if(this.setSelectionRange) {
                this.setSelectionRange(start, end);
            } else if(this.createTextRange) {
                var range = this.createTextRange();
                range.collapse(true);
                range.moveEnd('character', end);
                range.moveStart('character', start);
                range.select();
            }
        });
    };
})(jQuery);

var position = 0;
var lastMention = "";
var lastEditorText = "";
var HOST = {
    OSS: 'oss.navercorp.com',
    ES: 'es.naverlabs.com',
    YONA_LABS: 'yona.naverlabs.com',
    YONA_ORIGIN: 'repo.yona.io'
};

var PAGES_DONT_NEED_TO_RECORD = [
    "페이지를 찾을 수 없습니다 (hive)",
    "권한이 없거나 존재하지 않는 프로젝트입니다.",
    "Page not found · GitHub"
];

let targetDomain = ['github.com', HOST.OSS, HOST.ES, HOST.YONA_LABS, HOST.YONA_ORIGIN];

if(targetDomain.indexOf(window.location.hostname) !== -1){
    recordVisitedProject(getProject());
    recordVisitedPage();
}


var oldPathname = window.location.pathname;
recordForGithubPjaxPage();

////////////////////////////////////////
function recordForGithubPjaxPage() {
    setInterval(function() {
        if(oldPathname !== window.location.pathname){
            oldPathname = window.location.pathname;
            recordVisitedPage();
        }
    }, 3000);
}

function recordVisitedPage() {
    if (PAGES_DONT_NEED_TO_RECORD.indexOf(document.title) !== -1){
        return;
    }

    const VISITED_PAGES_LIMIT = 100;
    let pageRecorder = new PageRecorder(window.location, getTitle(), getAuthorName());
    let page = pageRecorder.getPageObjectToRecord();
    if(page){
        chrome.storage.local.get({
            visitedPages: [],
            starredPages: []
        }, local => {
            let found = _.find(local.starredPages, {url: page.url});
            _.remove(local.starredPages, {url: page.url});
            _.remove(local.visitedPages, {url: page.url});
            if(found){
                page.isStarred = true;
                local.starredPages.unshift(page);
            } else {
                local.visitedPages.unshift(page);
            }
            cutoffOverLimit(local);
            chrome.storage.local.set({
                starredPages: local.starredPages,
                visitedPages: local.visitedPages
            }, noop);
        });
    }

    /////////////////////////////
    function isTargetDomain() {
        let site = location.hostname.split(".")[0];
        return HOST[site.toUpperCase()];
    }

    function cutoffOverLimit(local) {
        while(local.visitedPages.length > VISITED_PAGES_LIMIT){
            local.visitedPages.pop();
        }
    }

    function getAuthorName(){
        if(isGitHubLike()){
            return $("a.author").first().html();
        } else if(isYonaLike()){
            return $(".author-info").find(".name").first().html();
        }
    }

    function isGitHubLike(){
        return window.location.hostname === HOST.OSS ||
            window.location.hostname === HOST.ES;
    }

    function isYonaLike() {
        return window.location.hostname === HOST.YONA_ORIGIN ||
            window.location.hostname === HOST.YONA_LABS
    }

    function getTitle(){
        if(isGitHubLike()){
            var titleLine = document.title.split(" · ");
            return titleLine[0];
        } else if(isYonaLike()){
            return document.title
        }
        return document.title;
    }
}

function recordVisitedProject(project) {
    const VISITED_PROJECTS_LIMIT = 100;

    if(project.isOrg || project.projectName.trim() === ""){
        return;
    }

    if (PAGES_DONT_NEED_TO_RECORD.indexOf(document.title) !== -1){
        return;
    }

    chrome.storage.local.get({
        visitedProjects : [],
        starredProjects : []
    }, local => {
        var foundFromStarred = _.find(local.starredProjects, {fullPath: getFullPath()});
        if(foundFromStarred){
            _.remove(local.visitedProjects, {fullPath: getFullPath()});
            _.remove(local.starredProjects, {fullPath: getFullPath()});
            project.isStarred = true;
            local.starredProjects.unshift(project);
        } else {
            placeProjectAtHeaderOfList(local, project);
            cutoffOverLimit(local);
        }

        chrome.storage.local.set({
            visitedProjects: local.visitedProjects,
            starredProjects: local.starredProjects
        }, noop);
    });

    ///////////////////////////////////
    function placeProjectAtHeaderOfList(local, project) {
        _.remove(local.visitedProjects, {fullPath: getFullPath()});
        local.visitedProjects.unshift(project);
    }

    function cutoffOverLimit(local) {
        while(local.visitedProjects.length > VISITED_PROJECTS_LIMIT){
            local.visitedProjects.pop();
        }
    }
}

function noop(){}

function getFullPath(){
    let hostname = window.location.hostname;
    let segments = window.location.pathname.split("/");
    let protocol = window.location.protocol;
    segments.shift();  // to remove leading slash
    return protocol + "//" + hostname + "/" + segments[0] + "/" + (segments[1] ||"");
}

function getProject() {
    let hostname = window.location.hostname;
    let segments = window.location.pathname.split("/");
    let protocol = window.location.protocol;
    segments.shift();  // to remove leading slash
    let fullPath = protocol + "//" + hostname + "/" + segments[0] + "/" + (segments[1] ||"");

    let project = {
        site: hostname.split(".")[0],
        owner: decodeURIComponent(segments[0]),
        projectName: decodeURIComponent(segments[1]) || "",
        path: "/" + segments[0] + "/" + segments[1] || "",
        fullPath: fullPath,
        isOrg: isOrg(segments),
    };

    if(isRequiredToFiltering()){
        return;
    }

    return project;

    //////////////////////////
    function isRequiredToFiltering() {
        if( (project.site === 'yona' || project.site === 'repo') &&
            project.owner === 'files'){
            return true;
        }
        return false;
    }

    function isOrg(segments){
        var orgLeadingSegments = ["orgs", "organizations"];
        return segments.length === 1 || orgLeadingSegments.indexOf(segments[0]) !== -1;
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        var focused = $(document.activeElement);
        var isMention = !!request.mention;
        if(request.popupOpen){
            position = focused.getCursorPosition();
            lastMention = "";
        }

        if(isMention){
            // remember last mention to prevent unintended mention repetition
            if(lastMention === request.mention
                && lastEditorText === focused.val()){
                return;
            } else {
                lastMention = request.mention;
            }

            // insert mention
            position = focused.getCursorPosition();
            let text = focused.val();
            let mentionInserted = text.substr(0, position) + request.mention +
                " " + text.substr(position);
            focused.val(mentionInserted);
            lastEditorText = mentionInserted;

            // move to new cursor position
            focused.selectRange(position + request.mention.length + 1);
        }
    }
);
