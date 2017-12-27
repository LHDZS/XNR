var app = getApp()
var page_index= 1;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    list:[],
    status:{},
    yeshu:1
  },
  onLoad: function (options) {
    var that = this;
    this.setData({
      status: options.status,
    })
    wx.request({
      url: 'https://yg.xiaoniren.cn/restapi/member/index',
      data: {
        openid: wx.getStorageSync('user').openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
        })
        console.log(res)
      }
    }),
    app.getUserInfo(function (userInfo) {
      //更新数据  
      that.setData({
        userInfo: userInfo
      })
    })
  },
  // 我的订单
  onShow:function(){
    var that = this;
    wx.request({
      url: 'https://yg.xiaoniren.cn/restapi/order/index',
      data: {
        openid: wx.getStorageSync('user').openid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        var a = res.data.data.page.totalCount, b = res.data.data.page.defaultPageSize
        console.log(a)
        var aa = parseInt(a/b)+(a%b==0?0:1)
        console.log(aa)
        var list=[]
        that.setData({
          list: res.data.data.data,
          yeshu: aa
        })
        console.log(res)
      }
    })
  },
  onHide:function(){
    page_index=1
  },
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  // 下拉
  onReachBottom: function () {
    var that = this;    
    page_index++;
    if (page_index <= this.data.yeshu){
      wx.request({
        url: 'https://yg.xiaoniren.cn/restapi/order/index?page=' + page_index,
        data: {
          openid: wx.getStorageSync('user').openid
         
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log(res)
          var list=that.data.list;
          console.log(list)
          for (var i = 0; i < res.data.data.data.length; i++){
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
  // 上拉
  // onPullDownRefresh: function () {
  //   var that = this;
  //     wx.request({
  //       url: 'https://yg.xiaoniren.cn/restapi/order/index',
  //       data: {
  //         openid: wx.getStorageSync('user').openid,
  //       },
  //       header: {
  //         "Content-Type": "application/x-www-form-urlencoded"
  //       },
  //       method: "POST",
  //       success: function (res) {
  //         console.log(res)
  //         var list =[];
  //         console.log(list)
  //         for (var i = 0; i < res.data.data.data.length; i++) {
  //           list.push(res.data.data.data[i]);
  //         }
  //         that.setData({
  //           list: list
  //         });
  //         console.log(list)
  //         wx.showToast({
  //           title: '刷新成功',
  //           icon: 'success',
  //           duration: 2000
  //         })
  //       }
     
  //     })
  // },
  xiaoniren:function(){
    wx.makePhoneCall({
      phoneNumber: '400-656-6135', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  }
}) 