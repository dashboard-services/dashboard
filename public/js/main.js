'use strict';

var React = require( 'react' ),
		APITilesRepository = require( './domain/repository/tiles/api' ),
		TileService = require( './domain/services/tiles' );

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
				<Tile name={tile.name} />
			);
		});

		return (
			<div>
				{tilesList}
			</div>
		);
	}
});

var Tile = React.createClass({
	render: function(){
		return (
			<div>Im the tile {this.props.name}!</div>
		);
	}
});


React.render( <Dashboard />, document.getElementById( 'dashboard' ) );
