const express = require('express')
const authRouter = express.Router();
const {signUp, signIn, watiLogin} = require('../Controller/auth')

authRouter.post("/signUp", signUp);
authRouter.post("/signIn", signIn);


module.exports = authRouter;