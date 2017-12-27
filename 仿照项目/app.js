//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  //openid
  onLaunch: function () {
    var that = this
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log(res.code)
          //发起网络请求
          var d = that.globalData;
          wx.request({
            url: 'https://yg.xiaoniren.cn/restapi/member/openid',
            data: {
              code: res.code
            },
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
              console.log(res);
              var obj = {};
              obj.openid = res.data.data.openid;
              obj.expires_in = Date.now() + res.data.data.expires_in;
              wx.setStorageSync('user', obj);
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  },
  globalData: {
    openid: null,
    userInfo: null
  }
})
