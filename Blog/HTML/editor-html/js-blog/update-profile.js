const LOCAL_URL_PROFILE = "http://localhost:8080/users/"
let userId = sessionStorage.getItem("userId");
function showInformation() {
    $.ajax({
        type: "GET",
        url: LOCAL_URL_PROFILE + userId,
        success: function (data) {
            $("#nameUser").val(data.name);
            $("#emailUser").val(data.email);
            $("#phoneUser").val(data.phoneNumber);
            $("#addressUser").val(data.address);
            $("#usernameUser").val(data.username);
        }
    })
    event.preventDefault();
}

function updateInformation() {
    let name =  $("#nameUser").val();
    let phoneNumber =  $("#phoneUser").val();
    let address =  $("#addressUser").val();

    let updateUser = {
        name: name,
        phoneNumber: phoneNumber,
        address: address,
        avatar: ""
    };

    let formmm = new FormData;
    formmm.append("file", $('#avatarUser')[0].files[0]);
    formmm.append("user", new Blob([JSON.stringify(updateUser)],
        {type: 'application/json'}))

    $.ajax({
        header: {},
        contentType: false,
        processData: false,
        type: "PUT",
        url: LOCAL_URL_PROFILE + userId,
        data: formmm,
        success: function () {
            alert("Update success");
            drawNavigationBarr();
        }
    });
    event.preventDefault();
}

function findAvatarUserByUserId(id) {
    let avatar = null;
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/users/" + id,
        dataType: "json",
        async: false,
        success: function (data) {
            avatar = data.avatar;
        }
    })
    return avatar;
}

// function drawNavigationBarr() {
//     let content = "";
//     if (sessionStorage.getItem("userId") == null) {
//         content = `<img alt="" src="images/site/default-avatar.jpg"
//                              class="avatar avatar-44 photo"
//                              height="35" width="35" style="border-radius: 50%">
//                         <ul>
//                             <li><a href="login-register.html">Login/Register</a></li>
//                         </ul>`
//     } else {
//         let userAvatarr = findAvatarUserByUserId(sessionStorage.getItem("userId"));
//         let userNamee = findUserNameByUserId(sessionStorage.getItem("userId"));
//         if (sessionStorage.getItem("userRole") == 1) {
//             content = `<img alt="" src="${userAvatarr}"
//                              class="avatar avatar-44 photo"
//                              height="35" width="35" style="border-radius: 50%">
//                         <ul>
//
//                             <li><a >Hi ${userNamee}</a></li>
//                             <li><a href="post-blog.html">Post New Blog</a></li>
//                             <li><a href="blog-simple.html">Profile</a></li>
//                             <li><a href="user-manage-post.html">Manage Post</a></li>
//                             <li><a href="" onclick="logOut()">Logout</a></li>
//                         </ul>`
//         } else {
//             content = `<img alt="" src="${userAvatarr}"
//                              class="avatar avatar-44 photo"
//                              height="35" width="35" style="border-radius: 50%">
//                         <ul>
//                             <li><a href="" onclick="toAdminPage()">Go to Admin Page</a></li>
//                             <li><a href="" onclick="logOut()">Logout</a></li>
//                         </ul>`
//         }
//
//     }
//     $("#checkLogin").html(content);
// }

function changePasssss() {
    let newPass = $('#newPass').val();
    let confirmPass = $('#newRePass').val();

    let changePassUser = {
        newPass: newPass,
        confirmPass: confirmPass
    }

    $.ajax({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        type: "PUT",
        url: "http://localhost:8080/users/change-password/" + userId,
        data: JSON.stringify(changePassUser),
        datatype: 'json',

        success: function () {
            alert("Change password success");
        },
        error: function (xhr) {
            if (xhr.responseText === "New password can not same current password") {
                alert(xhr.responseText);
            }
            if (xhr.responseText === "Wrong re-password") {
                alert(xhr.responseText)
            }
            if (xhr.responseText === "All fields can not be blank") {
                alert(xhr.responseText)
            }
        }
    });
}