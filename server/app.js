const path =require("path");
require("dotenv").config({path:path.join(__dirname,".env")})
const express =require('express');
const app =express();
const cors =require("cors");
const { ConnectToDB } = require('./Configs/DB.js');
const userRoute =require("./routes/userRoute.js");
const foodRoute =require("./routes/foodRoute.js");
const cartRoute =require("./routes/cartRoute.js");
const orderRoute =require("./routes/orderRoute.js");
const {isAuthenticated} =require("./middlewares/isAuthenticated.js")

//middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());


//DB setup
ConnectToDB(process.env.DB_URL);

//Routes
app.use("/user",userRoute);
app.use("/food",foodRoute);
app.use("/cart",isAuthenticated,cartRoute);
app.use("/order",orderRoute)

app.listen(4000,()=>{
    console.log('server is listening at port 4000');
})