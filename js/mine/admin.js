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
                api = '/user/login';
                break;
            case 'info':
                api = '/user/info';
                break;
            case 'history':
                api = '/user/history';
                break;
            case 'rent':
                api = '/user/rent';
                break;
            case 'renew':
                api = '/user/renew';
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
