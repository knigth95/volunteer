// pages/app/calendar/calendar.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: [
            'cloud://test-0pmu0.7465-test-0pmu0-1300559272/images/calendar1.png',
            'cloud://test-0pmu0.7465-test-0pmu0-1300559272/images/calendar2.png'
        ]
    },

    previewCalendar:function(){
        var url=this.data.url
        wx.previewImage({
            current: url[0], // 当前显示图片的 http 链接
            urls: url // 需要预览的图片 http 链接列表
          })
    },

    
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})