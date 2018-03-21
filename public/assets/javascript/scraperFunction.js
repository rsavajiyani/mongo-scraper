$(".scrape-btn").on("click", () => {
    var location = window.location.href;
    var idIndex = location.split("").lastIndexOf("/");
    var idArray = location.slice(idIndex + 1);
    console.log(idArray);
    let scrapeObj = {
        _id: idArray
    }

    console.log(scrapeObj);
    $.post("/scraper", scrapeObj).then((data) => {
        console.log(data);

        function checkForData(obj) {
            if (obj) {
                window.logcation.assign("/articles/" + obj._id)
            }
        }
    })
})


$(".save-btn").on("click", function () {
    console.log($(this).attr("data-title"))
    let savedArticleObject = {
        link: $(this).attr("data-link"),
        title: $(this).attr("data-title")
    }
    console.log(savedArticleObject)
    $.post("/saved", savedArticleObject).then((saved) => {
        console.log(saved)
    })

})

$(".comment-btn").on("click", function () {
    $("#commentModal").modal("show")
    $(".comment-button").on("click", function () {

    })
})