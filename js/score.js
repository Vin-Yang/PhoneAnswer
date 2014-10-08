/**
 * Created by 文鹏 on 2014/7/26.
 */
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}
var Session = getUrlParam("session");
var Number = getUrlParam("number");
if (Session == '' || Session == null) {
    window.location.href = "../index.html";
}
$(function () {
    //最高分
    var highestScore;
    //本次得分
    var score;
    var html;
    var apiName;
    var data = {
        number: Number
    };
    var isFinished = true;
    apiName = 'rank';
    if (isFinished) {
        isFinished = false;
        user().Api(apiName, data, function (returnData) {
            returnData = JSON.parse(returnData);
            highestScore = returnData.Table[0].HighestSocre;
            score = returnData.Table[0].Score;
            html = '';
            html = '<div class="userInfo"> ' +
                '<p>您好：<span>' + Number + '</span></p> ' +
                '<p>本次得分：<span>' + score + '</span></p> ' +
                '<p class="endTime">最高得分：<span>' + highestScore + '</span></p> ' +
                '</div>';
            $('.section').append(html).trigger('create');
        });
    } else {
        isFinished = false;
        alert('亲，您的刷新速度真的是太快了！');
    }
    $('.start').on("click", function () {
        window.location.href = "userAnswer.html?session=" + Session + "&number=" + Number;
    });
    $('.end').on("click", function () {
        window.location.href = "../index.html";
    });
});
