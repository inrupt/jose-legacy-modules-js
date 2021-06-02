This package is automatically published whenever a new release of `jose` is pushed to npm.

It only re-exports the `jose` API's from the top-level.
This is useful for environments that do not (yet) support [package exports](https://nodejs.org/api/packages.html#packages_package_entry_points).

It was created by [Inrupt](https://inrupt.com/) for use in its own libraries.
While it may work for you too, keep in mind that depending on this package makes you dependent on another third party (Inrupt).

For more information about the background of this package, see:
https://github.com/panva/jose/discussions/201
