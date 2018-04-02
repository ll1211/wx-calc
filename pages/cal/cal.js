// pages/cal/cal.js
var rpn = require('../../utils/rpn.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: 0,
    logs: [],
    redo: false
  },

  touchBtn: function (event) {
    if (this.data.redo) {
      this.setData({ text: 0, redo: false });
    }
    var val = '', num = this.data.text + '', putVal = event.target.dataset.num;
    if (putVal == 'back') {
      num = (num.length == 1) ? 0 : num.substring(0, num.length - 1);
      this.setData({ text: num });
      return;
    } else if (putVal == 'clear') {
      this.setData({ text: 0 });
      return;
    } else if (putVal == 'minus') {
      if (/^[1-9]/.exec(num.charAt(0))) {
        this.setData({ text: '-' + num });
        return;
      }
      if (num.charAt(0) == '-') {
        this.setData({ text: num.substring(1) });
        return;
      }
    } else if (/[×÷+-\.]/.exec(putVal)) {
      if (/[×÷+-\.]$/.exec(num)) {
        this.setData({ text: num.replace(/[×÷+-\.]$/, putVal) });
      } else {
        this.setData({ text: num + putVal });
      }
      return;
    } else if (putVal == 'eq') {
      var log = num + '=';
      num = num.replace(/×/g, '*');
      num = num.replace(/÷/g, '/');
      var result = rpn.calCommonExp(num);
      this.setData({ text: result, redo: true });
      this.data.logs.push(log + result);
      wx.setStorageSync('calLogs', this.data.logs);
      return;
    }
    if (num != 0) {
      val = num;
    }
    this.setData({ text: val + event.target.dataset.num });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  /**
  * 跳转到操作历史页面
  */
  toHistory: function () {
    wx.navigateTo({
      url: '../history/history'
    });
  }
})