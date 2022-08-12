const router= require('express').Router();
const {User}=require('./userSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.post('/register',async (req,res) =>{
    
     try{
        //checking whether the given mail id is exist in database r not
        const emailExist=await User.findOne({email:req.body.email});
        if(emailExist)
        return res.status(409).send({message:"User with given email already exist"})
        //password hashing
        const hashPassword=await bcrypt.hash(req.body.password,10);
        const user = new User({
             name:req.body.name,
             email:req.body.email,
             password:hashPassword
         }).save();
         //saving data in the database
         res.send(user);

     }catch(err){
        //if any internal error occurs it will show error message
        res.status(500).send({message:"Register error"});
     }
   
    
});

router.post('/login',async (req,res) =>{
    try{
          //getting email from the database and compare with the given email id
        const userData=await User.findOne({email:req.body.email});
        //if the email id is not present send the error message
        if(!userData){
        return res.status(409).send({message:"given email not exist"})
        }
        //comparing the password with database password
        var validPsw = await bcrypt.compare(req.body.password,userData.password);
        
        if(!validPsw){
            return res.status(409).send({message:"given password not exist"})
        }
          //jwt joken is created when the email and password r correct so that it will generate the token for that user(email)
        var userToken =await jwt.sign({email:userData.email},'vigneshraaj');
          res.header('auth',userToken).json(userToken);

    }catch(err){
        res.status(500).send({message:"Login error"});
    }

})
//after login creating the jwt token for valid user
const validUser=(req,res,next)=>{
    var token=req.header('auth');
    req.token=token;
    next();

}
//if the jwt token is there show all the details
router.get ('/getAll',validUser,async(req,res) =>{
    jwt.verify(req.token,'vigneshraaj',async(err,data) =>{
        if(err){
            res.status(500).send({message:"No token found"});
        }else{
            const data = await User.find();
            res.json(data);

        }
    })
    
})

module.exports=router;