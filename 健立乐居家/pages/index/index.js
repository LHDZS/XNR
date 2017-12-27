// //index.js
// 引入图片转码工具
var base64 = require("../images/base64");
// 定义宽度
var sliderWidth = 96;

Page({
  // 地图API
  openMap: function () {
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度  
      success: function (res) {
        var latitude = 40.203870
        var longitude = 116.212140
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
          name: "健丽乐居家健康生活馆",
          address: "北京市昌平区马池口镇百泉花园624号",
          scale: 28
        })
      }
    })
  },
  // 拨号API
  calling: function () {
    wx.makePhoneCall({
      phoneNumber: '13521991978', //此号码并非真实电话号码，仅用于测试
      success: function () {
        console.log("拨打电话成功！")
      },
      fail: function () {
        console.log("拨打电话失败！")
      }
    })
  },
  // data中用来定义数据
  data: {
    tabs: ["厨房杀菌消毒器", "FITSLEEP睡佳","蓝光大屏血压计"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // 图片 杀毒器
    imglist: ['https://www.xiaoniren.cn/statics/lejujia/image/xdq11.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/xdq1.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/xdq2.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/xdq3.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/xdq4.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/xdq5.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/xdq6.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/xdq7.jpg','https://www.xiaoniren.cn/statics/lejujia/image/xdq8.png'],
    // 图片 睡佳
    imgslist: ['https://www.xiaoniren.cn/statics/lejujia/image/t1.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/2.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/t2.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/4.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/5.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/6.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/7.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/8.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/9.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/10.jpg',  'https://www.xiaoniren.cn/statics/lejujia/image/t3.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/t6.jpg','https://www.xiaoniren.cn/statics/lejujia/image/t4.jpg', 'https://www.xiaoniren.cn/statics/lejujia/image/t5.jpg']
  },
  imgxlist: ['https://www.xiaoniren.cn/statics/lejujia/image/1337293003872614865.jpg'],
  // 样式图标
  onLoad: function () {
    this.setData({
      icon: base64.icon20
    });
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },
  // tap栏切换
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    });
  },
  // 分享API
  onShareAppMessage: function () {
    return {
      title: '健丽乐居家健康生活馆',
      desc: '健丽乐居家健康生活馆!',
      path: '/pages/index/index'
    }
  },
  // 图片预览API
  previewImage: function (e) {
      var current = e.target.dataset.src;
      wx.previewImage({
        current: current, // 当前显示图片的http链接 
        urls: this.data.imglist // 需要预览的图片http链接列表 
      })
  },
  previewImages: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接 
      urls: this.data.imgslist // 需要预览的图片http链接列表 
    })
  },
  previewImagex: function (e) {
    var current = e.target.dataset.src;
    wx.previewImage({
      current: current, // 当前显示图片的http链接 
      urls: this.data.imgxlist // 需要预览的图片http链接列表 
    })
  }
});
