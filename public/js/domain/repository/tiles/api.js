var $ = require( 'jquery' ),
		TileEntity = require( './../../entity/tile' ),
		BaseTilesRepository = require( './base' ),
		inherits = require( 'util' ).inherits;

var APITilesRepository = function(){};

inherits( APITilesRepository, BaseTilesRepository );

APITilesRepository.prototype.tiles = function(){
	var def = new $.Deferred();
	$.ajax( {url: '/api/tiles', type: 'get', json: true} ).done( function( tiles ){
		def.resolve( tiles.map( function( tile ){
			return new TileEntity( tile );
		} ) );
	} );
	return def.promise();
};

module.exports = APITilesRepository;

