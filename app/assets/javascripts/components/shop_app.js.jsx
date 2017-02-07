var ShopApp = React.createClass({
  
  propTypes: {
    title: React.PropTypes.number,
  },
  
  getInitialState: function() {
    let xhttp = new XMLHttpRequest();
    let shopApp = this;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let itemjson = JSON.parse(this.responseText);
        console.log(itemjson);
        shopApp.setItemList(itemjson);
      }
    };
    
    xhttp.open("GET", "/api/v1/shop/index", true);
    xhttp.send();
    
    return{ 
            items: [{id: 1, name: "A"}, {id: 2, name: "B"}, {id:3, name: "C"}, 
                    {id:4, name: "D"}, {id:5, name: "E"}, {id:6, name: "F"}],
            id: 7, //this is a variable for the app w.o connection to rails, so that it knows what id is next to build
            renderFormIds: []
          };
  },
  
  getDefaultProps: function() {
    return { query: "Originals" };
  },
  
  setItemList: function(items) {
    this.setState(function(prevState, props) {
      prevState.items = items;
      return prevState;
    });
  },
  
  rendersForm: function(id) {
    this.setState(function(prevState, props) {
      prevState.renderFormIds.push(id);
      return prevState;
    });
  },
  
  render: function() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       console.log(this.responseText);
      }
    };
    xhttp.open("GET", "/api/v1/shop/index", true);
    xhttp.send();
    
    console.log(this.props.query);
    return (
      <div className='shopApp-container'>
        <div className='shopApp-header'> 
          <div className="navigation">
                <ul>
                  <a href="/shop/Original">Originals</a>
                  <a href="/shop/Women">Women</a>
                  <a href="/shop/Men">Men</a>
                  <a href="/shop/About">About</a>
                </ul>
            </div>
          <h3> {this.props.query} </h3> 
        </div>
        <ul className="items_list">
          {this.state.items.map(function (item) {
            return (
              <li key={item.id}> 
                <ItemBox id={item.id} name={item.name} rendersForm={this.rendersForm} /> 
                <ItemForm id={item.id} name={item.name} 
                  isRender={this.state.renderFormIds.indexOf(item.id) !== -1}/>
              </li>);
          }.bind(this)) }
        </ul>
        
      </div>
    );
  }
});

var ItemBox = React.createClass({
  render: function() {
    // <div className='button smtext'> Delete </div> remove for now, probably going to have delete button in edit form
    return (
    <div className='itembox_container'>
      <div 
        className='button smtext' 
        onClick={function() {this.props.rendersForm(this.props.id);}.bind(this) }>
        Edit
      </div>
      <div className='item_desc'> <p> {this.props.id} Item Name {this.props.name}; $100</p> </div>
      <img src="http://www.myfamily.it/content/images/thumbs/0024087.jpeg"></img>
    </div>
    );
  }
});

var ItemForm = React.createClass({
  
  render: function() {
    if (this.props.isRender) {
      return (
        <form className="item_formedit">
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    } else {
      return null;
    }
  }
  
});