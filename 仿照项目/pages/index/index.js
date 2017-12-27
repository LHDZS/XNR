//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    list:[],
    motto: 'Hello World',
    userInfo: {},
    listname:[],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //console.log('onLoad')
    var that = this
    wx.request({
      url: 'https://yg.xiaoniren.cn/restapi/product/index',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data.data.data)
        that.setData({
          list: res.data.data.data
        })
        // console.log(res)
        
      }
    }),
   





    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
      wx.request({
        url: 'https://yg.xiaoniren.cn/restapi/member/create',
        data: {
          openid: wx.getStorageSync('user').openid,
          nickname: that.data.userInfo.nickName,
          head_image: that.data.userInfo.avatarUrl
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          that.setData({
            listname: res.data.data,
          })
          // console.log(res)
        }

      })
    })
  },
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '010-52401617', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  xiaoniren: function () {
    wx.makePhoneCall({
      phoneNumber: '400-656-6135', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return{
      title: '野谷生态科技园',
      desc: '野谷生态科技园!',
      path: '/pages/index/index'
    }
  }
})
