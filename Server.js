const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const app = express()
app.use(express.json())
const registeredusers = ['mary','jacob','kyle']
app.get('/post',authenticatetoken,(req,res)=>{
   
    if(registeredusers.includes(req.user.name)){
        res.json('you have succesfully logined')
    }else{
        res.json('you have no access to this website')
    }
})

app.post('/login',(req,res)=>{
    
    const username = req.body.username;
    const user = {name: username}
    const accesstoken = jwt.sign(user,process.env.ACCESS_TOKEN)
    res.json({accesstoken: accesstoken})
})

function authenticatetoken(req,res,next){
    
const authheader = req.headers['authorization']

const token = authheader&& authheader.split(' ')[1]

if(token===null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{

        if(err){
            return res.sendStatus(403)
        }
        req.user = user
        next()
})
}

app.listen(3000)