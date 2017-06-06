// things left to do: update cost based on updating cart clicks
// finish implementing backend link to cart items
// add field for updating quantity instead of static
// MOST IMPORTANT----> CSS IT SO IT LOOKS PRETTY

var CartApp = React.createClass({
  propTypes: {
    title: React.PropTypes.number,
  },
  
  getInitialState: function(){
    let items = this.props.data.map( function(item) {
      return (new CartItem(
        {id: item.id, name: item.name, quantity: item.stock}
      ));
    });
    let cart = new CartClass(items);
    
    return{
      // items: [{id:1, name: 'A', quantity: 1}, {id:2, name: 'B', quantity: 1}, {id:3, name: 'C', quantity: 4}, 
              // {id:4, name: 'D', quantity: 1}, {id:5, name: 'E', quantity: 1}, {id:6, name: 'F', quantity: 1}]
      
      // handle passed in items to cart
      
      // make cart table into cookies; make table json
      items: items,
      cart: cart,
    }
  },
  
  getDefaultProps: function() {
    return { items: [], location: 'CA' };
  },
  
  updateCart: function (item, quantity) {
    this.setState( function (prevState, props) {
      prevState.cart.update(item, quantity);
      return prevState;
    });
    this.state.cart.save();
  },
  
  addToCart: function (item, quantity) {
    this.setState( function (prevState, props) {
      prevState.cart.add(item, quantity);
      return prevState;
    });
    this.state.cart.save();
  },
  
  render: function() {
    return (
      <div className='cartApp-container'>
        <Cart 
          cart={this.state.cart.getCart()} 
          items={this.state.items}
          updateCart={this.updateCart.bind(this)}
          addToCart={this.addToCart.bind(this)}
        />
        <CostInfo/>
        <CheckoutButton/>
      </div>
      );
  }
})
