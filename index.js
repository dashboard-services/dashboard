var express = require( 'express' ),
		app = express(),
		debug = require( 'debug' )( 'dashboard:init' ),
		config = require( './config' ),
		swig = require( 'swig' ),
		path = require( 'path' ),
		fs = require( 'fs' );

app.engine('tpl', swig.renderFile);
app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'tpl' );

// Disabled Views cache
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use( express.static( __dirname + '/public' ) );

require( 'require-fu' )(  __dirname + '/routers' )( app );

var dirBase = path.join( __dirname, 'tiles' );
mountTiles( dirBase, function() {
	app.listen( config.get( 'app:port' ), function(){
		debug( 'Server listen in %d', config.get( 'app:port' ) );
	} );

} );

function mountTiles( dirBase, callback ) {
	fs.readdir( dirBase, function( err, files ) {
		files.forEach( function( file ) {
			var dirTimer = path.join( dirBase, file ),
				timerPkg = require( path.join( dirTimer, 'package.json' ) );

			app.use( '/tiles/' + timerPkg.name + '/api', require( path.join( dirTimer, 'server' ) ) );
			app.get( '/tiles/' + timerPkg.name, function( req, res, next ){
				res.set( {'Content-Type': 'text/html'} );
				fs.createReadStream( path.join( dirTimer, 'client', 'index.html' ) ).pipe( res );
			} );
		});

		callback();
	});
}

