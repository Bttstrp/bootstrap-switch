require "bootstrap-switch/version"

module Bootstrap
  module Switch
    def self.base_directory
      File.expand_path('../../compass', __FILE__)
    end
  end
end

Compass::Frameworks.register 'bootstrap-switch', :path => Bootstrap::Switch.base_directory
