var fs = require( 'fs' ),
		debug = require( 'debug' )( 'dashboard:lib:tiles' ),
		express = require( 'express' ),
		path = require( 'path' ),
		mountAll, mountTileByFolder, mountTileByGitURL,
		git = require('gift'),
		rm = require('rimraf'),
		request = require( 'request' );


/**
 * @param {String} dirBase, file system URL
 * @param {Object} app, express instance
 * */
var MountManager = function( app, dirBase ){
	if(!app){
		debug( 'Error MountManager require express instance' );
		throw new Error( 'Error MountManager require express instance' );
	}
	this._app = app;
	this._dirBase = dirBase || path.join( __dirname, '..', 'tiles' );
};

/**
 * Mount all tiles in a base dir. Only file system
 * @param {Function} callback
 * */
MountManager.prototype.mountTiles = function( callback ){
	var self = this;
	callback = ( typeof callback === 'function' ) ? callback : function(){};

	fs.readdir( this._dirBase, function( err, files ) {
		if ( err ) {
			callback( err );
			return;
		}

		files.forEach( function( file ) {
			var destinationURL = path.join( self._dirBase, file );
			if( fs.lstatSync(destinationURL).isDirectory() )
			{
				self.mountTileByFolder( destinationURL );
			}
		} );

		callback(null);
	} );
};


/*
 * Mount one folder or git
 * @param {String} locationURL, filesystem dir with the diretory
 * */
MountManager.prototype.mountTileByFolder = function( locationURL ){
	var appPkg = require( path.join( locationURL, 'package.json' ) );
	debug( 'mounting %s', appPkg.name );

	this._app.use( '/tiles/' + appPkg.name, express.static( path.join( locationURL, 'client', 'public' ) ) );
	this._app.use( '/tiles/' + appPkg.name + '/api', require( path.join( locationURL, 'server' ) ) );
	this._app.get( '/tiles/' + appPkg.name, function( req, res, next ) {
		res.set( {'Content-Type': 'text/html'} );
		fs.createReadStream( path.join( locationURL, 'client', 'index.html' ) ).pipe( res );
	} );
};


/**
 * Checkout a git repository and mount the result folder
 * @param {String} locationGitURL, http git repo url
 * @param {Function} cb, callback
 * */
MountManager.prototype.mountTileByGitURL = function( locationGitURL, cb ){
	var self = this,
			rawPkgURL = locationGitURL.replace( '.git', '/master/package.json' )
																.replace( 'https://github.com', 'https://raw.githubusercontent.com' );
	debug( rawPkgURL );

	request( { url: rawPkgURL, json:true }, function( err, req, body ){
		var destinationURL = path.join(self._dirBase, body.name);
		git.clone( locationGitURL, destinationURL, function(err, repo) {
			if ( err ) {
				debug('Error clonning the repo: %s', err);
				cb(err);
				return;
			}

			rm(path.join( destinationURL, '.git'), function() {
				self.mountTileByFolder( destinationURL );
				cb();
			});

		});
	} );
};


module.exports = MountManager;
