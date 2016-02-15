$(document.body).on("click", ".revokeButton", function(){
    var thisButton = $(this);
    $.ajax({
        url: "../revokeTrade",
        method: "POST",
        data: {"tradeID": thisButton.val()},
    }).done(function(){
        thisButton.parent().parent().remove();
    });
});