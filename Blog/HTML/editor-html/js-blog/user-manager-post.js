function startUserBLogManager(page) {
    getBLogsByUserId(page);
}

let userID = sessionStorage.getItem("userId");

function getBLogsByUserId(page) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://localhost:8080/users/" + userID + "/blogs?" +page + "size=2",
        success: function (data) {
            displayBlogsByUser(data.content);
            displayPage(data);
            //điều kiện bỏ nút previous
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
            }
            //điều kiện bỏ nút next
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
            }
        }
    })
}

function displayBlogsByUser(blogs) {
    $("#user-blog-data-table tbody").empty();
    let count = 1;

    $.each(blogs, (i, blog) => {
        let privacy = "public";
        if (blog.privacy === false) {
            privacy = "private"
        }
        let totalComment = getTotalCommentsEachBLog(blog.id)
        let content = `<tr>
                            <td>${count++}</td>
                            <td><a href="" onclick="readBlogDetails(${blog.id})">${blog.title}</a> </td>
                            <td>${blog.createdDate}</td>
                            <td><img src="${blog.image}" alt=""></td>
                            <td>${blog.description}></td>
                            <td>${totalComment}</td>
                            <td><a style="font-size: 9px" 
                            class="button yellow" href="" 
                            onclick="changePrivacy(${blog.id})">${privacy}</a></td>
                            <td>
                                <div class="nav-menu">
                                    <ul>
                                        <li><a style="font-size: 11px" 
                            class="button yellow" href=""  
                         >Click Here</a>
                                            <ul>
                                                <li><a href="" onclick="editPost()">Edit</a></li>
                                                <li><a href="" onclick="deletePost(${blog.id})">Delete</a></li>
                                            </ul>
                                        </li>
                                        
                                    </ul>
                                </div>
                            </td>
                        </tr>`
        $("#user-blog-data-table tbody").append(content);
    })

}

function getTotalCommentsEachBLog(blogId) {
    let totalComment = 0;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/comments/" + blogId,
        dataType: "JSON",
        async: false,
        success: function (data) {
            totalComment = data.totalElements;
        }
    })
    return totalComment;
}

function readBlogDetails(blogId) {
    sessionStorage.setItem("blogId", blogId);
    window.location.href = "blog-single.html";
    event.preventDefault();
}

function changePrivacy(id) {
    $.ajax({
        type: "PUT",
        url: "http://localhost:8080/blogs/" + id + "/privacy",
        dataType: "json",
        success: function () {
            getBLogsByUserId();
        }
    })
    event.preventDefault();
}
//hàm hiển thị phần chuyển page
function displayPage(data){
    let content = `<a href="" class="btn" id="backup" onclick="isPrevious(${data.pageable.pageNumber})">Previous</a>
    <span>${data.pageable.pageNumber+1} / ${data.totalPages}</span>
    <a href="" class="btn" id="next" onclick="isNext(${data.pageable.pageNumber})">Next</a>`
    document.getElementById('paginationn').innerHTML = content;
}

//hàm lùi page
function isPrevious(pageNumber) {
    getBLogsByUserId(pageNumber-1);
    event.preventDefault();
}

//hàm tiến page
function isNext(pageNumber) {
    getBLogsByUserId(pageNumber+1);
    event.preventDefault();
}