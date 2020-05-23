// pages/information/index/index.js
const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomlist: [{
      "fromName": "value.nickName",
      "fromUser": "value.toUser"
    }]

  },

  tologin: function () {
    wx.reLaunch({
      url: '/pages/person/login/login'
    })
  },

  toChatroom: function (e) {
    console.log(e.currentTarget.dataset.text)
    var chatperson = {
      "username": e.currentTarget.dataset.text.nickName,
      "user_id": e.currentTarget.dataset.text.fromUser
    }
    getApp().globalData.circleDetail = chatperson
    console.log(getApp().globalData.circleDetail)

    wx.navigateTo({
      url: '../room/room',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.openid = app.globalData.userInfo.openid
    if (app.globalData.openid) {
      this.setData({
        openid: app.globalData.openid
      })
    }
    this.setData({
      donelogin: getApp().globalData.userInfo.userName
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  chatInfo() {
    return new Promise(function (resolvs) {
      //获取聊天的数据库
      db.collection("chatroom").where({
        toUser: app.globalData.userInfo.user_id
      }).get({
        success: function (res) {
          if (res.data != null) {
            var templist = []
            var tempdict = {}
            console.log(res.data)
            res.data.forEach(function (value, key) {

             tempdict[key] = {
                "fromName": value.nickName,
                "fromUser": value.toUser
              }
              templist.push(tempdict)
              
              // templist.add(tempdict)
              // console.log(key, value);
            })
            console.log(templist)
            templist = res.data.reverse()
            // console.log("templist",templist)
            // console.log("templist",templist.reverse())
            for (let i = 0; i < templist.length - 1; i++) {
              // console.log(templist[i])
              for (var j = i + 1; j < templist.length; j++) {
                if (templist[i]["fromUser"] == templist[j]["fromUser"]) {
                  templist.splice(j, 1);
                  j--;
                }
              }
            }
            resolvs(templist)
          }
        }
      })
    })

  },

  async getChat() {
    let that = this
    var roomlist1 = await that.chatInfo()
    var roomlist2 = []
    try {
      var value = wx.getStorageSync('chatPerson')
      if (value) {
        roomlist2 = value
      }
    } catch (e) {
      // Do something when catch error
    }
    // console.log("roomlist1",roomlist1);
    // console.log("roomlist2",roomlist2);
    
    var room = []
    room = roomlist1.concat(roomlist2)
    // room = room.reverse()
    for (let i = 0; i < room.length - 1; i++) {
      // console.log(room[i])
      for (var j = i + 1; j < room.length; j++) {
        if (room[i]["fromUser"] == room[j]["fromUser"]) {
          room.splice(j, 1);
          j--;
        }
      }
    }
    // for (let i = room.length - 1; i >=0; i--) {
    //   // console.log(room[i])
    //   for (var j = room.length; j > 0; j--) {
    //     if (room[i]["fromUser"] == room[j]["fromUser"]) {
    //       room.splice(j, 1);
    //       j++;
    //     }
    //   }
    // }
    that.data.roomlist = room
    console.log(that.data.roomlist)
    that.setData({
      roomlist: that.data.roomlist
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    that.getChat()



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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})