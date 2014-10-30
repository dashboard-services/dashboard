var fs = require( 'fs' ),
	path = require( 'path' );

module.exports = {
	mountAll: function( dirBase, app, callback ) {
		var callback = ( typeof callback === 'function' ) ? callback : function(){};

		fs.readdir( dirBase, function( err, files ) {
			if ( err ) {
				callback( err );
				return;
			}

			files.forEach( function( file ) {
				var appDir = path.join( dirBase, file ),
					appPkg = require( path.join( appDir, 'package.json' ) );

				app.use( '/tiles/' + appPkg.name + '/api', require( path.join( appDir, 'server' ) ) );
				app.get( '/tiles/' + appPkg.name, function( req, res, next ) {
					res.set( {'Content-Type': 'text/html'} );
					fs.createReadStream( path.join( appDir, 'client', 'index.html' ) ).pipe( res );
				} );
			} );

			callback(null);
		} );
	}
}