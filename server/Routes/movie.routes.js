//file will do all the server routing
const express = require('express')

//using express and routes
const mongoose = require('mongoose')
const app = express()
const movieRouter = express.Router();
const multer = require('multer');
const path = require('path')
const fs = require('fs')
//import the models
const movieModel = require('../models/Movie')


//To add a new movie
//storage and filename settings
const storage = multer.diskStorage({
   destination: ( req , file, cb) =>{
       cb(null ,'public/images')
   },
   filename: (req,file,cb) =>{
       cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
   }
})
const upload = multer({
    storage: storage
})
//
movieRouter.route('/create-movie').post(upload.single('photo'),async (req ,res,next) =>{
    const name = req.body.name;
    const photo = req.file.filename;
    const ratings = req.body.ratings;
    const likes = req.body.likes;
    const casts = req.body.casts;
    const category = req.body.category;
    const description = req.body.description;
    const date = req.body.date;
    const newMovieData = {
        name,photo,ratings,likes,casts,category,description,date
    }
    const newMovie = movieModel(newMovieData);
    //await movieModel
    newMovie.save()
    .then((result) => { 
     res.json({
         data : result,
         message : 'movie Added successfully',
         status:200,
        })
    })
     .catch(err => {
        res.status(400).send('Error occured during registration')
     })
})

//to get list of employees
movieRouter.route('/').get(async (req,res,next)=>{
    await movieModel
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
movieRouter.route('/get-movie/:id').get(async (req,res,next)=>{
    await movieModel
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
movieRouter.route('/update-movie/:id').put(async (req,res,next)=>{
    await movieModel
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
movieRouter.route('/delete-movie/:id').delete(async (req,res,next) => {
    await movieModel
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

module.exports = movieRouter;