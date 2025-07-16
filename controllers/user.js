// const mongoose = require('mongoose');
const User = require('../models/user');
const {v4:uuidv4} = require('uuid');
const {setUser} = require('../service/auth')

async function handleSignUp(request, response){
    const {name , email, password}= request.body;
    await User.create({
        name,
        email,
        password,
    });
    return response.redirect("/");

}

async function handlelogin(req,res){
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user)
        return res.render("login", {
        error: "Invalid Username or Password",
        });

//   const sessionId = uuidv4();
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports ={
    handleSignUp,
    handlelogin
}