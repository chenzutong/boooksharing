// pages/person/mybook/mybook.js
var server = getApp().globalData.server
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mybooks:[]

  },
  // 添加书籍
  addbook:function(){
    wx.navigateTo({
      url: '/pages/book/addbook/addbook'
    })
  },

  showdetail: function (e) {
    console.log(e.currentTarget.dataset.text)
    getApp().globalData.bookDetail = e.currentTarget.dataset.text
    wx.navigateTo({
      url: '/pages/book/detail/detail'
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
        that.data.mybooks = res.data.data
        console.log(that.data.mybooks)
        that.setData({
          mybooks:that.data.mybooks
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