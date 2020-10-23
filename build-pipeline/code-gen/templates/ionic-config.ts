export function construct() {
  return function (displayName: string): string {
    return `{
  "defaultProject": "client-app",
  "projects": {
    "client-app": {
      "name": "${displayName}",
      "integrations": {
        "capacitor": {}
      },
      "type": "angular",
      "root": ""
    }
  }
}
`
  }
}

export default construct()
