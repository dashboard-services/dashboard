var $ = require( 'jquery' ),
		BaseTilesRepository = require( './base' ),
		inherits = require( 'util' ).inherits;

var APITilesRepository = function(){};

inherits( APITilesRepository, BaseTilesRepository );

APITilesRepository.prototype.tiles = function(){
	return $.ajax( {url: '/api/tiles', type: 'get', json: true} );
};

module.exports = APITilesRepository;

