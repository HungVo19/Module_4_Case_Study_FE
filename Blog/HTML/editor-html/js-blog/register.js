function hideLoginForm() {
    $('#dangNhap-div').show();
    $('#forgotpass-div').hide();
    $('#change-div').hide();
    $('#dangKy-div').hide();

    event.preventDefault()
}

function registerUser() {let username = $('#username').val();
    let email = $('#email').val();
    let pass = $('#password').val();
    let rePass = $('#rePass').val();

    let newUser = {
        username: username,
        email: email,
        pass: pass,
        rePass: rePass
    }
    if (email.length < 1 || pass.length < 1 || rePass.length < 1) {
        alert("All fields can not be blank");
    } else if (validateEmail(email)) {
            $.ajax({
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                type: "POST",
                data: JSON.stringify(newUser),
                datatype: 'json',
                url: "http://localhost:8080/register",
                success: function(data) {
                    alert("Registered")
                    $("#dangKy-div").hide();
                    $("#dangNhap-div").show();
                    $("#login-username").val(data.username);
                    $("#login-password").val(data.pass)
                },
                error: function (xhr) {
                    if(xhr.responseText === "Username is existed") {
                        $('#userExitsErr').show();
                        document.getElementById('userExitsErr').innerHTML = xhr.responseText;
                    }
                    if (xhr.responseText === "Wrong re-pass") {
                        $('#wrongRePassErr').show();
                        document.getElementById('wrongRePassErr').innerHTML = xhr.responseText;
                    }
                    if(xhr.responseText === "Email is existed") {
                        $('#emailValidEr').show();
                        document.getElementById('emailValidEr').innerHTML = xhr.responseText;
                    }
                    if (xhr.responseText === "All fields can not be blank") {
                        alert(xhr.responseText)
                    }
                    if (xhr.responseText === "Password must be 6 to 8 characters") {
                        $('#passErr').show();
                        document.getElementById('passErr').innerHTML = xhr.responseText;
                    }
                }
            });
        } else {
            $('#emailValidEr').show();
            document.getElementById('emailValidEr').innerHTML = "Email is not valid";
        }

    event.preventDefault();
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
            alert("Login success")
            sessionStorage.setItem("userId", data.id);
            sessionStorage.setItem("userRole", data.role.id)
            window.location.href = "index.html"
        },
        error: function (xhr) {
            if (xhr.responseText === "All fields can not be blank") {
                alert(xhr.responseText)
            }
            if (xhr.responseText === "Account blocked" ||
                xhr.responseText === "Account not exist") {
                $("#checkUsernameLogin").show();
                document.getElementById("checkUsernameLogin").innerHTML = xhr.responseText;
            }
            if (xhr.responseText === "Wrong password") {
                $("#checkPassLogin").show();
                document.getElementById("checkPassLogin").innerHTML = xhr.responseText;
            }
        }
    });
}

function forgotPass() {
    let username = $('#forgot-username').val();
    let email = $('#forgot-email').val();
    let forgotUser = {
        username: username,
        email: email
    }

    $.ajax({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        type: "POST",
        data: JSON.stringify(forgotUser),
        datatype: 'json',
        url: "http://localhost:8080/users/forgot-password",
        success: function (data) {
            sessionStorage.setItem("userId", data.id);
            $('#dangNhap-div').hide();
            $('#forgotpass-div').hide();
            $('#change-div').show();
            $('#dangKy-div').hide();
        },
        error: function (xhr) {
            if (xhr.responseText === "Username not exist") {
                $("#checkUsernameForgot").show();
                document.getElementById("checkUsernameForgot").innerHTML = xhr.responseText;
            }
            if (xhr.responseText === "Wrong email") {
                $("#checkEmailForgot").show();
                document.getElementById("checkEmailForgot").innerHTML = xhr.responseText;
            }
            if (xhr.responseText === "All fields can not be blank") {
                alert(xhr.responseText);

            }
        }
    })
}

function changePass() {
    let id = sessionStorage.getItem("userId");
    let newPass = $('#changepass').val();
    let confirmPass = $('#repass-change').val();
    let user = {
        newPass: newPass,
        confirmPass: confirmPass
    }

    $.ajax({
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        type: "POST",
        data: JSON.stringify(user),
        datatype: 'json',
        url: "http://localhost:8080/users/change-password/" + id,
        success: function (data) {
            sessionStorage.clear();
            alert("Change password succeeded")
            $('#dangNhap-div').show();
            $('#forgotpass-div').hide();
            $('#change-div').hide();
            $('#dangKy-div').hide();
        },
        error: function (xhr) {
            if (xhr.responseText === "All fields can not be blank") {
                alert(xhr.responseText);
            }
            if (xhr.responseText === "Wrong confirm password") {
                $("#checkEmailForgot").show();
                document.getElementById("checkChangePass").innerHTML = xhr.responseText;
            }
        }
    })
}

function showLoginForm() {
    $('#dangKy-div').hide();
    $('#dangNhap-div').show();
    $('#forgotpass-div').hide();
    $('#change-div').hide();
    event.preventDefault();
}

function forgotForm() {
    $('#dangKy-div').hide();
    $('#dangNhap-div').hide();
    $('#forgotpass-div').show();
    event.preventDefault();
}

function showRegisterForm() {
    $('#dangKy-div').show();
    $('#dangNhap-div').hide();
    $('#forgotpass-div').hide();
    $('#change-div').hide();
    event.preventDefault();
}
function hideError() {
    $('.errorText').hide();
}

const validateEmail = (email) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};