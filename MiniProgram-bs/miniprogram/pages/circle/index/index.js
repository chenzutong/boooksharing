// pages/circle/index/index.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#436EEE",
    secco: "#979797",
    temp: true,
    list1: [],
    list2: [],
  },

  
  showdetail: function (e) {
    console.log(e.currentTarget.dataset.text)
    getApp().globalData.circleDetail = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  // 点击寻书动态
  first_select: function (e) {
    getApp().globalData.circletype = "seek"
    this.setData({
      temp: true,
      firco: "#436EEE",
      secco: "#979797",
    })
    var that = this
    wx.request({
      url: server + 'api/circle/circle_seek',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET', // 请求方式
      success: function (res) { // 请求成功后操作
        console.log(res.data)
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          return;
        }
        that.data.list1 = res.data.data
        console.log(that.data.list1)
        that.setData({
          list1:that.data.list1
        })
      }
    })
  },

  // 点击出书动态
  second_select: function (e) {
    getApp().globalData.circletype = "lend"
    this.setData({
      temp: false,
      firco: "#979797",
      secco: "#436EEE",
    })
    var that = this
    wx.request({
      url: server + 'api/circle/circle_lend',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET', // 请求方式
      success: function (res) { // 请求成功后操作
        console.log(res.data)
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          return;
        }
        that.data.list2 = res.data.data
        console.log(that.data.list2)
        that.setData({
          list2:that.data.list2
        })
      }
    })
  },
  // 点击发布
  third_select: function () {
    if (!getApp().globalData.userInfo.userName){
      wx.navigateTo({
        url: '/pages/person/login/login'
      })
    }
    wx.navigateTo({
      url: '../commit/commit'
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
    getApp().globalData.circletype = "seek"
    var that = this
    wx.request({
      url: server + 'api/circle/circle_seek',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET', // 请求方式
      success: function (res) { // 请求成功后操作
        console.log(res.data)
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          return;
        }
        that.data.list1 = res.data.data
        console.log(that.data.list1)
        that.setData({
          list1:that.data.list1
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