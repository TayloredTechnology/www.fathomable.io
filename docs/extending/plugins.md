# Extending with custom Plugins

!!! summary
		integrating with the core _Fathomable.io_ functionalities for custom gain.

Architecturally _Fathomable.io_ provides a series of custom events and actions that can be called as part of the `core` functionality. These are supported endpoints and are stable datastrutures that can be hooked into for any plugin development.

These endpoints can also handle middleware, should the need arise.

## Events

`core` events emitted regularly are as follows:

* generated:app
* generated:group
* generated:namespace
* updated:github
* updated:container
* configSync:check
* configSync:update
* isReady
* regenerate:app
* regenerate:group
* regenerate:ns
* refresh:generated
* refresh:db
* initDB
