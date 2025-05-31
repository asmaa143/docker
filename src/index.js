const express=require('express');
const mongoose=require('mongoose');
const redis=require('redis');
const pg=require('pg');


const PORT=process.env.PORT || 4000;
const app=express();



//connect to redis
const redisClient =  redis.createClient( {
    url: "redis://redis:6379",


});
redisClient.on("error", (err) => console.log("Redis Client Error", err))
redisClient.on("connect", () => console.log("Redis Client connected" ));
redisClient.connect();




//connect

// const DB_USER="root";
// const DB_PASSWORD="example";
// const DB_PORT="5432";
// // const DB_HOST="172.18.0.3";
// const DB_HOST="postgres";
//
// const URI=`postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
// const client=new pg.Client(URI);
// client.connect()    .then(()=>console.log("Database connected"))
//     .catch(err=>console.log(err));







const DB_USER="root";
const DB_PASSWORD="example";
const DB_PORT="27017";
//const DB_HOST="172.18.0.3";
const DB_HOST="mongo";

const URI=`mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
mongoose
    .connect(URI)
    .then(()=>console.log("Database connected"))
    .catch(err=>console.log(err));

app.get("/",(req,res)=>{
    //store data in redis
    redisClient.set("products","Product");
    res.send('<h1>Hello World from express</h1>');
})


app.get("/data",async (req,res)=>{
    //store data in redis
    const products=await redisClient.get("products");
    res.send('<h1>Hello World as</h1> <h2>Product is'+products+'</h2>');
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});