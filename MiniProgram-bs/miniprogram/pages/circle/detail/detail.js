// pages/circle/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 聊天
  toChatroom:function(){
    var datalist = []
    try {
      var value = wx.getStorageSync('chatPerson')
      if (value) {
        datalist = value
      }
    } catch (e) {
      // Do something when catch error
    }
     var datadict = {
      "nickName":getApp().globalData.circleDetail.username,
      "fromUser": getApp().globalData.circleDetail.user_id,
      "avatar": getApp().globalData.circleDetail.avatar
     }
     datalist.push(datadict)
     for (let i = 0; i < datalist.length - 1; i++) {
      // console.log(datalist[i])
      for (var j = i + 1; j < datalist.length; j++) {
        if (datalist[i]["fromUser"] == datalist[j]["fromUser"]) {
          datalist.splice(j, 1);
          j--;
        }
      }
    }
    try{
      wx.setStorageSync('chatPerson', datalist)
    }catch (e) { }
    // console.log(datalist)
    
    wx.navigateTo({
      url: "/pages/information/room/room",
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.setData({
      data:getApp().globalData.circleDetail
    })

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