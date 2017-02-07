class ShopController < ApplicationController
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
        
        respond_to do |format|
            format.json { render json: @items }
        end
    end    
end