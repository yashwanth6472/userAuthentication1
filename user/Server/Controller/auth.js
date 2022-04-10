const jwt = require('jsonwebtoken')
const user = require('../Models/auth')

const signUp = async(req, res) =>{
    console.log("signuped")
    const {name, email} = req.body
    const findUser = await user.find({email:email}).exec()
    console.log(findUser)
    if(findUser.length > 0){
        return res.status(402).json({message: "user already exist"})
    }

    

    try {
        const createUser = await user.create({
            name:name,
            email:email
        })
        createUser.save()
        res.status(200).json({
            message: "user signed up successfully",
            result: createUser
        })
        console.log(createUser)
    } catch (error) {
        res.status(402).json({error: error.message})
    }


}
const signIn = async(req, res) =>{
    const {email} = req.body;
    console.log(email)
    const findUser = await user.find({email:email}).exec()
    console.log("users ---->",findUser)
try {
    if(findUser.length > 0){
     
        const token = jwt.sign({ id: findUser[0]._id }, "yashwnth");
        console.log("token",token)
        res.status(200).cookie("token", token); 
        res.status(200).json({message: "user Logged in successfully", data: findUser})
    }
    else
    {
         res.status(200).json({message: "Invalid credentials"})
    }
} catch (error) {
    res.status(402).json({error: error.message})
}

}
module.exports = {signUp, signIn}
