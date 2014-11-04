var debug = require( 'debug' )( 'dashboard:route:api:tiles' ),
    path = require( 'path' ),
    fsHelper = require( './../../../lib/fs-helper' ),
		MountManager = require('./../../../lib/tiles'),
    dirBase = path.join( __dirname, '..', '..', '..', 'tiles' ),
		mountManager;

module.exports = function( app ){

	mountManager = MountManager.getInstance( app );

	/**
   * List of tiles in the dashboard
	 * */
	app.get( '/api/tiles', function( req, res, next ){
		res.json( mountManager.tiles().map( function( tile ){
			return tile["package"];
		} ) );
	} );

  /**
   * Return tile info by name
   * */
	app.get( '/api/tiles/:name', function( req, res, next ){
    res.json( require( path.join( dirBase, req.params.name, 'package' ) ) );
  });

};

