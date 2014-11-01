var fs = require( 'fs' ),
		debug = require( 'debug' )( 'dashboard:lib:fs-helper' ),
    path = require( 'path' );

module.exports = {

  /**
   * Return Tiles inside a dirBase folder
   * @param {String} dirBase, folder to search for tiles
   * @param {Functions} cb, callback( err, {Array<String>} )
   * */
  tilesInsideFolder: function( dirBase, cb ){
    debug( 'Searching tiles inside of %s', dirBase );
    fs.readdir( dirBase, function( err, files ) {
      cb( err, files.filter( function( file ){
        var destinationURL = path.join( dirBase, file );
        return fs.lstatSync( destinationURL ).isDirectory() && fs.existsSync( path.join( destinationURL, 'package.json' ) ) // I Know, I am lazy sorry
      } ) );
    } );
  }
};
