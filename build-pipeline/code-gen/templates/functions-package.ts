import { Dictionary } from "lodash"

export default function (rootPackageJson: {
  dependencies: any
  devDependencies: any
}) {
  return {
    name: "functions",
    private: true,
    dependencies: Object.keys(rootPackageJson.dependencies).reduce(
      (deps, rootDepName) => {
        if (!rootDepName.match(/^@angular|@ionic|ng-/)) {
          deps[rootDepName] = rootPackageJson.dependencies[rootDepName]
        }
        return deps
      },
      {} as Dictionary<string>
    ),
    main: "lib/index.js",
    engines: {
      node: "10",
    },
  }
}
