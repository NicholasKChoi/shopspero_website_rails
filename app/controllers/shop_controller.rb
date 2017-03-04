class ShopController < ApplicationController
    protect_from_forgery with: :null_session
    def item_params
        params.require(:item).permit(:name, :on_sale, :stock, :size, :color,
                                       :line, :price, :description, :id)
    end
    
    def pagecontainer
        @query = params[:query] || "Display"
        @no_nav = true
    end
   
    def ensure_json_request  
        return if request.format == :json
    end 
    
    def index
        @items = Item.all()
        ensure_json_request
        puts params
        
        respond_to do |format|
            format.json { render json: @items }
        end
    end
    
    def create
        ensure_json_request
        @item = Item.new(item_params)
        
        respond_to do |format|
            if @item.save
                format.json { render json: @item }
            else
                format.json { render json: @item.errors, status: :unprocessable_entity }
            end
        end
    end
    
    def update
        ensure_json_request
        @item = Item.find(item_params[:id])
        @item.update(item_params)
        puts item_params
        
        respond_to do |format|
            if @item.valid?
                format.json { render json: @item }
            else
                format.json { render json: @item.errors, status: :unprocessable_entity }
            end
        end
    end
    
    def delete
        ensure_json_request
        puts params
        @item = Item.find(item_params[:id])
        @item.destroy
        
        respond_to do |format|
            format.json { render json: @item } 
        end
    end
end