const db = wx.cloud.database()
var ultis = require("../../../ultils/ultils.js")
var id=""
Page({


    data: {
        newsInfo: {},
        //currentPostId: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options)
        id=options.id;
        db.collection('activity').doc(options.id).get().then(res => {
            console.log(res)
            var newsInfo = res.data
            newsInfo.dateString = ultis.formatTime(newsInfo.publishdate)
            this.setData({
                newsInfo: res.data
            })
        })
        var postId = option.id;
        this.data.currentPostId = postId;
        var postData = postsData.postList[postId];
        this.setData({
            postData: postData
        })
    },
    //点击报名跳转按钮之前需要根据弹框提示进行授权
    getUserInfo: function (e) {
        let that = this;
        // console.log(e)
        // 获取用户信息
        wx.getSetting({
            success(res) {
                // console.log("res", res)
                if (res.authSetting['scope.userInfo']) {
                    console.log("已授权=====")
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success(res) {
                            console.log("获取用户信息成功", res)
                            that.setData({
                                nickName: res.userInfo.nickName,
                                gender: res.userInfo.gender,
                                avatarUrl: res.userInfo.avatarUrl
                            })
                            wx.navigateTo({
                                url: "./apply/apply?id=" + id
                            })
                        },
                        fail(res) {
                            console.log("获取用户信息失败", res)
                        }
                    })

                } else {
                    console.log("未授权=====")
                    that.showSettingToast("请授权")
                }
            }
        })
    },

})