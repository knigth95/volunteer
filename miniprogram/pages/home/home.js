const db = wx.cloud.database()
Page({
    data: {
        swiperList: [],
        iconList: [],
    },
    checkIsLogin: function () {
        var value = wx.getStorageSync('user')
        if (!value) {
            wx.navigateTo({
                url: '../login/login',
            })
        }
    },
    getSwiperData: function () {
        db.collection('swiper').orderBy('order', 'asc').get().then(res => {
            this.setData({
                swiperList: res.data
            })
        })
    },
    getListData: function () {
        db.collection('list').get().then(res => {
            this.setData({
                iconList: res.data
            })
        })

    },
    onLoad: function (options) {
        // this.checkIsLogin()
        this.getSwiperData()
        this.getListData()

    },
    enterApplication: function (event) {
        var item = event.currentTarget.dataset.item
        var url = '../app/' + item.page + '/' + item.page
        if (!item.islock) {
            wx.navigateTo({
                url: url
            })
        } else {
            wx.showToast({
                title: '开发中...',
            })
        }
    },
    
})