const util = require('../../utils/util.js');
Page({
  data: {
    question:'',
    sex : '',
    aid : '',
    contacts: [],
    isLoading : true,
    name : ''
  },
  onLoad: function (options) {
    this.setData({
      aid : options.aid,
      name : wx.getStorageSync('name')
    })
    this.getAnswerUsers();
  },

  getAnswerUsers :function() {
    var that = this
    wx.request({
      url: util.url+'getAnswerUsers',
      data : {
        id : this.data.aid
      },
      success : function(res) {
        
        that.setData({
          contacts : [res.data.u1,res.data.u2,res.data.u3,res.data.u4],
          isLoading : false,
          question : res.data.question,
          sex : res.data.consex,
          aid : res.data.id
        })
      }
    })
  }

})
