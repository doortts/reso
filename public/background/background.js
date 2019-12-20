
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.syncCloud === true){
            var updateTime = Date.now();
            chrome.storage.local.get({
                updateTime: 0,
                starredUsers : [],
                starredProjects: [],
                starredPages: []
            }, function(local) {
                chrome.storage.sync.get({
                    updateTime: -1,
                    starredUsers : [],
                    starredProjects: [],
                    starredPages: []
                }, function(cloud) {
                    if(local.updateTime > cloud.updateTime){
                        chrome.storage.sync.set({
                            updateTime: local.updateTime,
                            starredUsers : local.starredUsers,
                            starredProjects: local.starredProjects,
                            starredPages: local.starredPages
                        }, function(result){
                            sendResponse({sync: "sync with local"});
                        });
                    } else if (local.updateTime < cloud.updateTime){
                        chrome.storage.local.set({
                            updateTime: cloud.updateTime,
                            starredUsers : cloud.starredUsers,
                            starredProjects: cloud.starredProjects,
                            starredPages: cloud.starredPages
                        }, function(result){
                            sendResponse({sync: "sync with cloud"});
                        });
                    }
                    
                });
            });
        }
    });