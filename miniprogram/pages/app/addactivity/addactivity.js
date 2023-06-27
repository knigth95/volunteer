const db = wx.cloud.database()
Page({
    data: {
        activity: {
            istop: 0
        },
        imgList: [],
        userInfo:{},
        start_time: '8:20',
        start_date: '2022-12-01',
        end_time:'10:30',
        end_date:'2023-01-01', 
        currtab: 0,
    },

    inputNews: function (event) {
        this.data.activity[event.currentTarget.dataset.item] = event.detail.value
    },
    switchChange: function (event) {
        if (event.detail.value) {
            this.data.activity.istop = 0
        } else {
            this.data.activity.istop = 1
        }
    },
    submit: function () {
        var tasks=[]
        wx.showLoading({
          title: '提交中...',
        })
        for(var i=0;i<this.data.imgList.length;i++)
        {
            var filePath="activity/"+Math.floor(Math.random()*100000000)+".jpg"
            var promise=wx.cloud.uploadFile({
                cloudPath: filePath,
                filePath: this.data.imgList[0],
            })
            tasks.push(promise)
        }
        Promise.all(tasks).then(result=>{

            var imgcloudPath=[]
            for(var i=0;i<result.length;i++)
            {
                imgcloudPath=imgcloudPath.concat(result[i].fileID)
            }
            db.collection('activity').add({
                data: {
                    title: this.data.activity.title,
                    publisher: this.data.activity.publisher,
                    content: this.data.activity.content,
                    start_time:this.data.start_time,
                    start_date:this.data.start_date,
                    end_time:this.data.end_time,
                    end_date:this.data.end_date,
                    istop: this.data.activity.istop,
                    publishdate: db.serverDate(),
                    imgcloudPath:imgcloudPath,
                    view:0,
                    thumbs:0,
                    comment:0,
                    avatarUrl:this.data.userInfo.avatarUrl
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
    onLoad(options) {
        var userInfo=wx.getStorageSync('userInfo')
        this.setData({userInfo})
    },
    ChooseImage() {
        wx.chooseMedia({
            count: 9,
            mediaType: ['image'],
            sourceType: ['album', 'camera'],
            maxDuration: 30,
            camera: 'back',
            success: (res) => {
                var file = res.tempFiles
                var imgList = []
                console.log(res.tempFiles)
                for (var i = 0; i < file.length; i++) {
                    imgList = imgList.concat(file[i].tempFilePath)
                }
                this.setData({
                    imgList
                })
            }
        })
    },
    ViewImage: function (event) {
        wx.previewImage({
            current: event.currentTarget.dataset.url,
            urls: this.data.imgList
        })
    },
    DelImg: function (event) {
        var index = event.currentTarget.dataset.index
        var imgList = this.data.imgList
        imgList.splice(index, 1)
        this.setData({
            imgList
        })
    },
     
     // 时间段选择  
      bindDateChange(e) {
        let that = this;
        console.log(e.detail.value)
        that.setData({
          date: e.detail.value,
        })
      },
      bindDateChange2(e) {
        let that = this;
        that.setData({
          date2: e.detail.value,
        })
     
      },
      TimeChange(e) {
        this.setData({
            start_time: e.detail.value
        })
      },
      DateChange(e) {
        this.setData({
          start_date: e.detail.value
        })
      },
})