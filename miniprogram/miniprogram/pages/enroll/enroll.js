// pages/enroll/enroll.js
Page({

  /**
   * Page initial data
   */
  data: {
    username: "",
    phonenumber: "",
    password: "",
    passworddack: "",
  },

  // 注册
  regist: function (e) {
    var that = this
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})(17[0-9]{1}))+\d{8})$/;
    if (that.data.username == "") {
      wx.showModal({
        title: '提示',
        content: '请输入用户名!',
        showCancel: false,
        success(res) { }
      })
    } else if (that.data.phonenumber == "") {
      wx.showModal({
        title: '提示',
        content: '请输入手机号!',
        showCancel: false,
        success(res) { }
      })
    } else if (that.data.phonenumber.length != 11) {
      wx.showModal({
        title: '提示',
        content: '手机号长度有误，请重新输入!',
        showCancel: false,
        success(res) { }
      })
    } else if (!myreg.test(that.data.phonenumber)) {
      wx.showModal({
        title: '提示',
        content: '请输入正确的手机号!',
        showCancel: false,
        success(res) { }
      })
    } else if (that.data.password == "") {
      wx.showModal({
        title: '提示',
        content: '请输入密码！!',
        showCancel: false,
        success(res) { }
      })
    } else if (that.data.passworddack == "") {
      wx.showModal({
        title: '提示',
        content: '请输入确认密码!',
        showCancel: false,
        success(res) { }
      })
    } else if (that.data.passworddack != that.data.password) {
      wx.showModal({
        title: '提示',
        content: '两次密码输入不一致!',
        showCancel: false,
        success(res) { }
      })
    } else {
      console.log("regist success")
    }

  },

  // 跳转上一页面
  signin: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },

  // 获取wxml输入的信息
  usernameInput: function (e) {
    this.data.username = e.detail.value
  },
  phoneInput: function (e) {
    this.data.phonenumber = e.detail.value
  },
  passwordInput: function (e) {
    this.data.password = e.detail.value
  },
  passwordInpuAckt: function (e) {
    this.data.passworddack = e.detail.value
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})