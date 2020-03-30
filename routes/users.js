const express           = require('express');
const router            = express.Router();
const UserController    = require('../controllers/UserController');
let userController      = new UserController();
//Validation layer for all the routes in this file 
//const validationLayer = require('../validations/user-validation');

var passport = require("passport");


router.post('/api/register',userController.registerUser.bind(userController),function (req, res){
	//console.log("test");
	res.render('register.ejs',{ message: req.flash('registerMessage') })
});
//router.get('/', function(req, res) {res.render('login.ejs')});
router.get('/api/login',function (req, res){res.render('login.ejs',{ message: req.flash('loginMessage') })});
router.get('/register',function (req, res){res.render('register.ejs',{ message: req.flash('registerMessage') })});
router.post("/api/login",passport.authenticate("local",{ 
  successRedirect: '/films',
  failureRedirect: '/api/login',
  failureFlash : true // allow flash messages,
}
));

router.get('/logout', function(req, res){
    req.session.destroy();
    req.logout();
    res.redirect('/api/login');
});


module.exports = router;