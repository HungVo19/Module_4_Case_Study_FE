const local_url = "http://localhost:8080/comments/"

function getAllCommentByUserId() {
    $.ajax({
        type: "GET",
        url: local_url + 2,
        success: function (data) {
            let content = "";
            for (let i = 0; i < data.content.length; i++) {
                content += `<li class="comment even thread-even depth-1">
                                  <article class="comment">
                                    <header class="comment-meta comment-author vcard">
                                        <img alt="" src="images/site/testo-01.jpg" class="avatar" height="75" width="75">
                                        <cite class="fn"><a href="#" rel="external nofollow" class="url">${data.content[i].user.username}</a></cite>
                                        <span class="comment-date">${data.content[i].date}</span>
                                    </header>
                                    <section class="comment-content comment">
                                      <p>${data.content[i].content}</p>
                                    </section>
                                  </article>
                                </li>`;
            }
            document.getElementById('listComments').innerHTML = content;
        }
    });
}

function createNewComment() {
    let content = $("#comment").val();

    let newComment = {
        content: content
    }
    $.ajax({
        type: "POST",
        url: local_url,
        data: JSON.stringify(newComment),
        success: function (data) {
            getAllCommentByUserId(data)
        }
    })
    event.preventDefault();
}

function deleteComment(id) {
    if (confirm("Bạn chắc chắn muốn xóa?")) {
        $.ajax({
            type: "DELETE",
            url: local_url + id,
            success: function (data) {
                getAllCommentByUserId()
                alert(data)
            }
        });
    }
}


