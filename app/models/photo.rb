# Don't forget this
require 'mime/types'

class Photo < ActiveRecord::Base
  # Paperclip: http://jimneath.org/2008/04/17/paperclip-attaching-files-in-rails/
  has_attached_file :file,
  :styles => {
    :thumb => "100x100#"
  }
  
  # Paperclip Validations
  validates_attachment_presence :file
  validates_attachment_content_type :file, :content_type => ['image/jpeg', 'image/pjpeg', 'image/jpg']
  
  # Fix the mime types. Make sure to require the mime-types gem
  def swfupload_file=(data)
    data.content_type = MIME::Types.type_for(data.original_filename).to_s
    self.file = data
  end
end
