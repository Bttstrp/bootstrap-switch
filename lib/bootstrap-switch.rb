require "bootstrap-switch/version"

module BootstrapSwitch
  def self.base_directory
    File.expand_path('../../static/sass', __FILE__)
  end
end

Compass::Frameworks.register 'bootstrap-switch', :path => BootstrapSwitch.base_directory
