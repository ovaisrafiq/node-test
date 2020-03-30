class ModelFilm {

    constructor() {
        this.table = 'films';
        this.knex = global.knex;
    }

    async Get(req) {
        let where = {status:0}
        let users = await this.knex(this.table).select(['id as Id','name as Name','description as Description',this.knex.raw('IF(status=1,"Enabled","Disabled") AS Status') ])
        .whereNot (where)
        return users && users.length > 0 ? users : null;
    }

    async GetAll(where) {
        return await this.knex(this.table).select().where(where);
    }

    async Create(data) {
        return await this.knex(this.table).returning('id').insert(data);
    }

    async Comment(data) {
        return await this.knex('comment').returning('id').insert(data);
    }

    async Update(data, where) {
        return await this.knex(this.table).update(data).where(where);
    }

    async Remove(where) {
        return await this.knex(this.table).where(where).delete();
    }
}
module.exports = ModelFilm;