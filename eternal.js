var hiddenIds;

function filter(element)
{
    jQuery(element).hide();
    //element.bgColor='red';
}

chrome.extension.sendRequest({action: "getHiddenFriendIds"}, function(response) {
    hiddenIds = response.hiddenFriends;
});

function getStreamItem(element)
{
    if (!element.is(".uiStreamStory[data-ft]"))
	return [];
    var data = jQuery.parseJSON(element.attr("data-ft"));
    if (data != null && jQuery.inArray(data.actrs, hiddenIds) > -1)
	return jQuery(element);
    return [];
}

var profilePhotoUpdateSelector="";
function getProfilePhotoUpdateSelector()
{
    if (profilePhotoUpdateSelector == "")
    {
	profilePhotoUpdateSelector = jQuery(hiddenIds).map(function(e) {
	    //return '#pagelet_friends_recentlyupdated .phs:first img[src*=_'+this.toString()+'_]';
	    return '.phs img[src*=_'+this.toString()+'_]';
	}).get().join(",");
    }	
    return profilePhotoUpdateSelector;
}
function getProfilePhotoUpdate(element)
{
    return element.find(getProfilePhotoUpdateSelector()).parents("li");
}

var profileFriendSelector = "";
function getProfileFriendSelector()
{
    if (profileFriendSelector == "")
    {
	profileFriendSelector = jQuery(hiddenIds).map(function(e) {
	    return 'ul.profile-friends img[src*=_'+this.toString()+'_]';
	}).get().join(",");
    }
    return profileFriendSelector;
}
function getProfileFriend(element)
{
    //remove from profile friends list
    return element.find(getProfileFriendSelector()).parents("li");
}

var friendOnChatSelector = "";
function getFriendOnChatSelector()
{
    if (friendOnChatSelector == "")
    {
	friendOnChatSelector = jQuery(hiddenIds).map(function(e) {
	    return 'a[id*=buddy_list_item_'+this.toString()+']';
	}).get().join(",");
    }
    return friendOnChatSelector;
}
function getFriendOnChat(element)
{
    return element.find(getFriendOnChatSelector());
}

var frequentFriendOnChatSelector = "";
function getFrequentFriendOnChatSelector()
{
    if (frequentFriendOnChatSelector == "")
    {
	frequentFriendOnChatSelector = jQuery(hiddenIds).map(function(e) {
	    return '#chatFriendsOnline img[src*=_'+this.toString()+'_]';
	}).get().join(",");
    }
    return frequentFriendOnChatSelector;
}
function getFrequentFriendOnChat(element)
{
    return element.find(getFrequentFriendOnChatSelector()).parents("li");
}


var friendsPhotoAlbumsSelector = "";
function getFriendsPhotoAlbumsSelector()
{
    if (friendsPhotoAlbumsSelector == "")
    {
	friendsPhotoAlbumsSelector = jQuery(hiddenIds).map(function(e) {
	    return ".ego_section i[style*="+this.toString()+"_]";
	}).get().join(",");
    }
    return friendsPhotoAlbumsSelector;
}
function getFriendsPhotoAlbums(element)
{
    return element.find(getFriendsPhotoAlbumsSelector()).parents("div.ego_unit");
}

/*

var profileUpdateSelector = "";
function getProfileUpdateSelector()
{
    if (profilePhotoUpdateSelector == ""){
	profilePhotoUpdateSelector = jQuery(hiddenIds).map(function(e){
	    return 'ul.uiList.friendsDashboard img[src*=_'+this.toString()+'_]';
	}).get().join(",");
    }
    return profilePhotoUpdateSelector();
}

function isProfileUpdate(element)
{
    return element.find(getProfileUpdateSelector());
}

function profileUpdateNode(element)
{
    return element.parent().parent().parent();
}
*/
var selectorPairs = [
    {selector: getStreamItem,
    },
    {selector: getProfilePhotoUpdate, //this takes care of all profile updates as well, apparently
    },
    {selector: getProfileFriend,
    },
    {selector: getFriendOnChat,
    },
    {selector: getFrequentFriendOnChat,
    },
    {selector: getFriendsPhotoAlbums,
    },
];

jQuery(document).bind('DOMNodeInserted', function(event) {
    jQuery(selectorPairs).each(function() {
	selected = this.selector(jQuery(event.target));
	jQuery(selected).each(function(){
	    filter(this);
	});
    });
});

