const util = require('../../utils/util.js');
Page({
  data: {
    isLoading : true,
    answer : [],
    viewed : 0,
  },
  toMesDetail : function (e) {
    var question = e.currentTarget.dataset.ques
    var sex = e.currentTarget.dataset.sex
    var id = e.currentTarget.dataset.id
    wx.request({
      url: util.url +'viewAnswer',
      data : {
        'id' : id
      },
      success : function(res) {
        console.log(res.data)
      }
    })
    wx.navigateTo({
      url : '/pages/reciveMessage/reciveMessage?sex='+sex+'&question='+question
    })
  },
  onLoad: function () {
    this.getMes();
  },
  toPlay : function (e) {
    wx.navigateTo({
      url : '/pages/play/play'
    })
  },
  getMes : function (e) {
    var that = this
    wx.request({
      url: util.url +'getMessage',
      data : {
        'uid':wx.getStorageSync('uid')
      },
      success : function(res) {
        wx.setStorageSync('answers', res.data);
        console.log(res)
        that.setData({
          isLoading : false,
          answer : res.data.data,
          viewed : res.data.viewed
        })
      }
    })
  }
})
