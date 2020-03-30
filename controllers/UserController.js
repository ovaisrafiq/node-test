require('dotenv').config();
const ModelUser              = require('../models/user');
const _                         = require('underscore');
const moment                    = require('moment');
class UserController{
    constructor(){
        this.origin    = process.env.DEFAULT_ORIGIN;
        this.modelUser = new ModelUser(this.origin);
        //console.log(this.origin,'---------cons');
    }

    async registerUser(req,res,next){
    try {
        let data = req.body;
        let host = req.headers.origin;
        req.checkBody('first_name', 'First Name is required').notEmpty();
        req.checkBody('last_name', 'Last Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty().isEmail();
        req.checkBody('password', 'Password is required').notEmpty();
        //req.checkBody('phone', 'Phone is required').notEmpty();
        req.checkBody('gender', 'Gender is required').notEmpty();
            //req.checkBody('photo', 'Photo is required').notEmpty();
            //req.checkBody('photo', 'Photo is required').notEmpty();

        var errors = req.validationErrors();
        console.log(errors)
        if (errors) {
            return res.json( { type: 'alert-danger', messages: errors });
        }

        //let modelUser = new ModelUser(this.origin);
        //let random_device_token = sha1(`${ltfusers[i].email}{${ltfusers[i].salt}}`);
        
        let userData = {
            email:data.email,
            password:data.password,
            first_name:data.first_name,
            last_name:data.last_name,
            gender:data.gender,
            phone_number:data.phone_number
        }
        let validateEmail = await this.modelUser.get({email:data.email});
        if(validateEmail){
            return res.json( { type: 'alert-danger', messages: [{msg: "Email already exist"}]});
        }

        let result = await this.modelUser.insert(userData);
        if(result){
            //res.redirect('/films'); // will show all the films
            return res.json({code:200,status:'success',data:'Registered User Successfully'});

        }
    } 
    catch(err) {
            console.log(err)
            var errors = global.errors;          
            next(errors.getError("ESS50001"));
        }
    }
}


module.exports = UserController