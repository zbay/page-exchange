$("#profileButton").on("click", function(e){
    $.ajax({
    url: "/settingsOptional",
    method: "POST",
    data: {"city": $("[name=city]").val(), "region": $("[name=region]").val(), "phone": $("[name=phone]").val()},
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
});
});

$("#newPasswordButton").on("click", function(e){
    console.log($("[name=email]").val());
    $.ajax({
    url: "/settingsVital",
    method: "POST",
    data: {"oldPassword": $("[name=oldPassword]").val(), "newPassword": $("[name=newPassword]").val(), "email": $("[name=email]").val()},
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
    $("[name=oldPassword]").val("");
    $("[name=newPassword]").val("");
});
});
