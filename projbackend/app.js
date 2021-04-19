require('dotenv').config();

const mongoose = require('mongoose');
const express=require('express');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors');


const authRoutes=require('./routes/auth');

const app=express();
const port=process.env.PORT ||8000;
//mongoose.connect('mongodb://localhost:27017/test')

mongoose.connect(process.env.DATABASE, 
{useNewUrlParser: true, 
useUnifiedTopology: true,
useCreateIndex:true}).then(() =>{
    console.log("DB connected!");
})
.catch((e)=>{
    console.log(e);
});
// body parser
app.use(express.json());
// cookie parser
app.use(cookieParser());
//cors
app.use(cors());

app.use("/api",authRoutes);


app.listen(port,()=>{
    console.log(`app running on ${port}`);
});







