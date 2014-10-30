var fs = require( 'fs' ),
		debug = require( 'debug' )( 'dashboard:lib:tiles' ),
		express = require( 'express' ),
		path = require( 'path' ),
		mountAll, mountTileByFolder, mountTileByGitURL;


/**
 * Mount all tiles in a base dir. Only file system
 * @param {String} dirBase, file system URL
 * @param {Object} app, express instance
 * @param {Function} callback
 * */
mountAll = function mountAll( dirBase, app, callback ){
	callback = ( typeof callback === 'function' ) ? callback : function(){};

	fs.readdir( dirBase, function( err, files ) {
		if ( err ) {
			callback( err );
			return;
		}

		files.forEach( function( file ) {
			mountTileByFolder( path.join( dirBase, file ), app );
		} );

		callback(null);
	} );
};

/*
 * Mount one folder or git
 * @param {String} locationURL, filesystem dir with the diretory
 * @param {Object} app, express instance
 * */
mountTileByFolder = function mountTile( locationURL, app ){
	var appPkg = require( path.join( locationURL, 'package.json' ) );
	debug( 'mounting %s', appPkg.name );

	app.use( '/tiles/' + appPkg.name, express.static( path.join( locationURL, 'client', 'public' ) ) );
	app.use( '/tiles/' + appPkg.name + '/api', require( path.join( locationURL, 'server' ) ) );
	app.get( '/tiles/' + appPkg.name, function( req, res, next ) {
		res.set( {'Content-Type': 'text/html'} );
		fs.createReadStream( path.join( locationURL, 'client', 'index.html' ) ).pipe( res );
	} );
};

/**
 * Checout a git repository and mount the result folder
 * @param {String} url, git url where we have to checkout the code
 * @param {Function} cb, callback
 * */
mountTileByGitURL = function(){
};


module.exports = {
	mountAll: mountAll,
	mountTileByFolder: mountTileByFolder
};
