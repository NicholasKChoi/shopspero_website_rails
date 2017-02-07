class ShopController < ApplicationController
    def pagecontainer
        @query = params[:query] || "Display"
        @no_nav = true
    end
end