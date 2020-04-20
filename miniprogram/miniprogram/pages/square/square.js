// pages/square/square.js
Page({

  /**
   * Page initial data
   */
  data: {
    firco: "#000000",
    secco: "#979797",
    list: [{
      face_url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=447979932,3108003765&fm=26&gp=0.jpg",
      username: "哆啦B梦",
      send_timestamp: "2019-7-6 14:42",
      centent: "阅读，是一次心灵的艺术之旅。前辈们留下了大量优秀的作品，通过这些传世之作给我们以启迪，教会我们如何感受世界。那些震撼心灵的好书往往意义深远，让人相逢恨晚。",
      total_likes: 2,
    },
    {
      face_url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=447979932,3108003765&fm=26&gp=0.jpg",
      username: "哆啦C梦",
      send_timestamp: "2019-8-6 15:14",
      centent: "阅读，是一次心灵的艺术之旅。",
      total_likes: 6,
    },
    {
      face_url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=447979932,3108003765&fm=26&gp=0.jpg",
      username: "天线宝宝",
      send_timestamp: "2019-8-8 14:42",
      centent: "阅读，是一次心灵的艺术之旅。前辈们留下了大量优秀的作品，通过这些传世之作给我们以启迪，教会我们如何感受世界。那些震撼心灵的好书往往意义深远，让人相逢恨晚。",
      total_likes: 9,
    },
    {
      face_url: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=447979932,3108003765&fm=26&gp=0.jpg",
      username: "皮卡丘",
      send_timestamp: "2019-1d-6 14:42",
      centent: "阅读，是一次心灵的艺术之旅。前辈们留下了大量优秀的作品，通过这些传世之作给我们以启迪，教会我们如何感受世界。那些震撼心灵的好书往往意义深远，让人相逢恨晚。",
      total_likes: 11,
    }
    ]
  },

  first_select: function () {
    // wx.redirectTo({
    //   url: '../square/square'
    // })
  },

  second_select: function () {
    wx.navigateTo({
      url: '../commit/commit'
    })
  },

  third_select: function () {
    wx.redirectTo({
      url: '/pages/mine/mine'
    })
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