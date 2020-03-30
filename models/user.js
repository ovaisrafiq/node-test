//]const Knex = require('../config/db/knex');
//const guid = require('guid');
const moment = require('moment');

class ModelUser {

    constructor(hostname) {
        try {
            this.knex = global.knex;
            this.origin = origin;
            this.tableName = 'user';

        } catch (e) {
            console.log('=====================================================');
        }
    }

    async get(where) {
        let users = await this.knex('user').select().where(where);
        return users.length > 0 ? users[0] : false;
    }

    async getSelected(where) {
        let users = await this.knex(this.tableName).select('id','email','gender','first_name','last_name','created_at','phone_number').where(where);
        return users.length > 0 ? users[0] : false;
    }

    async insert(data) {
        //console.log(this.tableName,"-------");
        data.created_at = new Date();
        return await this.knex('user').insert(data);
    }



    async _update(where, data) {
        return await this.knex(this.tableName).where(where).update(data);
    }


    async updateFields (user_id,fields){
        
        try {
            let success = await this._update({id: user_id}, fields);
            return {success:success,message:''};
        } catch (err) {
            //console.log('ERR',err);
            let obj = {success: 0,message: err};
            return err;
        }
    }

    
}

module.exports = ModelUser;