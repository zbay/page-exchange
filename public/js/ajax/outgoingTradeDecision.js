$(document.body).on("click", ".revokeButton", function(){
    var thisButton = $(this);
    $.ajax({
        url: "../revokeTrade",
        method: "POST",
        data: {"tradeID": thisButton.val()},
        success: function(returned){
             $("#success").html(returned.success);
        }
    }).done(function(returned){
        thisButton.parent().parent().remove();
    });
});