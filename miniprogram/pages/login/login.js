const db = wx.cloud.database()
Page({

    data: {
        user: {
            _id: '',
            password: ''
        }
    },

    onLoad: function (options) {

    },
    inputName: function (event) {
        console.log(event.detail.value)
        this.data.user._id = event.detail.value
    },
    inputPasswd: function (event) {
        this.data.user.password = event.detail.value
    },
    loginEvent: function () {
        console.log(this.data.user)
        var user = this.data.user
        db.collection('testuser') //将改云数据库改为应用时的数据库
            .where({
                _id: user._id,
                password: user.password
            })
            .get().then(res => {
                // res.data 包含该记录的数据
                console.log(res.data[0])
                if (res.data.length == 1) {
                    console.log("登录成功！")
                    wx.showToast({
                        title: '登录成功！',
                        icon: 'success',
                        duration: 2000
                    })
                    try {
                        wx.setStorageSync('user', res.data[0])
                    } catch (e) {}
                    wx.redirectTo({
                        url: '../home/home',
                    })

                } else {
                    console.log("登录失败！")
                    wx.showToast({
                        title: '用户名密码错误',
                        icon: 'fail',
                        duration: 2000
                    })
                }
            })
    },

    registerEvent: function () {
        wx.redirectTo({
            url: '../register/register',
        })
    }

})