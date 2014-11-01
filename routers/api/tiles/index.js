var debug = require( 'debug' )( 'dashboard:route:api:tiles' ),
    path = require( 'path' ),
    fsHelper = require( './../../../lib/fs-helper' ),
    dirBase = path.join( __dirname, '..', '..', '..', 'tiles' );

module.exports = function( app ){

	/**
   * List of tiles in the dashboard
	 * */
	app.get( '/api/tiles', function( req, res, next ){
    fsHelper.tilesInsideFolder( dirBase, function( err, tiles ){
      res.json( tiles.map( function( tile ){
        return require( path.join( dirBase, tile, 'package' ) );
      } ) );
    } );
	} );

  /**
   * Return tile info by name
   * */
	app.get( '/api/tiles/:name', function( req, res, next ){
    res.json( require( path.join( dirBase, req.params.name, 'package' ) ) );
  });

};

