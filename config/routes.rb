Rails.application.routes.draw do
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'

  # Example of regular route:
  get 'shop/:query', to: 'shop#pagecontainer', as: 'shop_page'
  get 'shop', to: 'shop#pagecontainer', as: 'shop'
  
  get 'cart' => 'shop#cart'

  # API routes in the shop index.
  get 'api/v1/shop/index', to: 'shop#index', as: 'shop_index' 
  post 'api/v1/shop/create', to: 'shop#create', as: 'shop_create'
  post 'api/v1/shop/update', to: 'shop#update', as: 'shop_update'
  #   get 'products/:id' => 'catalog#view'
  delete 'api/v1/shop/delete', to: 'shop#delete', as: 'shop_delete'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
