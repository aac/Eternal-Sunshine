var hiddenFriends;

jQuery(document).ready(function(){
    if (!localStorage.hiddenFriends)
        localStorage.hiddenFriends = JSON.stringify([]);

    hiddenFriends = JSON.parse(localStorage.hiddenFriends);

    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	if (request.action == "getHiddenFriends")
	    sendResponse({hiddenFriends: getHiddenFriends()})
	else
	    sendResponse({}); // snub them.
    });
});

function addHiddenFriend(id)
{
    hiddenFriends.push(id);
    localStorage.hiddenFriends=JSON.stringify(hiddenFriends);
}

function getHiddenFriends()
{
    return hiddenFriends;
}

