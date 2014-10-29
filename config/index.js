var nconf = require( 'nconf' ),
		debug = require( 'debug' )( 'dashboard:config' ),
		path = require( 'path' ),
		file = path.join( __dirname, nconf.get( 'NODE_ENV' ) || 'development' + '.json' );

debug( 'Config file %s', file );

module.exports = nconf
									.argv()
									.env()
									.file( file );
