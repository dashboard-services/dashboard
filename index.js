var express = require( 'express' ),
		app = express(),
		debug = require( 'debug' )( 'dashboard:init' ),
		config = require( './config' ),
		swig = require( 'swig' ),
		path = require( 'path' ),
		MountManager = require('./lib/tiles'),
		mountManager = MountManager.getInstance( app );

app.engine('tpl', swig.renderFile);
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'tpl' );

// Disabled Views cache
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use( express.static( __dirname + '/public' ) );

require( 'require-fu' )(  __dirname + '/routers' )( app );

// Development Only
// TODO: REMOVE THIS
//mountManager.mountTileByGitURL( 'https://github.com/dashboard-services/hello-world.git', function(){
//	app.listen( config.get( 'app:port' ), function() {
//		debug( 'Server listen in %d', config.get( 'app:port' ) );
//	} );
//});

mountManager.mountTiles( function(err) {
	if (err) {
		debug( 'Error mounting the tiles: %s', err );
	}

	app.listen( config.get( 'app:port' ), function() {
		debug( 'Server listen in %d', config.get( 'app:port' ) );
	} );
} );
