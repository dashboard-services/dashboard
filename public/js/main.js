'use strict';

var React 		= require( 'react' ),
	Dashboard 	= require( './components/dashboard' ),
	UserInfo 	= require( './components/userinfo' );

React.render( <Dashboard />, document.getElementById( 'dashboard' ) );
React.render( <UserInfo />, document.getElementById( 'user_info' ) );

var setBackground = function () {
	var image_number 	= Math.floor( ( Math.random() * 40 ) );
	if ( image_number < 10 ) { image_number = '0' + image_number };
	var image_url 		= 'url("/img/' + image_number + '.jpg")';
	$( document.getElementById( 'body' ) ).css( 'background-image', image_url );
};
setBackground();