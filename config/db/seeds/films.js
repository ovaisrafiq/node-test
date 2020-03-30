
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('films').del()
            .then(function () {
                // Inserts seed entries
                return knex('films').insert([
                    {id: 1, name: 'Avengers', description: 'Its a super heros movie' ,rating:'4', ticket_price:'700',country:'Pakistan',genre:'Fantasy,Thriller,Action',release_date:'6th June 2010',slug:'avengers'},
                    {id: 1, name: 'Avengers', description: 'Its a suspense thriller movie' ,rating:'5', ticket_price:'600',country:'Pakistan',genre:'Suspense,Thriller,Action',release_date:'8th June 2010',slug:'mission-impossible'},
                    {id: 1, name: 'batman', description: 'Super hero movie' ,rating:'3', ticket_price:'500',country:'Pakistan',genre:'Action',release_date:'7th July 2010',slug:'batman'},
                ]);
            });
};
