$(document.body).on("click", ".deleteBookButton", function(){
    var thisButton = $(this);
    $.ajax({
    url: "/deleteBook",
    method: "POST",
    data: {"deleteID": thisButton.val()},
    success: function(returned){
        if(!returned.error){
            $("#error").html("");
            $("#success").html(returned.success);
        }
        else{
            $("#error").html(returned.error);
            $("#success").html("");   
        }
    },
    error: function(returned){
        $("#success").html("");
        $("#error").html(returned.error);
    }
}).done(function(){
   thisButton.parent().parent().remove();
});
});

$("#addBookButton").on("click", function(){
    $.ajax({
    url: "/myBooks",
    method: "POST",
    data: {"title": $("[name=title]").val(), "author": $("[name=author]").val(), "description": $("[name=description]").val()},
    success: function(returned){
        if(!returned.error){
            $("#error").html("");
            $("#success").html(returned.success);   
            var newRow = $("<tr></tr>");
            newRow.append($("<td>" + returned.title + "</td>"));
            newRow.append($("<td>" + returned.author + "</td>"));
            newRow.append($("<td>" + returned.description + "</td>"));
            var buttonCell = newRow.append(($("<td></td>").append($("<button class='deleteBookButton' name='deleteID' value=" + returned.id + ">X</button>"))));
            newRow.append(buttonCell);
            $("#bookTable").append(newRow);
        }
        else{
            $("#error").html(returned.error);
            $("#success").html("");   
        }
    },
    error: function(returned){
        $("#success").html("");
        $("#error").html(returned.error);
    }
}).done(function(){
    $("[name=title]").val("");
    $("[name=author]").val("");
    $("[name=description]").val("");
});
});
