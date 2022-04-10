require('dotenv').config()
const express = require('express')
const cors = require("cors")
const app = express();
const admin = require('firebase-admin')
app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
const authRouter = require('./Routes/auth')
const bodyParser = require('body-parser')
const Connection = require('./Connection')
const url = process.env.DATABASE_URL;
app.use(express.json())

const allUsers = require('./Models/allUsers')
const key = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBB7HCOdL3gLud\nVH8u9yIaFhEes5JaVHjmliosemVzj+eXPtKcfGogCzf2IC7+RMgA/Q1j6ygaDQaN\ntVglQGo/EbuncQHk8g4hr1N1GFPbyeGF+nnzZEVAHYoXo4a/glN3n1H43UX+DDbY\n1J7gVJKRqCQ2UQU14Jvv87L3GmS8xCQdVZw+gjNZFcjxGiuv89aZVjcaRcNjl1H0\nEWanvyHCjcVZD+EPT+w+0HWzqZWHqTj2vYoJchGZQnfGqr6MjqTyV/8mjNBIMPnB\nuHN6QukD8MkHqkyx8kprBRED1Hz7hUvOXawveUxcZk6OXJptcUtSzuNPVQ026MbU\nIGI2e127AgMBAAECggEATM7Aey3iFczaGozcPLZmkeW08zf15M6W+v3Gk0MyqiyZ\nNPPw/wZ8ffqozl1ZBaEdylLm6JrSLqd/M5T0mYILpMPsHQDZBZ4RZHLsrPu8poiq\nndKgguojqhL291gAzqRPjRpOlk2Jw8BddKMKAu50EdRLcHeFsL4KnoykajHM4tUh\n6sR14WJo8gxW/6U2rOtKYzpgHty2T4DI8ZL4PZiT/HuaJcAUj7eG0hz4smJkOmrr\n5QGFKvWrFE4QqqLSbuEENqdrJ4MXApmZ8l7qCx2aWx8ynwCpn+YBCgosckKtSqnW\nTVrnvsIgqd9NaVCslazgQRl4pckuic+FAIgDiNFFTQKBgQDrlhYTePNTygKdlmbR\nTiRDICafxaDE90Cnfo85R9Ks00VfCmKkZv342acjzSFarRs21rSxx22pt7nJzO3v\nkh+gk9YTRSUl/ocGiHc2fRIGk5q3qJBG5j0QqB9CVujDXvSxqnzWfZM01Xo7tVYh\nT6iXJ1V7BmSjVMKpmqKRDngHpwKBgQDRwZnaZpOqZBlAHf7qWbPSGZ2qHirUq3rX\ndMSndjq7H/gEhI80Og5RIWC38E8UauVbHvIaKy9KXeSTZ3YHLZDAfRS3HEeDv+rE\nAnQSKZxngSvw8b+eHTEXQ6suVPhVlr3+6d+Ery+IaBUt19JmgAWjTz6qYmpmaIWd\nXm6p+9B7zQKBgQDC+Sj2HrDLVLHLeHFJonFSeKZerrH6sWL5/D1Ou8l5LTUJjk/L\nHk3tCT1R3PBQ2llejl1nkNSKlLqXcBovnvC79f5DXoN7KWbYmlKHbwVfGgP/Ieue\nMeiyA2IzhjgHkWvUKnQ9FBqjrFYIWnCZCxNNXclaExVxM7ITqh4HDUF7mwKBgCH0\ndiRtsH/HvnKrqGVlaf+b1/L++S3+KF+SbncxY2aBUVPh5ZCtyT2G6rI7+4ExoLk0\ndDqaPQiL1IGsIOYekS0n0l+l+0mvmqBqSUHbbI8w0N0rNTqyPQ0oDiDs7lpkkZMf\nZuiCt24cczk9k7i2BrOeE2XfkpvLVb3Y2I85zVENAoGAVgLUqdG7PZiQTblNQOtr\nJPYNyentVHbqgnwPF2QjB285FVP1UuVOopbdzMk0mr1+dv5KfaUYul4xd2sZQQnk\n+B7u11o7GVw1P9sJOzkjsfH/alSNQSGkerYDnzeJxek8QrI7m9hAYPUhRqYDM5if\nft+H5g2IZ6wpN7lJMEjfWjo=\n-----END PRIVATE KEY-----\n"

admin.initializeApp({
  credential: admin.credential.cert({
      "private_key": key.replace(/\\n/g, '\n'),
      "client_email": "firebase-adminsdk-sbhlg@userauthentication-61c32.iam.gserviceaccount.com",
      "project_id": "userauthentication-61c32"
  })
});

app.use('/user', authRouter);

console.log(url);

Connection(url)

app.get("/allUsers", async(req, res)=>{
  let alluser = []
  admin.auth().listUsers().then((result)=>{
    if(result.users.length > 0){
      for(let i=0;i < result.users.length; i++){  
        alluser.push({
          name: result.users[i].displayName,
          email: result.users[i].email,
          
        })
      }


      //--------------------------------
      console.log(alluser)

      allUsers.deleteMany({})
      .then((result)=>{console.log("deltede success")})
      .catch((error)=>console.log(error.message))
    }


    allUsers.create(alluser)
    .then((result)=>{res.status(200).json({result:result})})
    .catch((error)=>{res.status(402).json({error: error.message})})
})
})


app.listen(5001, ()=>{
    console.log("server liten")
})