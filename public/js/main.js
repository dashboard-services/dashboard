'use strict';

var React = require( 'react' ),
	Dashboard 	= require( './components/dashboard' ),
	UserInfo 	= require( './components/userinfo' );

React.render( <Dashboard />, document.getElementById( 'dashboard' ) );
React.render( <UserInfo />, document.getElementById( 'user_info' ) );