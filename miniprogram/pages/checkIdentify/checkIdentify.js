const db = wx.cloud.database()
Page({

    data: {

    },
    returnEvent: function () {
        wx.redirectTo({
            url: '../home/home',
        })
    },
    
})