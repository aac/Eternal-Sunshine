var hiddenFriends;

jQuery(document).ready(function(){
    if (!localStorage.hiddenFriends)
        localStorage.hiddenFriends = JSON.stringify([]);

    hiddenFriends = JSON.parse(localStorage.hiddenFriends);
});

function addHiddenFriend(id)
{
    hiddenFriends.push(id);
    localStorage.hiddenFriends=JSON.stringify(hiddenFriends);
}

function getHiddenFriends()
{
    return hiddenFriends;
}