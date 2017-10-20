//index.js
//获取应用实例
const util = require('../../utils/util.js');
const ages = []
for (let i = 0; i <= 109; i++) {
  ages.push(i);
};
var app = getApp()
Page({
  data: {

    userInfo: {

    },
    btnDis : true,
    btnDis1 : true,
    message : '',
    showToast : false,
    step: 0,

    /** 用户信息 */
    age: 0,
    zhuanye : '',
    grade: '',
    name: '',
    userName: '',
    sex : '',
    openid : '',
    name_pinyin : '',

    ages: ages,
    value: [0, 10],
    
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  selectAge: function (e) {
    var age = e.detail.value
    this.setData({
      age: this.data.ages[age[0]]
    })

  },
  toGrade: function () {
    this.setData({
      step: 1
    })
  },
  toName: function (e) {
    this.setData({
      step: 2,
    })
  },
  getName : function(e) {
      this.setData({
        name: e.detail.value
      })
  },
  getZhuanye : function(e) {
    if (this.data.zhuanye.length > 0 && this.data.grade.length > 0) {
      this.setData({
        btnDis : false
      })
    }
    this.setData({
      zhuanye : e.detail.value
    })
  },
  getGrade : function (e) {
    if (this.data.zhuanye.length > 0 && this.data.grade.length > 0) {
      this.setData({
        btnDis: false
      })
    }

    this.setData({
      grade : e.detail.value
    })
  },
  getUserName : function(e) {
    this.setData({
      userName : e.detail.value
    })
  },
  toDesc : function() {
    this.setData({
      step : 5
    })
  },
  toSex: function () {
    console.log('toSex')
    this.setData({
      step: 3
    })
  },
  sexBeMan : function(e) {
    this.setData({
      sex : 1,
      step : 4
    })
  },
  sexBeMale : function(e) {
    this.setData({
      sex : 0, step: 4
    })
  },
  getName_pinyin : function(e) {
    this.setData({
      name_pinyin: e.detail.value,
    })
    if (e.detail.value.length > 0) {
      this.setData({
        btnDis1: false
      })
    }

  },
  toMain : function(e) {
    console.log(wx.getStorageSync('openid'));
    var data = {
      name : this.data.name,
      grade : this.data.grade,
      userName : this.data.userName,
      sex : this.data.sex,
      zhuanye : this.data.zhuanye,
      name_pinyin : this.data.name_pinyin,
      openid : wx.getStorageSync('openid'),
      age : this.data.age,
    }
    console.log(data);
    wx.request({
      url : util.url+'addUser',
      data : data,
      method : 'GET',
      success : res=>{
        if(res.data.code == 40001) {
          wx.setStorage({
            key: 'openid',
            data: res.data.openid,
            success : function () {
              wx.setStorageSync('uid', res.data.uid);
              wx.setStorageSync('grade', res.data.grade);
              wx.setStorageSync('sex', res.data.sex);
              wx.setStorageSync('name', res.data.name);
              wx.redirectTo({
                url: '/pages/main/main'
              })
            }
          })
         
        }
      },
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    this.setData({
      openid : wx.getStorageSync('openid')
    })
    //调用应用实例的方法获取全局数据    
    
  }
})
