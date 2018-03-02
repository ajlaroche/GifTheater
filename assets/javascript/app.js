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

            console.log(response);

        });
    })
})