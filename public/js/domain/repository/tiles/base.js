var BaseTilesRepository = function(){};

BaseTilesRepository.prototype.tiles = function(){
	throw new Error( "BaseTilesRepository.tiles" );
};

module.exports = BaseTilesRepository;

