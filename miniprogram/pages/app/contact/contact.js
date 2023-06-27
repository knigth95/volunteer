const db=wx.cloud.database()
Page({


    data: {
        contactList:[]
    },


    onLoad(options) {
        db.collection('classname').count().then(res=>{
            var total = res.total
            var batchTimes = Math.ceil(total/20)
            var tasks= []
            for(var i=0;i<batchTimes;i++)
            {
                var promise=db.collection('classname').skip(i * 20).get()
                tasks.push(promise)
            }
            Promise.all(tasks).then(result=>{
                var contactList=[]
                for(var i=0;i<result.length;i++)
                {
                    contactList=contactList.concat(result[i].data)
                }
                this.setData({contactList})
            })
        })
    },
    gotoContact:function(event){
        console.log(event.currentTarget.dataset.code)
        var code=event.currentTarget.dataset.code
        wx.navigateTo({
          url: '../contactdetail/contactdetail?classcode='+code
        })
    }
   
})