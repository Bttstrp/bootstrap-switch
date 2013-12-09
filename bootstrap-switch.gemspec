# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'bootstrap-switch/version'

Gem::Specification.new do |spec|
  spec.name          = "bootstrap-switch"
  spec.version       = BootstrapSwitch::VERSION
  spec.authors       = ["Michael Hellein"]
  spec.email         = ["themichaek@gmail.com"]
  spec.description   = %q{Unofficial bootstrap switch}
  spec.summary       = %q{Provides a switch-style affordance for checkboxes and radios.}
  spec.homepage      = ""
  spec.license       = "Apache Version 2"

  spec.files         = `git ls-files static/sass lib`.split($/)
  spec.require_paths = ["lib"]

  spec.add_dependency "compass", ">= 0.11"

  spec.add_development_dependency "bundler", "~> 1.3"
  spec.add_development_dependency "rake"
end
