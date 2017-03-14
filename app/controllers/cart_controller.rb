class CartController < ApplicationController
  def index
    @items = Item.all
  end
  
  def create
    #api endpoint for adding an item to cart
    
    # supposedly method to add something to session's data
    session[:id] = params["id"]
  end
  
  def destroy
    #api endpoint for deleting an item from cart
  end
  
  def update
    #api endpoint for updating item (quantity)
    item = Item.find(params[:item][:id])
    
    # Method to test real-time updating in cart
    # Should probably have a separate cart item class,
    # so this doesn't modify stock of the item.
    item.stock = params[:item][:quantity]
    item.save!
  end
end
