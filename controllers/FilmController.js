const ModelFilm = require('../models/Film');
//const ModelComment = require('../models/Comment');
    

class FilmController {

    constructor() {
         this.film_model  = new ModelFilm();
         //this.genre_model = new ModelGenre();
    }

    async index(req, res, next) {
        try {
            let film = await this.film_model.Get({status:1})
           // let genre = await this.genre_model.Get({status:1});
            //console.log("Genre ",genre)
            res.render('films.ejs',{film:film,user:req.user})
            
        } catch (ex) {
            console.log("Film  Error",ex)
           // next(errors.getError('ESS50001', ex));
        }
    }
    async getAll(req, res, next) {
        try {
            let film = await this.film_model.Get(req)
            console.log("film ",film)
            res.json({data:film})
            
        } catch (ex) {
           // next(errors.getError('ESS50001', ex));
        }
    }
    async addFilm(req,res,next){
        try{
            let post_data = req.body;
            req.checkBody('name', 'Name is required').notEmpty();
            req.checkBody('description', 'Description. is required').notEmpty();
            req.checkBody('rating', 'Rating is required').notEmpty();
            req.checkBody('ticket_price', 'Ticket Pric is required').notEmpty();
            req.checkBody('country', 'Country is required').notEmpty();
            req.checkBody('genre', 'Genre is required').notEmpty();
            req.checkBody('release_date', 'Release date is required').notEmpty();
            var errors = req.validationErrors();
            if (errors) {
                return res.json( { type: 'alert-danger', messages: errors });
            }
                 //let image = post_data.photo;
                // fileBase64Encoded = image;
                // let temp_filename = "test.png";
            if (req.file && req.file.temp_filename) {
                console.log(req.file,"------------file");
            }
                 console.log(post_data,"===============================================================================================");
            // if(image.indexOf("png;base64") > 0) { // check the image type and set the temporary file name accordingly in these if blocks
            //     fileBase64Encoded = image.replace(/^data:image\/png;base64,/, "");
            // }
            // else if(image.indexOf("jpeg;base64") > 0)
            // {
            //     fileBase64Encoded = image.replace(/^data:image\/jpeg;base64,/, "");
            //     temp_filename = "test.jpg"
            // }
            // else {
            //     fileBase64Encoded = "";
            //     temp_filename = "";
            // }

            // var importFile = function(fileBase64Encoded, cb) {
            // var decodedFile = new Buffer(fileBase64Encoded, 'base64');
            // imageBase64Data = image.replace(/^data:image\/jpeg;base64,/, "");
            // imageBase64Data = new Buffer(imageBase64Data, 'base64');

            // }

            let movie_name = post_data.name;
            let slug='';
            slug = movie_name.replace(/\s+/g, '-').toLowerCase();

            //movie_name = movie_name.toLowerCase();
            //movie_name = movie_name.replace(" ","-");
            //var new_movie_name = movie_name.replace(" ","-");
            //console.log(slug,"===================>>>>>>>>>>>>");
            //var a1 = new Array();
            //a1 = a1.split(" ");
            //for (i=0;i<a1.length;i++)
            //{   
                //slug+=a1[i];
            //}    
            let data = {name:post_data.name,description:post_data.description,rating:post_data.rating,release_date:post_data.release_date,status:post_data.status,ticket_price:post_data.ticket_price,country:post_data.country,genre:post_data.genre,release_date:post_data.release_date,slug:slug}
            let responsefilm  = await this.film_model.Create(data);
            if(responsefilm){
                return res.json({ type: 'alert-success', messages: 'Sucessfully Film created' });
            }
        }catch(ex){
            console.log("Exception Film Add",ex)
            return res.json({ type: 'alert-danger', messages: 'Something went wrong' });
        }

    }

    async addComment(req,res,next){
        try{
            let post_data = req.body;
            req.checkBody('customer_name', 'Name is required').notEmpty();
            req.checkBody('comments', 'Comment is required').notEmpty();
            var errors = req.validationErrors();
            if (errors) {
                return res.json( { type: 'alert-danger', messages: errors });
            }
            let data = {name:post_data.customer_name,email:post_data.customer_email,comment:post_data.comments,film_id:post_data.film_id}
            let responseComment  = await this.film_model.Comment(data);
            if(responseComment){
                return res.json({ type: 'alert-success', messages: 'Sucessfully added Comment' });
            }
        }catch(ex){
            console.log("Exception Comment Add",ex)
            return res.json({ type: 'alert-danger', messages: 'Something went wrong' });
        }

    }

    async delete(req,res,next){
        try{
            let id = req.params.id;
            let response = await this.film_model.Update({'status':0},{'id':id});
            return res.json({ type: 'alert-success', messages: 'Sucessfully film deleted' });
        }catch(ex){
            console.log("Exception Film Delete",ex)
            return res.json({ type: 'alert-danger', messages: 'Something went wrong' });
        }
    }
    async get(req,res,next){
        try{
            let id = req.params.id;
            let response = await this.film_model.GetAll({'id':id});
            return res.json(response);
        }catch(ex){
            console.log("Exception Film Edit",ex)
            return res.json({ type: 'alert-danger', messages: 'Something went wrong' });
        }
    }
    async getFilmSlug(req,res,next){
    try{
            let slug = req.params.slug;
            let response = await this.film_model.GetAll({'slug':slug});
            return res.json(response);
        }catch(ex){
            console.log("Exception Film Edit",ex)
            return res.json({ type: 'alert-danger', messages: 'Something went wrong' });
        }

    }
    async updateFilm(req,res,next){
        try{
            let post_data = req.body;
            req.checkBody('name', 'Name is required').notEmpty();
            req.checkBody('description', 'Description. is required').notEmpty();
            var errors = req.validationErrors();
            if (errors) {
                return res.json( { type: 'alert-danger', messages: errors });
            }
            let data = {name:post_data.name,description:post_data.description,rating:post_data.rating,release_date:post_data.release_date,status:post_data.status,ticket_price:post_data.ticket_price}
            let response  =await  this.film_model.Update(data,{id:post_data._id})
            if(response){
                return res.json({ type: 'alert-success', messages: 'Sucessfull Film updated' });
            }
        }catch(ex){
            console.log("Exception Film Add",ex)
            return res.json({ type: 'alert-danger', messages: {0:'Something went wrong'} });
        }

    }
}
module.exports = FilmController;
