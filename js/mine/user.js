/**
 * Created by 文鹏 on 2014/7/30.
 */
(function () {
    /*构造函数*/
    User = function () {
    };
    User.prototype.setHost = function (value) {
        host = value;
    };
    User.prototype.Api = function (apiName, data, callback) {
        var api;
        switch (apiName) {
            case 'login':
                api = 'PhoneAnswer/PhoneAPI/PhoneRegist.aspx';
                break;
            case 'subject':
                api = 'PhoneAnswer/PhoneAPI/PhoneSubject.aspx';
                break;
            case 'rank':
                api = 'PhoneAnswer/PhoneAPI/PhoneRank.aspx';
                break;
            case 'score':
                api = 'PhoneAnswer/PhoneAPI/PhoneScore.aspx';
                break;
            case 'favorite':
                api = '/user/favorite';
                break;
            case 'addFav':
                api = '/user/addFav';
                break;
            case 'delFav':
                api = '/user/delFav';
                break;
            default :
                callback(null);
        }
        base().Ajax(data, api, callback);
    };
})();
var user = function () {
    return new User();
};
