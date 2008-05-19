class PhotosController < ApplicationController
  session :cookie_only => false, :only => :create
  
  def index
    @photos = Photo.find :all, :order => 'created_at DESC'
  end
  
  def new
    @photo = Photo.new
  end
  
  def create
    if params[:Filedata]
      @photo = Photo.new(:swfupload_file => params[:Filedata])
      if @photo.save
        render :partial => 'photo', :object => @photo
      else
        render :text => "error"
      end
    else
      @photo = Photo.new params[:photo]
      if @photo.save
        flash[:notice] = 'Your photo has been uploaded!'
        redirect_to photos_path
      else
        render :action => :new
      end
    end
  end
end
