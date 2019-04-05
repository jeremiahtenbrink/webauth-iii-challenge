exports.up = function( knex, Promise ) {
    return knex.schema.createTable( "users", tableBuilder => {
        tableBuilder.increments( "id" );
        tableBuilder.string( "email" ).notNullable().unique().index();
        tableBuilder.string( "reset_password_token" );
        
        tableBuilder.string( "password" ).notNullable();
        
        tableBuilder.timestamps( true, true );
        tableBuilder.string( "first_name" ).notNullable();
        tableBuilder.string( "last_name" ).notNullable();
        tableBuilder.string( "address" ).notNullable();
        
    } ).createTable( "login", tableBuilder => {
        tableBuilder.string( "email" ).
            references( "email" ).
            inTable( "users" ).
            unique().
            notNullable()
            .primary();
        
        tableBuilder.string( "token" ).notNullable().unique().index();
        
        tableBuilder.timestamps( true, true );
    } );
};

exports.down = function( knex, Promise ) {
    knex.dropTableIfExists( "login" ).dropTableIfExists( "users" );
};
