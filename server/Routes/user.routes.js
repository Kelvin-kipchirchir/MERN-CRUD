//file will do all the server routing
const express = require('express')

//using express and routes
const mongoose = require('mongoose')
const app = express()
const userRouter = express.Router();

//import the models
const userModel = require('../models/User')


//To add a new user
userRouter.route('/create-user').post(async (req,res,next)=>{
    await userModel
    .create(req.body)
    .then((result) => {
     res.json({
         data : result,
         message : 'Account created successfully',
         status:200,
        })
    })
     .catch(err => {
        res.status(400).send('Error occured during registration')
     })
})

//to login user
userRouter.route('/login').post(async (req ,res ,next) =>{
    const {email,password} = req.body
    await userModel
    .findOne({email: email})
    .then((user)=>{
        if(user){
            if(user.password === password){
                res.json({
                    data : user,
                    message : 'success',
                    status:200,
                })
            }else{
                res.json({
                    data : user,
                    message : 'wrong username or password',
                    status:404,
                })
            }
        } else{
            res.json({
                data : user,
                message : 'No Account Found!!!!',
                status:404,
            })
        }
    })
})
//to get list of users
userRouter.route('/').get(async (req,res,next)=>{
    await userModel
    .find()
    .then((result) => {
        res.json({
            data : result,
            message : 'All data fetched successfully',
            status:200,
           }) 
       })
        .catch(err => {
           res.status(400).send('Error occured during registration')
        })
})

//To get single student
userRouter.route('/get-user/:id').get(async (req,res,next)=>{
    await userModel
    .findById(req.params.id)
    .then((result) => {
        res.json({
            data : result,
            message : 'data fetched successfully',
            status:200,
           })
       })
        .catch(err => {
           res.status(400).send('Error occured during registration')
        })
})
//To update the Employee Details
userRouter.route('/update-user/:id').put(async (req,res,next)=>{
    await userModel
    .findByIdAndUpdate(req.params.id,{
        $set: req.body,
    })
    .then((result) => {
        console.log(result);
        res.json({
            data : result,
            message : 'All data successfully updated',
            status:200,
           })
       })
        .catch(err => {
           res.status(400).send('Error occured during registration')
        })
})

//To Delete the user
userRouter.route('/delete-user/:id').delete(async (req,res,next) => {
    await userModel
    .findByIdAndRemove(req.params.id)
    .then(() => {
        res.json({
            message : 'data deleted successfully',
            status:200,
           })
       })
        .catch((err) => {
           console.log(err)
        })
})

module.exports = userRouter;