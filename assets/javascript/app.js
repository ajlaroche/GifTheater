$(document).ready(function () {
    var topics = ["NFL", "Help Desk", "NBA", "Game Of Thrones"];
    var topicIndex = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

    function renderButtons() {

        for (i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            $("#themeButtons").append(newButton);
            newButton.text(topics[i]).addClass("btn btn-primary").attr("data-name", topics[i]);
        }
    }
    renderButtons();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "&limit=10&rating=g&rating=pg&api_key=Zt8nIPW5T7ucvkGQXASMIT5AVTtE5eA5";
    var chosenTheme;

    $("#themeButtons").on("click", ".btn", function () {
        $.ajax({
            url: queryURL + $(this).attr("data-name") + apiKey,
            method: "GET"
        }).then(function (response) {
            for (i = 0; i < 10; i++) {

                var picLabel = "pic" + topicIndex[i];
                var picRefer = "#" + picLabel + ">.gifImage";
                var imageRef = "imageNum" + topicIndex[i];
                var textRefer = "#" + picLabel + ">.card-body>.gifText";
                if (i === 0) {
                    $(".gifImage").attr("src", response.data[i].images.downsized_still.url);
                    $(".gifImage").attr("data-anime", response.data[i].images.downsized.url);
                    $(".gifImage").attr("data-still", response.data[i].images.downsized_still.url);
                    $(".gifImage").attr("data-state", "still");
                    // $(".gifImage").attr("id", imageRef);
                    $(".gifText").text("Rated " + response.data[i].rating);

                } else
                    if ($(".pictures").children().length < 10) {
                        $(".card:first").clone().appendTo(".pictures").attr("id", picLabel); // add new card and assign id based on topics array
                        $(picRefer).attr("src", response.data[i].images.downsized_still.url); // change picture in new card
                        $(picRefer).attr("data-anime", response.data[i].images.downsized.url);
                        $(picRefer).attr("data-still", response.data[i].images.downsized_still.url);
                        $(picRefer).attr("data-state", "still");
                        $(picRefer).attr("id", imageRef);
                        $(textRefer).text("Rated " + response.data[i].rating); //change rating in new card
                    }
                    else {
                        $(picRefer).attr("src", response.data[i].images.downsized_still.url);
                        $(picRefer).attr("data-anime", response.data[i].images.downsized.url);
                        $(picRefer).attr("data-still", response.data[i].images.downsized_still.url);
                        $(picRefer).attr("data-state", "still");
                        $(picRefer).attr("id", imageRef);
                        $(textRefer).text("Rated " + response.data[i].rating);
                    }

            }
            $(".pictures").show();
            console.log(response);
        });
    })
    $("#userSubmitButton").on("click", function () {

        if ($("#userTheme").val() !== "") {
            topics.push($("#userTheme").val());
            $("#themeButtons").empty();
            renderButtons();
            $("#userTheme").val("");
            console.log(topics);
        }
    })
    $("#userTheme").keypress(function (e) {
        if (e.keyCode == 13)
            $("#userSubmitButton").click();
    });

    $(".pictures").on("click", ".card", function () {
        if ($("img", this).attr("data-state") === "still") {
            var animatedUrl = $("img", this).attr("data-anime");
            $("img", this).attr("src", animatedUrl);
            $("img", this).attr("data-state", "animated");
        } else {
            var animatedUrl = $("img", this).attr("data-still");
            $("img", this).attr("src", animatedUrl);
            $("img", this).attr("data-state", "still");
        }
        console.log(animatedUrl);
        console.log(this);
    })
    console.log(topics)
})