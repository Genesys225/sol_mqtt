var isWin = process.platform;
var mongoURI =
  isWin === "win32"
    ? "mongodb://localhost:27017/sol"
    : "mongodb://10.8.0.13:27017/sol";
module.exports = {
  mongoURI,
  secretOrKey: "secret"
};
