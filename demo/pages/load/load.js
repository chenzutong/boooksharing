// pages/load/load.js
Page({

  /**
   * Page initial data
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  next: function(e) {
    console.log("userInfo: ", getApp().globalData.userInfo)
    wx.switchTab({
      url: '/pages/circle/circle',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function(options) {
    var that = this

    wx.showLoading({
      title: '加载中',
    })

    wx.login({
      success(res) {
        if (res.code) {
          console.log("code:", res.code)

          // 查看是否授权
          wx.getSetting({
            success(res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function(res) {
                    console.log(res.userInfo)
                    getApp().globalData.userInfo = res.userInfo
                    //发起网络请求
                    wx.request({
                      url: 'http://127.0.0.1:5000/api/user/login',
                      data: {
                        code: res.code,
                        nickName: res.userInfo.nickName,
                        avatarUrl: res.userInfo.avatarUrl
                      }
                    })
                    console.log("response:",res.data)
                    that.next();

                  }
                })
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })

    setTimeout(function() {
      wx.hideLoading()
    }, 1000)
  },
  bindGetUserInfo(e) {
    getApp().globalData.userInfo = e.detail.userInfo
    if (e.detail.userInfo == undefined) {

    } else {
      this.next();
    }
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function() {

  }
})