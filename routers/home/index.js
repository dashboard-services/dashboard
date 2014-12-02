var debug = require( 'debug' )( 'dashboard:route:home' );

module.exports = function( app, mountManager ){

	/**
	 * Home page
	 * */
	app.get( '/', function( req, res, next ){
		res.render(
            'home'
        );
	} );

    app.get( '/mount-tile', function( req, res, next ){
        res.render( 'tile/mount', {title: 'Services', subtitle: 'dashboard'} );
    } );

    app.post( '/mount-tile', function( req, res, next ){
        mountManager.mountTileByGitURL( req.body.repo_url, req.body.settings, function(){
            res.redirect( '/' );
        });
    } );

};
