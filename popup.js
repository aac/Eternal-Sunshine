var backgroundPage;

function createListItem(v)
{
    var li = document.createElement("li");
    li.innerHTML = v;
    jQuery(li).attr("class", "hidden_friend");
    return li;
}

function buildList(hiddenFriends)
{
    jQuery("#hidden_friends").append(hiddenFriends.map(function(v){
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
        jQuery("#hidden_friends").append(createListItem(val));
    });
});
