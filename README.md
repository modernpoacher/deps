# @modernpoacher/deps

*Deps* updates all of your `package` dependencies to the latest versions.

*Deps* updates both `dependencies` and `devDependencies` by default -- you can choose to update only _production_ or _development_ dependencies with additional arguments.

```
DEPS_PATH=<path to your package> node app --save-dev
```
## Using Deps

Install `@modernpoacher/deps` to your project.

```
npm install --save-dev @modernpoacher/deps
```

In `package.json` add a script target:

```
{
  "scripts": { 
  	"deps": "@modernpoacher/deps",
  	"deps:prod": "npm run deps -- --save-prod",
  	"deps:dev": "npm run deps -- --save-dev"
  }
}
```

At the command line execute:

```
npm run deps
```

To update only `dependencies`:

```
npm run deps:prod
```
To update only `devDependencies`:

```
npm run deps:dev
```
