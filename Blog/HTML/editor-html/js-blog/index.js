function startIndexPage() {
    getBlogs(0);
    getTags();
    getLatestBlogs();
    checkLogin();
    event.preventDefault();
}

function checkLogin() {
    let content = "";
    if(sessionStorage.getItem("userId") == null) {
        content = `<img alt="" src="images/site/default-avatar.jpg"
                             class="avatar avatar-44 photo"
                             height="35" width="35" style="border-radius: 50%">
                        <ul>
                            <li><a href="login-register.html">Login/Register</a></li>
                        </ul>`
    } else {
        content = `<img alt="" src="images/site/testo-02.jpg"
                             class="avatar avatar-44 photo"
                             height="35" width="35" style="border-radius: 50%">
                        <ul>
                            <li><a href="blog-simple.html">Profile</a></li>
                            <li><a href="" onclick="test123()">Manage Post</a></li>
                            <li><a href="" onclick="logOut()">Logout</a></li>
                        </ul>`
    }
    $("#checkLogin").html(content);
}
function test123() {
    window.location.href = "../default/ltr/admin-blog-manager.html";
    event.preventDefault();
}

function loginOrRegister() {
    $(".homePage").hide();
    event.preventDefault()
}

function logOut(){
    sessionStorage.removeItem("userId");
    window.location.href = "index.html";
}

function getBlogs(pageNumber) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/blogs/public?page=" + pageNumber + "&size=2",
        dataType: "json",
        success: function (data) {
            displayBlogs(data.content);
            displayGetOlderPost(pageNumber);
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                $('.navigation').hide();
            }
        }
    })
    event.preventDefault();
}

function getLatestBlogs() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/blogs/latestBlog",
        dataType: "json",
        success: function (data) {
            displayLatestBlogs(data.content);
        }
    })
    event.preventDefault()
}

function displayGetOlderPost(pageNumber) {
    let getMorePost = `<div class="nav-previous">
<a href=" " onclick="getOlderPost(${pageNumber})">
<span class="meta-nav">←</span> Older posts</a></div>`
    document.getElementById("getMorePosts").innerHTML = getMorePost;

}

function getOlderPost(page) {
    event.preventDefault();
    getBlogs(page + 1);
}

function displayBlogs(data) {
    $.each(data, (i, blog) => {
        let totalComment = getTotalCommentsEachBLog(blog.id);
        let date = new Date(blog.createdDate);
        let month = date.toLocaleString('default', {month: 'short'});
        let day = date.getUTCDate();
        let year = date.getFullYear();
        let formattedDate = month + " " + day + " , " + year;

        let blogRow = `<article class="hentry post">

                                <header class="entry-header">
                                    <h1 class="entry-title"><a href="../blog-single.html">${blog.title}</a></h1>
                                   
                                    <div class="entry-meta">
                                        <span class="entry-date">
                                        <time class="entry-date"
                                                  datetime="2014-07-13T04:34:10+00:00">${formattedDate}</time>
                                        </span>
                                        <span class="comment-link">
                                            ${totalComment} comments
                                        </span>
                                        <span class="cat-links">
                                            <a rel="category tag">${blog.user.username}</a>
                                        </span>
                                    </div>
                                    
                                </header>
                                
                                <div class="featured-image">
                                    <a href="../blog-single.html">
                                        <img src="${blog.image}" alt="blog-image">
                                    </a>
                                </div>
                                
                                <div class="entry-content">
                                    <p>${blog.description}</p>
                                    <p>
                                        <span class="more">
                                            <a href="" onclick="readBlogDetail(${blog.id})" class="more-link">Continue reading <span
                                                    class="meta-nav">→</span></a>
                                        </span>
                                    </p>
                                </div>
                                <!-- .entry-content -->
                            </article>
                            <!-- .hentry -->`;
        $('#data-table').append(blogRow);
    })

}

function readBlogDetail(blogId) {
    sessionStorage.setItem("blogId", blogId);
    location
}

function displayLatestBlogs(blog) {
    $('.recentPostSmellCode').empty();
    $.each(blog, (i, data) => {
        let content = `<li><a href="">${data.title}</a></li>`;
        $('.recentPostSmellCode').append(content);
    })
}

function getTotalCommentsEachBLog(blogId) {
    let totalComment = null;
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


function getTags() {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/labels/getAll",
        dataType: "JSON",
        success: function (data) {
            $('#tagCloudSideBar').empty();
            $.each(data.content, (i, tag) => {
                let tagSidebar = `<a href="#" style="font-size: 22pt;">${tag.name}</a>`;
                $('#tagCloudSideBar').append(tagSidebar);
            })

            $('#tagCloudFooter').empty();
            $.each(data.content, (i, tag) => {
                let tagSidebar = `<a href="#" style="font-size: 22pt;">${tag.name}</a>`;
                $('#tagCloudFooter').append(tagSidebar);
                return i < 3;
            })
        }
    })
}