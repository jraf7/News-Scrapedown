$("#scrape").on("click", function (event) {
    event.preventDefault();
    onionScrape();
})

$("#render").on("click", function (event) {
    event.preventDefault();    
    $("#articles").empty();
    renderArticles();
})

$(document).on("click", ".article-save", function(event){
    event.preventDefault();
    let post = $(this).attr(id);
    console.log("button clicked")
    console.log(post);
    $.ajax({
        type: "PUT",
        url: "/saved/" + post
    });
})

function onionScrape () {
    console.log("scrape")
}

function renderArticles() {
    $.getJSON("/api/articles", function (data) {
        for (let i = 0; i < data.length; i++) {
            $("#articles").append(
                `<div data-id='${data[i]._id}' class=" container bg-success mx-auto m-3">
                    <div class="row">
                        <p>Title: ${data[i].title} </p>
                    </div>
                    <div class="row">
                        <p>Link: ${data[i].link} </p>
                    </div>
                    <button class="article-save" id="${data[i]._id}"> Save Article </button>
                </div>
                `
            // <img src="${data[i].image}"/>
            );
        }
    });
};  
