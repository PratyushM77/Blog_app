const express = require("express");
const Userblog = require("../model/CreateBlog");
const router = express.Router();


router.get("/read", async (req, res) => {
  try {
    const read = await Userblog.find();
    res.status(200).json({ read });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Can't Find blogs" });
  }
});
module.exports = router;
