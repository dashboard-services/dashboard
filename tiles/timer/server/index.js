var express = require( 'express' ),
		app = express();

app.get( '/nombres', function( req, res, next ){
	res.json( [ 'Guille', 'Carlos' ] );
} );

module.exports = app;
