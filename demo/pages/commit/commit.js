// pages/commit/commit.js
Page({

  /**
   * Page initial data
   */
  data: {
    datail:"",
  },

  send: function(e){
    var that = this
    wx.showLoading({
      title: '发送中',
    })
    console.log(that.data.detail)

    // 与服务器交互

    setTimeout(function(){
      wx.hideLoading()
    }, 2000)
  },

  // 获取wxml输入信息
  bindTextAreaBlur:function(e){
    this.data.detail=e.detail.value
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