const express = require('express')
const Userblog = require('../model/CreateBlog')
const router = express.Router()
const authenticateUser = require('../Routes/AuthMiddleware')



router.post('/create',authenticateUser,async (req,res)=>{
    const {title,summary,content,blogger} =req.body
    try {
        const create = await Userblog.create({
            title:title,
            summary:summary,
            content:content,
            blogger:blogger
        })
        res.status(200).json({create:create,status:200})


    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Can't post right now",status:400})
        
    }
})
module.exports = router