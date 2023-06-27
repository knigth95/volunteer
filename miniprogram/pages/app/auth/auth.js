Page({
    refuseAuth: function () {
      wx.showToast({
        title: '需要微信授权...',
        icon: 'none',
        duration: 1500
      })
    },
    getUserProfile: function (e) {
      wx.getUserProfile({
        desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          wx.setStorageSync('userInfo', res.userInfo);
          wx.showToast({
            title: '授权成功...',
            icon: 'none',
            duration: 1500
          })
          wx.redirectTo({
            url: '../../home/home',
          })
        }
      })
  
    },
  })