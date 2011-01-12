var backgroundPage;
var numHiddenFriends=0;

function createListItem(friend)
{
    var li = document.createElement("li");
    var a = document.createElement("a");
    jQuery(a).attr("src", "hide_button.png");
    jQuery(a).addClass("uiCloseButton");
    jQuery(a).click(function() {
	backgroundPage.removeHiddenFriend(friend.id);
	jQuery(li).remove();
	numHiddenFriends--;
	updateCount();
    });
    li.innerHTML = friend.name;
    jQuery(li).data('uid', friend.id);
    jQuery(li).prepend(a);
    jQuery(li).attr("class", "hidden_friend");
    return li;
}

function updateCount()
{
    jQuery("#count").html("You have hidden " + numHiddenFriends + " friend" + (numHiddenFriends == 1 ? "" : "s") + ".");
}

function addHiddenFriend(friend)
{
    jQuery("#hidden_friends").append(createListItem(friend));
    numHiddenFriends++;
    updateCount();
}

function buildList(hiddenFriends)
{
    jQuery("#hidden_friends").append(hiddenFriends.map(function(friend){
        return createListItem(friend);
    }));
    numHiddenFriends=hiddenFriends.length;
    updateCount();
}

jQuery(document).ready(function(){
    backgroundPage = chrome.extension.getBackgroundPage();
    backgroundPage.setPopup(self);
    buildList(backgroundPage.getHiddenFriends());
    var form = jQuery("#hide_friend_form");
    //var img = document.create("img");
    //jQuery(img).src = "hide_button.png";
    form.submit(function(event){
	event.preventDefault();
	var val = jQuery("#id").val();
	backgroundPage.addHiddenFriend(val);
        //jQuery("#hidden_friends").append(createListItem(val));
	jQuery("#id").val("");
	jQuery("#id").focusout();
    });

    jQuery("#id").focus(function(){
	if (jQuery(this).val() == "Hide")
	{
	    jQuery(this).val("");
	    jQuery(this).removeClass("placeholder");
	}
    })
    jQuery("#id").focusout(function(){
	if (jQuery(this).val() == "")
	{
	    jQuery(this).val("Hide");
	    jQuery(this).addClass("placeholder");
	}
    });
    jQuery("#count").click(function(event){
	event.preventDefault();
	jQuery("#hidden_friends").toggle();
    });
});
