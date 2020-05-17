// pages/load/load.js
var server = getApp().globalData.server

Page({

  /**
   * Page initial data
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  next: function (e) {
    console.log("userInfo: ", getApp().globalData.userInfo)
    wx.switchTab({
      url: '/pages/circle/index/index',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this

    wx.showLoading({
      title: '加载中',
    })

    wx.login({
      success(res) {
        if (res.code) {
          var code = res.code

          // 查看是否授权
          wx.getSetting({
            success(res) {
              if (res.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (res) {
                    // 发送请求，获取用户信息
                    wx.request({
                      url: server + 'api/user/load', // 请求URL
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      method: 'POST', // 请求方式
                      data: {
                        'avatarUrl': res.userInfo.avatarUrl,
                        'code': code,
                        'nickName': res.userInfo.nickName,
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
                        getApp().globalData.userInfo = res.data.data.userInfo // 写入全局变量
                        getApp().setCache('token', res.data.data.token) // 写入缓存
                        that.next() // 跳转到首页
                      }
                    });
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

    setTimeout(function () {
      wx.hideLoading()
    }, 1000)
    
  },
  bindGetUserInfo(e) {
    var that =  this
    if (e.detail.userInfo == undefined) {

    } else {
      console.log(e.detail.userInfo)
      wx.login({
        success: function (res) {
          // 发送请求，获取用户信息
          wx.request({
            url: server + 'api/user/load', // 请求URL
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST', // 请求方式
            data: {
              'avatarUrl': e.detail.userInfo.avatarUrl,
              'code': res.code,
              'nickName': e.detail.userInfo.nickName,
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
              getApp().globalData.userInfo = res.data.data.userInfo; // 写入全局变量
              getApp().setCache('token', res.data.data.token); // 写入缓存
              that.next(); // 跳转到首页
            }


          });
        }
      });
    }
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