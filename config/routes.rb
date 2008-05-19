ActionController::Routing::Routes.draw do |map|
  map.resources :photos
  map.root :controller => 'photos'
end
