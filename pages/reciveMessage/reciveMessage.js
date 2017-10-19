
Page({
  data: {
    question:'',
    sex : ''
  },
  onLoad: function (options) {
    this.setData({
      question : options.question,
      sex : options.sex
    })
  }
})
