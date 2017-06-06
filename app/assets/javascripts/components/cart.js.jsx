
// things to impl: cartApp-*
var Cart = React.createClass({
  render: function() {
    let cart = this.props.cart;
    let items = this.props.items;
    
    return (
      <div className='cart-container'>
        <ul className="cartitems-list">
          {cart.map(function (item) {
            return (
              <li key={item.id}>
                <CartItem pic={item.pic} id={item.id} name={item.name}/>
                <Field value={item.quantity} id={item.id} user={cart} updateCart={this.props.updateCart}/>
              </li>);
          }.bind(this)) }
        </ul>
      </div>
    );
  }
}); 

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