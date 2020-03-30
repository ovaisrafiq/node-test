
exports.up = function(knex, Promise) {

	return Promise.all([

		knex.schema.createTable('user', function(t) {
	        t.increments('id').unsigned().primary();
	        t.string('email').notNull();
	        t.string('gender').notNull();
	        t.string('first_name').notNull();
	        t.string('last_name').notNull();
	        t.string('password').notNull();
	        t.dateTime('created_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP'))
			t.dateTime('updated_at').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
		 }),	    

	]);
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
