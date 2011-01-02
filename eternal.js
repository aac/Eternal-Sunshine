var hiddenIds;

function filter(element)
{
    jQuery(element).hide();
    //element.bgColor='red';
}

chrome.extension.sendRequest({action: "getHiddenFriends"}, function(response) {
    hiddenIds = response.hiddenFriends;
});

function getStreamItem(element)
{
    if (!element.is(".uiStreamStory[data-ft]"))
	return [];
    var data = jQuery.parseJSON(element.attr("data-ft"));
    if (data != null && jQuery.inArray(data.actrs, hiddenIds) == 1)
	return streamItemNode(element);
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

var profileFriendSelector = ""
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
];

jQuery(document).bind('DOMNodeInserted', function(event) {
    jQuery(selectorPairs).each(function() {
	selected = this.selector(jQuery(event.target));
	jQuery(selected).each(function(){
	    filter(this);
	});
    });
});

jQuery(hiddenIds).each(function() {
    //TODO: don't have to loop over ids.
    //can use multiple selectors (separated by ',')
    var id = this.toString();
    
    //remove from stream
    /*
    var streamItems = jQuery(".uiStreamStory[data-ft]");
    streamItems.each(function() {
	var data = jQuery.parseJSON(jQuery(this).attr("data-ft"));
	if (data != null && data.actrs == id)
	    filter(jQuery(this));
    });
    */

    //remove from profile photo updates
    /*
    var ppSelector = '#pagelet_friends_recentlyupdated .phs:first img[src*=_'+id+'_]';
    var ppItems = jQuery(ppSelector);
    ppItems.each(function(){
	filter(jQuery(this).parent().parent().parent().parent().parent());
    });
    */

    //remove from profile updates
    /*
    var puItems = jQuery('ul.uiList.friendsDashboard img[src*=_'+id+'_]');
    puItems.each(function(){
	filter(jQuery(this).parent().parent().parent());
    });
    */

    //remove from chatlist
    var chatItems = jQuery("a[id*=buddy_list_item_"+id+"]");
    chatItems.each(function(){
	filter(jQuery(this));
    });
    //remove from frequent chat list
    var fcSelector = '#chatFriendsOnline img[src*=_'+id+'_]';
    var fcItems = jQuery(fcSelector);
    fcItems.each(function(){
	filter(jQuery(this).parent().parent());
    });
    //remove from friends' photos (on Friends page)
    /*
    var fpSelector = ".ego_section i[style*="+id+"_]";
    filter(jQuery(fpSelector).parent().parent().parent().parent().parent().parent());
    */
    //remove from find more friends;
    /*
      var fmfSelector = '.uiFacepileItem > img[src~="_' + id + '_"]';
      var fmfItems = jQuery(fmfSelector);
      fmfItems.each(function() {jQuery(this).hide()});
    */	
});
