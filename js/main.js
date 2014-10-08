/**
 * Created by 文鹏 on 2014/9/2.
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
    window.location.href = "index.html";
}
$(function () {
    //实时得分
    var addScore;
    //答案
    var key;
    //题号
    var count;
    var content;
    //答案选项
    var Akey, Bkey, Ckey, Dkey;
    var apiName;
    var data;
    var html;
    var isFinished = true;
    $('.button').find('input').eq(0).removeAttr('disabled');

    /*设置超时时间为60秒钟*/
    var timeout = 60;
    /*点击开始按钮时触发*/
    $('.start').on("click", function () {
        $('.button').find('input').eq(0).attr('disabled', 'disabled');
        if ($('.button').find('input').length == 1) {
            addScore = 0;
            data = {
                number: Number,
                id: 0,
                key: 'E'
            };
            $('.button').append('<input type="button" value="提前结束" class="end"/> ').find('input').eq(0).attr('value', '下一道题').attr('disabled', 'disabled');
            html = '';
            html = '<div class="userInfo"> ' +
                '<p>您好：<span>' + Number + '</span></p> ' +
                '<p>得分：<span>' + addScore + '</span></p> ' +
                '<p class="endTime">剩余时间：<span>' + timeout + '</span>秒</p> ' +
                '</div>';
            $('.section').prepend(html).trigger('create');
            //答题倒计时
            var seconds = 0;
            setInterval(function () {
                seconds += 1;
                if (seconds > 60) {
                    apiName = 'score';
                    data = {
                        number: Number
                    };
                    user().Api(apiName, data, function (returnData) {
                        if (returnData == 'True') {
                            alert('亲，本次答题已经结束，快去看看成绩吧！');
                            window.location.href = "userScore.html?session=" + Session + "&number=" + Number;
                        } else {
                            alert('亲，答题超时，提交失败！');
                            window.location.href = "userScore.html?session=" + Session + "&number=" + Number;
                        }
                    });
                } else {
                    $('.endTime span').html(timeout - seconds);
                }
            }, 1000);
        } else {
            data = {
                number: Number,
                id: count,
                key: key
            };
        }
        apiName = 'subject';
        user().Api(apiName, data, function (returnData) {
            isFinished = false;
            if (returnData) {
                isFinished = true;
                returnData = JSON.parse(returnData);
                addScore = returnData.Table1[0].AddScore;
                $('.userInfo').find('span').eq(1).html(addScore);
                count = returnData.Table1[0].Id;
                content = returnData.Table1[0].Content;

                //答案数组
                var result = [];
                Akey = returnData.Table1[0].Akey;
                if (Akey != null) {
                    result.push(Akey);
                }
                Bkey = returnData.Table1[0].Bkey;
                if (Bkey != null) {
                    result.push(Bkey);
                }
                Ckey = returnData.Table1[0].Ckey;
                if (Ckey != null) {
                    result.push(Ckey);
                }
                Dkey = returnData.Table1[0].Dkey;
                if (Dkey != null) {
                    result.push(Dkey);
                }
                //alert(result.length);
                html = '';
                html = '<form id="answer"> ' +
                    '<p class="content">题目：' + content + '</p> ';
                if (result.length == 2) {
                    html += '<p><input type="radio" name="select" value="A" id="selectA" /><label for="selectA" id="akey">A.</label>' +
                        '<span>' + result[0] + '</span>' +
                        '</p> ' +
                        '<p><input type="radio" name="select" value="B" id="selectB" /><label for="selectB" id="bkey">B.</label>' +
                        '<span>' + result[1] + '</span>' +
                        '</p> ';
                } else if (result.length == 3) {
                    html += '<p><input type="radio" name="select" value="A" id="selectA" /><label for="selectA" id="akey">A.</label>' +
                        '<span>' + result[0] + '</span>' +
                        '</p> ' +
                        '<p><input type="radio" name="select" value="B" id="selectB" /><label for="selectB" id="bkey">B.</label>' +
                        '<span>' + result[1] + '</span>' +
                        '</p> ' +
                        '<p><input type="radio" name="select" value="C" id="selectC" /><label for="selectC" id="ckey">C.</label>' +
                        '<span>' + result[2] + '</span>' +
                        '</p>';
                } else {
                    html += '<p><input type="radio" name="select" value="A" id="selectA" /><label for="selectA" id="akey">A.</label>' +
                        '<span>' + result[0] + '</span>' +
                        '</p> ' +
                        '<p><input type="radio" name="select" value="B" id="selectB" /><label for="selectB" id="bkey">B.</label>' +
                        '<span>' + result[1] + '</span>' +
                        '</p> ' +
                        '<p><input type="radio" name="select" value="C" id="selectC" /><label for="selectC" id="ckey">C.</label>' +
                        '<span>' + result[2] + '</span>' +
                        '</p> ' +
                        '<p><input type="radio" name="select" value="D" id="selectD" /><label for="selectD" id="dkey">D.</label>' +
                        '<span>' + result[3] + '</span>' +
                        '</p> ';
                }
                html += '</form>';
                $('section').empty().append(html).trigger('create');

                $('#selectA').on("click", function () {
                    key = 'A';
                    $('.button').find('input').eq(0).removeAttr('disabled');
                });
                $('#selectB').on("click", function () {
                    key = 'B';
                    $('.button').find('input').eq(0).removeAttr('disabled');
                });
                $('#selectC').on("click", function () {
                    key = 'C';
                    $('.button').find('input').eq(0).removeAttr('disabled');
                });
                $('#selectD').on("click", function () {
                    key = 'D';
                    $('.button').find('input').eq(0).removeAttr('disabled');
                });
                $('.end').one("click", function () {
                    apiName = 'score';
                    data = {
                        number: Number
                    };
                    user().Api(apiName, data, function (returnData) {
                        if (returnData == 'True') {
                            alert('亲，本次答题已经结束，快去看看成绩吧！');
                            window.location.href = "userScore.html?session=" + Session + "&number=" + Number;
                        } else {
                            alert('亲，答题超时，提交失败！');
                            window.location.href = "userScore.html?session=" + Session + "&number=" + Number;
                        }
                    });
                });
            }
        });
    });
});
