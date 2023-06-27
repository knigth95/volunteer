const db = wx.cloud.database()
var app = getApp();
var id=""

Page({
    
    data: {
        username: "",
        phone: 0,
        sid: 0,
        backup: "",
        class_test: "",
        avatarUrl: ""
        //'gender': gender,
        //'nickName': nickName
    },
    

    formSubmit: function (e) {
        console.log('form发生了submit事件，携带数据为：', e.detail.value);

        var username = this.data.username
        username = e.detail.value.username; //1
        var phone = this.data.phone
        phone = e.detail.value.phone; //4
        var sid = this.data.sid
        sid = e.detail.value.sid; //2
        var backup = this.data.backup
        backup = e.detail.value.backup; //5
        var class_test = this.data.class_test
        class_test = e.detail.value.class_test; //3
        var avatarUrl = this.data.avatarUrl
        avatarUrl = e.detail.value.avatarUrl;

        if (username == null || username == "") {
            wx.showToast({
                title: '用户姓名不能为空',
                icon: 'none',
                duration: 2000
            })
            return;
        }

        if (sid == null || sid == "") {
            wx.showToast({
                title: '学号不能为空',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if (sid.length != 11) {
            wx.showToast({
                title: '学号格式错误',
                icon: 'none',
                duration: 2000
            })
            return;
        }

        if (class_test == null || class_test == "") {
            wx.showToast({
                title: '班级不能为空',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if (phone == null || phone == "") {
            wx.showToast({
                title: '手机号不能为空',
                icon: 'none',
                duration: 2000
            })
            return;
        }

        if (phone.length != 11) {
            wx.showToast({
                title: '手机号格式错误',
                icon: 'none',
                duration: 2000
            })
            return;
        }

        var tasks = []
        wx.showLoading({
            title: '提交中...',
        })

        Promise.all(tasks).then(result => {
            db.collection('activity_user')
                .add({
                    data: {
                        activity_id: id,
                        username: username,
                        phone: phone,
                        sid: sid,
                        class_test: class_test,
                        publishdate: db.serverDate(),
                        backup: backup,
                        avatarUrl: avatarUrl
                    }
                })
                .then(res => {
                    wx.hideLoading()
                    wx.showToast({
                        title: '添加成功！',
                    })
                    console.log(res)
                })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     * 主要是获取当前微信用的信息
     */
    onLoad: function (options) {
        var that = this 
        id=options.id
        // 查看是否授权
        wx.getSetting({
            success(res) {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function (res) {
                            //console.log(res.userInfo)
                            that.setData({
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })


    },



    // getUserInfo: function (e) {
    //   let that = this;
    //   // console.log(e)
    //   // 获取用户信息
    //   wx.getSetting({
    //     success(res) {
    //       // console.log("res", res)
    //       if (res.authSetting['scope.userInfo']) {
    //         console.log("已授权=====")
    //         // 已经授权，可以直接调用 getUserInfo 获取头像昵称
    //         wx.getUserInfo({
    //           success(res) {
    //             console.log("获取用户信息成功", res)
    //             that.setData({
    //               nickName: res.userInfo.nickName,
    //               gender: res.userInfo.gender,
    //               avatarUrl: res.userInfo.avatarUrl
    //             })
    //           },
    //           fail(res) {
    //             console.log("获取用户信息失败", res)
    //           }
    //         })
    //       } else {
    //         console.log("未授权=====")
    //         that.showSettingToast("请授权")
    //       }
    //     }
    //   })
    // },

    // //打开权限设置页提示框
    // showSettingToast: function (e) {
    //   wx.showModal({
    //     title: '提示！',
    //     confirmText: '去设置',
    //     showCancel: false,
    //     content: e,
    //     success: function (res) {
    //       if (res.confirm) {
    //         wx.navigateTo({
    //           url: '../setting/setting',
    //         })
    //       }
    //     }
    //   })
    // },


    /**
     * 获取用户信息--是点击按钮触发的获取用户信息的方法
     */
    bindGetUserInfo(e) {
        console.log(e.newsdetail.userInfo)
        this.setData({
            userInfo: e.newsdetail.userInfo
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },


})