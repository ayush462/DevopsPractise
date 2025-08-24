import express from 'express';
const app= express();

app.get("/",(req,res)=>{
    res.send("Hello jee")
})

app.get("/test",(req,res)=>{
    res.send("CI/CD testing")
})

app.get("/new-test",(req,res)=>{
    res.send("new ci cd working");
})

app.get("/newRoute",(req,res)=>{
    res.send("This is ci cd working fine");
})

app.listen(3000,'0.0.0.0',()=>{
    console.log("app is running");
})
