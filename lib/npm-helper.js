var fs = require( 'fs' ),
    spawn = require('child_process').spawn,
		debug = require( 'debug' )( 'dashboard:lib:npm-helper' );

module.exports = {

  /**
   * @param {String} diretory, place where live the package.json
   * @return {Stream.ReadableStream}
   * */
  installDepsInFolfer : function( diretory ){
    debug( 'Install dependencies in %s', diretory );
    return spawn('npm', [ 'i' ], {cwd: diretory} );
  }
};

