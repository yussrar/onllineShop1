//required modules
const express = require("express");
const path = require("path");

//set up express
const app = express();
const port = process.env.port || "8888";

//mongodb

const { MongoClient, ObjectId } = require("mongodb");
const dbUrl = "mongodb+srv://yusrajamal:yusrajamal@cluster0.stijliu.mongodb.net/"; 
const client = new MongoClient(dbUrl);


//pug
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//public folder
app.use(express.static(path.join(__dirname, "public")));

//Home 
app.get("/", (req, res) => {
    res.render(path.join(__dirname, "index.pug"));
});

//products 
app.get("/products", async (req, res) => {
    let products = await getAllProducts();
    res.render(path.join(__dirname, "products.pug"), { prods: products });
});


//contact 
app.get("/aboutus", (req, res) => {
    res.render(path.join(__dirname, "aboutus.pug"));
});

//set up server listening 
app.listen( port, ()=>{
    console.log(`listening on http://localhost:${port}`);
});



//helper functions for mongo 
async function connection(){
    db = client.db("shopdb");
    return db;
}

async function getAllProducts(){
    db = await connection();
    let results = db.collection("myproducts").find({});
    resultsArray = await results.toArray();
    return resultsArray;
}

