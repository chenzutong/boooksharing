// pages/test/test.js
Page({

  /**
   * Page initial data
   */
  data: {
    data: {
      items: [
        { name: 'USA', value: '美国' },
        { name: 'CHN', value: '中国', checked: 'true' },
        { name: 'BRA', value: '巴西' },
        { name: 'JPN', value: '日本' },
        { name: 'ENG', value: '英国' },
        { name: 'TUR', value: '法国' },
      ]
    },
    checkboxChange: function (e) {
      console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    }
  },
  upload() {
    // let that = this;
    // 选择一张图片
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths[0]
        console.log(tempFilePaths)
        // that.uploadFile(tempFilePaths) 如果这里不是=>函数
        //则使用上面的that = this
        this.uploadFile(tempFilePaths)
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
        console.log("res: " + res)
        console.log(res.fileID)
      },
      fail: err => {
        console.log("err: " + err)
        // handle error
      }
    })
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    wx.cloud.downloadFile({
      fileID: 'cloud://booksharing-riolf.626f-booksharing-riolf-1301887879/1587365100239.png', // 文件 ID
      success: res => {
        // 返回临时文件路径
        console.log(res.tempFilePath)
        this.setData({
          ims: res.tempFilePath
        })
      },
      fail: console.error
    })

    wx.cloud.getTempFileURL({
      fileList: ['cloud://booksharing-riolf.626f-booksharing-riolf-1301887879/1587365100239.png'],
      success: res => {
        // get temp file URL
        console.log("********")
        console.log(res.fileList[0].tempFileURL)
      },
      fail: err => {
        // handle error
      }
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