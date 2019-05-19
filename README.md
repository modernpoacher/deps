# @modernpoacher/deps

*Deps* updates all of your `package.json` dependencies to the latest versions.

*Deps* updates both `dependencies` and `devDependencies` by default (but you can choose to update only _production_ or _development_ dependencies with arguments).

## Using Deps

Install `@modernpoacher/deps` to your project.

```
npm install --save-dev @modernpoacher/deps
```

In `package.json` add some script targets:

```
{
  "scripts": {
    "deps": "deps",
    "deps:prod": "deps --save-prod",
    "deps:dev": "deps --save-dev"
  }
}
```

At the command line execute:

```
npm run deps
```

### Updating only production dependencies

To update only _production_ dependencies (on the `dependencies` field):

```
npm run deps:prod
```

Or: 

```
npm run deps -- --save-prod
```

### Updating only development dependencies

To update only _development_ dependencies (dependencies on the `devDependencies` field):

```
npm run deps:dev
```

Or: 

```
npm run deps -- --save-dev
```

### Etc

_Deps_ is written in ES and is transpiled to JS with Babel. 

ES functions can be found in `src`.

JS functions can be found in `lib`. 

The ES functions are transpiled to JS when the package is installed. To build them again, change into the `@modernpoacher/deps` directory and at the command line execute `npm run babel`.