const Identicon = require("identicon.js");

const identicon = email => {
  function ascii_to_hexa(str) {
    var arr1 = [];
    for (var n = 0, l = str.length; n < l; n++) {
      var hex = Number(str.charCodeAt(n)).toString(16);
      arr1.push(hex);
    }
    return arr1.join("");
  }
  this.emailHex = ascii_to_hexa(email);
  return new Identicon(this.emailHex, 200).toString();
};

console.log(identicon("gog@gmail.com"));
