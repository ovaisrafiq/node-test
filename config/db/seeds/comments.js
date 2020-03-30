
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('comments').del()
            .then(function () {
                // Inserts seed entries
                return knex('comments').insert([
                    {id: 1, name: 'Avengers', comment: 'Its a super heros movie' ,email:'ovaisrafiq@gmail.com'},
                    {id: 2, name: 'Batman', comment: 'Its a super heros movie' ,email:'ovaisrafiq@gmail.com'},
                    {id: 3, name: 'Thor', comment: 'Its a super heros movie' ,email:'ovaisrafiq@gmail.com'}

                    ]);
            });
};
