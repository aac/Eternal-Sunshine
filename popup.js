var backgroundPage;

function buildList(hiddenFriends)
{
    jQuery("#blocked_friends").append(hiddenFriends.map(function(v){
        var li = document.createElement("li");
        li.innerHTML = v;
	return li;
    }));
}

jQuery(document).ready(function(){
    backgroundPage = chrome.extension.getBackgroundPage();
    buildList(backgroundPage.getHiddenFriends());
    var form = jQuery("#hide_friend_form");
    form.submit(function(event){
	event.preventDefault();
	var val = jQuery("#id").val();
	backgroundPage.addHiddenFriend(val);
	var li = document.createElement("li");
        li.innerHTML = val;
        jQuery("#blocked_friends").append(li);	
	/*
	*/
    });
});
