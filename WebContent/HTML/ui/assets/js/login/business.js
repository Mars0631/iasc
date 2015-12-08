$(document).ready(function () {


    $("#subBtn").click(function () {

        var uname = $("#username").val();
        var upwd = $("#password").val();

        if (!uname) {
            $("#username").css("borderColor", "red");
            return;
        }

        if (!upwd) {
            $("#password").css("borderColor", "red");
            return;
        }

        $.ajax({
            type: "post",
            url: "http://localhost:8080/iasc_java/login",
            data: "uname=" + uname + "&upwd=" + upwd,
            error: function (xhr, textStatus, errorThrown) {
                console.log(textStatus);
            },
            success: function (data, status) {
                if (status == "success") {
                    alert(data);

                }
            }
        });
    });

    $("#register").click(function () {
        //        alert('ok');
        var visible = $(".register-div").css("visibility");
        if (visible == "hidden") {
            $(".register-div").css("visibility", "visible");
        } else {
            $(".register-div").slideToggle(500);
            clearAllRegisterInfo();
        }

    });

    $("#closeBtn").click(function () {
        $(".register-div").slideToggle(500);
        clearAllRegisterInfo();
    });

    $("#registerBtn").bind("click", function () {

        if (checkRegisterNull() && checkResisterVal()) {
            $.ajax({
                type: "post",
                url: "http://localhost:8080/iasc/register",
                dataType: "html",
                data: "loginName=" + $("#regUname").val() + "&passwd=" + $("#regPwd").val() + "&nikeName=" + $("#regNikname").val() + "&email=" + $("#regEmail").val() + "&sex=" + $("input[name=sexgroup]:checked").val(),

                error: function (xhr, textStatus, errorThrown) {
                    console.log(textStatus);
                },
                success: function (data, status) {
                    if (status == "success") {

                        if (data == "1") {
                            alert("用户名或邮箱已被注册，请重新输入！");
                            return;
                        } else if (data == "-1") {
                            alert("用户添加失败，请联系管理员！");
                            return;
                        } else if (data == "0") {
                            alert("注册成功，现在可以登录啦！")
                            $(".register-div").slideToggle(500);
                            clearAllRegisterInfo();
                        }

                    }
                }
            });
        }

    });

});

function checkResisterVal() {
    if ($("#regPwd").val() !== $("#regCPwd").val()) {
        alert("两次输入的密码不一致,请重新输入!");
        return false;
    }

    var reMail = /^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/;
    var s = new RegExp(reMail);

    if (!(s.test($("#regEmail").val()))) {
        alert("邮箱地址格式不正确！");
        return false;
    }

    if ($("#regUname").val().length > 30) {
        alert("登录名称请不要超过30个字符！")
        return false;
    }

    if ($("#regNikname").val().length > 30) {
        alert("昵称请不要超过30个字符！")
        return false;
    }

    if ($("#regPwd").val().length > 30) {
        alert("密码请不要超过30个字符！")
        return false;
    }

    return true;
}



function checkRegisterNull() {

    if (!$("#regUname").val()) {
        $("#regUname").css("borderColor", "red");
        return false;
    } else {
        $("#regUname").css("borderColor", "");
    }

    if (!$("#regPwd").val()) {
        $("#regPwd").css("borderColor", "red");
        return false;
    } else {
        $("#regPwd").css("borderColor", "");
    }

    if (!$("#regCPwd").val()) {
        $("#regCPwd").css("borderColor", "red");
        return false;
    } else {
        $("#regCPwd").css("borderColor", "");
    }

    if (!$("#regEmail").val()) {
        $("#regEmail").css("borderColor", "red");
        return false;
    } else {
        $("#regEmail").css("borderColor", "");
    }

    return true;
}

function clearAllRegisterInfo() {
    $("#regUname").val("");
    $("#regNikname").val("");
    $("#regPwd").val("");
    $("#regCPwd").val("");
    $("#regEmail").val("");
    $("#regEmail").css("borderColor", "");
    $("#regCPwd").css("borderColor", "");
    $("#regPwd").css("borderColor", "");
    $("#regUname").css("borderColor", "");
}
