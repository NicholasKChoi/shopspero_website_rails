function createCart() {
    
}

function getCart() {
    
}

function update(cart, item, quantity) {
    
}

class Cart {
    
    constructor(items) {
        this.cart = new Object();
        if (items != undefined) {
            for (var i = 0; i < items.length; i++) {
                // this.cart.push(items[i].props);
                this.cart[items[i].props.id] = items[i].props;
            }
        }
        this.save();
    }
    
    getCart() {
        this.cart = JSON.parse(Cookies.get('cart'));
        var cartArray = $.map(this.cart, function(value, index) {
            return [value];
        });
        return cartArray;
    }
    
    update(item, quantity) {
        this.cart[item] = quantity;
    }
    
    save() {
        Cookies.set('cart', this.toJson());
    }
    
    toJson() {
        return JSON.stringify(this.cart);
    }
    
    toString() {
        return this.cart.toString();
    }
}