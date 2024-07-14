//file will do all the server routing
const express = require('express')

//using express and routes
const mongoose = require('mongoose')
const app = express()
const studentRouter = express.Router();

//import the models
const studentModel = require('../models/Student')


//To add a new student
studentRouter.route('/create-student').post(async (req,res,next)=>{
    await studentModel
    .create(req.body)
    .then((result) => {
     res.json({
         data : result,
         message : 'Employee Added successfully',
         status:200,
        })
    })
     .catch(err => {
        res.status(400).send('Error occured during registration')
     })
})

//to get list of employees
studentRouter.route('/').get(async (req,res,next)=>{
    await studentModel
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
studentRouter.route('/get-student/:id').get(async (req,res,next)=>{
    await studentModel
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
studentRouter.route('/update-student/:id').put(async (req,res,next)=>{
    await studentModel
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

//To Delete the Student
studentRouter.route('/delete-student/:id').delete(async (req,res,next) => {
    await studentModel
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

module.exports = studentRouter;