class CartClass {
    constructor(items) {
        if (Cookies.get('cart') == undefined) {
            this.cart = new Object();
            if (items != undefined) {
                for (var i = 0; i < items.length; i++) {
                    this.cart[items[i].props.id] = items[i].props;
                }
            }
            this.save();
        } else {
            this.getCart();
        }
    }
    
    getCart() {
        this.cart = JSON.parse(Cookies.get('cart'));
        var cartArray = $.map(this.cart, function(value, index) {
            return [value];
        });
        return cartArray;
    }
    
    add(item, quantity) {
        if (this.cart[item] == undefined) {
            this.cart[item]['id'] = item;
            this.cart[item]['quantity'] = quantity;
            this.save();
        }
    }
    
    update(item, quantity) {
        this.cart[item]['quantity'] = quantity;
        this.save();
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