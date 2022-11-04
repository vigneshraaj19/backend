# backend
STEP 1:
   For signup we have to send three things Name,Email-id,Password
{ 
              "name":"Akshara",
             "email":"aksharamohan@gmail.com",
             "password":"Vigneshraaj@123"
 }
         if the email-id already exist in database then it will show an error msg
         After sending the data to database sucessfully u will get empty object,so that all the data is pushed sucessfully
IMAGES

![Postman 02-11-2022 22_54_01](https://user-images.githubusercontent.com/94341719/199570604-4a68d3ca-4f8b-45db-be5d-ec36f436cefd.png)


STEP 2:
   For Login we have to send two things Email-id,Password
{
             "email":"aksharamohan@gmail.com",
             "password":"Vigneshraaj@123"
 }
   if we send invaild or not registered email-id to the database It will show error msg
   when the entered emailid and password is correct the JWT token is created and it will be sent to u when the data is correct
IMAGES

![Postman 02-11-2022 22_54_53](https://user-images.githubusercontent.com/94341719/199570824-1872d352-d76f-48d0-99ad-1afacd3d2f5b.png)



STEP 3:
   For mailsend we have to send  to,subject,content
 {
             "to": "vigneshraaj19@gmail.com",
              "subject": "hi vignesh",
              "content":"how are you"
   }
   Before pushing this data we  have to put the JWT token in the headers(token got from while login) otherwise data will not be sent to the
 database error will appear
   After sending the jwt token and 3 datas. U will receive the message "thanks for emailing me"
   And u can check the mail that u have enterted

   If any error comes u have not enters the details in a correct manner.
   
IMAGES

![Postman 02-11-2022 22_59_16](https://user-images.githubusercontent.com/94341719/199570963-ebce2752-6457-4d86-b93f-48f958cc07ce.png)

![Postman 02-11-2022 22_55_16](https://user-images.githubusercontent.com/94341719/199571015-3abc271f-373e-4046-a030-f6d3059caacf.png)

STEP 4:
   For forgetpassword we have to send email-id
    {  
     "forgot":"vigneshraaj19@gmail.com"
    }

    If the given mail-id is present in the database it will send the random password to the given mail-id
    If the given mail-id is not present it will show error msg
    
IMAGES

   ![Postman 02-11-2022 22_56_09](https://user-images.githubusercontent.com/94341719/199571110-c514316a-f6c3-4a9d-a1df-d8b094f693b3.png)

   
