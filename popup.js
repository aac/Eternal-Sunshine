var backgroundPage;

function createListItem(v)
{
    var li = document.createElement("li");
    li.innerHTML = v;
    jQuery(li).attr("class", "blocked_friend");
    return li;
}

function buildList(hiddenFriends)
{
    jQuery("#blocked_friends").append(hiddenFriends.map(function(v){
        return createListItem(v);
    }));
}

jQuery(document).ready(function(){
    backgroundPage = chrome.extension.getBackgroundPage();
    buildList(backgroundPage.getHiddenFriends());
    var form = jQuery("#hide_friend_form");
    //var img = document.create("img");
    //jQuery(img).src = "hide_button.png";
    form.submit(function(event){
	event.preventDefault();
	var val = jQuery("#id").val();
	backgroundPage.addHiddenFriend(val);
        jQuery("#blocked_friends").append(createListItem(val));
    });
});
