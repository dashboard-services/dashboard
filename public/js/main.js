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
			var size = tile.size || "sm",
				url = document.URL + 'tiles/' + tile.name;
			;

			return (
				<Tile name={tile.name} size={size} url={url} />
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
			<div className={"col-" + this.props.size + "-2"} >
				<iframe name={this.props.name} src={this.props.url} frameBorder="0"></iframe>
			</div>
		);
	}
});


React.render( <Dashboard />, document.getElementById( 'dashboard' ) );
