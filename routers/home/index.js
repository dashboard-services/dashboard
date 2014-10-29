var debug = require( 'debug' )( 'dashboard:route:home' );

module.exports = function( app ){

	/**
	 * Home page
	 * */
	app.get( '/', function( req, res, next ){
		res.render( 'home', {title: 'DCP', subtitle: 'dashboard'} );
	} );
};
