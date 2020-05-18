// pages/book/detail/detail.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  toEdit:function(){
    wx.navigateTo({
      url: '../edit/edit',
    })
  },

  // 收藏书籍
  collect:function(){
    wx.showLoading({
      title: '收藏中',
    })
    // 与服务器交互
    wx.request({
      url: server + 'api/book/collect_add',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data: {
        "user_id": getApp().globalData.userInfo.user_id,
        "book_id": getApp().globalData.bookDetail.id,
      },
      success: function (res) { // 请求成功后操作
        console.log(res.data)
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          return;
        }
      }
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
  },

  // 删除书籍
  deleteBook:function(){
    wx.showLoading({
      title: '删除中',
    })

    wx.request({
      url: server + 'api/book/delete',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST', // 请求方式
      data:{
        id:getApp().globalData.bookDetail.id
      },
      success: function (res) { // 请求成功后操作
        console.log(res.data)
        if (res.data.code != 200) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          });
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          return;
        }
        setTimeout(function () {
          wx.hideLoading()
        }, 2000)
        wx.switchTab({
          url: "/pages/book/index/index",
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log("getApp().globalData.bookDetail",getApp().globalData.bookDetail);
    
    
    this.setData({
      data:getApp().globalData.bookDetail,
      user_id:getApp().globalData.userInfo.user_id
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