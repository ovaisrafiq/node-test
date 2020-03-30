const express = require('express');
const router = express.Router();
var passport = require("passport");
var auth = require('../middleware/isAuthenticated');
const uploader = require('../middleware/imageuploader-middleware');
const FilmController = require('../controllers/FilmController');
const filmController = new FilmController();


router.get('/films', function(req, res) {
    //console.log("User here",req.user);
    res.render('films.ejs',{user:req.user})
}
);
router.get('/films/:slug',function(req, res) {
    //console.log("User here",req.user);
    res.render('show.ejs',{user:req.user})
}
);
router.get('/' ,function(req, res) {
    //console.log("User here",req.user);
    res.render('films.ejs',{user:req.user})
}
);

router.get(
    '/api/films',
    filmController.index.bind(filmController));
router.get(
    '/api/films/getAll',
    filmController.getAll.bind(filmController));

router.post(
    '/api/films/add',
    uploader.uploadUserImage('photo', {
        customFileName: "film_pic",
        path: "/films",
        overideFileName: true
    }),
    filmController.addFilm.bind(filmController));

router.get(
    '/api/films/del/:id',
    filmController.delete.bind(filmController));
    
router.get(
    '/api/films/get/:id',
    filmController.get.bind(filmController));

router.post(
    '/api/films/update',
    auth.isAuthorized,
    filmController.updateFilm.bind(filmController));

router.get(
    '/api/films/slug/:slug',
    filmController.getFilmSlug.bind(filmController));

router.post(
    '/api/films/comment',
    auth.isAuthorized,
    filmController.addComment.bind(filmController));



module.exports = router;
