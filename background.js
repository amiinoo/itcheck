(function(ITCheck){
	
	// Get things rolling
	chrome.alarms.onAlarm.addListener(ITCheck.getUnreadThreadCount);
	chrome.runtime.onStartup.addListener(function () {
		chrome.alarms.create("updater", { "periodInMinutes": 1 });
	});
	
	// According to https://developer.chrome.com/extensions/runtime#event-onInstalled this runs on install, update, and when chrome is updated
	chrome.runtime.onInstalled.addListener(function(details) {
		ITCheck.storage.storageGet('ITCheck.hasInstalled', function(result){
			if(result){
				return;
			}
			ITCheck.storageSet('ITCheck.hasInstalled', true);
			chrome.alarms.create("updater", { "periodInMinutes": 1 });
			chrome.tabs.create({url: "/options/options.html"}, function (tab) {});
		});
	});

	// Update number on navigate to a new thread
	chrome.webNavigation.onCompleted.addListener(function (details) {
		ITCheck.getUnreadThreadCount(null);
	},{url: [{hostSuffix: 'ivorytower.com', pathPrefix: '/IvoryTower/ForumThread.aspx'}]});
})(window.ITCheck);	