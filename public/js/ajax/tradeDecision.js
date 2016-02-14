$(document.body).on("click", ".acceptButton", function(){
    var thisButton = $(this);
    $.ajax({
        url: "./acceptTrade",
        method: "POST",
        data: {"tradeID": thisButton.val()},
    }).done(function(){
        thisButton.parent().parent().remove();
    });
});

$(document.body).on("click", ".declineButton", function(){
    var thisButton = $(this);
    $.ajax({
        url: "./declineTrade",
        method: "POST",
        data: {"tradeID": thisButton.val()},
    }).done(function(){
        thisButton.parent().parent().remove();
    });
});