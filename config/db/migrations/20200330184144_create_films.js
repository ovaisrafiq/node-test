
exports.up = function(knex, Promise) {

	return Promise.all([

		knex.schema.createTable('films', function(t) {
	        t.increments('id').unsigned().primary();
	        t.string('name',150).nullable();
	        t.string('description',150).nullable();
	        t.string('rating').nullable();
	        t.string('ticket_price').nullable();
	        t.string('country').nullable();
	        t.string('genre').nullable();
	        t.string('photo').nullable();
	        t.string('release_at').nullable();
	        t.string('slug').nullable();
	        t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
			t.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    	}),	    

	]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('films')
};
