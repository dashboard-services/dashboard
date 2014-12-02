var React = require( 'react' );

var UserInfo = React.createClass({
    getInitialState: function(){
        return {user: {name: '', lastName: '', avatar: ''} };
    },
    componentWillMount: function(){
        var self = this;
        $.getJSON( "http://base.jruz.coredev/projects/getuserinfo/", function( data ) {
            self.setState( {user: data} );
        });
    },
    render: function(){
        return (
            <div className="current_user">
                <div className="name">
                    <span>{this.state.user.name}</span>
                    <span>{this.state.user.lastName}</span>
                </div>
                <div className="avatar">
                    <img src={this.state.user.avatar} />
                </div>
            </div>
        );
    }
});

module.exports = UserInfo;
