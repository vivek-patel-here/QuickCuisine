function wrapAsync(fn) {
  return function (req, res) {
    fn(req, res).catch((err) => {
      console.log(err)
      res.json({ success: false, message: "Internal Server Error" });
    });
  };
}

module.exports = { wrapAsync };
