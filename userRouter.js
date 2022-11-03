const router= require('express').Router();
const {User}=require('./userSchema');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const nodemailer = require('nodemailer');
var generator = require('generate-password');

router.post('/signup',async (req,res) =>{
    
     try{
        //checking whether the given mail id is exist in database r not
        const emailExist=await User.findOne({email:req.body.email});
        if(emailExist)
        return res.status(409).send({message:"User with given email already exist"})
        //password hashing
        
        const user = new User({
             name:req.body.name,
             email:req.body.email,
             password:req.body.password
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
        
        if(req.body.password!=userData.password){
            return res.status(409).send({message:"given password not exist"})
        }
          //jwt joken is created when the email and password r correct so that it will generate the token for that user(email)
        var userToken =await jwt.sign({email:userData.email},'vigneshraaj');
          res.header('token',userToken).json(userToken);

    }catch(err){
        res.status(500).send({message:"Login error"});
    }

})
//after login creating the jwt token for valid user
const validUser=(req,res,next)=>{

    var token=req.header('token');
    req.token=token;
    next();

}
//if the jwt token is there show all the details
router.post('/mailsend',validUser,async(req,res) =>{
    jwt.verify(req.token,'vigneshraaj',async(err,data) =>{
        if(err){
            res.status(500).send({message:"unauthorized error"});
        }else{
            // const data = await User.find();
            // res.json(data);

             //I tried with google services to send mail but its shows auth error.So I used https://ethereal.email/create


         //u can check with 
        //  auth: {
        //     user: 'keith.rippin@ethereal.email',
        //     pass: 'ZmXhnYAQpDWxJKXUup'
        // }

        
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
            const mailOptions = {
                from:"vickystater1@gmail.com",
                to: req.body.to,
                subject: req.body.subject,
                text:req.body.content
            }
            transporter.sendMail(mailOptions, (err, result) => {
                if (err){
                    console.log(err)
                    res.json('Oops error occurred')
                } else{
                    res.json('thanks for emailing me');
                }
            })

        }
    })
    
})

router.put('/forgetpassword',async(req,res) =>{
    try{
        const forgotpassword=await User.findOne({email:req.body.forgot});

        if(!forgotpassword){
            return res.status(409).send({message:"given email not exist"})
            }

            var changepassword = generator.generate({
                length: 10,
                numbers: true
            });
           
             //updating the password in the database

            var userEmail = forgotpassword.email;
            console.log(userEmail);

           const result=await User.updateOne({email : userEmail }, {$set: {password : changepassword}});
           
           console.log(result)

         //sending password to respective mailid
         //I tried with google services to send mail but its shows auth error.So I used https://ethereal.email/create


         //u can check with 
        //  auth: {
        //     user: 'keith.rippin@ethereal.email',
        //     pass: 'ZmXhnYAQpDWxJKXUup'
        // }

            const transporter = nodemailer.createTransport({
                // service: "Gmail",
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASSWORD
                }
            });
            const mailOptions = {
                to: userEmail,
                subject: "resetted password",
                text:changepassword
            }
            transporter.sendMail(mailOptions, (err, result) => {
                if (err){
                    console.log(err)
                    res.json('Oops error occurred')
                } else{
                    res.json('we have successfully resetted the password please check your mail');
                }
            })

            console.log(userEmail,changepassword);
   

    }catch(err){
        res.status(500).send({message:"Error Message"});
    }
    
})
module.exports=router;


