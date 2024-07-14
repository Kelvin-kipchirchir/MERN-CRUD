const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
path = require('path')
const bodyParser = require('body-parser')


const app = express();
mongoose.Promise = global.Promise;

app.use(express())
app.use(express.json())
//MongoDb database url
const mongoDatabase = 'mongodb://localhost:27017/student';
//connect with db
mongoose.connect(mongoDatabase, { useNewUrlParser : true }).then(
() =>{console.log("connected to db")},
err =>{console.log(err)})

//all express routes
const studentRouter = require('./Routes/student.routes')
const userRouter = require('./Routes/user.routes')
const movieRouter = require('./Routes/movie.routes')
//
app.get('/',function(request,response) {
   response.send('the server side')
})
//conver incoming data to JSON format
app.use(bodyParser.json())

//enable cors
app.use(cors())

//setup server port number
const port = process.env.PORT || 5000;

//route configuration
app.use('/students', studentRouter)
app.use('/users',userRouter)
app.use('/movies',movieRouter)
app.use(express.static('./public/uploads'))
//starting server
const server = app.listen(port,function(){
    console.log('server is listening http://localhost:'+port)
})

//404 Error
app.use((req,res,next) =>{
    next(createError(404))
})
app.use(function (err,req,res,next){
    console.error(err.message);
    if(!err.statusCode) err.statusCode = 500;
    res.status(err.statusCode).send(err.message)
})