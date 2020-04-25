// pages/person/login/login.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    is_disabled: false,
    username: "",
    password: "",

  },
  usernameInput: function (e) {
    this.data.username = e.detail.value
  },

  passwordInput: function (e) {
    this.data.password = e.detail.value
  },


  signup: function () {
    wx.navigateTo({
      url: '/pages/person/enroll/enroll'
    })
  },

  login: function () {
    var that = this
    if (that.data.username == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入用户名！',
        success: function (res) {}
      })
    } else if (that.data.password == '') {
      wx.showModal({
        title: '提示！',
        showCancel: false,
        content: '请输入密码！',
        success: function (res) {}
      })
    } else {

      //发起网络请求
      wx.request({
        url: server + 'api/user/login',
        data: {
          code: res.code,
          nickName: res.userInfo.nickName,
          avatarUrl: res.userInfo.avatarUrl
        }
      })
      wx.redirectTo({
        url: "/pages/ciecle/index/index"
      })
    }
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