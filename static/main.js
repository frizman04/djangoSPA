
$("#btnAddComment").on("click", function(){
    console.log("#btnAddComment clicked")
    $("#addComentForm").modal();
})


$("#btnAddCommentSubmit").on("click", function(){
    console.log("btnAddCommentSubmit clicked")
    var csrf_tokent = $("#csrf").val();
    var data = {}
    data["my_profile"] = $("#inputFieldMyAccount").val();
    data["bloger_profile"] = $("#inputFieldBlogerAccount").val();
    data["review"]  = $("#inputFieldReview").val();
    data["mark"] = $("#inputFieldRating").val();

    if (data.my_profile != "" && data.bloger_profile != "" && data.review != "" && data.mark != ""){
        var markInt = parseInt(data.mark,10);
        if (markInt <= 5 && markInt >= 0) {
            $.ajax({
                type: "POST",
                url: "/Comment/",
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                beforeSend: function (xhr, settings) {
                    xhr.setRequestHeader("X-CSRFToken", csrf_tokent);
                },
                success: function(data){
                    console.log(data);
                    displayComments(data);
                },
                error: function(errMsg) {
                    console.log(errMsg);
                },                
                failure: function(errMsg) {
                    console.log(errMsg);
                }
            });
        } else {
            alert("Оценка должна быть между 0 и 5")
        }
    } else {
        alert("Не корректные данные, пожалуйста, введите ещё раз.")
    }
})


$(document).ready(function(){
    var csrf_tokent = $("#csrf").val();
    $.ajax({
        type: "GET",
        url: "/Comment/",
        // data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrf_tokent);
        },
        success: function(data){
            console.log(data);
            displayComments(data);
        },
        error: function(errMsg) {
            console.log(errMsg);
        },                
        failure: function(errMsg) {
            console.log(errMsg);
        }
    });
})


$("#my_profileFilter").on("input",function(){
    ajaxGETWithFilter();
})

$("#bloger_profileFilter").on("input",function(){
    ajaxGETWithFilter();
})

$("#markFilter").on("input",function(){
    ajaxGETWithFilter();
})


function ajaxGETWithFilter(){
    var data = {}
    data.my_profile = $("#my_profileFilter").val();
    data.bloger_profile = $("#bloger_profileFilter").val();
    data.mark = $("#markFilter").val();

    var csrf_tokent = $("#csrf").val();
    $.ajax({
        type: "POST",
        url: "/Filter",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        beforeSend: function (xhr, settings) {
            xhr.setRequestHeader("X-CSRFToken", csrf_tokent);
        },
        success: function(data){
            displayComments(data);
        },
        error: function(errMsg) {
            console.log(errMsg);
        },                
        failure: function(errMsg) {
            console.log(errMsg);
        }
    });
}


function displayComments(data){
    $("#commentTable").empty();

    data.forEach(comentData => {
        var commentCard = $("#commentCardExmpl").clone()
        commentCard.removeAttr("id");
        commentCard.removeAttr("hidden");

        commentCard.find(".my_profile").text(comentData["my_profile"]);
        commentCard.find(".bloger_profile").text(comentData["bloger_profile"]);
        commentCard.find(".review").text(comentData["review"]);
        commentCard.find(".mark").text(comentData["mark"]);

        commentCard.appendTo("#commentTable");
    });
} 
