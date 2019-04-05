require( 'dotenv' ).config()
import server from "./src/api/server";

const port = process.env.PORT || 3200;


server.listen( port, () =>
    console.log( `\n** API running on http://localhost:${ port } **\n` )
);