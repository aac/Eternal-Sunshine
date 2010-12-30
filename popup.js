var backgroundPage;

function buildList()
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
    });

    /*
      jQuery("#blocked_friends").append(localStorage.hiddenFriends.map(function(){
      var li = document.createElement("li");
      li.innerHTML = $(this);
      }));

      jQuery("#id").submit(function() {
      localStorage.hiddenFriends += $(this).value;

      jQuery("#blocked_friends").append(li);
      });
    */
});
