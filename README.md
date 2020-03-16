# @modernpoacher/deps

*Deps* updates each of your `package.json` dependencies to their latest version.

*Deps* updates both `dependencies` and `devDependencies` by default. You can choose to update only _production_ or _development_ dependencies.

## Installing Deps

Globally:

```sh
npm i -g @modernpoacher/deps
```

Locally, to your project:

```sh
npm i -D @modernpoacher/deps
```

## Using Deps

When installed globally, change into the root directory of the package you want to update and execute the command:
```sh
deps
```

When installed locally, or not installed, use `npx`:

```sh
npx @modernpoacher/deps
```
Or when installed locally, use `npm` with script targets in `package.json`:

```json
{
  "scripts": {
    "deps": "deps"
  }
}
```
Then:
```sh
npm run deps
```
### Updating only production dependencies

To update only _production_ dependencies (on the `dependencies` field):

```sh
deps --save-prod # or -P
```

Or:

```sh
npx @modernpoacher/deps --save-prod # or -P
```

Or: 

```sh
npm run deps -- --save-prod # or -P
```

### Updating only development dependencies

To update only _development_ dependencies (dependencies on the `devDependencies` field):

```sh
deps --save-dev # or -D
```

Or:

```sh
npx @modernpoacher/deps --save-dev # or -D
```

Or: 

```sh
npm run deps -- --save-dev # or -D
```

### Etc

_Deps_ is written in ES and is transpiled to JS with Babel. 

ES functions can be found in `src`.

JS functions can be found in `lib`. 

The ES functions are transpiled to JS when the package is installed. To build them again, change into the root directory of this package and at the command line execute `npm install && npm run build`.
