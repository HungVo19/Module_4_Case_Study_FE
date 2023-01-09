function hideLoginForm() {
    $('#dangNhap-div').hide();
    $('#dangKy-div').show();
    event.preventDefault()
}

function registerUser() {

    let username = $('#username').val();
    let email = $('#email').val();
    let pass = $('#password').val();
    let rePass = $('#rePass').val();

    let newUser = {
        username: username,
        email: email,
        pass: pass,
        rePass: rePass
    }

    $.ajax({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        type: "POST",
        data: JSON.stringify(newUser),
        datatype: 'json',
        url: "http://localhost:8080/register",
        success: function (data) {
            alert("Registered")
            $("#dangKy-div").hide();
            $("#dangNhap-div").show();
            $("#login-username").val(data.username);
            $("#login-password").val(data.pass)
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
    event.defaultPrevented;
}

function loginUser(username, pass) {
    let loginInput = $("#login-username").val();
    let password = $("#login-password").val();
    let newUser = {
        loginInput: loginInput,
        password: password
    }

    $.ajax({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        type: "POST",
        data: JSON.stringify(newUser),
        datatype: 'json',
        url: "http://localhost:8080/login",
        success: function (data) {
            sessionStorage.setItem("userId", data.id);
            sessionStorage.setItem("userRole", data.role.id)
            window.location.href = "index.html"
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });
}

function showLoginForm() {
    $('#dangKy-div').hide();
    $('#dangNhap-div').show();
    event.preventDefault();
}
