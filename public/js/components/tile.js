var React = require( 'react' );

var Tile = React.createClass({
	render: function(){
		return (
			<div className={this.props.tile.size()} >
				<iframe className="tile-container" name={this.props.tile.attr('name')} src={this.props.tile.url()} frameBorder="0" width="100%"></iframe>
			</div>
		);
	}
});

module.exports = Tile;
