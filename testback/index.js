const express=require("express");
const app = express();
/* const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
// this is a call back , call back have two parameters (request,responce)
// types of request:
// get put delete post requests
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`)) */

//define a port

const port=8000;

// make a get request

app.get("/login", (req, res) => {
    return res.send("hello there!you are logged in");
});
app.get("/signup", (req,res)=>{
    return res.send("hello ! you are signed up!");
})

app.get("/hitesh",(req,res)=>{
    return res.send("he uses instagram !");
})
app.get("/avinash",(req,res)=>{
    return res.send("he uses instagram and whatsapp !");
})

//listen 

app.listen(port,()=>{
    console.log("server is up and running...");
});



// nodemon is used to automatically load the server on saving !
