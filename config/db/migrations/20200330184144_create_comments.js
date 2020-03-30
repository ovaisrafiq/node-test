
exports.up = function(knex, Promise) {

	return Promise.all([

		knex.schema.createTable('comment', function(t) {
	        t.increments('id').unsigned().primary();
	        t.string('name').notNull();
	        t.string('email').notNull();
	        t.string('comment').notNull();
	        t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
			t.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
		 }),	    

	]);
};

exports.down = function(knex, Promise) {
  //return knex.schema.dropTable('comment')
};
