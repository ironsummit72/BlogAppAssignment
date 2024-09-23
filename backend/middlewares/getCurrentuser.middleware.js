import jsonwebtoken from 'jsonwebtoken'
import ApiResponse from '../utils/ApiResponse.util.js'
const getCurrentUser=(req,res,next)=>{
    const token=req?.cookies?.sessionId;
    if(token)
    {
        jsonwebtoken.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err) throw Error(err);
            req.user=decode; // this is  the decoded token 
            next()
        })
    }else{
        res.status(401).json(new ApiResponse("unauthorized",401,null,"user not logged in"))
    }
}
export default getCurrentUser