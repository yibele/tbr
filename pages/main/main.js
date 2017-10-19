
Page({
  data: {
  },
  toMesDetail : function () {
    wx.navigateTo({
      url : '/pages/reciveMessage/reciveMessage'
    })
  },
  onLoad: function () {
    this.setData({
    })
  },
  toPlay : function (e) {
    wx.navigateTo({
      url : '/pages/play/play'
    })
  }
})
