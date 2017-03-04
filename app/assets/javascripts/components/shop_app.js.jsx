var ShopApp = React.createClass({
  
  propTypes: {
    title: React.PropTypes.number,
  },
  
  getInitialState: function() {
    let xhttp = new XMLHttpRequest();
    let shopComponent = this;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let itemjson = JSON.parse(this.responseText);
        console.log(itemjson);
        shopComponent.setItemList(itemjson);
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
  
  createNewItem: function() {
    let xhttp = new XMLHttpRequest();
    let shopComponent = this;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let itemjson = JSON.parse(this.responseText);
        console.log(itemjson);
        shopComponent.setState(function(prevState, props) {
          prevState.items.push(itemjson);
          return prevState;
        });
      }
    };
    
    xhttp.open("POST", "/api/v1/shop/create", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    let newItemJSON = { item: {
      name: "item" + this.state.items.length,
      price: 15.00,
      on_sale: false,
      size: 3,
      color: 'brown',
      description: 'new item json',
      line: 'nick original',
      stock: 10
    }};
    console.log(newItemJSON);
    xhttp.send(JSON.stringify(newItemJSON));
  },
  
  deleteLastItem: function() {
    let xhttp = new XMLHttpRequest();
    let shopComponent = this;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log("delete successful");
        let itemjson = JSON.parse(this.responseText);
        console.log(itemjson);
        shopComponent.setState(function(prevState, props) {
          prevState.items.pop();
          return prevState;
        });
      }
    };
    
    xhttp.open("DELETE", "/api/v1/shop/delete", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    let items = shopComponent.state.items;
    let lastitem = items[items.length - 1];
    let newItemJSON = { item: {
      id: lastitem['id']
    }};
    console.log(newItemJSON);
    xhttp.send(JSON.stringify(newItemJSON));
  },
  
  updateLastItem: function() {
    let xhttp = new XMLHttpRequest();
    let shopComponent = this;
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let itemjson = JSON.parse(this.responseText);
        console.log(itemjson);
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4 && this.status == 200) {
            let itemjson = JSON.parse(this.responseText);
            console.log(itemjson);
            shopComponent.setItemList(itemjson);
          }
        };
        
        xhttp.open("GET", "/api/v1/shop/index", true);
        xhttp.send();
      }
    };
    
    xhttp.open("POST", "/api/v1/shop/update", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    let items = this.state.items;
    let lastitem = items[items.length - 1];
    let newItemJSON = { item: {
      name: "NICK'S NEW ITEM",
      id: lastitem['id']
    }};
    console.log(newItemJSON);
    xhttp.send(JSON.stringify(newItemJSON));
  },
  
  rendersForm: function(id) {
    this.setState(function(prevState, props) {
      prevState.renderFormIds.push(id);
      return prevState;
    });
  },
  
  render: function() {
    shopComponent = this;
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
        
        <div 
          className='button smtext' style={{position: 'relative'}}
          onClick={function() {console.log(this); this.createNewItem();}.bind(shopComponent)}>
          New Item
        </div>
        <div 
          className='button smtext' style={{position: 'relative'}}
          onClick={function() {console.log(this); this.deleteLastItem();}.bind(shopComponent) }>
          Delete Last Item
        </div>
        <div 
          className='button smtext' style={{position: 'relative'}}
          onClick={function() {console.log(this); this.updateLastItem();}.bind(shopComponent) }>
          Update Last Item
        </div>
        
        <ul className="items-list">
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
    <div className='itembox-container'>
      <div 
        className='button smtext' 
        onClick={function() {this.props.rendersForm(this.props.id);}.bind(this) }>
        Edit
      </div>
      <div className='item-desc'> <p> {this.props.id} Item Name {this.props.name}; $100</p> </div>
      <img src="http://www.myfamily.it/content/images/thumbs/0024087.jpeg"></img>
    </div>
    );
  }
});

var ItemForm = React.createClass({
  
  render: function() {
    if (this.props.isRender) {
      return (
        <form className="item-formedit">
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