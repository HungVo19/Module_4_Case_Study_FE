
function getBlogs(page) {
    // const URL_SHOW = "http://localhost:8080/blogs";
    let search = $('#searchBlog').val();
    if (search === "") {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/blogs?page=" + page + "&size=2",
            dataType: "json",
            success: function (data) {
                showBlogs(data)
            }
        })
    } else {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/blogs/search?q=" + search + "&page=" + page + "&size=3",
            success: function (data) {
                showBlogs(data)
            }
        })
    }

}

//hàm hiển thị phần chuyển page
function displayPage(data){
    let content = `<button class="btn btn-info  hvr-icon-back" id="backup" onclick="isPrevious(${data.pageable.pageNumber})">Previous</button>
    <span>${data.pageable.pageNumber+1} | ${data.totalPages}</span>
    <button class="btn btn-info hvr-icon-forward" id="next" onclick="isNext(${data.pageable.pageNumber})">Next</button>`
    document.getElementById('page').innerHTML = content;
}

//hàm lùi page
function isPrevious(pageNumber) {
    getBlogs(pageNumber-1)
}

//hàm tiến page
function isNext(pageNumber) {
    getBlogs(pageNumber+1)
}


function showBlogs(data) {

            let count = 1;
            $('#listBlogs tbody').empty();

            $.each(data.content, (i, blogs) =>{

                let status = blogs.status ? `<span class="shadow-none badge badge-success" style="width: 80px">Show</span>` : `<span class="shadow-none badge badge-danger" style="width: 80px">Hide</span>`
                let blogRow =`<tr>
                    <td class="checkbox-column text-center">${count++}</td>
                    <td class="align-center">
                        <span><img src="assets/img/90x90.jpg" class="" alt="profile"></span>
                    </td>
                    <td class="align-center">${blogs.title}</td>
                    <td class="align-center">${blogs.description}</td>
                    <td class="align-center">${blogs.createdDate}</td>
                    <td class="align-center">${blogs.privacy}</td>
                    <td class="align-center">${blogs.user.username}</td>
                    <td class="align-center">` + checkCountCmt(blogs.id) + `</td>                   
                    <td class="text-center">
                        <button style="background-color: transparent; border: none;" onclick="deleteBlog(${blogs.id})">` +status +
                    `</button>
                    
                    </td>
                </tr>`
                $('#listBlogs tbody').append(blogRow);
            });

            displayPage(data)
            //điều kiện bỏ nút previous
            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
            }
            //điều kiện bỏ nút next
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
            }
}

function deleteBlog(id) {
    let confirmText;
    let successText = "";
    if (checkStatusBlog(id)) {
        confirmText = "Do you really want to hide this blog?"
        successText = "Hide succeed!"
    } else {
        confirmText = "Do you really want to show this blog?";
        successText = "Show succeed!";
    }
    if (confirm(confirmText)) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/blogs/" + id,
            success: function () {
                alert(successText);
                getBlogs();
            }
        })
    }
}

function checkStatusBlog(id) {
    let check = false;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/blogs/" + id,
        async: false,
        success: function (data) {
            if (data.status) {
                check = true;
            }
        }
    })
    return check;
}


function logoutBtn(){
    sessionStorage.clear();
    window.location.href = "../../../../Blog/HTML/editor-html/index.html"
}

function checkCountCmt(id) {
    let count = 0;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/blogs/count/" + id,
        async: false,
        success: function (data) {
            count =  data;
        }
    })
    console.log(count)
    return count
}