var ids = [
	   532985171
	   ];

$(ids).each(function() {
	var id = this;
	//remove from stream
	var items = jQuery(".uiStreamStory[data-ft]");
	items.each(function() {
		var data = jQuery.parseJSON(jQuery(this).attr("data-ft"));
		if (data != null && data.actrs == id)
		    jQuery(this).hide()
	    });
	//remove from thumbnail updates
	//remove from profile updates
	//remove from chatlist
	//remove from frequent chat list
    });
