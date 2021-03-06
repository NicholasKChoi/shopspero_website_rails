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
    $.ajax({
      url: "cart",
      type: 'POST',
      data: { item: { name: this.props.name, id: this.props.id, quantity: event.target.value} },
    })
  }
  
  render  () {
    return (
      <div className = 'iteminfo-container'>

        <div className='item_desc'> <p> ID: {this.props.id}; Name: {this.props.name}; {this.props.cost} </p> </div>
        <img src="http://i.imgur.com/Oqa7MgD.png"></img>

      </div>
    );
  }
};

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
        this.state.user.update(this.state.id, e.target.value);
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
      
      // handle passed in items to cart
      
      // make cart table into cookies; make table json
      items: this.props.data.map( function(item) {
        return (new Item(
          {id: item.id, name: item.name, quantity: item.stock}
        ));
      })
      
      


    }
  },

  getDefaultProps: function() {
    return { items: [], location: 'CA' };
  },
  
  render: function() {
    var cart = new Cart(this.state.items);
    return (
      <div className='cartApp-container'>

        <ul className="cartitems_list">
          {cart.getCart().map(function (item) {
            return (
              <li key={item.id}>
                <Item pic={item.pic} id={item.id} name={item.name}/>
                <Field value={item.quantity} id={item.id} user={cart} onChange={this._handleChange} />
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

var CostInfo = React.createClass({

  render: function() {
    return (
      <div className = 'costinfo-container'>
        <div className='costtotal'>$1million dollars</div>
        <div className='tax_shipping'>$treefiddy</div>
        <div className='total'>$12 shekhels</div>
      </div>
    );
  }


});

var CheckoutButton = React.createClass({
  render: function() {
    return(
      <div className = 'checkout-button'>
        <button onClick={this.checkoutcart}>
        Checkout
        </button>
      </div>
    );
  }
});


// how to make sure it cascades properly = CSS???




  
