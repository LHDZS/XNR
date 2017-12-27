// pages/product/product.js
var app = getApp();
var WxParse = require('../../wxParse/wxParse.js');
var _id;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    listl:[],
    Projectid:'',
    static_link: app.globalData.link_origin,
    content: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options)
    var that=this
    wx.request({
      url: 'https://yg.xiaoniren.cn/restapi/product/view',
      data:{
        id: options.Projectid,
      },
      header:{
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        that.setData({
          list:res.data.data,
          listl:res.data.data.parameter,
          Projectid: options.Projectid
        })
        var article1 = res.data.data.description;
        WxParse.wxParse('article1', 'html', article1, that, 5);
        console.log(res)
      }
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
  
  },
    calling: function () {
    wx.makePhoneCall({
      phoneNumber: '400-060-8018', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }
})