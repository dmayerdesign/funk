import { Dictionary } from "lodash"

export default function (rootPackageJson: {
  dependencies: any
}) {
  return {
    name: "functions",
    private: true,
    dependencies: Object.keys(rootPackageJson.dependencies).reduce(
      (deps, rootDepName) => {
        if (!rootDepName.match(/^@angular|@ionic|ng-|@ngneat|@capacitor|@ckeditor/)) {
          deps[rootDepName] = rootPackageJson.dependencies[rootDepName]
        }
        return deps
      },
      {} as Dictionary<string>,
    ),
    main: "index.js",
    engines: {
      node: "12",
    },
  }
}
