// pages/circle/commit/commit.js
var server = getApp().globalData.server

Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#000000",
    secco: "#979797",
    temp: true,
    addphotoPath: "/images/icon/addphoto.png",
    bookname: "",
    content: "",
    photo:"",
    type:"free",
    addbook:true,
    items: [{
        name: 'free',
        value: '免费',
        checked: 'true'
      },
      {
        name: 'bargaining',
        value: '议价'
      }
    ]
  },
  // 获取wxml输入信息
  bindBookname: function (e) {
    this.data.bookname = e.detail.value
  },
  bindContent: function (e) {
    this.data.content = e.detail.value
  },
  switchChange: function (e) {
    this.data.addbook = e.detail.value
  },
  typeChange: function (e) {
    this.data.type = e.detail.value
  },
  // 点击寻书动态
  first_select: function () {
    this.data.temp = true
    this.setData({
      temp: true,
      firco: "#000000",
      secco: "#979797",
    })
  },
  // 点击出书动态
  second_select: function () {
    this.data.temp = false
    this.setData({
      temp: false,
      firco: "#979797",
      secco: "#000000",
    })
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
        this.data.addphotoPath = tempFilePath
        console.log(this.data.addphotoPath)


        this.setData({
          addphotoPath: tempFilePath
        })
      },
    })
  },

  //上传操作
  uploadFile(filePath) {

    return new Promise(function(resolvs, reject) {
      var photoname = (new Date()).valueOf() + '.png'
      wx.cloud.uploadFile({
        cloudPath: photoname, // 文件名
        filePath: filePath, // 文件路径
        success: res => {
          // get resource ID
          console.log("res.fileID:"+res.fileID)
          resolvs("https://626f-booksharing-riolf-1301887879.tcb.qcloud.la/" + photoname)
        },
        fail: err => {
          console.log("err: " + err)
          // handle error
        }
      })
    })
    
  },

  async sendAsync(){

    let that = this

    wx.showLoading({
      title: '发送中',
    })

    // 获取图片url
    if(that.data.addphotoPath != "/images/icon/addphoto.png"){
      that.data.photo = await that.uploadFile(that.data.addphotoPath);
      console.log("this.data.photo:" + that.data.photo)
    }

    // 与服务器交互

    if (that.data.temp) {
      //发起网络请求
      wx.request({
        url: server + 'api/circle/commit_seek',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST', // 请求方式
        data: {
          "user_id": getApp().globalData.userInfo.user_id,
          "openid": getApp().globalData.userInfo.openid,
          "username": getApp().globalData.userInfo.userName,
          "avatarUrl": getApp().globalData.userInfo.avatarUrl,
          "classroom": getApp().globalData.userInfo.classroom,
          "bookname": that.data.bookname,
          "content": that.data.content,
          "photo": that.data.photo,
        },
        success: function (res) { // 请求成功后操作
          console.log(res.data)
          if (res.data.code = 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            });
            return;
          }
          wx.reLaunch({
            url: '/pages/circle/index/index'
          })
        }
      })
    } else {
      //发起网络请求
      wx.request({
        url: server + 'api/circle/commit_lend',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST', // 请求方式
        data: {
          "user_id": getApp().globalData.userInfo.user_id,
          "openid": getApp().globalData.userInfo.openid,
          "username": getApp().globalData.userInfo.userName,
          "avatarUrl": getApp().globalData.userInfo.avatarUrl,
          "classroom": getApp().globalData.userInfo.classroom,
          "bookname": that.data.bookname,
          "type": that.data.type,
          "content": that.data.content,
          "photo": that.data.photo,
          "addbook": that.data.addbook,
        },
        success: function (res) { // 请求成功后操作
          console.log(res.data)
          if (res.data.code = 0) {
            wx.showToast({
              title: res.data.msg,
              icon: 'none'
            });
            return;
          }
          wx.reLaunch({
            url: '/pages/circle/index/index'
          })
        }
      })
    }

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

  send: function (e) {
    let that = this
    that.sendAsync()
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(getApp().globalData.userInfo)


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