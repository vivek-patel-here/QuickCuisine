const jwt =require("jsonwebtoken");

const isAuthenticated = async(req, res, next) => {
    try{
        const {authorization} = req.headers;
        if(!authorization){
            return res.status(401).json({success:false,message:"To move forward, please log in to your account."})
        }
        let decodedData = jwt.verify(authorization,process.env.JWTSECRET) ;
        req.user =decodedData;
        next()

    }catch(err){
        res.status(401).json({success:false,message:"Token is either wrong or expired !Log in again!"})
    }
};

module.exports ={isAuthenticated}
