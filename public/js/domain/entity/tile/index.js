var TileEntity = function( data ){
	this._data = data;
};

/**
 * Getter generic
 * @param {String} key
 * */
TileEntity.prototype.attr = function( key ){
	return this._data[key];
};

/**
 *	Generate size compliant to bootstrap size
 *	@param {String} device, [xs, sm, md, lg]. DEFAULT: md
 *	return {String}
 * */
TileEntity.prototype.size = function( device ){
	var sizes = {
		s: '3',
		m: '6',
		l: '9',
		xl: '12'
	};
	return 'col-' + ( device || 'md' ) + '-' + sizes[this.attr( 'size' ) || 's'];
};

/**
 *	Url where life the tile inside the dashboard
 *	@return {String} url.
 * */
TileEntity.prototype.url = function(){
	return  document.URL + 'tiles/' + this.attr('name');
};

module.exports = TileEntity;
