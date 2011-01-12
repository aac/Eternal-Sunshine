var popup;
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
    var details = {};
    jQuery.getJSON("http://graph.facebook.com/"+id, function(data){
	debugger;
	details["id"] = data.id;
	details["name"]= data.name;
	details["slug"]= data.link.substring(data.link.lastIndexOf("/")+1);

	hiddenFriends.push(details);
	storeFriends();
	popup.addHiddenFriend(details);
    });
}

function removeHiddenFriend(id)
{
    hiddenFriends=jQuery.grep(hiddenFriends, function(element, index){
	return element.id != id;
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

function setPopup(p)
{
    popup = p;
}