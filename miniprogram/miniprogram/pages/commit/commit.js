// pages/commit/commit.js
Page({

  /**
   * Page initial data
   */
  data: {
    switchChecked: true,
    firco: "#000000",
    secco: "#979797",
    temp: true,
    addphotoPath: "/images/icon/addphoto.png",
    datail: "",
    items: [
      { name: 'free', value: '免费',  checked: 'true'},
      { name: 'bargaining', value: '议价'}
    ]
  },
  switchChange:function(e){
    console.log(`switch发生change事件，携带值为`, e.detail.value)
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  // 添加图片
  addphoto: function () {
    // 选择一张图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePath = res.tempFilePaths[0]
        this.addphotoPath = tempFilePath
        console.log(this.addphotoPath)

        this.setData({
          addphotoPath: tempFilePath
        })
        // that.uploadFile(tempFilePaths) 如果这里不是=>函数
        //则使用上面的that = this
        // this.uploadFile(tempFilePaths)
      },
    })
  },

  //上传操作
  uploadFile(filePath) {
    wx.cloud.uploadFile({
      cloudPath: (new Date()).valueOf() + '.png', // 文件名
      filePath: filePath, // 文件路径
      success: res => {
        // get resource ID
        console.log(res.fileID)
      },
      fail: err => {
        console.log("err: " + err)
        // handle error
      }
    })
  },

  // 点击寻书动态
  first_select: function () {
    this.setData({
      temp: true,
      firco: "#000000",
      secco: "#979797",
    })
    // wx.redirectTo({
    //   url: '../square/square'
    // })
  },

  // 点击出书动态
  second_select: function () {
    this.setData({
      temp: false,
      firco: "#979797",
      secco: "#000000",
    })
  },

  send: function (e) {
    console.log(this.addphotoPath)
    var that = this
    wx.showLoading({
      title: '发送中',
    })
    console.log(that.data.detail)

    // 与服务器交互

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

  // 获取wxml输入信息
  bindTextAreaBlur: function (e) {
    this.data.detail = e.detail.value
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