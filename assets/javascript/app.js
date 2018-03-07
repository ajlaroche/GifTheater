$(document).ready(function () {
    var topics = ["The Office", "Negan", "Orange is the Black", "Game Of Thrones", "House of Cards", "Scandal", "Seinfeld"];
    var topicIndex = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];

    //Function adds buttons top of page based on topics in matrix
    function renderButtons() {

        for (i = 0; i < topics.length; i++) {
            var newButton = $("<button>");
            $("#themeButtons").append(newButton);
            newButton.text(topics[i]).addClass("btn btn-primary").attr("data-name", topics[i]);
        }
    }
    renderButtons();

    var numberReturned = 50;
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=";
    var apiKey = "&limit=" + numberReturned + "&rating=g&rating=pg&api_key=Zt8nIPW5T7ucvkGQXASMIT5AVTtE5eA5";
    var chosenTheme;
    var chosenGif;
    var gifSelector = [];
    var randomStorage = [];

    function randomArray() {
        for (i = 0; i < numberReturned; i++) {
            var randomGif = Math.floor(Math.random() * numberReturned);
            var repeatTest = true;

            if (i > 0) {

                while (repeatTest === true) {
                    for (j = 0; j < randomStorage.length; j++) {
                        if (randomGif === randomStorage[j]) {
                            repeatTest = true;
                            randomGif = Math.floor(Math.random() * numberReturned);
                            break;
                        }
                        if (j == randomStorage.length - 1) {
                            repeatTest = false;
                        }
                    }
                }
            }
            gifSelector[i] = randomGif;
            randomStorage[i] = randomGif;
        }
        console.log(randomStorage);
        randomStorage=[];
    }
    randomArray();

    //Function to render gifs, takes the clicked button as an argument

    function renderGifs(selected) {
        $.ajax({
            url: queryURL + $(selected).attr("data-name") + apiKey,
            method: "GET"
        }).then(function (response) {
            for (i = 0; i < 10; i++) {
                var gifNumber = gifSelector[i];  //picks up random array placement
                var picLabel = "pic" + topicIndex[i];
                var picRefer = "#" + picLabel + ">.gifImage";
                var imageRef = "imageNum" + topicIndex[i];
                var textRefer = "#" + picLabel + ">.card-body>.gifText";
                if (i === 0) {
                    $(".gifImage").attr("src", response.data[gifNumber].images.fixed_height_still.url);
                    $(".gifImage").attr("data-anime", response.data[gifNumber].images.fixed_height.url);
                    $(".gifImage").attr("data-still", response.data[gifNumber].images.fixed_height_still.url);
                    $(".gifImage").attr("data-state", "still");
                    $(".gifText").text("Rated " + response.data[gifNumber].rating);

                } else
                    if ($("#choices").children().length < 10) {
                        $(".card:first").clone().appendTo("#choices").attr("id", picLabel); // add new card and assign id based on topics array
                        $(picRefer).attr("src", response.data[gifNumber].images.fixed_height_still.url); // change picture in new card
                        $(picRefer).attr("data-anime", response.data[gifNumber].images.fixed_height.url);
                        $(picRefer).attr("data-still", response.data[gifNumber].images.fixed_height_still.url);
                        $(picRefer).attr("data-state", "still");
                        $(picRefer).attr("id", imageRef);
                        $(textRefer).text("Rated " + response.data[gifNumber].rating); //change rating in new card
                    }
                    else {
                        $(picRefer).attr("src", response.data[gifNumber].images.fixed_height_still.url);
                        $(picRefer).attr("data-anime", response.data[gifNumber].images.fixed_height.url);
                        $(picRefer).attr("data-still", response.data[gifNumber].images.fixed_height_still.url);
                        $(picRefer).attr("data-state", "still");
                        $(picRefer).attr("id", imageRef);
                        $(textRefer).text("Rated " + response.data[gifNumber].rating);
                    }

            }
            $("#choices").show();
            console.log(response);
        });
    }


    $("#themeButtons").on("click", ".btn", function () {
        randomArray();
        $("#bigScreen").empty();
        $("#showtime").hide();
        chosenGif = this;
        renderGifs(chosenGif);
    })
    
    $("#userSubmitButton").on("click", function () {

        if ($("#userTheme").val() !== "") {
            topics.push($("#userTheme").val().trim());
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
            $("#bigScreen").empty();
            $("#bigScreen").append(this);
            $(this).css("width", "60%");
            $("img", this).attr("src", animatedUrl);
            $("img", this).attr("data-state", "animated");
        } else {
            var animatedUrl = $("img", this).attr("data-still");
            $("img", this).attr("src", animatedUrl);
            $(this).css("width", "30%");
            $("img", this).attr("data-state", "still");
            $("#choices").prepend(this);
        }
        console.log(animatedUrl);
        console.log(this);
    })
    console.log(topics)
})