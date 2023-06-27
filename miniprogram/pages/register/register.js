const db = wx.cloud.database()
Page({
    data: {
        user: {
            name: '',
            _id: '',
            class: '',
        },
        picker: ['21大数据1','21大数据2','21计算机1','21计算机2','21人工智能','21网工(卓工)1','21网工(卓工)2'],
        index:null,
        expassword:'',
    },

    PickerChange(e) {
        this.setData({
            index: e.detail.value
        })
        console.log(this.data.picker[e.detail.value])
        this.data.user.class=this.data.picker[e.detail.value]
    },
    onLoad(options) {

    },
    //获取输入
    inputName: function (event) {
        console.log(event.detail.value)
        this.data.user.name = event.detail.value
    },
    inputPass: function (event) {
        this.data.user._id = event.detail.value
        this.data.expassword = this.data.user._id.slice(5)
    },
    // PickerChange: function (event) {
    //     this.data.user.class = event.detail.value
    // },
    
    returnEvent: function () {
        wx.redirectTo({
            url: '../login/login',
        })
    },

    resetEvent: function () {
        console.log(this.data.user)
        var user = this.data.user
        db.collection('testuser') //将改云数据库改为应用时的数据库
            .where({
                name: user.name,
                _id: user._id,
                class: user.class
            })
            .get().then(res => {
                // res.data 包含该记录的数据
                console.log(res.data[0])
                if (res.data.length == 1) {
                    db.collection('testuser')
                        .where({
                            _id: user._id,
                            class: user.class
                        })
                        .update({
                            data: {
                                password: this.data.expassword
                            },
                        })
                    console.log("重置成功！")
                    wx.showToast({
                        title: '重置成功！',
                        icon: 'success',
                        duration: 2000
                    })
                    try {
                        wx.setStorageSync('user', res.data[0])
                    } catch (e) {}
                    wx.redirectTo({
                        url: '../login/login',
                    })
                } else {
                    console.log("重置失败！")
                    wx.showToast({
                        title: '信息错误',
                        icon: 'fail',
                        duration: 2000
                    })
                }
            })
    }
})