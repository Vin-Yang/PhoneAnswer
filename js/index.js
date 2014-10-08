/**
 * Created by 文鹏 on 2014/7/26.
 */

$(function () {
    isRemember();
    var apiName;
    var data;
    var isFinished = true;
    /*点击登录按钮时触发*/
    $('.submit').on("click", function () {
        if ($('#username').val().trim() != '') {
            data = {
                number:$('#username').val().trim()
            };
            apiName = 'login';
            if (isFinished) {
                isFinished = false;
                user().Api(apiName, data, function (returnData) {
                    saveUserInfo();
                    if (returnData=='True') {
                        isFinished = true;
                        window.location.href = "user/userAnswer.html?session=" + returnData+"&number="+$('#username').val().trim();
                    } else {
                        alert('亲，账号格式有误！');
                        isFinished = true;
                    }
                });
            } else {
                alert('亲，您的小爪子点击的实在是太快了哦！');
            }

        } else {
            alert('亲，用户名不能为空哦！');
        }
    });
    /**cookie相关的函数**/
    /*判断是否记住了密码*/
    function isRemember() {
        if ($.cookie("rmbUser") == "true") {
            $("#username").val($.cookie("username"));
        }
    }

    /*看是否记住账号若记住则保存*/
    function saveUserInfo() {
        var username = $("#username").val();
        $.cookie("rmbUser", "true", { expires: 7 }); // 存储一个带7天期限的 cookie
        $.cookie("username", username, { expires: 7 }); // 存储一个带7天期限的 cookie
    }
});
