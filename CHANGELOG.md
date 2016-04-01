# Changelog

## 3.4.4
- Made it so that changes to disabled prop are rendered [#11](https://github.com/Julusian/react-bootstrap-switch/pull/11) Thanks to penguinpowernz
- Fix on/off label sections being wrong height when rendering with no label

## 3.4.3
- Fix issue with onColor when not focused [#9](https://github.com/Julusian/react-bootstrap-switch/pull/9) Thanks to bshamblen

## 3.4.2
- Fix switch not toggling on props update [#8](https://github.com/Julusian/react-bootstrap-switch/pull/8) Thanks to penguinpowernz
- Fix handle click region not always being full height of area
- Fix animation on first render if initial state is false

## 3.4.1

- Don't fill switch to 100% of parent height [#5](https://github.com/Julusian/react-bootstrap-switch/pull/5) Thanks to timchang
- Switch should toggle when label is clicked [#5](https://github.com/Julusian/react-bootstrap-switch/pull/5) Thanks to timchang

## 3.4.0

- Remove calls to .getDOMNode() [#3](https://github.com/Julusian/react-bootstrap-switch/pull/3) Thanks to jking90 

## 3.3.4

- Rename getState to valueState to fix collision with standard react method
- Add this as a parameter to the onChange event [#1](https://github.com/Julusian/react-bootstrap-switch/issues/1)
- Add value and toggleValue as alternate names for valueState and toggleState respectively
- Fix issues with disabled, readonly, handleWidth and labelWidth

## 3.3.2

- Fix for Flicker on initialisation [#425](https://github.com/nostalgiaz/bootstrap-switch/issues/425), [#422](https://github.com/nostalgiaz/bootstrap-switch/issues/422)
- Prevent horizontal misalignment inside modal in page with odd width [#414](https://github.com/nostalgiaz/bootstrap-switch/issues/414)

## 3.3.1

- Revert of switchChange event triggered only on falsy skip [#411](https://github.com/nostalgiaz/bootstrap-switch/issues/411)

## 3.3.0 

- Fixed setting of correct state on drag from indeterminate state [#403](https://github.com/nostalgiaz/bootstrap-switch/issues/403)
- Fixed broken state changing on hidden switch [#392, [#383](https://github.com/nostalgiaz/bootstrap-switch/issues/383)
- Missing animation on first state change triggered by side click [#390](https://github.com/nostalgiaz/bootstrap-switch/issues/390)
- SwitchChange event always triggered after change event [#389](https://github.com/nostalgiaz/bootstrap-switch/issues/389)
- Skip check for transitionend event on init [#381](https://github.com/nostalgiaz/bootstrap-switch/issues/381)
- Added stopPropagation on element mousedown [#369](https://github.com/nostalgiaz/bootstrap-switch/issues/369)
- Fixed wrong descrition in documentation [#351](https://github.com/nostalgiaz/bootstrap-switch/issues/351)

## 3.2.2

- Fixed wrong rendering of switch on initialisation if element is hidden [#376](https://github.com/nostalgiaz/bootstrap-switch/issues/376)

## 3.2.1

- Hotfix for broken initialisation logic if $.support.transition is not set [#375](https://github.com/nostalgiaz/bootstrap-switch/issues/375)

## 3.2.0

- Added option and method handleWidth to set a specific width of the side handled [#341](https://github.com/nostalgiaz/bootstrap-switch/issues/341)
- Added option and method labelWidth to set a specific width of the center label [#341](https://github.com/nostalgiaz/bootstrap-switch/issues/341)
- Fixed broken toggling of side handles when switch is wrapped in a external label [#359](https://github.com/nostalgiaz/bootstrap-switch/issues/359)
- Minor refactoring all along the source code

## 3.1.0

- Added inverse option to swap the position of the left and right elements [#207](https://github.com/nostalgiaz/bootstrap-switch/issues/207)
- Fixed misalignment on Safari [#223](https://github.com/nostalgiaz/bootstrap-switch/issues/223)
- Added options toggleAnimate method
- Enhanced documentation with new examples

## 3.0.2

- Added radioAllOff option. allow a group of radio inputs to be all off [#322](https://github.com/nostalgiaz/bootstrap-switch/issues/322)
- Made HTML options overridable by JavaScript initalization options [#319](https://github.com/nostalgiaz/bootstrap-switch/issues/319)
- .form-control does not interfere anymore with the switch appearance [#318](https://github.com/nostalgiaz/bootstrap-switch/issues/318)
- Fixed triggering of two events in case of jQuery id selector [#317](https://github.com/nostalgiaz/bootstrap-switch/issues/317)
- Fixed internal switching loop when toggling with spacebar [#316](https://github.com/nostalgiaz/bootstrap-switch/issues/316)
- Fixed switch label toggling not working with radio inputs [#312](https://github.com/nostalgiaz/bootstrap-switch/issues/312)

## 3.0.1

- Added support for intermediate state [#218](https://github.com/nostalgiaz/bootstrap-switch/issues/218)
- Added change event triggered on label click [#299](https://github.com/nostalgiaz/bootstrap-switch/issues/299)
- Added onInit and onSwitchChange event as methods

## 3.0.0

- API redesign for a more intuitive use
- Entire code source rewriting focused on cleanliness and performance
- Initialization options can be passed as JavaScript object or written as data-*
- Plugin constructor publicly available from $.fn.bootstrapSwitch.Constructor
- Plugin instance publicly available calling .data('bootstrap-switch')
- Global overridable defaults options
- Improved flexibility with baseClass and wrapperClass options
- New onInit event
- Event namespacing
- Full Bootstrap 3 support
- A lot of fixed bug, as usual
