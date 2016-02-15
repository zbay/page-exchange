$(document.body).on("click", ".tradeBookButton", function(){
    $.ajax({
        url: "../initiateTrade",
        method: "POST",
        data: {"bookReceived": $("[name=receivedBookID]").val(), "bookGiven": $("[name=givenBookID]").val(), "tradePartner": $("[name=partnerID]").val()},
    }).done(function(){
        window.location = "../availableBooks";
    });
});