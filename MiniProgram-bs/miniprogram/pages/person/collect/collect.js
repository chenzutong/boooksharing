// pages/person/collect/collect.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colectlist:[]

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
    var that = this
    wx.request({
      url: server + 'api/book/collect_list',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data:{
        user_id:getApp().globalData.userInfo.user_id
      },
      success: function (res) { // 请求成功后操作
        console.log(res.data)
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          return;
        }
        that.data.colectlist = res.data.data
        console.log(that.data.colectlist)
        that.setData({
          colectlist:that.data.colectlist
        })
      }
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