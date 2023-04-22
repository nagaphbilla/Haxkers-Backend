const express = require("express");
const router = express.Router();
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).json({ message: "Not all fields have been filled" });
    return;
  }
  userModel.findOne({email : req.body.email})
  .then(user => {
    if(user) {
      return res.status(401).json({ message: "Email already exists" });
    }

    var pass = "";
    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        pass = hash;
        const data = new userModel({
          name: req.body.name,
          email: req.body.email,
          password: pass,
          center : req.body.center,
          radius : req.body.radius,
          role : req.body.role
        });
        try {
          data.save().then((ret) => {
            ret["password"] = undefined;
            res.status(200).json(ret);
          });
        } catch (error) {
          res.status(400).json({ message: error.message });
        }
      });
    });
  })
});

//signin
router.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).json({ message: "Not all the fields have been filled" });
    return;
  }
  async function signIn(email, password) {
    const user = await userModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User doesn't exist" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.status(200).json({
      token,
      user: {
        id: user._id,
      },
    });
  }

  signIn(req.body.email, req.body.password);
});

module.exports = router;
