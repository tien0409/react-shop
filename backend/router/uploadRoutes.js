const express = require("express");

const router = express.Router();
const upload = require("../utils/multer");

router.post("/", upload.single("image"), (req, res) => {
  console.log(req.file);
  res.send(`/${req.file.path}`);
});

module.exports = router;
