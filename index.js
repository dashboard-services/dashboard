var express = require( 'express' ),
		app = express(),
		debug = require( 'debug' )( 'dashboard:init' ),
		config = require( './config' ),
		swig = require( 'swig' );

app.engine('tpl', swig.renderFile);
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'tpl' );

// Disabled Views cache
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use( express.static( __dirname + '/public' ) );

app.get( '/', function( req, res, next ){
		res.render( 'home', {title: 'DCP', subtitle: 'dashboard'} );
} );

app.listen( config.get( 'app:port' ), function(){
	debug( 'Server listen in %d', config.get( 'app:port' ) );
} );

