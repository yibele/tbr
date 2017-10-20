const util = require('../../utils/util.js');
Page({
  data: {
    isLoading : true,
    answer : [],
    viewed : 0,
    scrollTop:0,
    scrollHeight:0,
    hidden : true,
    messageNum : 0
  },
  onPullDownRefresh : function(e) {
    console.log('refresh');
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
      url : '/pages/reciveMessage/reciveMessage?sex='+sex+'&question='+question+'&aid='+id
    })
  },
  onLoad: function () {
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          scrollHeight : res.windowHeight
        })
      },
    })
    this.getMes();
  },
  toPlay : function (e) {
    wx.redirectTo({
      url : '/pages/play/play'
    })
  },

  getMes : function (e) {
    console.log('refresh')
    var that = this
    wx.request({
      url: util.url +'getMessage',
      data : {
        'uid':wx.getStorageSync('uid')
      },
      success : function(res) {
        
        that.setData({
          isLoading : false,
          answer : res.data.data,
          viewed : res.data.viewed,
          hidden : true,
        })
        wx.setStorageSync('viewed',res.data.viewed);
        wx.setStorageSync('answerNum',res.data.data.length)
        if(res.data) {
          that.setData({
            messageNum : 1
          })
        }
      }
    })
  },
  scroll : function(e) {
    this.setData({
      scrollTop: event.detail.scrollTop
    });  
  },
  refresh : function() {
    var that = this
    this.setData({
      hidden : false
    })
    setTimeout(function () { that.getMes()},2000)
  },
  toMe : function(e) {
    wx.redirectTo({
      url: '/pages/me/me',
    })
  }
})
