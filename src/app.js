import "@babel/polyfill";
import "amfe-flexible"
import "./assets/style/base.scss";
import "./assets/style/common.scss";
import "./assets/style/index.scss";
import "./assets/font/iconfont.css";
import "./assets/style/normalize.css";

import "./index.ts"
import QRCode from 'qrcodejs2'

// 回到顶部
$(function () {
  $('#btn_top').click(function () {
    $('html,body').animate({
      scrollTop: 0
    }, 500);
  });
})


let qrcodeUrl = 'http://98rev.com/a7yjatp';


let ios = new QRCode("qrcode-ios", {
  text: qrcodeUrl,
  width: 140,
  height: 140,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});


let android = new QRCode("qrcode-android", {
  text: qrcodeUrl,
  width: 140,
  height: 140,
  colorDark: "#000000",
  colorLight: "#ffffff",
  correctLevel: QRCode.CorrectLevel.H
});