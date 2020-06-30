# @modernpoacher/deps

*Deps* updates each of your `package.json` dependencies to their latest version.

*Deps* updates both `dependencies` and `devDependencies` by default. You can choose to update only _production_ or _development_ dependencies. See *Using Deps*, below.

Where a dependency has an _exact_ version, *Deps* will not update that dependency by default. *Deps* can be configured to update to an _exact_ version or to `latest` as an _exact_ version. See *Using `.depsrc`*, below.

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

## Using `.depsrc`

To configure *Deps* create a file named `.depsrc` in the root directory of the package you want to update.

It should contain *JSON* and be structured as `package.json`:

```json
{
  "dependencies": {
    "express": "5.0.0-alpha.8"
  },
  "devDependencies": {
    "gulp": "latest"
  }
}
```

Without a `.depsrc` configuration file, whenever *Deps* encounters an _exact_ version, it will assume that _an exact version should not be updated_.

The `.depsrc` configuration file enables this behaviour to be changed.

In the example above, the `dependencies` field defines `express` with an _exact_ version while `devDependencies` defines `gulp` with `latest`.

### Configuration with an _exact_ version number

With the `.depsrc` configuration file as the example above:

- If `package.json` defines `express` at version `5.0.0-alpha.7` then *Deps* will upgrade to `5.0.0-alpha.8`
- If `package.json` defines `5.0.0-alpha.8` then *Deps* will not update the version at all (in which case, the entry in `.depsrc` is meaningless and can be deleted)
- If `package.json` defines `5.0.0-alpha.9` then *Deps* will downgrade to `5.0.0-alpha.8`. (If the entry in `.depsrc` is out of date, change the entry, or delete it)

*Deps* only refers to the `.depsrc` configuration file when it encounters an _exact_ version in `package.json`. If there is no entry for that dependency in the `.depsrc` configuration file then *Deps* will not upgrade, downgrade or otherwise modify it.

You need not duplicate an _exact_ version in `.depsrc`. Let `package.json` be the source of truth.

Typically, an entry in the `.depsrc` configuration file will contain `latest`.

### Configuration with `latest`

Again, with the `.depsrc` configuration file as the example above:

- If `package.json` defines `gulp` at version `4.0.2` then *Deps* will update to the latest version

There is no other behaviour! *Deps* will update to the latest version.

### Etc

*Deps* is written in *ES* and is transpiled to *JS* with Babel.

*ES* functions can be found in `src`.

*JS* functions can be found in `lib`.

To build *Deps*, change into its root directory and at the command line execute `npm i && npm run build`.
