const util = require('../../utils/util.js');
Page({
  data: {
    questions: [],
    question: '',
    isLoading: true,
    index: 1,
    contacts: [],
    active: 'active'

  },
  refreshContact: function (e) {
    this.getQuestionUsers();
  },

  selectContacts: function (e) {

    var that = this
    this.setData({
      isLoading: true
    })
    var uid = wx.getStorageSync('uid');
    var qid = e.currentTarget.dataset.qid;
    var conid = e.currentTarget.dataset.uid;
    wx.request({
      url: util.url + 'addToStudentQuestion',
      data: {
        'uid': uid,
        'qid': qid
      },
      success: function (res) {
        console.log(res.data.code + 'addToStudentQuestion')
      }
    })
    wx.request({
      url: util.url + 'addToAnswer',
      data: {
        'uid': uid,
        'qid': qid,
        'conid': conid,
        'sex': wx.getStorageSync('sex'),
        'question': e.currentTarget.dataset.ques,
        'u1': this.data.contacts[0].name,
        'u2': this.data.contacts[1].name,
        'u3': this.data.contacts[2].name,
        'u4': this.data.contacts[3].name
      },
      success: function (res) {
        console.log(res)
        if (res.data.code) {
          that.eskipQuestion()
          that.refreshContact()
        }

      }
    })
    console.log(e)
  },
  eskipQuestion: function (e) {
    this.getQuestionUsers();
    var index = this.data.index;
    var questions = this.data.questions;
    this.setData({
      index: index + 1,
      question: questions[index]
    })
  },

  getQuestionUsers: function () {
    var that = this;
    wx.request({
      url: util.url + 'getQuestionUsers',
      data: {
        uid: wx.getStorageSync('uid'),
        grade: wx.getStorageSync('grade')
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          contacts: res.data,
          isLoading: false,
        })
      }
    })
  },
  toMain: function () {
    wx.redirectTo({
      url: '/pages/main/main',
    })
  },
  onLoad: function () {
    var index = this.data.index;
    var that = this;
    this.setData({
      isLoading: true
    })
    wx.request({
      url: util.url + 'getQuestions',
      data: {
        'uid': wx.getStorageSync('uid')
      },
      success: function (res) {
        console.log('获取问题成功');
        console.log(res.data)
        that.setData({
          questions: res.data,

          question: res.data[index - 1]
        })
        that.getQuestionUsers();
      }
    })



  }
})
