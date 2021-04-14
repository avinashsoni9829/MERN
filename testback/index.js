const express = require('express');

const app=express();

const port=3000
// app.get(route,callback)
app.get('/',(req,res) => {
    res.send('Hello World !');
})
// app.listen(portNumber, callback())
app.listen(port,() =>{
    console.log(`listen request at ${port}`);
})