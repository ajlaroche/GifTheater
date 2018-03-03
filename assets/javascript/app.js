$(document).ready(function () {
    var topics = ["NFL", "HelpDesk", "NBA", "GameOfThrones"];
    for (i = 0; i < topics.length; i++) {
        var newButton = $("<button>");
        $("#themeButtons").append(newButton);
        newButton.text(topics[i]).addClass("btn btn-primary").attr("value", topics[i]);
    }

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "&limit=10&rating=g&rating=pg&api_key=Zt8nIPW5T7ucvkGQXASMIT5AVTtE5eA5";
    var chosenTheme;

    $("#themeButtons").on("click", ".btn", function () {
        $.ajax({
            url: queryURL + $(this).attr("value") + apiKey,
            method: "GET"
        }).then(function (response) {
            for (i = 0; i < 10; i++) {
                var picLabel = "pic" + i;
                var picRefer = "#" + picLabel + ">.gifImage";
                var textRefer = "#" + picLabel + ">.card-body>.gifText";
                if (i === 0) {
                    $(".gifImage").attr("src", response.data[0].images.downsized_still.url);
                    $(".gifText").text("Rated " + response.data[0].rating);

                } else if ($(".pictures").children().length<10){
                    $(".card:first").clone().appendTo(".pictures").attr("id", picLabel);
                    $(picRefer).attr("src", response.data[i].images.downsized_still.url);
                    $(textRefer).text("Rated " + response.data[i].rating);
                } else{
                    $(picRefer).attr("src", response.data[i].images.downsized_still.url);
                    $(textRefer).text("Rated " + response.data[i].rating);
                }

            }
            $(".pictures").show();
            console.log(response);
        });
    })
})