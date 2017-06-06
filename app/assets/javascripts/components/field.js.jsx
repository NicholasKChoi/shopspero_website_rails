var Field = React.createClass({
    //transfer props to state on load
    getInitialState: function () {
        return {
          value: this.props.value,
          id: this.props.id,
          user: this.props.user
        };
    },
    //if the parent component updates the prop, force re-render
    componentWillReceiveProps: function(nextProps) {
         this.setState({value: nextProps.value});
    },
    //re-render when input changes
    _handleChange: function (e){
        this.setState({value: e.target.value});
        this.props.updateCart(this.state.id, e.target.value);
    },
    render: function () {
        // render based on state
        return (
            <div>
                <input type="text" onChange={this._handleChange} 
                                   value={this.state.value || ''} />
            </div>
        );
    }
});