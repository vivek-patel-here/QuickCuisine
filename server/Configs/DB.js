const mongoose =require("mongoose");

async function main(url){
    await mongoose.connect(url);
}

function ConnectToDB(url){
    main(url).then(()=>{
        console.log("Connected to Database Successfully!")
    }).catch((err)=>{
        console.log("Unable to connect to Database\nDue to :\n",err)
    })
}

module.exports={ConnectToDB}