$("#scrape").on("click", function (event) {
    event.preventDefault();
    renderArticles();
})

$(".article-save").on("click", function(event){
    event.preventDefault();
    let post = $(this).attr(id);
    console.log("button clicked")
    console.log(post);
    $.ajax({
        type: "PUT",
        url: "/saved/" + post
    });
})

function renderArticles() {
    $("#article").empty();
    $.getJSON("/articles", function (data) {
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
