chrome.browserAction.onClicked.addListener(function() {
    chrome.windows.getAll({ populate: true }, getWindows);
});

function getWindows(windows) {
    var ymTabs = [];
    for (var i = 0; i < windows.length; i++) {
        for (var j = 0; j < windows[i].tabs.length; j++) {
            if (windows[i].tabs[j].url.includes("music.yandex.ru/users/"))
                ymTabs.push(windows[i].tabs[j]);
        }
    }

    if (ymTabs.length) {
        chrome.tabs.executeScript(ymTabs[0].id, { file: "action-parse.js" }, null);
    } else {
        alert("Google Play Music page is not open");
    }
}
