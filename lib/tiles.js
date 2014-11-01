var fs = require( 'fs' ),
    npmHelper = require( './npm-helper' ),
		debug = require( 'debug' )( 'dashboard:lib:tiles' ),
		express = require( 'express' ),
		path = require( 'path' ),
		mountAll, mountTileByFolder, mountTileByGitURL,
		git = require('gift'),
		rm = require('rimraf'),
		request = require( 'request' ),
    async = require( 'async' );

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
	var self = this, 
      mountTileByFolderFunctions = [];
	callback = ( typeof callback === 'function' ) ? callback : function(){};

	fs.readdir( this._dirBase, function( err, files ) {
		if ( err ) {
			callback( err );
			return;
		}

    // Magic Black
    mountTileByFolderFunctions = files.map( function( file ){
      return function(cb){
        var destinationURL = path.join( self._dirBase, file );
        fs.lstatSync(destinationURL).isDirectory() ? self.mountTileByFolder( destinationURL, cb ) : cb(); 
      };
    } );

    async.parallel( mountTileByFolderFunctions, callback );

	} );
};


/*
 * Mount one folder or git
 * @param {String} locationURL, filesystem dir with the diretory
 * @param {Function} cb, callback
 * */
MountManager.prototype.mountTileByFolder = function( locationURL, cb ){
	var self = this,
      appPkg = require( path.join( locationURL, 'package.json' ) ),
      installOperation;

	debug( 'mounting %s', appPkg.name );

  installOperation = npmHelper.installDepsInFolfer( locationURL );
  installOperation.stdout.on( 'data', function( data ){ debug( data.toString() ) } );
  installOperation.stderr.on( 'data', function( data ){ 'ERROR ===> %s', debug( data.toString() ) } );
  installOperation.on( 'close', function( code ){ 
    debug( 'Dependencies finish install for %s, with code %d', appPkg.name, code )
    self._app.use( '/tiles/' + appPkg.name, express.static( path.join( locationURL, 'client', 'public' ) ) );
    self._app.use( '/tiles/' + appPkg.name + '/api', require( path.join( locationURL, 'server' ) ) );
    self._app.get( '/tiles/' + appPkg.name, function( req, res, next ) {
      res.set( {'Content-Type': 'text/html'} );
      fs.createReadStream( path.join( locationURL, 'client', 'index.html' ) ).pipe( res );
    } );
    cb();
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

	request( { url: rawPkgURL, json:true }, function( err, req, body ){
    debug( 'Cloning tile %s from url %s', body.name, rawPkgURL );
		var destinationURL = path.join(self._dirBase, body.name);
		git.clone( locationGitURL, destinationURL, function(err, repo) {
			if ( err ) {
				debug('Error clonning the repo: %s', err);
				cb(err);
				return;
			}

			rm(path.join( destinationURL, '.git'), function() {
				self.mountTileByFolder( destinationURL, cb );
			});

		});
	} );
};


module.exports = MountManager;
