const faker = require( "faker" );
const bcrypt = require( "bcrypt" );
const saltRaounds = 14;

const makeUsers = async () => {
    let users = [];
    for ( let i = 0; i < 30; i++ ) {
        const salt = await bcrypt.genSalt( saltRaounds );
        const hash = await bcrypt.hashSync( faker.internet.password(), salt );
        let user = {
            email:      faker.internet.email(),
            password:   hash,
            first_name: faker.name.firstName(),
            last_name:  faker.name.lastName(),
            address:    faker.address.streetAddress()
        };
        users.push( user );
        console.log( user );
    }
    console.log ('returning the users');
    return users;
};

exports.seed = async function( knex, Promise ) {
    
    let users = await makeUsers();
    console.log(users);
    console.log("inserting users");
    return knex( "users" ).insert( users );
    
};
