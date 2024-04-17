const express = require("express");
const router = express.Router();


const uid2 = require("uid2");
const encBase64 = require("crypto-js/enc-base64");
const SHA256 = require("crypto-js/sha256");

const User = require("../models/User");

//------------------ ENDPOINT TO REGISTER ------------------//
router.post("/Register", async (req, res) => {
  try {
    const { username, email, password, phone, confirmPassword } = req.body;


    console.log(username, email, password, phone, confirmPassword)

    
    const existingUser = await User.findOne({ email });
    //------ VERIFY ------//
    if (existingUser) {
      return res.status(404).send.json({ message: "Email existe déjà" });
    }

    
    //------------------------------//
    //------ GENERATED_PASSWORD ------//
    const salt = uid2(16);
    const hash = SHA256(req.body.password + salt).toString(encBase64);
    const tokenNewUser = uid2(32);
    //------------------------------//
    //------ CREATE_NEW_USER ------//
    const newUser = new User({
      name: username,
      email: email,
      phone: phone,
      token: tokenNewUser,
      hash: hash,
      salt: salt,
    });
    //------------------------------//
    await newUser.save();
    sendVerificationEmail(newUser.email, newUser.token);
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: error.message });
  }
});
//----------------------------------------------------------//

//------------------ ENDPOINT TO VERIFY ------------------//
router.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;
   
    const user = await User.findOne(token);
    //------ VERIFY ------//
    if (!user) {
      return res.status(404).send.json({
        message: "Vérification invalide ...!! 🧐🧐🧐🧐🧐",
      });
    }
    
    //--------------------//
    user.verified = true;
    user.token = undefined;
    await user.save();
    res.status(200).json({message:"E-mail vérifié avec succès"})
  } catch (error) {
    res.status(500).json({ message: "La vérification de l'e-mail a échoué" });
  }
});
//----------------------------------------------------------//

module.exports = router;
