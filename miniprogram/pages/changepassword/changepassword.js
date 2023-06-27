const db = wx.cloud.database()
Page({

    data: {
        changeuser: {
            _id:'',
            password: '',
            changepass: ''
        },
    },
    returnEvent: function () {
        wx.redirectTo({
            url: '../home/home',
        })
    },
    //获取输入
    inputId: function (event) {
        this.data.changeuser._id = event.detail.value
    },
    inputPass: function (event) {
        console.log(event.detail.value)
        this.data.changeuser.password = event.detail.value
    },
    inputChangepass: function (event) {
        this.data.changeuser.changepass = event.detail.value
    },
    changeEvent: function () {
        console.log(this.data.user)
        var changeuser = this.data.changeuser
        db.collection('testuser') //将改云数据库改为应用时的数据库
            .where({
                _id: changeuser._id,
                password: changeuser.password,
            })
            .get().then(res => {
                // res.data 包含该记录的数据
                console.log(res.data[0])
                if (res.data.length == 1) {
                    db.collection('testuser')
                        .where({
                            _id: changeuser._id
                        })
                        .update({
                            data: {
                                password: changeuser.changepass
                            },
                        })
                    console.log("修改成功！")
                    wx.showToast({
                        title: '修改成功！',
                        icon: 'success',
                        duration: 2000
                    })
                    try {
                        wx.setStorageSync('user', res.data[0])
                    } catch (e) {}
                    wx.redirectTo({
                        url: '../mine/mine',
                    })
                } else {
                    console.log("重置失败！")
                    wx.showToast({
                        title: '修改失败',
                        icon: 'fail',
                        duration: 2000
                    })
                }
            })
    }
})