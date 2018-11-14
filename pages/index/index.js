// pages/index/index.js

var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phoneNumber:null,
    phoneInfo:null,
    historyList:[],
    disabled:true
  },

  bindPhoneInput(event){
    this.setData({
      phoneNumber:event.detail.value,
      phoneInfo:null
    })
    this.setDisabled();
  },

  setDisabled(){
    this.setData({
      disabled:(this.data.phoneNumber && this.data.phoneNumber.toString().length===11)?false : true
    })
  },

  queryPhoneInfo(){
    app.getPhoneInfo(this.data.phoneNumber, data => this.setData({
      phoneInfo:data
    }));
  },

  addQueryHistory(phoneNumber){
    var historyList = wx.getStorageSync('historyList') || [];

    if(historylist.indexOf(phoneNumber) === -1){
      historylist.unshift(phoneNumber);
      wx.setStorageSync('historyList', historyList);
    }

    this.setData({
      historyList: historyList
    });
  },

  onLoad:function(){
    this.setData({
      historyList:wx.getStorageSync('historyList') || []
    })
  },

  selectHistory(event) {
    this.setData({
      phoneNumber:event.currentTarget.dataset.number,
      disabled:false
    })
  }

})