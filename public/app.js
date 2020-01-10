$(document).ready(function () {

    $("#scrape").on("click", function (event) {
        event.preventDefault();
        $("#articles").empty();
        renderArticles();
    })

    $("#saved").on("click", function (event) {
        event.preventDefault();
        $("#articles").empty();

    })

    $("#article-save").on("click", function (event) {
       console.log("click")
       renderSaved();
    })


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

                    <button class="article-save" id="article-save" value="${data[i]._id}"> Save Article </button>
                    <button class="comment" id="comment" value="${data[i]._id}"> Comment </button>
                </div>
                `
                    // <img src="${data[i].image}"/>
                );
            }
        });
    };

    function renderSaved() {
        $.getJSON("/api/articles/saved", function (data) {
            for (let i = 0; i < data.length; i++) {
                $("#articles").append(
                    `<div data-id='${data[i]._id}' class=" container bg-success mx-auto m-3">
                    <div class="row">
                        <p>Title: ${data[i].title} </p>
                    </div>
                    <div class="row">
                        <p>Link: ${data[i].link} </p>
                    </div>
                    <button class="article-delete" id="article-delete" value="${data[i]._id}"> Remove Article </button>
                    <button class="comment" id="comment" value="${data[i]._id}"> Comment </button>
                </div>`
                    // <img src="${data[i].image}"/>
                );
            }
        });
    };

})