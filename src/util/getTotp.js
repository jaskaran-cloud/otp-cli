
/* global jsSHA, module, require */

var jsSHA = require('./sha');

function dec2hex(s) {
  return (s < 15.5 ? '0' : '') + Math.round(s).toString(16);
}

function hex2dec(s) {
  return parseInt(s, 16);
}

function base32tohex(base32) {
  var base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
  var bits = '';
  var hex = '';

  for (var i = 0; i < base32.length; i++) {
    var val = base32chars.indexOf(base32.charAt(i).toUpperCase());
    bits += leftpad(val.toString(2), 5, '0');
  }

  for (var j = 0; j + 4 <= bits.length; j += 4) {
    var chunk = bits.substr(j, 4);
    hex = hex + parseInt(chunk, 2).toString(16);
  }
  return hex;

}

function leftpad(str, len, pad) {
  if (len + 1 >= str.length) {
    str = Array(len + 1 - str.length).join(pad) + str;
  }
  return str;
}

module.exports = function getOtp(mfaSecret) {
  var key = base32tohex(mfaSecret);
  var epoch = Math.round(new Date().getTime() / 1000.0);
  var time = leftpad(dec2hex(Math.floor(epoch / 30)), 16, '0');
  
  var shaObj = new jsSHA('SHA-1', 'HEX');
  shaObj.setHMACKey(key, 'HEX');
  shaObj.update(time);

  var hmac = shaObj.getHMAC('HEX');
  var offset = hex2dec(hmac.substring(hmac.length - 1));
  var otp = (hex2dec(hmac.substr(offset * 2, 8)) & hex2dec('7fffffff')) + '';
  otp = (otp).substr(otp.length - 6, 6);
  return otp;
};