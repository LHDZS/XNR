// pages/commodity/commodity.js
var page_index = 1;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    yeshu: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    page_index = 1;
    var that=this
    wx.request({
      url: 'https://yg.xiaoniren.cn/restapi/product/index',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success:function(res){
        var a = res.data.data.page.totalCount, b = res.data.data.page.defaultPageSize
        console.log(a)
        var aa = parseInt(a / b) + (a % b == 0 ? 0 : 1)
        console.log(aa)
        that.setData({
          list: res.data.data.data,
          yeshu: aa
        })
        console.log(res)
      }
    })
  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this
    page_index++;
    if (page_index <= this.data.yeshu) {
    wx.request({
      url: 'https://yg.xiaoniren.cn/restapi/product/index?page=' + page_index,
      data: {

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        var list = that.data.list;
        console.log(list)
        for (var i = 0; i < res.data.data.data.length; i++) {
          list.push(res.data.data.data[i]);
        }
        that.setData({
          list: list
        });
        console.log(list)
      }
    })
    }
  },


})