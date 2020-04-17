// pages/person/person.js
Page({

  /**
   * Page initial data
   */
  data: {
    menuitems: [
      { text: '个人资料', url: '#', icon: '/images/like.png', tips: '', arrows: '/images/likeplus.png' },
      { text: '邀请好友', url: '#', icon: '/images/like.png', tips: '', arrows: '/images/likeplus.png' },
      { text: '积分兑换', url: '#', icon: '/images/like.png', tips: '', arrows: '/images/likeplus.png' },
      { text: '帮助说明', url: '#', icon: '/images/like.png', tips: '', arrows: '/images/likeplus.png' }
    ]
  },

  toLogin:function(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      avatarUrl: getApp().globalData.userInfo.avatarUrl
    })

   

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