// pages/init/init.js
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoading: true,
    openid :'',
    uid : ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.login({
      success: res => {
        console.log('正在获取用户信息')
        if (res.code) {
          wx.request({
            url: util.url+'onLogin',
            data: {
              code: res.code
            },
            success: function (res) {
              wx.setStorageSync('openid', res.data.openid);
              that.getUserState(res.data.openid)
            },
            fail: function (res) {
              console.log('get openid fail')
            }
          })
        } else {
          console.log('获取用户信息失败' + res.errMsg);
        }
      },
      fail: res => {
        console.log(res);
        console.log('登录失败');
      }
    })
  },

  /**
   * 获取微信号是否在数据库中注册
   */
  getUserState: function (openid) {
    var that = this
    wx.request({
      url: util.url+'getUserState',
      data : {
        'openid' : openid
      },
      success : function (res) {
        if(res.data.code) {
          that.setData({
            isLoading : false,
          })
          console.log(res.data)
          wx.setStorageSync('sex', res.data.sex)
          wx.setStorageSync('grade', res.data.grade)
          wx.setStorageSync('name',res.data.name);
          wx.setStorage({
            key: 'uid',
            data: res.data.uid,
            success : function () {
              wx.redirectTo({
                url: '/pages/main/main',
              })
            }
          })         
        } else {
          wx.navigateTo({
            url: '/pages/index/index',
          })
        }
      },
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