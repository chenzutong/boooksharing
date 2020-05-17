// pages/book/index/index.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    firco: "#436EEE",
    secco: "#979797",
    temp: true,
    list1:[],
    list2:[],

  },
  showdetail: function (e) {
    console.log(e.currentTarget.dataset.text)
    getApp().globalData.bookDetail = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '../detail/detail'
    })
  },

  // 添加书籍
  addbook:function(){
    wx.navigateTo({
      url: '../addbook/addbook'
    })
  },

  first_select: function () {
    this.data.temp = true
    this.setData({
      temp: true,
      firco: "#436EEE",
      secco: "#979797",
    })
    var that = this
    wx.request({
      url: server + 'api/book/person_list',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data:{
        user_id:getApp().globalData.userInfo.user_id
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
        that.data.list1 = res.data.data
        console.log(that.data.list1)
        that.setData({
          list1:that.data.list1
        })
      }
    })
  },
  second_select: function () {
    this.data.temp = false
    this.setData({
      temp: false,
      firco: "#979797",
      secco: "#436EEE",
    })
    var that = this
    wx.request({
      url: server + 'api/book/all_list',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET', // 请求方式
      success: function (res) { // 请求成功后操作
        console.log(res.data)
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          return;
        }
        that.data.list2 = res.data.data
        console.log(that.data.list2)
        that.setData({
          list2:that.data.list2
        })
      }
    })
  },

  tologin:function(){
    wx.navigateTo({
      url: '/pages/person/login/login'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      donelogin:getApp().globalData.userInfo.userName
    })
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
    var that = this
    wx.request({
      url: server + 'api/book/person_list',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data:{
        user_id:getApp().globalData.userInfo.user_id
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
        that.data.list1 = res.data.data
        console.log(that.data.list1)
        that.setData({
          list1:that.data.list1
        })
      }
    })
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