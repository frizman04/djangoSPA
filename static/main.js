
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
    console.log(data);

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
    ajaxFilter();
})

$("#bloger_profileFilter").on("input",function(){
    ajaxFilter();
})

$("#markFilter").on("input",function(){
    ajaxFilter();
})

$("#markOrderFilter").on("change", function(){
    ajaxFilter();
})


$(".fa-star").mouseenter(function(){
    $("span.fa").removeClass("checked");
    $(this).prevAll().addClass("checked");
    $(this).addClass("checked");
});

$(".fa-star").mouseleave(function(){
    $("span.fa").removeClass("checked");
    var markValue = $("#inputFieldRating").val();
    $("span.fa").slice(0,markValue).addClass("checked");
});

$(".fa-star").on("click", function(){
    $("span.fa").removeClass("checked");
    $(this).prevAll().addClass("checked");
    $(this).addClass("checked");

    markValue = $(this).prevAll().length + 1
    $("#inputFieldRating").val(markValue)
})



function ajaxFilter(){
    var data = {}
    data.my_profile = $("#my_profileFilter").val();
    data.bloger_profile = $("#bloger_profileFilter").val();
    data.mark = $("#markFilter").val();
    data.markOrder = $('#markOrderFilter').find(":selected").val();

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

