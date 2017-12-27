// pages/minemp/minemp.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    EnterpriseInfo:[],
    time_remaining: 0,
    listlength:'',
    Dlistlength:'0',
    length:'',
    open: false,
    show: true,
    id:'',
    link_origin:app.globalData.link_origin,
    showArr:[],
    referrer: undefined
  },
  // 个人
  showitem: function (e) {
    var id = e.currentTarget.dataset.index,
      idx = e.currentTarget.dataset.idx,
      showArr = this.data.showArr
    console.log(idx)
    console.log(showArr)
    showArr[idx] = !this.data.showArr[idx]
      this.setData({
        open:true,
        showArr: showArr
      })    
  },
  // xiugai () {
  //   this.setData({
  //         isChecked: true
  //     }) 
  // },
  // 公司
  gsshow: function (e) {
    var id = e.currentTarget.dataset.index,
      idx = e.currentTarget.dataset.idx,
      showArr1 = this.data.showArr1
    console.log(idx)
    console.log(showArr1)
    showArr1[idx] = !this.data.showArr1[idx]
    this.setData({
      open: true,
      showArr1: showArr1
    })
  },
  tapName: function (e) {
    var that = this,
      id = e.currentTarget.dataset.id
    this.setData({
      open: !this.data.open
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    console.log(更新了)
      app.getUserInfo(function (userInfo) {
        //更新数据
        
        that.setData({
          userInfo: userInfo
        })
        wx.request({
          url: 'https://card.xiaoniren.cn/restapi/default/create',
          data: {
            openid: wx.getStorageSync('user').openid,
            nickname: that.data.userInfo.nickName,
            head_image: that.data.userInfo.avatarUrl,
            gender: that.data.userInfo.gender,
            country: that.data.userInfo.country,
          },
          header: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          method: "POST",
          success: function (res) {
            var time_remaining = res.data.data.time_remaining
            that.setData({
              time_remaining: time_remaining,
              referrer: res.data.data.referrer
            })
            console.log(that.data.time_remaining)
          }

        })
      }),
        wx.request({
          url: 'https://card.xiaoniren.cn/restapi/default/index',
          data: {
            openid: wx.getStorageSync('user').openid,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            var showArr=[],showArr1=[]
            
            var listlength = res.data.data.DeliveryInfo.length
            var Dlistlength = res.data.data.EnterpriseInfo.length
            var length = listlength + Dlistlength

            for (var i = 0; i < res.data.data.DeliveryInfo.length;i++){
              showArr.push(1)
            }
            for (var i = 0; i < res.data.data.EnterpriseInfo.length; i++) {
              showArr1.push(1)
            }

            that.setData({
              list: res.data.data.DeliveryInfo,
              listlength: listlength,
              EnterpriseInfo: res.data.data.EnterpriseInfo,
              Dlistlength: Dlistlength,
              length: length,
              showArr: showArr,
              showArr1:showArr1
            })
            app.globalData.length=length
            console.log(that.data.listlength)
            console.log(that.data.Dlistlength)
            console.log(that.data.length)
          }
        })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  make:function(){
    var that=this
    console.log(that.data.length)
    console.log(that.data.time_remaining)
    if (that.data.time_remaining > 0 && that.data.length < 3 ){
      wx.navigateTo({
        url: '../make/make',
      })
    } else if (that.data.time_remaining <= 0){
      wx.navigateTo({
        url: '../index/index',
      })
    } else if (that.data.length  == 3 ){
      wx.showToast({
        title: '限制作三张',
        icon: 'success',
        duration: 2000,
        mask: true,
      })
    }
  },
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this    
     wx.request({
       url: 'https://card.xiaoniren.cn/restapi/default/index',
       data: {
         openid: wx.getStorageSync('user').openid,
       },
       header: {
         'content-type': 'application/json' // 默认值
       },
       success: function (res) {
         var listlength = res.data.data.DeliveryInfo.length
         var Dlistlength = res.data.data.EnterpriseInfo.length
         var length = listlength + Dlistlength
         that.setData({
           list: res.data.data.DeliveryInfo,
           listlength: listlength,
           EnterpriseInfo: res.data.data.EnterpriseInfo,
           Dlistlength: Dlistlength,
           length: length
         })
         app.globalData.length = length
         console.log(that.data.listlength)
         console.log(that.data.Dlistlength)
         console.log(that.data.length)
       }
     })
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
  // 个人 delete
  delete:function(e){
    var that = this
    var id = e.currentTarget.dataset.index
    wx.showModal({
      title: '温馨提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.link_origin + '/restapi/delivery-info/delete?id=' + id,
            data: {
              // id: id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              var showArr = that.data.showArr
              showArr.forEach(function (value, index) {
                value = 0
              })
              that.setData({
                showArr: showArr
              })
              that.onLoad()
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
    
  },
  // 个人 编辑
  amend: function (e) {
    var that = this
    var id = e.currentTarget.dataset.index
    console.log(id)
    wx.navigateTo({
      url: '../make/make?id='+id,
    })
    
    // wx.request({
    //   url: that.data.link_origin + '/restapi/delivery-info/update?id=' + id,
    //   data: {
    //     // id: id
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: "POST",
    //   success: function (res) {
    //     that.setData({
        
    //     })
    //   }
    // })
  },
   // 分享
  sharelist: function (e) {
    var that = this
    var id = e.currentTarget.dataset.index
    wx.request({
      url: that.data.link_origin+'/restapi/default/view',
      data: {
        id:id,
        type: 'DeliveryInfo'
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        that.setData({
        })
        console.log(res)
      }
    })
  },
  // 企业 delete
  qdelete: function (e) {
    var that = this
    var id = e.currentTarget.dataset.index
    wx.showModal({
      title: '温馨提示',
      content: '确认删除',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: that.data.link_origin + '/restapi/enterprise-info/delete?id=' + id,
            data: {
              // id: id
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              var showArr1 = that.data.showArr1
              showArr1.forEach(function(value,index){
                value=0
              })
              that.setData({
                showArr1: showArr1
              })
              that.onLoad()
              console.log(res)
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  // 企业 编辑
  qamend: function (e) {
    var that = this
    var id = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../make/make?id=' + id,
    })
    // wx.request({
    //   url: that.data.link_origin + '/restapi/enterprise-info/update?id=' + id,
    //   data: {
    //     // id: id
    //   },
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function (res) {
    //     that.setData({

    //     })
    //   }
    // })
  },
  onShareAppMessage: function (res) {
    var that=this,id,Type
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
      console.log(res.target.dataset.id)
      id = res.target.dataset.id
      Type = res.target.dataset.type
    }
    
    return {
      title: '1111',
      path: '/pages/minempdetails/minempdetails?id=' + id + '&type='+Type + '&referrer=' + that.data.referrer,
      success: function (res) {
        // 转发成功
        console.log('/pages/minempdetails/minempdetails?id=' + id+ '&type='+ Type + '&referrer=' + that.data.referrer)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})