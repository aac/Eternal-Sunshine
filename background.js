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
    storeFriends();
}

function removeHiddenFriend(id)
{
    hiddenFriends=jQuery.grep(hiddenFriends, function(element, index){
	return element != id;
    });
    storeFriends();
}

function getHiddenFriends()
{
    return hiddenFriends;
}

function storeFriends()
{
    localStorage.hiddenFriends=JSON.stringify(hiddenFriends);
}