// pages/place/place.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_id: '',
    total_amount:'',
    quantity:'',
    tel:'',
    real_name:'',
    address:'',
    list:[],
    num: 1,
    minusStatus: 'disabled',
    zongjia: 0,
    delivery_costs:0,
    listl: [],
    _num: 0, 
    idd:'',
    xinxi:{},
    open: true,
    show: true
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    if (num > 1) {
      num--;
    }
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus,
      zongjia: Number(num * this.data.list.price) + Number(this.data.list.delivery_costs)
    });
  }, 
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    num++;
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    this.setData({
      num: num,
      minusStatus: minusStatus,
      zongjia: Number(num * this.data.list.price) + Number(this.data.list.delivery_costs)
    });
  }, 
  /* 输入框事件 */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },  
  //  计算总价
  onLoad: function (options) {
    console.log(options)
    this.setData({
      product_id: options.Projectid,
      total_amount: options.market_price,
    })
    var that=this
    wx.request({
      url: 'https://yg.xiaoniren.cn/restapi/product/view',
      data: {
        id:options.Projectid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var zong = Number(res.data.data.price) + Number(res.data.data.delivery_costs)
        that.setData({
          listl: res.data.data.parameter,
          idd: res.data.data.parameter.length==0?'':res.data.data.parameter[0].id,       
          list: res.data.data,
          zongjia: zong.toFixed(2),
          kuaidi: res.data.data.delivery_costs,
        })
        console.log(res)
      }
    })
  },
  // 地址
  addressTap:function(){
    this.setData({
      open: !this.data.open
    })
    var that=this
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        that.setData({
          xinxi: {
            userName: res.userName,
            postalCode: res.postalCode,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo,
            nationalCode: res.nationalCode,
            telNumber: res.telNumber
          },
          real_name: res.userName,
          tel: res.telNumber,
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo,

        })
        console.log(res)        
      }
    })
  },
  delivery: function () {
    var that = this
    wx.chooseAddress({
      success: function (res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        that.setData({
          xinxi: {
            userName: res.userName,
            postalCode: res.postalCode,
            provinceName: res.provinceName,
            cityName: res.cityName,
            countyName: res.countyName,
            detailInfo: res.detailInfo,
            nationalCode: res.nationalCode,
            telNumber: res.telNumber
          },
          real_name: res.userName,
          tel: res.telNumber,
          address: res.provinceName + res.cityName + res.countyName + res.detailInfo,

        })
        console.log(res)
      }
    })
  },
  // 选择分类
  clickNum: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      _num: e.target.dataset.num,
      idd:e.target.dataset.id
    })
  }, 
  // 下单
  xiadan:function(e){
    var that=this;
    if(that.data.xinxi.userName==undefined){
      wx.showToast({
        title: '选择地址',
        icon: 'success',
        duration: 2000,
        mask: true,
      })
      return false
    }
    wx.request({
      url: 'https://yg.xiaoniren.cn/restapi/order/create',
      data: {
         openid: wx.getStorageSync('user').openid,
         product_id: that.data.product_id,
         total_amount: that.data.zongjia,
         quantity: that.data.num,
         tel: that.data.tel,
         real_name: that.data.real_name,
         address: that.data.address,
         parameter_id:that.data.idd
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log(res)
        var nonceStr = res.data.data.nonceStr
        var timeStamp = res.data.data.timeStamp
        var pkg = res.data.data.package
        var paySign = res.data.data.paySign
        wx.requestPayment({
          timeStamp: timeStamp,
          nonceStr: nonceStr,
          package: pkg,
          signType: 'MD5',
          paySign: paySign,
          success: function () {
            wx.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 2000,
              mask: true,
            })
            wx.switchTab({
              url: '../member/member',
            })
          },
          fail: function () {
            wx.showToast({
              title: '购买失败',
              icon: 'success',
              duration: 2000,
              mask: true,
            })
          }
        })
        console.log(res.data)
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