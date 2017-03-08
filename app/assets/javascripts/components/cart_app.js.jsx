// things left to do: update cost based on updating cart clicks
// finish implementing backend link to cart items
// add field for updating quantity instead of static
// MOST IMPORTANT----> CSS IT SO IT LOOKS PRETTY

class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
                  quantity: props.quantity, 
                  name: props.name,
                  id: props.id
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    this.props.quantity = event.target.value;
  }
};

var Field = React.createClass({
    //transfer props to state on load
    getInitialState: function () {
        return {value: this.props.value, item: this.props.item};
    },
    //if the parent component updates the prop, force re-render
    componentWillReceiveProps: function(nextProps) {
         this.setState({value: nextProps.value});
    },
    //re-render when input changes
    _handleChange: function (e){
        this.setState({value: e.target.value});
        this.state.item.handleChange(e);
        console.log(this.state.item.props.quantity);
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

var CartApp = React.createClass({

  propTypes: {
    title: React.PropTypes.number,
  },

  getInitialState: function(){
    return{
      // items: [{id:1, name: 'A', quantity: 1}, {id:2, name: 'B', quantity: 1}, {id:3, name: 'C', quantity: 4}, 
              // {id:4, name: 'D', quantity: 1}, {id:5, name: 'E', quantity: 1}, {id:6, name: 'F', quantity: 1}]
      
      items: [new Item({id: 1, name: 'A', quantity: 1})]

    }
  },

  getDefaultProps: function() {
    return { items: [], location: 'CA' };
  },
  

  
  render: function() {
    // console.log(this.props.query);
    return (
      <div className='cartApp-container'>

        <ul className="cartitems_list">
          {this.state.items.map(function (item) {
            return (
              <li key={item.id}>
                <Field value={item.props.quantity} item={item} onChange={this._handleChange} />
                <ItemInfo pic={item.pic} id={item.props.id} name={item.props.name} quantity={item.props.quantity} cost={item.cost * item.quantity}/>
              </li>);
          }.bind(this)) }
        </ul>
        <CostInfo/>
        <CheckoutButton/>
      </div>
    );
  }
});

// things to impl: cartApp-*


var ItemInfo = React.createClass({

  render: function() {
    return (
      <div classname = 'iteminfo-container'>

        <div className='item_desc'> <p> {this.props.id} {this.props.name}; {this.props.cost} </p> </div>
        <img src="http://i.imgur.com/Oqa7MgD.png"></img>

      </div>
    );
  }
    
});

var CostInfo = React.createClass({

  render: function() {
    return (
      <div classname = 'costinfo-container'>
        <div classname='costtotal'>$1million dollars</div>
        <div classname='tax_shipping'>$treefiddy</div>
        <div classname='total'>$12 shekhels</div>
      </div>
    );
  }


});

var CheckoutButton = React.createClass({
  render: function() {
    return(
      <div classname = 'checkout-button'>
        <button onClick={this.checkoutcart}>
        Checkout
        </button>
      </div>
    );
  }
});


// how to make sure it cascades properly = CSS???




  
