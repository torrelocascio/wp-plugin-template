# Torre WordPress Plugin Template

Contributors: torrelocascio

Tags: wordpress, plugins, boilerplate

This is intended to be the base for WP plugins using npm and ESNext JS.

## Description

This template uses an admin/public division to separate functionality.  Within each of the public and admin divisions there are "elements" intended to be copied, renamed, and built to provide one specific function.  Each element has its own .scss, .js, and view folders and files.  Standard elements and AJAX-based element templates are provided, along with placeholder action hooks.  An example structure of JS, including Create React App projects, is provided, along with the enqueueing necessary to make it work.

### JS
This template uses the `@wordpress/scripts` package on npm to manage JS build trees.  However, that package must be installed in the /admin and /public folders independently.  Ease of installation has been traded for ease of use.

**To set up @wordpress/scripts within each directory:**
1. In the CLI, enter the directory (/admin, /public).
2. Run `npm init` if no _package.json_ exists.  If _package.json_ does exist, just run `npm i` and skip steps 3 and 4.
3. Run `npm install @wordpress/scripts --save-dev`.
4. Within the new _package.json_, find the "scripts" object.  Replace it with this basic config object:
```  
  "scripts": {
    "build": "wp-scripts build",
    "check-engines": "wp-scripts check-engines",
    "check-licenses": "wp-scripts check-licenses",
    "format:js": "wp-scripts format-js",
    "lint:css": "wp-scripts lint-style",
    "lint:js": "wp-scripts lint-js",
    "lint:md:docs": "wp-scripts lint-md-docs",
    "lint:md:js": "wp-scripts lint-md-js",
    "lint:pkg-json": "wp-scripts lint-pkg-json",
    "packages-update": "wp-scripts packages-update",
    "start": "wp-scripts start",
    "test:e2e": "wp-scripts test-e2e",
    "test:unit": "wp-scripts test-unit-js"
  },
```
Note that wp-scripts has no function in the root plugin directory, and should not be present in the root _package.json_

You will build the JS for /admin and /public separately with `npm run build` before gulping.  Typically, you will be working on only one area at a time, so you can stay in that folder.  Note that you can call `gulp` from a subfolder and it will change to the root directory to run Gulp, then return to the directory you were in.  You can also call `gulp` while the build is still running.

5. In the plugin's root .gitignore file, *uncomment* `# .env`.  The .env file should be gitignored if you add any secure values, but it starts commented out in order to allow the .env files within the example React apps in /public/my-app and /admin/my-app to be pushed to GitHub.  For reference, those .env files should contain the line: `SKIP_PREFLIGHT_CHECK=true` in order to prevent errors from being thrown during builds.

Once your setup is complete within each /public and /admin folder, you can import any child JS files into the `/src/index.js` file using ESNext `import` syntax.  Please see the example files.

When you want to build your JS files before a Gulp push to your development instance, just run `npm run build` within the root /public or /admin folder.


### CSS
Because each element has its own .scss, this assumes the use of a transpiler like Babel within Gulp for translation, concatenation, and minification.  Transpilation should target the /dist folder and its /public and /admin children.  We haven't added separate /js and /css folders within those, as we feel the separation is already sufficient.  We have added a sample gulpfile.js in the project root to get you started.


### Naming Conventions
We have ignored the WordPress naming convention for class files, instead opting for the short and clear convention of capitalized filenames for class files.  We use `snake_case` for PHP vars and functions, and `camelCase` for JS vars and functions.  jQuery objects are typically prefaced with an $, as in `$selectedOption`.


### Automatic Updates

The _plugin-name.php_ file header contains a Github URI line, intended for use with Andy Fragen & co.'s GitHub Updater plugin.  I wrestled with getting a robust auto-update solution integrated, but it proved too time-consuming to do well.  
For the GitHub Updater, visit https://github.com/afragen/github-updater.
