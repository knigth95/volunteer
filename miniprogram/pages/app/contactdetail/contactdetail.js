const db = wx.cloud.database()
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        CustomBar: app.globalData.CustomBar,
        contactList: [],
        contactListAll:[],
        modalName: '',
        selectPerson: {}
    },
    seachPerson:function(event){
        console.log(event.detail.value)
        var name=event.detail.value
        var contactListAll=this.data.contactListAll
        var contactList=[]
        for(var i=0;i<contactListAll.length;i++)
        {
            var result=contactListAll[i].searchText.indexOf(name)
            if(result!=-1)
            {
                contactList.push(contactListAll[i])
            }
        }
        this.setData({contactList:contactList})

    },
    clickEvent: function (event) {
        console.log(event.currentTarget.dataset.item)
        var selectPerson = event.currentTarget.dataset.item
        this.setData({
            modalName: 'contactModal',
            selectPerson: selectPerson
        })
    },
    hideModal(e) {
        this.setData({
            modalName: null
        })
    },
    makePhone: function () {

        wx.makePhoneCall({
            phoneNumber: this.data.selectPerson.phone
        })
    },
    addContact: function () {
        wx.addPhoneContact({
            firstName: this.data.selectPerson.name,
            mobilePhoneNumber: this.data.selectPerson.phone
        })
    },
    getUsers: function (classcode) {
        db.collection('users').where({
            classcode: classcode
        }).count().then(res => {

            const total = res.total
            const batchTimes = Math.ceil(total / 20)
            //console.log(batchTimes)
            var tasks = []
            for (var i = 0; i < batchTimes; i++) {
                const promise = db.collection('users').where({
                    classcode: classcode
                }).skip(i * 20).get()
                tasks.push(promise)
            }
            Promise.all(tasks).then(result => {
                var contactList = []
                for (i = 0; i < result.length; i++) {
                    contactList = contactList.concat(result[i].data)
                }
                //console.log(contactList)
                this.setData({
                    contactList:contactList,contactListAll:contactList
                })
            })
        })
    },

    onLoad(options) {
        this.getUsers(options.classcode)
  
    },


})