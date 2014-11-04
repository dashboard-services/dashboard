'use strict';

var React = require( 'react' ),
		Tile = require( './tile' ),
		APITilesRepository = require( './../domain/repository/tiles/api' ),
		TileService = require( './../domain/services/tiles' );

var Dashboard = React.createClass({
	getInitialState: function(){
		return {"tiles": []};
	},

	componentWillMount: function(){
		var self = this;
		TileService.list( new APITilesRepository() ).done( function( tiles ){
			self.setState({ "tiles": tiles });
		} );

	},

	render: function(){
		var tilesList = this.state.tiles.map(function(tile){
			return (
				<Tile tile={tile} />
			);
		});

		return (
			<div>
				{tilesList}
			</div>
		);
	}
});

module.exports = Dashboard;
