// pages/logistics//logistics.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    kuaidi:{},
    kuaidiid:'',
    status:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      kuaidiid: options.Projectid_id,
      status: options.status
    })
    var that=this
    wx.request({
      url: 'https://yg.xiaoniren.cn/restapi/kdniao/api',
      data: {
        order_id: options.Projectid_id,
        //status: options.status
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var aa=JSON.parse(res.data.data)
        console.log(aa)
        var express = aa.express
        var LogisticCode = aa.LogisticCode
        var Traces = aa.Traces
        that.setData({
          kuaidi: {
            express: aa.express,
            LogisticCode: aa.LogisticCode,
            Traces: aa.Traces

          }
        })
        console.log(status)
      }
    })
  },
  queren:function(){
    var that=this
    wx.request({
      url: 'https://yg.xiaoniren.cn/restapi/kdniao/upd',
      data: {
        order_id: this.data.kuaidiid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        wx.showToast({
          title: '收货成功',
          icon: 'success',
          duration: 2000,
          mask: true,
        })
        wx.switchTab({
          url: '../member/member',
        })
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
  
  }
})