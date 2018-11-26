const Identicon = require("identicon.js");

export function identIcon(hex) {
  const newhex = hex + 77;
  return new Identicon(newhex, 200).toString();
}
