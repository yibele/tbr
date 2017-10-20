// pages/me/me.js
const util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo : '',
    name : '',
    viewed : '',
    answerNum :'',
    rateMe : {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    this.setData({
      viewed : wx.getStorageSync('viewed')
    })
    wx.getUserInfo({
      success: res => {
        // 可以将 res 发送给后台解码出 unionId
        that.setData({
          userInfo: res.userInfo
        })
      }
    })
    this.setData({
      answerNum : wx.getStorageSync('answerNum'),
      name : wx.getStorageSync('name')
    })

    this.getMeRate();
  },

  toPlay: function (e) {
    wx.navigateTo({
      url: '/pages/play/play'
    })
  },

  toMain: function (e) {
    wx.redirectTo({
      url: '/pages/main/main'
    })
  },

  getMeRate : function () {
    var that = this
    wx.request({
      url: util.url +'rate',
      data : {
        id : wx.getStorageSync('uid')
      },
      success : res=>{
        console.log(res.data)
        that.setData({
          rateMe : res.data
        })
      }
    })
  },

  getMesNum : function() {

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