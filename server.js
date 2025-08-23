import express from 'express';
const app= express();

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.get("/test",(req,res)=>{
    res.send("CI/CD testing")
})

app.listen(3000,()=>{
    console.log("app is running");
})