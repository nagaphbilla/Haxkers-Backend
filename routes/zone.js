const express = require("express");
const router = express.Router();
const zoneModel = require("../models/zoneModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signin
router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "Not all the fields have been filled" });
    return;
  }
  async function logIn(email, password) {
    const zonalAdmin = await zoneModel.findOne({ email });

    if (!zonalAdmin) {
      res.status(400).json({ message: "User doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, zonalAdmin.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: zonalAdmin._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        id: zonalAdmin._id,
      },
    });
  }

  logIn(req.body.email, req.body.password);
});

module.exports = router;
