const db = wx.cloud.database()
var ultis = require("../../../ultils/ultils.js")
Page({
    data: {
        
        newsList: [],
        activityList: [],
        activityListAll:[],
        modalName: '',
        selectActivity: {}
    },
    
    getNewsData:function(){
        db.collection('activity').get().then(res => {
            var newsList = res.data
            for (var i = 0; i < newsList.length; i++) {
                newsList[i].dateString = ultis.formatTime(newsList[i].publishdate)
            }
            this.setData({
                newsList
            })
        })
    },
    seachPerson:function(event){
        console.log(event.detail.value)
        var name=event.detail.value
        var activityListAll=this.data.activityListAll
        var activityList=[]
        for(var i=0;i<activityListAll.length;i++)
        {
            var result=activityListAll[i].searchText.indexOf(name)
            if(result!=-1)
            {
                activityList.push(activityListAll[i])
            }
        }
        this.setData({activityList:activityList})
    },
    clickEvent: function (event) {
        console.log(event.currentTarget.dataset.item)
        var selectPerson = event.currentTarget.dataset.item
        this.setData({
            modalName: 'activityModal',
            selectPerson: selectPerson
        })
    },
    onLoad(options) {

        
    },

    newdetail: function (event) {

        var item = event.currentTarget.dataset.item
        const _ = db.command
        db.collection('activity').doc(item._id).update({
            data: {
                // 表示指示数据库将字段自增 10
                view: _.inc(1)
            },
            success: function (res) {
                console.log(res.data)
            }
        })

        wx.navigateTo({
            url: '../newsdetail/newsdetail?id=' + item._id,
        })
    },
    onShow() {
        this.getNewsData()
    },


    onReachBottom() {

    },


    onShareAppMessage() {

    }
})