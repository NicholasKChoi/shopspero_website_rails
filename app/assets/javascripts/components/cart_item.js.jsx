class CartItem extends React.Component {
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
      <div className = 'cart-iteminfo-container'>
        <div className='cart-item-desc'> <p className='cart-item-desc-text'> ID: {this.props.id}; Name: {this.props.name}; {this.props.cost} </p> </div>
        <img className='cart-item-img' src="https://i.imgur.com/Oqa7MgD.png"></img>
      </div>
    );
  }
};