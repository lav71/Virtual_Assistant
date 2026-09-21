import jwt from "jsonwebtoken";

const genToken = async (user_id) =>{
    try{
        const token = await jwt.sign({user_id},process.env.JWT_SECRET, {expiresIn: "7d"});
        return token;
    } catch(error){
        console.log("Error");

    }
}

export default genToken;