var ids = [
	   532985171
	   ];

$(ids).each(function() {
    //TODO: don't have to loop over ids.
    //can use multiple selectors (separated by ',')

    var id = this;
    //remove from stream
    var streamItems = jQuery(".uiStreamStory[data-ft]");
    streamItems.each(function() {
	var data = jQuery.parseJSON(jQuery(this).attr("data-ft"));
	if (data != null && data.actrs == id)
	    jQuery(this).hide();
    });

    //remove from profile photo updates
    var ppSelector = '#pagelet_friends_recentlyupdated .phs:first img[src*=_'+id+'_]';
    debugger
    var ppItems = jQuery(ppSelector);
    ppItems.each(function(){
	jQuery(this).parent().parent().parent().parent().parent().hide();
    });

    //remove from profile updates
    var puItems = jQuery('ul.uiList.friendsDashboard img[src*=_'+id+'_]');
    puItems.each(function(){
	jQuery(this).parent().parent().parent().hide();
    });

    //remove from profile friends list
    var pfItems = jQuery('ul.profile-friends img[src*=_'+id+'_]');
    pfItems.each(function(){
	jQuery(this).parent().parent().parent().hide();
    });
    //remove from chatlist
    var chatItems = jQuery("a[id*=buddy_list_item_"+id+"]");
    chatItems.each(function(){
	debugger
	jQuery(this).hide();
    });
    //remove from frequent chat list
    var fcSelector = '#chatFriendsOnline img[src*=_'+id+'_]';
    var fcItems = jQuery(fcSelector);
    fcItems.each(function(){
	jQuery(this).parent().parent().hide();
    });
