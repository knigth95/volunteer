// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    enterApplication: function (event) {
        var url = './member/member'
        wx.navigateTo({
            url: url
        })
    },
    changeEvent: function () {
        wx.redirectTo({
            url: '../changepassword/changepassword',
        })
    },
    jumpEvent: function () {
        wx.navigateTo({
            url: '../checkIdentify/checkIdentify',
        })
    },
})