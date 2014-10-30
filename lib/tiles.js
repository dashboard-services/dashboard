var fs = require( 'fs' ),
		debug = require( 'debug' )( 'dashboard:lib:tiles' ),
		express = require( 'express' ),
		path = require( 'path' ),
		mountAll, mountTileByFolder, mountTileByGitURL,
		git = require('gift'),
		rm = require('rimraf');


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
mountTileByFolder = function mountTileByFolder( locationURL, app ){
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
 * @param {String} locationURL, http git repo url
 * @param {String} dirBase, path where we want to export the repo.
 * @param {Object} app, express instance
 * @param {Function} cb, callback
 * */
mountTileByGitURL = function mountTileByGitURL( locationURL, dirBase, app, cb ){
	var appName = locationURL.split('/').pop().replace('.git', '');
	var destinationURL = path.join(dirBase, appName);

	git.clone( locationURL, destinationURL, function(err, repo) {
		if ( err ) {
			debug('Error clonning the repo: %s', err);
			cb(err);
			return;
		}

		rm(path.join( destinationURL, '.git'), function() {
			mountTileByFolder( destinationURL, app );
			cb(null);
		});

	});
};


module.exports = {
	mountAll: mountAll,
	mountTileByFolder: mountTileByFolder,
	mountTileByGitURL: mountTileByGitURL
};


